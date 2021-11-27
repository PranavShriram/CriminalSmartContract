const KeyTheft = artifacts.require("KeyTheft");

contract("KeyTheft", async accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    let keyT;
    before(async() => {
        keyT = await KeyTheft.deployed();
    });
    it("Checking correctness of init theft", async() => {
        await keyT.initTheft(20, 130018, 183450, { from: account_one, value: "20" });
        let newState = await keyT.getState();
        assert.equal(newState, "init")
    })

    it("Checking correctness of claim secret key", async() => {
        let newState = await keyT.getState();
        assert.equal(newState, "init")
        await keyT.claimSecretKey(259, 64, 23888, 15, { from: account_two, gas: 3000000 });
        newState = await keyT.getState();
        assert.equal(newState, "done")
    })
});