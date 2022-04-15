
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';


contract ScinionFactoryTest1 is Ownable, ERC721 {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string private _baseURIextended;

  uint minPrice = 0.001 ether;

  using SafeMath for uint256;

  event NewScinion(uint scinionId, string name);

  event MoneyTransfer(uint money, address from);

  address payable gameOwner;

  function getOwner() public view returns (address) {
        return gameOwner;
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
        _baseURIextended = "";
    }


  Scinion[] internal scinions;

  mapping (uint => address) internal scinionToOwner;
  mapping (address => uint) internal ownerScinionCount;

  modifier onlyOwnerOf(uint _scinionId) {
    require(msg.sender == scinionToOwner[_scinionId]);
    _;
  }

  function rand(uint8 _min, uint8 _max, string memory _name) private pure returns (uint8){
    return uint8(uint(keccak256(abi.encodePacked(_name)))%(_min+_max)-_min);
  }

  function setMinPrice(uint _fee) external onlyOwner {
    minPrice = _fee;
  }

  function setBaseURI(string memory baseURI_) external onlyOwner() {
     _baseURIextended = baseURI_;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseURIextended;
  }

  function createScinion(string memory _name, string memory _scinionType, uint _dna, uint _habilities) external onlyOwner {
    _tokenIds.increment();
    uint256 id = _tokenIds.current();
    Scinion memory newScinion;
    newScinion.name = _name;
    newScinion.scinionType = _scinionType;
    newScinion.dna = _dna;
    newScinion.energia = 10;
    newScinion.level = 1;
    newScinion.habilities = _habilities;
    scinions.push(newScinion);
    emit NewScinion(id, _name);
  }

  function _setPerfectHabilities() pure private returns (uint habilities) {
    return 100100100100100100100100100100;
  }


  function _transferScinion(address _from, address _to, uint256 _tokenId) private {
    ownerScinionCount[_to] = ownerScinionCount[_to].add(1);
    ownerScinionCount[_from] = ownerScinionCount[_from].sub(1);
    scinionToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferScinion(address _from, address _to, uint256 _tokenId) external payable onlyOwner {
      require(msg.value >= minPrice, "Not enough ETH sent; check price!"); 
      _transferScinion(_from, _to, _tokenId);
      transferFrom(_from, _to, _tokenId);
   } 

  function claimScinion(uint256 _tokenId) external payable {
    emit MoneyTransfer(msg.value, msg.sender);
    require(msg.value >= minPrice, "Not enough ETH sent; check price!"); 
    ownerScinionCount[msg.sender] = ownerScinionCount[msg.sender].add(1);
    scinionToOwner[_tokenId] = msg.sender;
    emit Transfer(msg.sender, gameOwner, minPrice);
    _safeMint(msg.sender, _tokenId);
  }

  function balanceOfScinions(address owner) external view returns (uint balance) {
    return ownerScinionCount[owner];
  }


 /* function kill() public onlyOwner {
      selfdestruct(owner());
  } */

}
