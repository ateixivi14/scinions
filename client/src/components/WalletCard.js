import React, { Component , useState } from "react";
import {ethers} from 'ethers'

import { NoWalletDetected } from "./NoWalletDetected";

const WalletCard = () => {

    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);


    const connectWalletHandler = () => {

        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts'})
            .then(result => {
                accountChangeHandler(result[0])
            })
        }

        else {
            return <NoWalletDetected />;
        }
        

    }

    const accountChangeHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);

    }

    const getUserBalance = (account) => {
        window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});

    }

    return (

		<div className='walletCard'>
			<button onClick={connectWalletHandler} className='button-59'>Connect Wallet</button>
			<div className='accountDisplay'>
				<h7>Address: {defaultAccount}</h7>
			</div>
			<div className='balanceDisplay'>
				<h7>Balance: {userBalance}</h7>
			</div>
			{errorMessage}
		</div>
	);
}

export default WalletCard;