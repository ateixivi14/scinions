import React, {useState} from 'react'
import {ethers} from 'ethers'

import ScinionHelperContract from "./../contracts/ScinionHelper.json";
const contractAddress = "0xbDb5568F71676eba993341A353246D6334d4aF94";


const MintScinion = () => {

    const [tokenId, setTokenId] = useState(null);

    const mintScinionHandler = async () => {
        
        try {
            const { ethereum } = window;
    
            if (ethereum) {
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const scinionHelperInstance = new ethers.Contract(contractAddress, ScinionHelperContract.abi, signer);
    
              console.log("Initialize request");
              let tokenId = await scinionHelperInstance.claimScinion("robert");

              setTokenId(tokenId);
    
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