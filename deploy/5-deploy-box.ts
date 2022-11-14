//https://github.com/PatrickAlphaC/dao-template used for this script

import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
  // @ts-ignore
import { ethers } from "hardhat"

const deployBox: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying Box and waiting for confirmations...")
  //deploying box contract
  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
  })
  log(`Box at ${box.address}`)
  const boxContract = await ethers.getContractAt("Box", box.address)
  const timeLock = await ethers.getContract("TimeLock")
  const transferTx = await boxContract.transferOwnership(timeLock.address)
  //the wait is from ethers! and adds additional properties on the receipt
  //https://docs.ethers.io/v5/api/contract/contract/
  await transferTx.wait(1)
}

export default deployBox