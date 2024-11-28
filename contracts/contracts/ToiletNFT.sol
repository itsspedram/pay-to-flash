// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ToiletNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("ToiletNFT", "TNFT") {}

    function mint(address to, uint256 tokenId) external onlyOwner {
        _safeMint(to, tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://api.example.com/metadata/toilet/";
    }
} 