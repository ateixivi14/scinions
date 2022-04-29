const ScinionsHelper = artifacts.require("scinionhelper");
const ScinionsFactory = artifacts.require("scinionfactory");

module.exports = async function(callback) {

	let accounts = await web3.eth.getAccounts();
    console.log(accounts);
    let scinionsHelperInstance = await ScinionsHelper.deployed();
    const result = await scinionsHelperInstance.getScinionsByOwner(accounts[4], {from: accounts[4]});
    console.log(result);
	callback();
}