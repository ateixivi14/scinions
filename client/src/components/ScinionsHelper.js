import React, {useState} from 'react'
import {ethers} from 'ethers'

import ScinionHelperContract from "./../contracts/ScinionFactory.json";
const contractAddress = "0x9D4679f706C8A047A46C9235a6a0BE562bFA47D6";

const ScinionsHelper = () => {

	  const [name, setName] = useState(null);
    const [energia, setEnergia] = useState(null);
    const [level, setLevel] = useState(null);


    const getScinionDataHandler = async () => {
        
        try {
            const { ethereum } = window;
    
            if (ethereum) {
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const scinionHelperInstance = new ethers.Contract(contractAddress, ScinionHelperContract.abi, signer);
    
              console.log("Initialize request");
              let scinionData = await scinionHelperInstance.getAllScinions();

              setName(scinionData[0].name);
              setLevel(scinionData[0].level);
              setEnergia(scinionData[0].energy);
    
              console.log(scinionData);
    
            } else {
              console.log("Ethereum object does not exist");
            }
    
          } catch (err) {
            console.log(err);
          }
        } 

        return (
            <div>
            <button onClick={getScinionDataHandler} className='button-59'>
              See my scinions
            </button>

            <div>
                {energia ? <h7> Energy: {energia} </h7> : ""}
                {name ? <h7> Name: {name} </h7> : ""}
                {level ? <h7> Level: {level} </h7> : ""}
            </div>

            </div>
         

        )
    
}

export default ScinionsHelper;