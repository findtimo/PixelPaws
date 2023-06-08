require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: './src/artifacts',
  },
  // localhost: {
  //   chainId: 31337, // Chain ID should match the hardhat network's chainid
  //   accounts: [`${0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e}`],
  // },
  networks: {
    hardhat: {
      chainId: 31337 // We set 1337 to make interacting with MetaMask simpler
    }
  }
};
