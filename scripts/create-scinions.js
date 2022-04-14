

const ScinionsFactory = artifacts.require("scinionfactory");
const ScinionsHelper = artifacts.require("scinionhelper");

module.exports = async function(callback) {

	let accounts = await web3.eth.getAccounts();
    console.log(accounts);
    let scinionsFactoryInstance = await ScinionsFactory.deployed();
    const result = await scinionsFactoryInstance.createScinion("Alba", "Buenas manos", 12345678, {from: accounts[0]});
    console.log(result.logs[0].args.scinionId.toNumber());
    scinionsFactoryInstance.mintScinion(result.logs[0].args.scinionId.toNumber(), {from: accounts[4]});
    const owner = await scinionsFactoryInstance.seeScinionsWithOwner(result.logs[0].args.scinionId.toNumber() ,{from: accounts[4]});
    const scinions = await scinionsFactoryInstance.seeScinionsWithOwner(result.logs[0].args.scinionId.toNumber(), {from: accounts[4]});
    console.log(owner);
    console.log(scinions);
	callback();
}