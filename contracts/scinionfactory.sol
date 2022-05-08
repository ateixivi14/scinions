
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
  uint8 private NUMBER_DIGITS_DNA = 16;
  Scinion[] internal scinions;

  uint minPrice = 0.01 ether;

  using SafeMath for uint256;

  event NewScinion(uint scinionId, string name, string uri);

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
        _baseURIextended = "ipfs://QmXEqEB9FCEHc34ZsnyCAr9KDfxqhvLqpsZU3Y4s4sm1pg";
    }


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

  function _createScinion(string memory _name) private view returns(Scinion memory) {
    Scinion memory newScinion;
    newScinion.name = _name;
    newScinion.scinionType = _setScinionType();
    newScinion.dna = _setDna();
    newScinion.energia = 10;
    newScinion.level = 1;
    newScinion.habilities = _setPerfectHabilities();
    return newScinion;
  }

  function _createRandomNum(uint256 _mod) internal view returns (uint256) {
    uint256 randomNum = uint256(
      keccak256(abi.encodePacked(block.timestamp, msg.sender))
    );
    return randomNum % _mod;
  }

  function _setPerfectHabilities() pure private returns (uint habilities) {
    return 100100100100100100100100100100;
  }

  function _setScinionType() pure private returns (string memory scinionType) {
    return "Scinion";
  }

  function _setDna() view private returns (uint256 dna) {
     return _createRandomNum(10**NUMBER_DIGITS_DNA);
    
  }

  function mintScinion(string memory _name) external payable returns(uint id) {
     _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    Scinion memory newScinion = _createScinion(_name);
    //require(msg.value >= minPrice, "Not enough ETH sent; check price!"); 
   //  payable(owner()).transfer(msg.value);
    _safeMint(msg.sender, tokenId);
    tokenURI(tokenId);
    scinions.push(newScinion);
    emit NewScinion(id, _name, tokenURI(tokenId));
    return tokenId;
  }

   
  function getScinionsByOwner() public view returns(Scinion[] memory) {
      Scinion[] memory result = new Scinion[](balanceOf(msg.sender));
      uint counter = 0;
      for (uint i = 0; i < scinions.length; i++) {
          if (ownerOf(i)==msg.sender) {
              result[counter]=scinions[i];
              counter++;
          }
      }    
      return result;
  }

  function getBalanceOfOwner() public view returns(uint numberOfScinions){
      return balanceOf(msg.sender);
  }


  function getAllScinions() public view returns(Scinion[] memory) {
      return scinions;
  }
   


}
