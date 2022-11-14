// SPDX-License-Identifier: MIT
//https://github.com/PatrickAlphaC/dao-template used for this Contract. Modified for Openzeppelin Contracts v4.8.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
  // minDelay is how long you have to wait before executing
  // proposers is the list of addresses that can propose
  // executors is the list of addresses that can execute
  constructor(
    uint256 minDelay,
    address[] memory proposers,
    address[] memory executors,
    address admin

  ) TimelockController(minDelay, proposers, executors, admin) {}
   fallback()external{

  }
}