const ScinionsHelper = artifacts.require("scinionhelper");
const ScinionsFactory = artifacts.require("scinionfactory");

module.exports = async function(callback) {

	let accounts = await web3.eth.getAccounts();
    console.log(accounts);
    let scinionsHelperInstance = await ScinionsHelper.deployed();
    let ScinionsFactoryInstance = await ScinionsFactory.deployed();
    const result = await scinionsHelperInstance.getScinionsByOwner(accounts[4], {from: accounts[4]});
    const scinions = await ScinionsFactoryInstance.seeScinions({from: accounts[4]});
    const owner = await ScinionsFactoryInstance.seeScinionsWithOwner(1 ,{from: accounts[4]});
    console.log(scinions);
    console.log(owner);
	callback();
}