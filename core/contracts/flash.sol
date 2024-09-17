// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Flash {
    mapping(address => uint256) public points;
    address public owner;
    IERC20 public shetToken;
    uint256 public constant TOKENS_PER_POINT = 200 * 10 ** 18;

    event EtherReceived(address sender, uint256 amount);
    event FallbackCalled(address sender, uint256 amount, bytes data);
    event PointAwarded(address sender, uint256 points);
    event Withdrawal(address to, uint256 amount);
    event TokensClaimed(address to, uint256 amount);

    constructor(address _shetTokenAddress) {
        owner = msg.sender;
        shetToken = IERC20(_shetTokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function sendEtherAndGetPoint() public payable {
        require(msg.value == 1 ether, "You must send exactly 1 ether");
        points[msg.sender] += 1;
        emit PointAwarded(msg.sender, points[msg.sender]);
    }

    function getPoints() public view returns (uint256) {
        return points[msg.sender];
    }

    function withdraw(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance in contract");
        payable(owner).transfer(amount);
        emit Withdrawal(owner, amount);
    }

    function claimTokens() public {
        uint256 userPoints = points[msg.sender];
        require(userPoints > 0, "You have no points to claim tokens");
        
        uint256 tokenAmount = userPoints * TOKENS_PER_POINT;
        require(shetToken.balanceOf(address(this)) >= tokenAmount, "Insufficient ShetToken balance in contract");

        points[msg.sender] = 0;
        shetToken.transfer(msg.sender, tokenAmount);
        emit TokensClaimed(msg.sender, tokenAmount);
    }

    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    fallback() external payable {
        emit FallbackCalled(msg.sender, msg.value, msg.data);
    }
}