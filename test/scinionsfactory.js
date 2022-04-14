const ScinionsFactory = artifacts.require("scinionfactory");
const scinionNames = ["Scinion 1", "Scinion 2"];
const utils = require("./utils");

contract("ScinionsFactory", (accounts) => {
    console.log(accounts);
    let dna = 100000;
    let scinionType =  "Ratón de biblioteca"
    let alice = accounts[4];
    let bob = accounts[5];
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await ScinionsFactory.deployed();
    });

    it("should be deployed correctly", async () => {
        owner = await contractInstance.getOwner();
        owner2 = await contractInstance.owner.call();
        const address = contractInstance.address;
        console.log(address);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, null);
        assert.notEqual(address, '');
        assert.notEqual(address, undefined);
        assert.equal(owner, owner2 );
    })

    it("should be able to create a new scinion if address is the owner", async () => {
        owner = await contractInstance.owner.call();
        const result = await contractInstance.createScinion(scinionNames[0], scinionType, dna,  {from: owner});
        //TODO: replace with expect
        console.log(result);
        assert.equal(result.receipt.status, true);
        assert.equal(result.logs[0].args.name, scinionNames[0]);
    })

    it("should not be able to create a new scinion if address is not the owner", async () => {
        await utils.shouldThrow(contractInstance.createScinion(scinionNames[0], scinionType, dna,  {from: alice}));
        //TODO: replace with expect
    })

    it("should mint a scinion", async () => {
        owner = await contractInstance.getOwner();
        const result = await contractInstance.createScinion(scinionNames[0], scinionType, dna,  {from: owner});
        const scinionId = result.logs[0].args.scinionId.toNumber();
        await contractInstance.claimScinion(scinionId, {from: alice});
        const newOwner = await contractInstance.ownerOf(scinionId);
        const aliceNumberScinions =  await contractInstance.balanceOfScinions(alice);
        assert.equal(1, aliceNumberScinions);
        assert.equal(newOwner, alice);
    })   


    context("with the single-step transfer scenario", async () => {
        it("should transfer a scinion", async () => {
            owner = await contractInstance.getOwner();
            const result = await contractInstance.createScinion(scinionNames[0], scinionType, dna,  {from: owner});
            const scinionId = result.logs[0].args.scinionId.toNumber();
            await contractInstance.claimScinion(scinionId, {from: alice});
            await contractInstance.transferFrom(alice, bob, scinionId, {from: alice});
            const newOwner = await contractInstance.ownerOf(scinionId);
            assert.equal(newOwner, bob);
        })
    })

    context("with the two-step transfer scenario", async () => {
        it("should approve and then transfer a scinion when the approved address calls transferFrom", async () => {
            owner = await contractInstance.getOwner();
            const result = await contractInstance.createScinion(scinionNames[0], scinionType, dna,  {from: owner});
            const scinionId = result.logs[0].args.scinionId.toNumber();
            await contractInstance.claimScinion(scinionId, {from: alice});
            await contractInstance.approve(bob, scinionId, {from: alice});
            await contractInstance.transferFrom(alice, bob, scinionId, {from: bob});
            const newOwner = await contractInstance.ownerOf(scinionId);
            assert.equal(newOwner,bob);
        })
        it("should approve and then transfer a scinion when the owner calls transferFrom", async () => {
            owner = await contractInstance.getOwner();
            const result = await contractInstance.createScinion(scinionNames[0],scinionType, dna,   {from: owner});
            const scinionId = result.logs[0].args.scinionId.toNumber();
            await contractInstance.claimScinion(scinionId, {from: alice});
            await contractInstance.approve(bob, scinionId, {from: alice});
            await contractInstance.transferFrom(alice, bob, scinionId, {from: alice});
            const newOwner = await contractInstance.ownerOf(scinionId);
            assert.equal(newOwner,bob);
         })
    })

});