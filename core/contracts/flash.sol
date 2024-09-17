// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    mapping(address => uint256) public points;
    address public owner;

    event EtherReceived(address sender, uint256 amount);
    event FallbackCalled(address sender, uint256 amount, bytes data);
    event PointAwarded(address sender, uint256 points);
    event Withdrawal(address to, uint256 amount);

    constructor() {
        owner = msg.sender;
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

    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    fallback() external payable {
        emit FallbackCalled(msg.sender, msg.value, msg.data);
    }
}