
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';


contract ScinionFactory is Ownable, ERC721 {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string private _baseURIextended;
  mapping (uint256 => string) private _tokenURIs;

  uint minPrice = 0.01 ether;

  using SafeMath for uint256;

  event NewScinion(uint scinionId, string name);

  address payable gameOwner;

  function getOwner() public view returns (address) {
        return gameOwner;
  }

  modifier onlyOwnerOf(uint _scinionId) {
    require(msg.sender == ownerOf(_scinionId));
    _;
  }

  struct Scinion {
    string name;
    string scinionType;
    uint16 level;
    uint8 energia;
    uint dna;
    uint habilities;
  }

   constructor() ERC721("ScinionNFT", "SCTK") {
        gameOwner = payable(msg.sender);
        _baseURIextended = "https://ipfs.io/ipfs/";
    }


  Scinion[] public scinions;

  function rand(uint8 _min, uint8 _max, string memory _name) private pure returns (uint8){
    return uint8(uint(keccak256(abi.encodePacked(_name)))%(_min+_max)-_min);
  }

  function setMinPrice(uint _fee) external onlyOwner() {
    minPrice = _fee;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseURIextended;
  }

   function setBaseURI(string memory baseURI_) external onlyOwner() {
     _baseURIextended = baseURI_;
   }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
      require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
      _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

      string memory _tokenURI = _tokenURIs[tokenId];
      string memory base = _baseURI();
      
      // If there is no base URI, return the token URI.
      if (bytes(base).length == 0) {
          return _tokenURI;
      }
      // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
      if (bytes(_tokenURI).length > 0) {
          return string(abi.encodePacked(base, _tokenURI));
      }
      // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
      return string(abi.encodePacked(base, tokenId));
    }

  function _createScinion(string memory _name) private returns(uint tokenId) {
     _tokenIds.increment();
    uint256 id = _tokenIds.current();
    Scinion memory newScinion;
    newScinion.name = _name;
    newScinion.scinionType = _setScinionType();
    newScinion.dna = _setDna();
    newScinion.energia = 10;
    newScinion.level = 1;
    newScinion.habilities = _setPerfectHabilities();
    scinions.push(newScinion);
    emit NewScinion(id, _name);
    return id;
  }

  function _setPerfectHabilities() pure private returns (uint habilities) {
    return 100100100100100100100100100100;
  }

  function _setScinionType() pure private returns (string memory scinionType) {
    return "Scinion";
  }

  function _setDna() pure private returns (uint dna) {
    return 101030401;
  }

  function mintScinion(string memory _name, string memory tokenURI_) external payable returns(uint id) {
    uint tokenId = _createScinion(_name);
    //require(msg.value >= minPrice, "Not enough ETH sent; check price!"); 
    emit Transfer(address(0), msg.sender, tokenId);
   // payable(owner()).transfer(msg.value);
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, tokenURI_);
    tokenURI(tokenId);
    return tokenId;
  }

}
