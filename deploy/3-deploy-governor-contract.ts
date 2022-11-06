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

    //Funktioniert nur mit der allowUnlimitedContractSize: true flag in der hardhat config,
    //wegen https://eips.ethereum.org/EIPS/eip-170
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
        //wait confirmations:
    });
};

export default deployGovernorContract