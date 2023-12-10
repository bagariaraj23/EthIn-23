// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "erc721a/contracts/ERC721A.sol";

contract NFTmint is ERC721A {

    uint256 public constant USER_LIMIT = 1;
    uint256 public constant MAX_SUPPLY = 10_000;

    constructor() ERC721A("FreeMintToken", "FMT") {}

    function mint(uint256 quantity) external {
        require(_totalMinted() + quantity <= MAX_SUPPLY, "Not more supply left");
        require(_numberMinted(msg.sender) + quantity <= USER_LIMIT, "User limit reached");
        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://QmWRAh1VFCbXX5TjQhVJBLopqpB7MdqSGK7x138ncuDPuQ/";
    }
}