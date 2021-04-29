require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts and their balance", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    const balance = await ethers.provider.getBalance(account.address);
    console.log(`${account.address} (${ethers.utils.formatEther(balance)} ETH)`);
  }
});

task("fund-link", "Funds a contract with LINK")
  .addParam("contract", "The address of the contract that requires LINK")
  .setAction(async taskArgs => {
    const contractAddr = taskArgs.contract;
    const networkId = network.name;

    console.log(`Funding contract ${contractAddr} on network ${networkId}`);

    const LINK_TOKEN_ABI = [
      {
        "inputs": [
          {
            "internalType": "address", 
            "name": "recipient", 
            "type": "address" 
          }, 
          {
            "internalType": "uint256", 
            "name": "amount", 
            "type": "uint256" 
          }
        ], 
        "name": "transfer", 
        "outputs": [
          { 
            "internalType": "bool", 
            "name": "", 
            "type": "bool" 
          }
        ], 
        "stateMutability": "nonpayable", 
        "type": "function" 
      }
    ]

    switch(networkId) {
      case 'mainnet':
        linkContractAddr = "0x514910771af9ca656af840dff83e8264ecf986ca"
        break
      case 'kovan':
        linkContractAddr = "0xa36085F69e2889c224210F603D836748e7dC0088"
        break
      case 'rinkeby':
        linkContractAddr = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
        break
      case 'goerli':
        linkContractAddr = "0x326c977e6efc84e512bb9c30f76e30c160ed06fb"
        break
      default: // default to matic testnet
        linkContractAddr = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
    }

    const amount = web3.utils.toHex(1e18);
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];

    const linkTokenContract = new ethers.Contract(linkContractAddr, LINK_TOKEN_ABI, signer);
    let result = await linkTokenContract.connect(signer).transfer(contractAddr, amount)
      .then(tx => {
        console.log(`Contract ${contractAddr} funded with 1 LINK.`);
        console.log(`Transaction hash: ${tx.hash}`);
      })
  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",

  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/35fa8c9831434eb699bf01b4b792b660",
      chainId: 3,
      accounts: {
        mnemonic: "hour burst all egg scatter social banana romance snack artwork library now",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 3
      }
    },

    rinkeby: {
      url: "https://rinkeby.infura.io/v3/35fa8c9831434eb699bf01b4b792b660",
      chainId: 4,
      accounts: {
        mnemonic: "hour burst all egg scatter social banana romance snack artwork library now",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 3
      }
    },

    goerli: {
      url: "https://goerli.infura.io/v3/35fa8c9831434eb699bf01b4b792b660",
      chainId: 5,
      accounts: {
        mnemonic: "hour burst all egg scatter social banana romance snack artwork library now",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 3
      }
    },

    kovan: {
      url: "https://kovan.infura.io/v3/35fa8c9831434eb699bf01b4b792b660",
      chainId: 42,
      accounts: {
        mnemonic: "hour burst all egg scatter social banana romance snack artwork library now",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 3
      }
    },

    matic: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      accounts: {
        mnemonic: "hour burst all egg scatter social banana romance snack artwork library now",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 3
      }
    }
  },

  paths: {
    root: "./",
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  solidity: "0.6.12",
};

