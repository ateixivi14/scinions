
import Web3 from "web3";
import {ethers} from 'ethers';

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connectToMetamask = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum && window.ethereum.isMetaMask) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const balance = ethers.utils.formatEther(await window.ethereum.request({
          method: 'eth_getBalance', 
          params: [accounts[0], 'latest']
        }));

          dispatch(
            connectSuccess({
              account: accounts[0],
              balance: balance,
              web3: web3,
            })
          );

          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
    
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = () => {
  return async (dispatch) => {

    window.ethereum.on("accountsChanged", (accounts) => {
      dispatch(updateAccountRequest(accounts[0] ));
    });
  };
};