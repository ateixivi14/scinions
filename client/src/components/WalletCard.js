import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { connectToMetamask, updateAccount } from './../redux/metamask/actions'
import { useEffect } from 'react';

const WalletCard = () => {


    const dispatch = useDispatch();
    const metamask = useSelector((state) => state.metamask);

    console.table(metamask);

    useEffect(() => {

        dispatch(updateAccount())
        
    }, [dispatch]);
  
    const account =  metamask.account;
    const balance =  metamask.balance;


    const connectWalletHandler = () => {
        dispatch(connectToMetamask())
    }

    return (

		<div className='walletCard'>
			<button onClick={connectWalletHandler} className='button-59'>Connect Wallet</button>
			<div className='accountDisplay'>
				<h7>Address: {account}</h7>
			</div>
			<div className='balanceDisplay'>
				<h7>Balance: {balance}</h7>
			</div>
		</div>
	);
}

export default WalletCard;