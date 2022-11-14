//https://github.com/PatrickAlphaC/dao-template used for this script

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { VOTING_DELAY,VOTING_PERIOD,QUORUM_PERCENTAGE } from "../helper-hardhat-config";


const deployGovernorContract: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
      // @ts-ignore
    const {getNamedAccounts,deployments} = hre;
    const { deploy, log, get} = deployments;
    const { deployer } = await getNamedAccounts();

    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock");

    log("Deploying Governor Contract");

    //Only works with the allowUnlimitedContractSize: true flag in der hardhat config or after optimizing it. (it's done by optimization, as you can see in the hardhat.config.ts)
    //Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="Transaction reverted: trying to deploy a contract whose code is too large"
    //Would be produced without it Reason can be found in the proposal below.
    //Vitalik Buterin, "EIP-170: Contract code size limit," Ethereum Improvement Proposals, no. 170, November 2016. [Online serial]. Available: https://eips.ethereum.org/EIPS/eip-170.
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args:[
            governanceToken.address,
            timeLock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE,
        ],
        log: true,
    });
};

export default deployGovernorContract