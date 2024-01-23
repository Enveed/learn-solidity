const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "asset mobile swap where burden march crop come word nominee happy sorry",
  "https://sepolia.infura.io/v3/09c908dbf3e3445697cdeee74d66c61e"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account: ", accounts[0]);

  const contract = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: ["New Contract!"],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to: ", contract.options.address);
  provider.engine.stop();
};

deploy();
