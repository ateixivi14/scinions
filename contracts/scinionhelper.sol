pragma solidity ^0.8.0;

import "./scinionfactory.sol";


contract ScinionHelper is ScinionFactory {

     uint levelUpFee = 0.001 ether;


    function setLevelUpFee(uint _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    modifier aboveLevel(uint _level, uint _scinionId) {
        require(scinions[_scinionId].level >= _level);
         _;
    }
      
    
    function changeName(uint _scinionId, string calldata _newName) external payable aboveLevel(2, _scinionId) onlyOwnerOf(_scinionId) {
        require(msg.value == levelUpFee);
        scinions[_scinionId].name = _newName;
    }

    function changeDna(uint _scinionId, uint _newDna) external payable aboveLevel(20, _scinionId) onlyOwnerOf(_scinionId) {
        require(msg.value == levelUpFee);
        scinions[_scinionId].dna = _newDna;
    }

    function getScinionsByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerScinionCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < scinions.length; i++) {
            if (scinionToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }


    function completarInvestigacion(uint _scinionId) public onlyOwnerOf(_scinionId) {
        Scinion storage scinionSelected = scinions[_scinionId];
        scinionSelected.level = scinionSelected.level+1;
    }


    function dormir(uint _scinionId) public onlyOwnerOf(_scinionId) {
        Scinion storage scinionSelected = scinions[_scinionId];
        scinionSelected.energia = 10;
    }


}