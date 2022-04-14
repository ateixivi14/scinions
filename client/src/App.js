import React, { Component , useState } from "react";
import { NoWalletDetected } from "./components/NoWalletDetected";
import { Navbar } from "./components/NavbarUI";
import ScinionHelperContract from "./contracts/ScinionHelper.json";
import { useEffect } from 'react';
import Web3 from 'web3'
import "./App.css";
import { init } from "./components/Web3Client";

let selectedAccount;

function App() {
  const [account, setAccount] = useState(); 
 
  useEffect(() => {
     init();

  }, []);

  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }

  const scinonsHandler =  async () => { 
    const networkId = '5777'
    const networkData = ScinionHelperContract.networks[networkId]
    if(networkData) {
      const Contract = require('web3-eth-contract');
      const address = networkData.address
      const contract = new Contract(ScinionHelperContract.abi , address)
      console.log(contract);
  
      // Función 'totalSupply' del Smart Contract
      const scinions = await contract.methods.getScinionsByOwner("0x54CE379c44ECB6796a4d1718D9131F6Ae858bCED");
      console.log(scinions);
      contract.methods.methods.getScinionsByOwner("0x54CE379c44ECB6796a4d1718D9131F6Ae858bCED").send({from: '0x54CE379c44ECB6796a4d1718D9131F6Ae858bCED'})
        .on('receipt', function(){
        console.log("holi")
      });
  
    } else {
      window.alert('¡Smart Contract no desplegado en la red!')
    }
  }

  const seeMyScinions = () => {
    return (
      <button onClick={scinonsHandler} className='button-59'>
        See my scinions
      </button>
    )
  }

  return (
    <div className="container">
    <Navbar/>
    <div className="row justify-content-md-center">
      <div className="col-md-8 my-auto text-center">
        <h1 className="bd-title"><strong>Become Laboratory owner!</strong></h1>
        <h3>
          <small className="text-muted">Start collecting scinions and complete investigations.</small>
        </h3>
      

      </div>

    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className="row justify-content-md-center">
      <div className="col-md-8 my-auto text-center">
      <div>
          {seeMyScinions()}
       </div>
       </div>

    </div>


     <div>
     <p>Your account is: {account}</p> 
    </div>
    </div>
  );

}


export default App;