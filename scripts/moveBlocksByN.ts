
// @ts-ignore
import { ethers, network } from "hardhat"

import {
  developmentChains,
} from "../helper-hardhat-config"
import { moveblocks } from "../utils/move-blocks"

export async function moveByeN(n: number) {
  // If working on a development chain, we will push forward till we get to the voting period.
  if (developmentChains.includes(network.name)) {
    await moveblocks(n)
  }
}

moveByeN(5)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })