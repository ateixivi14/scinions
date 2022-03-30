import React, { Component } from "react";
import { NoWalletDetected } from "./components/NoWalletDetected";
import ScinionHelperContract from "./contracts/ScinionHelper.json";
import ScinionFactoryContract from "./contracts/ScinionFactory.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { scinionName: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      console.log(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ScinionFactoryContract.networks[networkId];

      console.log(deployedNetwork);

      const scinions = new web3.eth.Contract(
        ScinionFactoryContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: scinions }, this.createScinion);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    /*
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    } */

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: </div>
      </div>
    );
  }
}

export default App;
