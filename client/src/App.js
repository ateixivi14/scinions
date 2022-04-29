import React from "react";
import { Navbar } from "./components/NavbarUI";
import "./App.css";
import WalletCard from "./components/WalletCard";
import ScinionsHelper from "./components/ScinionsHelper";
import MintScinion from "./components/MintScinion";


function App() {

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

      <div className="row justify-content-md-center mt-4 pt-4">
        <div className="col-md-4 text-center">
            <WalletCard/>
        </div>
        <div className="col-md-4 text-center">
           <ScinionsHelper/>
        </div>

        <div className="col-md-4 text-center">
           <MintScinion/>
        </div>
  
      </div>

     <div>
    </div>
    </div>
  );

}


export default App;