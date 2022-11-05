<script>
  import {utils, ethers, providers } from "ethers";
  import ComponentActiveVotes from "../components/ComponentActiveVotes.svelte";
  import ComponentContractCreator from "../components/ComponentContractCreator.svelte";
  import ComponentTransactions from "../components/ComponentTransactions.svelte";
  import ComponentVoting from "../components/ComponentVoting.svelte";
  import GovernorContract from "../contracts/contracts/governance_standard/GovernorContract.sol/GovernorContract.json";
  import BoxContract from "../contracts/contracts/Box.sol/Box.json";
  let connectText = "Mit MetaMask Account verbinden";
  //maybe safe account adress in local storage ? 
  let accountAdress;
  let signer;
  let provider;


  async function connectWallet() {

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum)
    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send("eth_requestAccounts", []);
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer = provider.getSigner()

    let transactions = [];
    //safes the logged in account adress
    accountAdress = accounts[0];
    const transactionCount = await provider.getTransactionCount(accountAdress)
    for(let i = 1; i<transactionCount;i++){
      const transaction = await provider.getBlockWithTransactions(i);
      transactions.push(transaction)
    }
    if(transactions.length != 0){
      provider.on("block", (currentBlock) => {
      console.log("Block new BLock mined")
      console.log(currentBlock)
      })
      metaMaskConnected = true;
      return transactions;
    }else{
      metaMaskConnected = false;
      throw new Error("didn't work")
    }
    
  }

  async function proposeBoxContract(){

    let args = [69];
    let functionToCall = "store";
    let proposalDescription= "Contract#1";

    const governor = new ethers.Contract("0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",GovernorContract.abi,signer)
    
    const box =  new ethers.Contract("0xa513e6e4b8f2a923d98304ec87f64353c4d5c853",BoxContract.abi,signer)
    
    const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall,args)

    console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`)
    console.log(`Proposal Description: \n ${proposalDescription}`)

    const proposeTx = await governor.propose(
      [box.address],
      [0],
      [encodedFunctionCall],
      proposalDescription
    )
    const proposeReceipt = await proposeTx.wait(1)
    const proposalId = await proposeReceipt.events[0].args.proposalId
    console.log(`Proposed with proposal ID: \n ${proposalId}`)
    storeProposalId(proposalId)
    const proposalState = await governor.state(proposalId)
    const proposalVotingDelay = await governor.votingDelay()
    const proposalVotingPeriod = await governor.votingPeriod()
    console.log(`Current Proposal State: ${proposalState}`)
    console.log(`proposalVotingDelay: ${proposalVotingDelay}`)
    console.log(`proposalVotingPeriod: ${proposalVotingPeriod}`)
  }

  function storeProposalId(proposalId){
    localStorage.setItem("proposalID",proposalId)
  }

  // 0 = Against, 1 = For, 2 = Abstain for this example
  async function vote(voteWay){
    let voteNumber = 0;
    if(voteWay == "yes"){
      voteNumber = 1;
    }
    if(voteWay == "no"){
      voteNumber = 0;
    }
    console.log(`Voting with ... ${voteWay}`);
    const proposalId = localStorage.getItem("proposalID");
    const reason =  "test";

    const governor = new ethers.Contract("0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",GovernorContract.abi,signer);
    const voteTx = await governor.castVoteWithReason(proposalId, voteNumber,reason);
    const voteTxReceipt = await voteTx.wait(1);
    console.log(voteTxReceipt.events[0].args.reason)
    const proposalState = await governor.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)
  }

  async function queueAndExecute(){
    let args = [69];
    let functionToCall = "store";
    let proposalDescription= "Contract#1";
    const box =  new ethers.Contract("0xa513e6e4b8f2a923d98304ec87f64353c4d5c853",BoxContract.abi,signer)
    const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall,args)
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(proposalDescription))
    const governor = new ethers.Contract("0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",GovernorContract.abi,signer);
    console.log("Queueing...")
    const queueTx = await governor.queue([box.address], [0], [encodedFunctionCall], descriptionHash)
    await queueTx.wait(1)
  
    console.log("Executing...")
    // this will fail on a testnet because you need to wait for the MIN_DELAY!
    const executeTx = await governor.execute(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
    )
    await executeTx.wait(1)
    console.log(`Box value: ${await box.retrieve()}`)
  }
 

  let promisePropose;
  let promiseTx;
  let promiseVote;
  let promiseQueueAndExecute;

  function onClickConnectWallet(){
    promiseTx = connectWallet();
  }

  function onClickHandlePropose(){
    promisePropose = proposeBoxContract();
  }

  function onClickHandleVoteNo(){
    promiseVote = vote("no");
  }
  function onClickHandleVoteYes(){
    promiseVote = vote("yes");
  }
  function onClickHandleQueueAndExecute(){
    promiseQueueAndExecute = queueAndExecute();
  }


  $: metaMaskConnected = false;
</script>

<div class="grid grid-cols-3  gap-8 mx-8 mt-8">
  {#if !metaMaskConnected}
    <div />
    <div class="text-center">
      <div class="hero bg-base-100">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">
              Bitte Verbinde dich mit deinem Metamask Account!
            </h1>
          </div>
        </div>
      </div>
      <div class="">
        <button
          class="btn btn-primary btn-lg bg-primary "
          id="connectButton"
          on:click={onClickConnectWallet}
        >
          {connectText}</button
        >
      </div>
    </div>
    <div />
  {:else if metaMaskConnected}
    <div class="text-center">
      <div>
        Voting
      </div>
    </div>
    <div class="text-center">
      <div>
        Transaction History
      </div>
    </div>
    <div class="text-center">
      <div>
        Active votes
      </div>
    </div>

    
    <div class="text-center">
      <div class="grid grid-cols-1 gap-2">
        <ComponentVoting/>
        <button on:click={onClickHandlePropose} class="btn">Propose</button>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-2">
    {#await promiseTx}
      <!-- promise is pending -->
      <div class="text-center">
        <button class="btn btn-square loading"></button>
      </div>
    {:then value}
        {#each value as t}
          <ComponentTransactions txAdress={t.transactions[0].hash} txFrom={t.transactions[0].from} txTo={t.transactions[0].to}/>
        {/each}
    {/await}
    </div>
    <div class="text-center">
        <div class="grid grid-cols-1 gap-2"></div>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <button on:click={onClickHandleVoteYes} class="btn">Yes</button>
              <button on:click={onClickHandleVoteNo} class="btn">No</button>
              <button on:click={onClickHandleQueueAndExecute} class="btn">QueueAndExecute</button>
            </div>
          </div>
    </div>
  {/if}
</div>
