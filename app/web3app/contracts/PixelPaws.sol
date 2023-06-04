// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PixelPaws is ERC721, ERC721URIStorage, Ownable {
    struct Mint {
        string mintId;
        address owner;
    }

    string jsonContentId;
    uint256 public mintPrice;
    uint256 public currSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;

    mapping(string => uint8) existingMints;
    mapping(string => Mint) public mints;
    mapping(address => string[]) public mintsByOwner;

    constructor() ERC721("PixelPaws", "PPW") {
        jsonContentId = 'QmT2cXFkGg5r5KiibyLJBneJN2hDLhezggMhZfB8pzFXTT';
        mintPrice = 0.05 ether;
        currSupply = 1;
        maxSupply = 50;
        maxPerWallet = 5;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = currSupply;
        currSupply++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingMints[uri] == 1;
    }

    function mint(uint256 quantity_) public payable {
        require (msg.value == mintPrice * quantity_, 'Wrong mint value');
        require(currSupply + quantity_ <= maxSupply, 'Sold out!');
        require(mintsByOwner[msg.sender].length + quantity_ <= maxPerWallet, 'Exceed max per wallet');

        for(uint256 i = 0; i < quantity_; i++){
            uint256 newItemId = currSupply;
            string memory metadataURI = string(abi.encodePacked(jsonContentId , '/' , Strings.toString(newItemId) , '.json')); //mintId

            require(existingMints[metadataURI] != 1, 'NFT already minted!');

            currSupply++;
            _mint(msg.sender, newItemId);
            _setTokenURI(newItemId, metadataURI);
            
            //Boolean for mints[]
            existingMints[metadataURI] = 1;
            // Store the mint in the mints mapping
            mints[metadataURI] = Mint(metadataURI, msg.sender);
            
            // Store the mint ID in the mintsByOwner mapping
            mintsByOwner[msg.sender].push(metadataURI);
        }
   }

    function getOwnedMints(address owner) external view returns (string[] memory) {
        return mintsByOwner[owner];
    }
}