// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Shet is ERC20, ERC20Capped, Ownable {
    constructor() ERC20("Shet", "SHET") ERC20Capped(1_000_000_000 * 10 ** decimals()) {
        _mint(msg.sender, 1_000_000_000 * 10 ** decimals());
    }

    function _mint(address account, uint256 amount) internal override(ERC20, ERC20Capped) {
        super._mint(account, amount);
    }
}