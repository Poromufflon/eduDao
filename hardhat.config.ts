/** @type import('hardhat/config').HardhatUserConfig */
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import {HardhatUserConfig} from "hardhat/config";



//module.exports = {
//  solidity: "0.8.17",
//};

const config: HardhatUserConfig  = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
    }
  },
  paths:{
    artifacts: './svelte/src/contracts',
  },
  solidity: {
    version: "0.8.9",
    settings:{
        optimizer: {
          enabled: true,
          runs: 1000,
        },
    },
  },
  
  namedAccounts: {
    deployer:{
      default: 0,
    },
  },
};

export default config;