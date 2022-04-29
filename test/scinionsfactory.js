const ScinionsFactory = artifacts.require("scinionfactory");
const scinionNames = ["Scinion 1", "Scinion 2"];
const utils = require("./utils");

contract("ScinionsFactory", (accounts) => {
    console.log(accounts);
    let alice = accounts[4];
    let bob = accounts[5];
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await ScinionsFactory.new();
    });

    it("should be deployed correctly", async () => {
        owner = await contractInstance.getOwner();
        owner2 = await contractInstance.owner.call();
        const address = contractInstance.address;
        console.log(owner);
        console.log(address);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, null);
        assert.notEqual(address, '');
        assert.notEqual(address, undefined);
        assert.equal(owner, owner2);
    })

    it("user should mint a scinion", async () => {
        const result = await contractInstance.claimScinion(scinionNames[0], {from: alice, value: web3.utils.toWei('0.1', 'ether')});
        const scinionId = result.logs[0].args.scinionId.toNumber();
        const newOwner = await contractInstance.ownerOf(scinionId);
        const aliceNumberScinions =  await contractInstance.balanceOfScinions(alice);
        assert.equal(1, aliceNumberScinions);
        assert.equal(newOwner, alice);
    })   


    context("with the single-step transfer scenario", async () => {
        it("should transfer a scinion", async () => {
            owner = await contractInstance.getOwner();
            const result = await contractInstance.claimScinion(scinionNames[0], {from: alice, value: web3.utils.toWei('0.1', 'ether')});
            const scinionId = result.logs[0].args.scinionId.toNumber();
            await contractInstance.transferFrom(alice, bob, scinionId, {from: alice});
            const newOwner = await contractInstance.ownerOf(scinionId);
            assert.equal(newOwner, bob);
        })
    })

    context("with the two-step transfer scenario", async () => {
        it("should approve and then transfer a scinion when the approved address calls transferFrom", async () => {
            owner = await contractInstance.getOwner();
            const result = await contractInstance.claimScinion(scinionNames[0], {from: alice, value: web3.utils.toWei('0.1', 'ether')});
            const scinionId = result.logs[0].args.scinionId.toNumber();
            await contractInstance.approve(bob, scinionId, {from: alice});
            await contractInstance.transferFrom(alice, bob, scinionId, {from: bob});
            const newOwner = await contractInstance.ownerOf(scinionId);
            assert.equal(newOwner,bob);
        })
        it("should approve and then transfer a scinion when the owner calls transferFrom", async () => {
            owner = await contractInstance.getOwner();
            const result = await contractInstance.claimScinion(scinionNames[0],  {from: alice, value: web3.utils.toWei('0.1', 'ether')});
            const scinionId = result.logs[0].args.scinionId.toNumber();
            await contractInstance.approve(bob, scinionId, {from: alice});
            await contractInstance.transferFrom(alice, bob, scinionId, {from: alice});
            const newOwner = await contractInstance.ownerOf(scinionId);
            assert.equal(newOwner,bob);
         })
    })

});