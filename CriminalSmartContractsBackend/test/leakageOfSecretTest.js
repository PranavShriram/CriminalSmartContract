const LeakageOfSecret = artifacts.require("LeakageOfSecret");

contract("LeakageOfSecret", async accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    let los;
    before(async() => {
        los = await LeakageOfSecret.deployed();
    });
    it("Checking correctness of init leakage", async() => {
        await los.init({ from: account_two });
        let newState = await los.getState();
        assert.equal(newState, "init")
    })


    it("Checking correctness of commit function", async() => {
        await los.commit(["72584595297979879290236398776422580049064736277791943756879194053517201811998", "29584810261502325556419760298041815168922946364618126900583498929176758334056", "71007885521171651021115318029997851648084268068594118912487926279400471986690", "48196899836486824162485684135012142497891011932901121749323889778626379089232"],
            4, 1, 20, 0, { from: account_two });
        let newState = await los.getState();
        assert.equal(newState, "commit")
    })
    it("Checking key reveal function", async() => {
        await los.revealSample([388110], { from: account_two });
        let newState = await los.getState();
        assert.equal(newState, "sampleRevealed")
    })

    it("Checking donate funciton", async() => {
        await los.donate({ from: account_one, value: "20" });
        let newState = await los.getState();

        assert.equal(newState, "readyForReveal")
    })

    it("Checking withdraw funciton", async() => {
        await los.withdraw(20, { from: account_one });
        let newState = await los.getState();

        assert.equal(newState, "sampleRevealed")
    })

    it("Donate amount again", async() => {
        await los.donate({ from: account_one, value: "20" });
        let newState = await los.getState();

        assert.equal(newState, "readyForReveal")
    })

    it("Checking function to reveal remaining keys", async() => {
        await los.revealRemaining([388110, 246098, 778859, 976285], { from: account_two });
        let newState = await los.getState();

        assert.equal(newState, "done")
    })
});