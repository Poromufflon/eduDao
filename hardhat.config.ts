/** @type import('hardhat/config').HardhatUserConfig */
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import {HardhatUserConfig} from "hardhat/config";

const config: HardhatUserConfig  = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    }
  },
  paths:{
    artifacts: './svelte/src/contracts',
  },
  solidity: {
    version: "0.8.17",
	settings:{
        optimizer: {
          enabled: true,
          runs: 100,
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