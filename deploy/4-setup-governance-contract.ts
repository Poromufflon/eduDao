//https://github.com/PatrickAlphaC/dao-template used for this script

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// @ts-ignore
import { ethers } from "hardhat";
import { ADRESS_ZERO } from "../helper-hardhat-config";

const setupContracts: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    // @ts-ignore
    const {getNamedAccounts,deployments} = hre;
    const { log } = deployments;
    const { deployer } = await getNamedAccounts();

    const timeLock = await ethers.getContract("TimeLock", deployer);
    const governor = await ethers.getContract("GovernorContract", deployer);

    log("Setting up roles...");
    //setting up roles
    const proposerRole = await timeLock.PROPOSER_ROLE();
    const executorRole = await timeLock.EXECUTOR_ROLE();
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

    //basicly removing executor role abd make the governor proposer (the deployer in this specific case)
    const proposerTx =  await timeLock.grantRole(proposerRole, governor.address);
    await proposerTx.wait(1);
    const executorTx  = await timeLock.grantRole(executorRole, ADRESS_ZERO);
    await executorTx.wait(1);
    //revoke admin role for dezentralisation
    const revokeTx = await timeLock.revokeRole(adminRole, deployer);
    await revokeTx.wait(1);
};

export default setupContracts