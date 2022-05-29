// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//https://testnets.opensea.io/assets/rinkeby/0x74840D41f0517183670Accb0b07bc6512F029386/4
//https://testnets.opensea.io/collection/unidentified-contract-qterqufsdi

contract ScinionItem is Ownable, ERC1155 {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint8 private NUMBER_DIGITS_DNA = 16;
    Scinion[] internal scinions;

    struct Scinion {
    string name;
    string scinionType;
    uint16 level;
    uint8 energia;
    uint dna;
    uint habilities;
    }


    constructor() ERC1155('ipfs://QmPxBnRs1fpW1H5mhTJgZxmdybntmWe2RnkYytuEjm3eFq/{id}.json'){}


    function uri(uint256 tokenId) override public pure returns (string memory) {
        return (string(abi.encodePacked('ipfs://QmPxBnRs1fpW1H5mhTJgZxmdybntmWe2RnkYytuEjm3eFq/', Strings.toString(tokenId), '.json')));
    } 

    function setURI(string memory _newuri) public onlyOwner {
        _setURI(_newuri);
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

    function _createScinion() private returns(uint256 _tokenId) {
         _tokenIds.increment();
         uint256 tokenId =  _tokenIds.current();
        Scinion memory newScinion;
        newScinion.name = Strings.toString(tokenId);
        newScinion.scinionType = _setScinionType();
        newScinion.dna = _setDna();
        newScinion.energia = 10;
        newScinion.level = 1;
        newScinion.habilities = _setPerfectHabilities();
        scinions.push(newScinion);
        return tokenId;
    }

    /*
        ***************** MINTING FUNCTIONS **********************
    */

   /* function mintBatch(uint256[] memory ids, uint256[] memory amounts) public onlyOwner {   
        uint256[] memory _ids;
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 tokenId = _createScinion();
            _ids[i] = tokenId;
        }
        _mintBatch(msg.sender, _ids, amounts, '');
    }
    */

    function mintBatch(uint256[] memory ids, uint256[] memory amounts) public onlyOwner {   
        for (uint256 i = 0; i < ids.length; i++) {
             _createScinion();
        }
        _mintBatch(msg.sender, ids, amounts, '');
    }

    function mint() public onlyOwner {
        uint256 tokenId = _createScinion();
        _mint(msg.sender, tokenId, 1, '');
    }

    /*
        ***************** VIEW SCINIONS FUNCTIONS **********************
    */

    function getAllScinions() public view returns(Scinion[] memory) {
      return scinions;
    }
    
}
