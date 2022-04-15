pragma solidity ^0.8.0;

import "./scinionfactory.sol";


contract ScinionHelper is ScinionFactoryTest1 {

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

    function getScinionsByOwner(address _owner) private view returns(Scinion[] memory) {
        Scinion[] memory scinionsByOwner;
        for (uint i = 0; i < scinions.length; i++) {
            if (scinionToOwner[i] == _owner) {
                scinionsByOwner[i]= scinions[i];
            }
        }    
        /*
        uint[] memory result = new uint[](ownerScinionCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < scinions.length; i++) {
            if (scinionToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;


        */
        return scinionsByOwner;
    }


    function completarInvestigacion(uint _scinionId) public onlyOwnerOf(_scinionId) {
        Scinion storage scinionSelected = scinions[_scinionId];
        scinionSelected.level = scinionSelected.level+1;
    }


    function dormir(uint _scinionId) public onlyOwnerOf(_scinionId) {
        Scinion storage scinionSelected = scinions[_scinionId];
        scinionSelected.energia = 10;
    }

    function getOneScinionData() external pure returns(string memory name, uint16 level, uint8 energia){
        Scinion memory newScinion;
        newScinion.name = "Alba";
        newScinion.scinionType = "Buenas manos";
        newScinion.dna = 1234568;
        newScinion.energia = 10;
        newScinion.level = 1;
        newScinion.habilities = 100100100100100100100;
        return (newScinion.name, newScinion.level, newScinion.energia);

    }

}