import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployFlushFixture() {
    // Get signers - make sure to use owner for deploying NFTs
    const [owner, user1, user2] = await ethers.getSigners();

    // Deploy ChillThrone
    const ChillThrone = await ethers.getContractFactory("ChillThrone", owner);
    const chillThrone = await ChillThrone.deploy();

    // Deploy NFTs with owner
    const ToiletNFT = await ethers.getContractFactory("ToiletNFT", owner);
    const toiletNFT = await ToiletNFT.deploy();

    const ToiletPaperNFT = await ethers.getContractFactory("ToiletPaperNFT", owner);
    const toiletPaperNFT = await ToiletPaperNFT.deploy();

    // Deploy Flush contract
    const Flush = await ethers.getContractFactory("Flush", owner);
    const flush = await Flush.deploy(
        await chillThrone.getAddress(),
        await toiletNFT.getAddress(),
        await toiletPaperNFT.getAddress()
    );

    // Transfer ownership using the owner signer
    await toiletNFT.connect(owner).transferOwnership(await flush.getAddress());
    await toiletPaperNFT.connect(owner).transferOwnership(await flush.getAddress());

    // Fund the Flush contract with tokens
    await chillThrone.connect(owner).transfer(await flush.getAddress(), ethers.parseEther("1000000"));

    return { 
        flush, 
        owner, 
        user1, 
        user2, 
        chillThrone, 
        toiletNFT, 
        toiletPaperNFT 
    };
}

describe("Flush Contract", function () {
    let Flush, flush;
    let ChillThrone, chillThrone;
    let ToiletNFT, toiletNFT;
    let ToiletPaperNFT, toiletPaperNFT;
    let owner, addr1, addr2, plumber;
    const FLUSH_PRICE = ethers.parseEther("0.001");

    beforeEach(async function () {
        // Get signers
        [owner, addr1, addr2, plumber] = await ethers.getSigners();

        // Deploy ChillThrone
        ChillThrone = await ethers.getContractFactory("ChillThrone");
        chillThrone = await ChillThrone.deploy();

        // Deploy NFTs
        ToiletNFT = await ethers.getContractFactory("ToiletNFT");
        toiletNFT = await ToiletNFT.deploy();

        ToiletPaperNFT = await ethers.getContractFactory("ToiletPaperNFT");
        toiletPaperNFT = await ToiletPaperNFT.deploy();

        // Deploy Flush contract
        Flush = await ethers.getContractFactory("Flush");
        flush = await Flush.deploy(
            await chillThrone.getAddress(),
            await toiletNFT.getAddress(),
            await toiletPaperNFT.getAddress()
        );

        // Transfer ownership of NFT contracts to Flush contract
        await toiletNFT.transferOwnership(await flush.getAddress());
        await toiletPaperNFT.transferOwnership(await flush.getAddress());

        // Fund the Flush contract with SHET tokens
        await chillThrone.transfer(await flush.getAddress(), ethers.parseEther("1000000"));
    });

    describe("Initialization", function () {
        it("Should set the right owner", async function () {
            expect(await flush.owner()).to.equal(owner.address);
        });

        it("Should initialize toilet styles correctly", async function () {
            expect(await flush.toiletStyles(0)).to.equal("Standard");
            expect(await flush.toiletStyles(1)).to.equal("Golden");
            expect(await flush.toiletStyles(2)).to.equal("Neon");
        });

        it("Should initialize achievements correctly", async function () {
            expect(await flush.achievementNames(1)).to.equal("First Flush");
            expect(await flush.achievementRewards(1)).to.equal(5);
        });
    });

    describe("Flushing", function () {
        it("Should allow users to flush with exact amount", async function () {
            const { flush, user1 } = await loadFixture(deployFlushFixture);
            const tx = await flush.connect(user1).flush({ value: FLUSH_PRICE });
            const receipt = await tx.wait()

            // Assuming you're checking an event or a state change
            const flushEvent = receipt.logs[1]
            const event = flush.interface.parseLog(flushEvent);
            expect(flushEvent).to.not.be.undefined;
            expect(event.args[1]).to.be.equal(5n);
        });

        it("Should reject flush with incorrect amount", async function () {
            await expect(
                flush.connect(addr1).flush({ value: ethers.parseEther("0.002") })
            ).to.be.revertedWith("You must send exactly 0.001 ether");
        });

        it("Should increase user's points and total flushes", async function () {
            await flush.connect(addr1).flush({ value: FLUSH_PRICE });
            const user = await flush.users(addr1.address);
            expect(user.points).to.be.above(0);
            expect(user.totalFlushes).to.equal(1);
        });
    });

    describe("Referral System", function () {
        it("Should handle referrals correctly", async function () {
            await flush.connect(addr2).flushWithReferral(addr1.address, { value: FLUSH_PRICE });
            
            expect(await flush.referrers(addr2.address)).to.equal(addr1.address);
            expect(await flush.referralCount(addr1.address)).to.equal(1);
            
            const referrerUser = await flush.users(addr1.address);
            expect(referrerUser.points).to.equal(2); // Referrer bonus
        });

        it("Should prevent self-referrals", async function () {
            await expect(
                flush.connect(addr1).flushWithReferral(addr1.address, { value: FLUSH_PRICE })
            ).to.be.revertedWith("Cannot refer yourself");
        });
    });

    describe("Achievements", function () {
        it("Should award First Flush achievement", async function () {
            const { flush, user1 } = await loadFixture(deployFlushFixture);
            
            // Make sure user hasn't flushed before
            const userStats = await flush.users(user1.address);
            expect(userStats.points).to.equal(0);
            expect(userStats.totalFlushes).to.equal(0);
            
            // Perform the flush
            await expect(flush.connect(user1).flush({ value: FLUSH_PRICE }))
                .to.emit(flush, "AchievementUnlocked")
                .withArgs(user1.address, 1); // Expecting the achievement ID as a uint256
        });
    });

    describe("Toilet Upgrades", function () {
        it("Should allow toilet upgrades with sufficient points", async function () {
            const { flush, user1 } = await loadFixture(deployFlushFixture);
            
            // Perform enough flushes to get required points
            for(let i = 0; i < 100; i++) {
                await flush.connect(user1).flush({ value: FLUSH_PRICE });
            }
            
            // Verify points before upgrade
            const userBefore = await flush.users(user1.address);
            expect(userBefore.points).to.be.gte(1000);

            // Attempt upgrade
            await expect(flush.connect(user1).upgradeToilet())
                .to.emit(flush, "ToiletUpgraded")
                .withArgs(user1.address, 1);

            // Verify the upgrade happened
            const newLevel = await flush.userToiletLevel(user1.address);
            expect(newLevel).to.equal(1);
        });
    });

    describe("Plumber System", function () {
        it("Should allow owner to appoint plumbers", async function () {
            await flush.connect(owner).appointPlumber(plumber.address);
            expect(await flush.plumbers(plumber.address)).to.be.true;
        });

        it("Should allow plumbers to unclog toilets", async function () {
            await flush.connect(owner).appointPlumber(plumber.address);
            await flush.connect(plumber).unclogToilet(addr1.address);
            // Check that the combo streak was reset
            const user = await flush.users(addr1.address);
            expect(user.comboStreak).to.equal(0);
        });
    });

    describe("Guild System", function () {
        it("Should allow users to create guilds", async function () {
            await expect(flush.connect(addr1).createGuild("Test Guild"))
                .to.emit(flush, "GuildCreated");
        });

        it("Should allow users to join existing guilds", async function () {
            await flush.connect(addr1).createGuild("Test Guild");
            const guildId = 1; // You might need to adjust this based on how guild IDs are generated
            
            await expect(flush.connect(addr2).joinGuild(guildId))
                .to.emit(flush, "GuildJoined")
                .withArgs(addr2.address, guildId);
        });
    });

    describe("Token Claims", function () {
        it("Should allow users to claim tokens", async function () {
            // First give the user some points
            await flush.connect(addr1).flush({ value: FLUSH_PRICE });
            
            await expect(flush.connect(addr1).claimTokens())
                .to.emit(flush, "TokensClaimed");
            
            const userPoints = (await flush.users(addr1.address)).points;
            expect(userPoints).to.equal(0); // Points should be reset after claiming
        });
    });

    describe("Withdrawal", function () {
        it("Should allow owner to withdraw", async function () {
            // First send some ETH to the contract
            await flush.connect(addr1).flush({ value: FLUSH_PRICE });
            
            const initialBalance = await ethers.provider.getBalance(owner.address);
            await flush.connect(owner).withdraw(FLUSH_PRICE);
            const finalBalance = await ethers.provider.getBalance(owner.address);
            
            expect(finalBalance).to.be.above(initialBalance);
        });

        it("Should prevent non-owners from withdrawing", async function () {
            await expect(
                flush.connect(addr1).withdraw(FLUSH_PRICE)
            ).to.be.revertedWith("Only the owner can call this function");
        });
    });
}); 