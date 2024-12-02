import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ChillThrone Token
  const ChillThrone = await ethers.getContractFactory("ChillThrone");
  const chillThrone = await ChillThrone.deploy();
  await chillThrone.waitForDeployment();
  console.log("ChillThrone deployed to:", await chillThrone.getAddress());

  // Deploy ToiletNFT
  const ToiletNFT = await ethers.getContractFactory("ToiletNFT");
  const toiletNFT = await ToiletNFT.deploy();
  await toiletNFT.waitForDeployment();
  console.log("ToiletNFT deployed to:", await toiletNFT.getAddress());

  // Deploy ToiletPaperNFT
  const ToiletPaperNFT = await ethers.getContractFactory("ToiletPaperNFT");
  const toiletPaperNFT = await ToiletPaperNFT.deploy();
  await toiletPaperNFT.waitForDeployment();
  console.log("ToiletPaperNFT deployed to:", await toiletPaperNFT.getAddress());

  // Deploy Flush Contract
  const Flush = await ethers.getContractFactory("Flush");
  const flush = await Flush.deploy(
    await chillThrone.getAddress(),
    await toiletNFT.getAddress(),
    await toiletPaperNFT.getAddress()
  );
  await flush.waitForDeployment();
  console.log("Flush deployed to:", await flush.getAddress());

  // Transfer ownership of NFT contracts to Flush contract
  await toiletNFT.transferOwnership(await flush.getAddress());
  console.log("ToiletNFT ownership transferred to Flush contract");

  await toiletPaperNFT.transferOwnership(await flush.getAddress());
  console.log("ToiletPaperNFT ownership transferred to Flush contract");

  // Fund the Flush contract with ChillThrone tokens
  const fundAmount = ethers.parseEther("1000000");
  await chillThrone.transfer(await flush.getAddress(), fundAmount);
  console.log("Funded Flush contract with ChillThrone tokens");

  // Verify contracts on Etherscan
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await flush.deployTransaction.wait(6);
    
    await hre.run("verify:verify", {
      address: await chillThrone.getAddress(),
      constructorArguments: [],
    });

    await hre.run("verify:verify", {
      address: await toiletNFT.getAddress(),
      constructorArguments: [],
    });

    await hre.run("verify:verify", {
      address: await toiletPaperNFT.getAddress(),
      constructorArguments: [],
    });

    await hre.run("verify:verify", {
      address: await flush.getAddress(),
      constructorArguments: [
        await chillThrone.getAddress(),
        await toiletNFT.getAddress(),
        await toiletPaperNFT.getAddress(),
      ],
    });
  }

  // Output deployment addresses for frontend configuration
  console.log("\nDeployment addresses:");
  console.log({
    chillThrone: await chillThrone.getAddress(),
    toiletNFT: await toiletNFT.getAddress(),
    toiletPaperNFT: await toiletPaperNFT.getAddress(),
    flush: await flush.getAddress(),
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 