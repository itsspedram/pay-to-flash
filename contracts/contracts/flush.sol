// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IToiletNFT {
    function mint(address to, uint256 tokenId) external;
}

interface IToiletPaperNFT {
    function mint(address to, uint256 tokenId) external;
}

contract Flush {
    using Counters for Counters.Counter;

    struct User {
        uint256 points;
        uint256 totalFlushes;
        uint256 lastFlushTimestamp;
        uint256 comboStreak;
        uint256 lastComboTime;
        mapping(uint256 => bool) achievements;
    }

    struct Event {
        string name;
        uint256 startTime;
        uint256 endTime;
        uint256 pointMultiplier;
        bool active;
    }

    struct ToiletUpgrade {
        string name;
        uint256 cost;
        uint256 pointMultiplier;
    }

    struct Challenge {
        string description;
        uint256 targetFlushes;
        uint256 reward;
        bool completed;
    }

    struct Guild {
        string name;
        address[] members;
        uint256 totalPoints;
    }

    struct Cosmetic {
        string name;
        uint256 price;
    }

    enum Season { SPRING, SUMMER, AUTUMN, WINTER }

    mapping(address => User) public users;
    address[] public leaderboard;
    mapping(uint256 => string) public toiletStyles;
    mapping(uint256 => string) public achievementNames;
    mapping(uint256 => uint256) public achievementRewards;
    mapping(uint256 => Event) public specialEvents;
    mapping(address => address) public referrers;
    mapping(address => uint256) public referralCount;

    mapping(address => uint256) public userToiletLevel;
    mapping(uint256 => ToiletUpgrade) public toiletUpgrades;
    mapping(address => bool) public plumbers;
    mapping(address => Challenge[]) public userChallenges;
    mapping(uint256 => Guild) public guilds;
    mapping(address => uint256) public userGuild;
    mapping(uint256 => Cosmetic) public cosmetics;
    mapping(address => mapping(uint256 => bool)) public userCosmetics;

    address public owner;
    IERC20 public ChillThrone;
    IToiletNFT public toiletNFT;
    IToiletPaperNFT public toiletPaperNFT;
    uint256 public constant TOKENS_PER_POINT = 200 * 10 ** 18;
    uint256 public currentEventId;

    event FlushExecuted(address flusher, uint256 points, string toiletStyle);
    event Withdrawal(address indexed owner, uint256 amount);
    event TokensClaimed(address indexed user, uint256 amount);
    event EtherReceived(address indexed sender, uint256 amount);
    event FallbackCalled(address indexed sender, uint256 amount, bytes data);
    event AchievementUnlocked(address user, uint256 achievementId);
    event SpecialEventCreated(uint256 eventId, string name);
    event NFTMinted(address user, uint256 tokenId);
    event ToiletUpgraded(address user, uint256 level);
    event ToiletPaperNFTMinted(address user, uint256 tokenId);
    event GuildCreated(uint256 guildId, string name);
    event GuildJoined(address user, uint256 guildId);
    event ChallengeIssued(address user, string description);
    event ChallengeCompleted(address user, uint256 challengeId);
    event CosmeticPurchased(address user, uint256 cosmeticId);
    event MinigameCompleted(address user, uint256 score);

    constructor(
        address _ChillThroneAddress, 
        address _toiletNFTAddress,
        address _toiletPaperNFTAddress
    ) {
        owner = msg.sender;
        ChillThrone = IERC20(_ChillThroneAddress);
        toiletNFT = IToiletNFT(_toiletNFTAddress);
        toiletPaperNFT = IToiletPaperNFT(_toiletPaperNFTAddress);
        
        initializeToiletStyles();
        initializeAchievements();
        initializeToiletUpgrades();
        initializeCosmetics();
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyPlumber() {
        require(plumbers[msg.sender], "Only plumbers can call this function");
        _;
    }

    function initializeToiletStyles() internal {
        toiletStyles[0] = "Standard";
        toiletStyles[1] = "Golden";
        toiletStyles[2] = "Neon";
    }

    function initializeAchievements() internal {
        achievementNames[1] = "First Flush";
        achievementRewards[1] = 5;
        achievementNames[2] = "Daily Streak Hero";
        achievementRewards[2] = 10;
        achievementNames[3] = "Golden Throne Master";
        achievementRewards[3] = 20;
    }

    function initializeToiletUpgrades() internal {
        toiletUpgrades[1] = ToiletUpgrade("Bidet Attachment", 1000, 11);
        toiletUpgrades[2] = ToiletUpgrade("Heated Seat", 2000, 12);
        toiletUpgrades[3] = ToiletUpgrade("Smart Toilet", 5000, 15);
    }

    function initializeCosmetics() internal {
        cosmetics[1] = Cosmetic("Golden Flush Handle", 500);
        cosmetics[2] = Cosmetic("Rainbow Toilet Paper", 1000);
        cosmetics[3] = Cosmetic("Disco Ball Toilet Lid", 2000);
    }

    function flush() public payable {
        require(msg.value == 0.001 ether, "You must send exactly 0.001 ether");
        
        User storage user = users[msg.sender];
        uint256 timeMultiplier = getTimeMultiplier();
        uint256 randomBonus = getRandomBonus();
        uint256 eventMultiplier = getCurrentEventMultiplier();
        uint256 upgradeMultiplier = toiletUpgrades[userToiletLevel[msg.sender]].pointMultiplier;
        
        uint256 pointsEarned = 1 * timeMultiplier * randomBonus * eventMultiplier * upgradeMultiplier / 10;
        
        user.points += pointsEarned;
        user.totalFlushes += 1;
        user.lastFlushTimestamp = block.timestamp;

        calculateComboPoints(user);
        updateLeaderboard(msg.sender);
        checkAndAwardAchievements(msg.sender);
        mintSpecialToilet(user.totalFlushes);
        checkChallengeCompletion(msg.sender);
        updateGuildPoints(msg.sender, pointsEarned);

        string memory style = getToiletStyle(user.totalFlushes);
        
        emit FlushExecuted(msg.sender, user.points, style);
    }

    function flushWithReferral(address referrer) public payable {
        require(referrer != msg.sender, "Cannot refer yourself");
        require(referrers[msg.sender] == address(0), "Already referred");
        
        referrers[msg.sender] = referrer;
        referralCount[referrer]++;
        
        users[referrer].points += 2;
        users[msg.sender].points += 1;
        
        flush();
    }

    function updateLeaderboard(address user) internal {
        if (leaderboard.length < 10) {
            leaderboard.push(user);
        } else {
            uint256 minPoints = type(uint256).max;
            uint256 minIndex = 0;
            for (uint256 i = 0; i < leaderboard.length; i++) {
                if (users[leaderboard[i]].points < minPoints) {
                    minPoints = users[leaderboard[i]].points;
                    minIndex = i;
                }
            }
            if (users[user].points > minPoints) {
                leaderboard[minIndex] = user;
            }
        }
    }

    function getToiletStyle(uint256 flushCount) internal view returns (string memory) {
        string memory seasonalStyle = getSeasonalStyle();
        if (bytes(seasonalStyle).length > 0) return seasonalStyle;
        
        if (flushCount > 100) return toiletStyles[2]; // Neon
        if (flushCount > 50) return toiletStyles[1];  // Golden
        return toiletStyles[0]; // Standard
    }

    function getLeaderboard() public view returns (address[] memory, uint256[] memory) {
        uint256[] memory points = new uint256[](leaderboard.length);
        for (uint256 i = 0; i < leaderboard.length; i++) {
            points[i] = users[leaderboard[i]].points;
        }
        return (leaderboard, points);
    }

    function withdraw(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance in contract");
        payable(owner).transfer(amount);
        emit Withdrawal(owner, amount);
    }

    function claimTokens() public {
        uint256 userPoints = users[msg.sender].points;
        require(userPoints > 0, "You have no points to claim tokens");
        require(userPoints >= 100, "You must have at least 100 points to claim tokens");
        
        uint256 tokenAmount = userPoints * TOKENS_PER_POINT;
        require(ChillThrone.balanceOf(address(this)) >= tokenAmount, "Insufficient ChillThrone balance in contract");

        users[msg.sender].points = 0;
        ChillThrone.transfer(msg.sender, tokenAmount);
        emit TokensClaimed(msg.sender, tokenAmount);
    }

    function checkAndAwardAchievements(address user) internal {
        User storage userStruct = users[user];
        
        if (userStruct.totalFlushes == 1 && !userStruct.achievements[1]) {
            userStruct.achievements[1] = true;
            userStruct.points += achievementRewards[1];
            emit AchievementUnlocked(user, 1);
        }
        
        if (isConsecutiveDays(user) && !userStruct.achievements[2]) {
            userStruct.achievements[2] = true;
            userStruct.points += achievementRewards[2];
            emit AchievementUnlocked(user, 2);
        }

        if (userStruct.totalFlushes >= 50 && !userStruct.achievements[3]) {
            userStruct.achievements[3] = true;
            userStruct.points += achievementRewards[3];
            emit AchievementUnlocked(user, 3);
        }
    }

    function isConsecutiveDays(address user) internal view returns (bool) {
        uint256 lastTimestamp = users[user].lastFlushTimestamp;
        uint256 currentDay = block.timestamp / 1 days;
        uint256 lastDay = lastTimestamp / 1 days;
        return currentDay == lastDay + 1;
    }

    function getTimeMultiplier() internal view returns (uint256) {
        uint256 hour = block.timestamp % 86400 / 3600;
        if (hour == 20) return 20; // Happy Hour: 2x points between 8-9 PM UTC
        if (isWeekend()) return 15; // 1.5x on weekends
        return 10;
    }

    function isWeekend() internal view returns (bool) {
        uint256 dayOfWeek = (block.timestamp / 86400 + 4) % 7;
        return dayOfWeek == 5 || dayOfWeek == 6; // 5 = Saturday, 6 = Sunday
    }

    function calculateComboPoints(User storage user) internal {
        if (block.timestamp <= user.lastComboTime + 1 hours) {
            user.comboStreak++;
            user.points += user.comboStreak; // Extra points for combos
        } else {
            user.comboStreak = 1;
        }
        user.lastComboTime = block.timestamp;
    }

    function createSpecialEvent(string memory _name, uint256 _duration, uint256 _multiplier) public onlyOwner {
        currentEventId++;
        specialEvents[currentEventId] = Event({
            name: _name,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            pointMultiplier: _multiplier,
            active: true
        });
        emit SpecialEventCreated(currentEventId, _name);
    }

    function getCurrentEventMultiplier() internal view returns (uint256) {
        for (uint256 i = 1; i <= currentEventId; i++) {
            Event storage event_ = specialEvents[i];
            if (event_.active && block.timestamp >= event_.startTime && block.timestamp <= event_.endTime) {
                return event_.pointMultiplier;
            }
        }
        return 1;
    }

    function mintSpecialToilet(uint256 flushCount) internal {
        if (flushCount == 100) {
            toiletNFT.mint(msg.sender, 1); // Golden Toilet NFT
            emit NFTMinted(msg.sender, 1);
        } else if (flushCount == 1000) {
            toiletNFT.mint(msg.sender, 2); // Diamond Toilet NFT
            emit NFTMinted(msg.sender, 2);
        }
    }

    function getCurrentSeason() public view returns (Season) {
        uint256 dayOfYear = (block.timestamp % 365 days) / 1 days;
        if (dayOfYear < 90) return Season.WINTER;
        if (dayOfYear < 180) return Season.SPRING;
        if (dayOfYear < 270) return Season.SUMMER;
        return Season.AUTUMN;
    }

    function getSeasonalStyle() internal view returns (string memory) {
        Season season = getCurrentSeason();
        if (season == Season.WINTER) return "Frozen Throne";
        if (season == Season.SPRING) return "Flower Power";
        if (season == Season.SUMMER) return "Beach Breeze";
        if (season == Season.AUTUMN) return "Falling Leaves";
        return "";
    }

    function getRandomBonus() internal view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            msg.sender
        ))) % 100;
        
        if (randomNumber < 5) return 5; // 5% chance of 5x points
        if (randomNumber < 15) return 3; // 10% chance of 3x points
        if (randomNumber < 35) return 2; // 20% chance of 2x points
        return 1;
    }

    function upgradeToilet() public {
        uint256 nextLevel = userToiletLevel[msg.sender] + 1;
        require(nextLevel <= 3, "Max level reached");
        ToiletUpgrade memory upgrade = toiletUpgrades[nextLevel];
        require(users[msg.sender].points >= upgrade.cost, "Insufficient points");
        
        users[msg.sender].points -= upgrade.cost;
        userToiletLevel[msg.sender] = nextLevel;
        emit ToiletUpgraded(msg.sender, nextLevel);
    }

    function mintToiletPaperNFT(uint256 tokenId) public {
        require(users[msg.sender].totalFlushes % 100 == 0, "Not eligible for TP NFT");
        toiletPaperNFT.mint(msg.sender, tokenId);
        emit ToiletPaperNFTMinted(msg.sender, tokenId);
    }

    function appointPlumber(address _plumber) public onlyOwner {
        plumbers[_plumber] = true;
    }

    function unclogToilet(address user) public onlyPlumber {
        if (block.timestamp > users[user].lastFlushTimestamp + 7 days) {
            users[user].comboStreak = 0;
        }
    }

    function playMinigame() public returns (uint256) {
        require(users[msg.sender].totalFlushes > 0, "Must have flushed at least once");
        uint256 score = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100;
        users[msg.sender].points += score;
        emit MinigameCompleted(msg.sender, score);
        return score;
    }

    function issueChallenge(address user) public onlyOwner {
        Challenge memory newChallenge = Challenge("Flush 50 times in a week", 50, 1000, false);
        userChallenges[user].push(newChallenge);
        emit ChallengeIssued(user, newChallenge.description);
    }

    function checkChallengeCompletion(address user) internal {
        for (uint i = 0; i < userChallenges[user].length; i++) {
            if (!userChallenges[user][i].completed && users[user].totalFlushes >= userChallenges[user][i].targetFlushes) {
                userChallenges[user][i].completed = true;
                users[user].points += userChallenges[user][i].reward;
                emit ChallengeCompleted(user, i);
            }
        }
    }

    function createGuild(string memory name) public {
        require(userGuild[msg.sender] == 0, "Already in a guild");
        uint256 guildId = uint256(keccak256(abi.encodePacked(name, block.timestamp)));
        guilds[guildId].name = name;
        guilds[guildId].members.push(msg.sender);
        userGuild[msg.sender] = guildId;
        emit GuildCreated(guildId, name);
    }

    function joinGuild(uint256 guildId) public {
        require(userGuild[msg.sender] == 0, "Already in a guild");
        guilds[guildId].members.push(msg.sender);
        userGuild[msg.sender] = guildId;
        emit GuildJoined(msg.sender, guildId);
    }

    function updateGuildPoints(address user, uint256 points) internal {
        uint256 guildId = userGuild[user];
        if (guildId != 0) {
            guilds[guildId].totalPoints += points;
        }
    }

    function buyCosmetic(uint256 cosmeticId) public {
        require(!userCosmetics[msg.sender][cosmeticId], "Already owned");
        require(users[msg.sender].points >= cosmetics[cosmeticId].price, "Insufficient points");
        
        users[msg.sender].points -= cosmetics[cosmeticId].price;
        userCosmetics[msg.sender][cosmeticId] = true;
        emit CosmeticPurchased(msg.sender, cosmeticId);
    }

    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    fallback() external payable {
        emit FallbackCalled(msg.sender, msg.value, msg.data);
    }
}