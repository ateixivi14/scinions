const path = require("path");
require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = process.env.MNEMONIC
const clientURL = process.env.ETH_CLIENT_URL


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, clientURL),
      network_id: 3,       // Rinkeby's id
      gas: 8000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true  ,   // Skip dry run before migrations? (default: false for public nets )
      networkCheckTimeout: 10000000,
    }
  }, 
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
  
};
