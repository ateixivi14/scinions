

const ScinionsFactory = artifacts.require("scinionfactory");
const ScinionsHelper = artifacts.require("scinionhelper");

module.exports = async function(callback) {

	let accounts = await web3.eth.getAccounts();
    console.log(accounts);
    let scinionsFactoryInstance = await ScinionsFactory.deployed();
    let scinionsHelperInstance = await ScinionsHelper.deployed();
    const result = await scinionsFactoryInstance.claimScinion("Alba", {from: accounts[4], value: web3.utils.toWei('0.1', 'ether')});
    console.log(result.logs[0].args.scinionId.toNumber());
    const names = await scinionsHelperInstance.getScinionsByOwner(accounts[4], {from: accounts[4]});
    console.log(names);

	callback();
}