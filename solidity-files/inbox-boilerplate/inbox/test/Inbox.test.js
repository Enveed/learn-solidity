const ganache = require("ganache");
const assert = require("assert");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: ["Initial Message!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Contract", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Initial Message!");
  });

  it("can change the message", async () => {
    await inbox.methods
      .setMessage("Changed Message!")
      .send({ from: accounts[0] });

    const message = await inbox.methods.message().call();
    assert.equal(message, "Changed Message!");
  });
});
