import React from "react";

import { HomeCard } from "./HomeCard";


export function ConnectWallet({ connectWallet, networkError, dismiss, progress }) {
  return (
    <div className="container">


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
          <HomeCard cardTitle={"Get your cards"} fadeDuration={1500}/>
        </div>
        <div className="col-md-4 text-center">
          <HomeCard cardTitle={"Challenge your friends"} fadeDuration={2500}/>
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