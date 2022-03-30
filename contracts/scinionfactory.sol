
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract ScinionFactory is Ownable, ERC721 {

  using SafeMath for uint256;

  event NewScinion(uint scinionId, string name);

  uint cooldownTime = 1 days;
  address gameOwner;


  struct Scinion {
    string name;
    uint dna;
    uint16 level;
    uint8 energia;
    uint habilities;
    /*
    uint8 capacidadDeAprendizaje;
    uint8 destreza;
    uint8 etica;
    uint8 suerte;
    uint8 controlDeEmociones;
    uint8 planificacion;
    uint8 limpieza;
    uint8 trabajoEnEquipo;
    uint8 discrecion;
    uint8 lealtad;*/
  }

   constructor() ERC721("ScinionNFT", "SCTK") {
        gameOwner = msg.sender;
    }


  Scinion[] scinions;

  mapping (uint => address) public scinionToOwner;
  mapping (address => uint) ownerScinionCount;

  modifier onlyOwnerOf(uint _zombieId) {
    require(msg.sender == scinionToOwner[_zombieId]);
    _;
  }


  function createScinion(string memory _name, uint _dna, uint _habilities) external {
    require(msg.sender == gameOwner);
    uint id = scinions.length;
    scinions.push(Scinion(_name, _dna, 1, 10, _habilities));
    scinionToOwner[id] = msg.sender;
    ownerScinionCount[msg.sender] = ownerScinionCount[msg.sender].add(1);
    emit NewScinion(id, _name);
  }


  function _transferScinion(address _from, address _to, uint256 _tokenId) private {
    ownerScinionCount[_to] = ownerScinionCount[_to].add(1);
    ownerScinionCount[msg.sender] = ownerScinionCount[msg.sender].sub(1);
    scinionToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferScinion(address _from, address _to, uint256 _tokenId) external payable onlyOwner{
      _transferScinion(_from, _to, _tokenId);
      transferFrom(_from, _to, _tokenId);
   } 

    function mintScinion(address _to, uint256 _tokenId) external {
         _safeMint(_to, _tokenId);
    }

  /*function kill() public onlyOwner {
      selfdestruct(owner());
  }*/

}


/*
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Scinion is ERC721 {


    constructor() ERC721("ScinionNFT", "SCTK") {
        gameOwner = msg.sender;
    }

    struct scinion {
        string name;
        uint level;
        uint capacidadDeAprendizaje;
        uint destreza;
        uint etica;
        uint suerte;
        uint controlDeEmociones;
        uint planificacion;
        uint energia;

    }

    scinion[] scinions;
    address public gameOwner;


     modifier onlyOwnerOf(uint _scinionId) {
        require(ownerOf(_scinionId) == msg.sender, "Must be owner of monster to battle");
        _;
    }

    function createNewScinion(string memory _name, address _to) public {
        require(msg.sender == gameOwner, "Only game owner can create new monsters");
        uint id = scinions.length;
        scinions.push(scinion(_name, 1, 75,	67,	74,	64,	44,	67, 10));
        _safeMint(_to, id);
    }



    function completarInvestigacion(uint _scinionId) public onlyOwnerOf(_scinionId) {
        
        scinion storage scinionSelected = scinions[_scinionId];
        scinionSelected.level = scinionSelected.level+1;

    }


    function dormir(uint _scinionId) public onlyOwnerOf(_scinionId) {
        
        scinion storage scinionSelected = scinions[_scinionId];
        scinionSelected.energia = 10;

    }

    
}

*/