//https://github.com/PatrickAlphaC/dao-template used for this script

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
  // @ts-ignore
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
      // @ts-ignore

    //initialization
    const {getNamedAccounts,deployments} = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    //Deploys Governance Token
    log("Deploying Governance Token...");
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args:[],
        log: true,
    });
    log (`Deployed governance token to address ${governanceToken.address}`)
    await delegate(governanceToken.address, deployer);
    log("Delegated!");
};

//delegates the governance Token to deployer adress
const delegate  = async (
    governanceTokenAddress: string,
    delegatedAccount: string
) => {
    const governanceToken = await ethers.getContractAt(
        "GovernanceToken",
        governanceTokenAddress
    );
    const tx = await governanceToken.delegate(delegatedAccount);
    await tx.wait(1);
    //creates Checkpoint
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`);
};

export default deployGovernanceToken;