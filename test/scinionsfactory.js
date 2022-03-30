const ScinionsFactory = artifacts.require("scinionfactory");
const scinionNames = ["Scinion 1", "Scinion 2"];
const utils = require("./utils");

contract("ScinionsFactory", (accounts) => {

    let alice = accounts[1];
    let bob = accounts[2];
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await ScinionsFactory.new();
    });

    it("should be able to create a new scinion if address is the owner", async () => {
        owner = await contractInstance.owner.call();
        const result = await contractInstance.createScinion(scinionNames[0], 11111, 100100,  {from: owner});
        //TODO: replace with expect
        assert.equal(result.receipt.status, true);
        assert.equal(result.logs[0].args.name,scinionNames[0]);
    })

    it("should not be able to create a new scinion if address is not the owner", async () => {
        await utils.shouldThrow(contractInstance.createScinion(scinionNames[0], 11111, 100100,  {from: alice}));
        //TODO: replace with expect
    })

});