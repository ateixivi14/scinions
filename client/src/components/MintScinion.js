import React, {useState} from 'react'
import {ethers} from 'ethers'

import scinionFactoryContract from "./../contracts/ScinionFactory.json";
const contractAddress = "0x9D4679f706C8A047A46C9235a6a0BE562bFA47D6";


const MintScinion = () => {

    const [tokenId, setTokenId] = useState(null);

    const mintScinionHandler = async () => {
        
        try {
            const { ethereum } = window;
    
            if (ethereum) {
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const scinionFactoryInstance = new ethers.Contract(contractAddress, scinionFactoryContract.abi, signer);
    
              console.log("Initialize request");
              let tokenId = await scinionFactoryInstance.mintScinion("robert");
              console.log(tokenId);

             // setTokenId(tokenId);
    
              console.log(tokenId);
    
            } else {
              console.log("Ethereum object does not exist");
            }
    
          } catch (err) {
            console.log(err);
          }
        } 



        return (

            <div>
            <button onClick={mintScinionHandler} className='button-59'>
              Mint a scinion
            </button>

            <div>
                {tokenId ? <h7> TokenId: {tokenId} </h7> : ""}

            </div>

            </div>
         

        )
}

export default MintScinion;