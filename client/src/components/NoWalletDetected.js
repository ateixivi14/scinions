import React from "react";

import { Navbar } from "./NavbarUI";
import { HomeCard } from "./HomeCard";

export function NoWalletDetected() {
  return (
    <div className="container">
      <Navbar/>
      <div className="row justify-content-md-center">
        <div className="col-md-8 my-auto text-center">
          <h1 className="bd-title"><strong>Become Laboratory owner!</strong></h1>
          <h3>
            <small className="text-muted">Start collecting scinions and complete investigations.</small>
          </h3>
          <div className="alert alert-warning d-inline-flex flex-column" role="alert">
            No Ethereum wallet was detected. <br/>
            <div>Please install{" "} <a href="http://metamask.io" target="_blank" rel="noopener noreferrer" className="alert-link"> MetaMask</a>. </div>
          </div>
        </div>

      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>


      <div className="row justify-content-md-center mt-4 pt-4">
        <div className="col-md-4 text-center">
          <HomeCard cardTitle={"Connect your wallet"} fadeDuration={500}/>
        </div>
        <div className="col-md-4 text-center">
          <HomeCard cardTitle={"Get your scinions"} fadeDuration={1500}/>
        </div>
        <div className="col-md-4 text-center">
          <HomeCard cardTitle={"Complete an investigation"} fadeDuration={2500}/>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
}
