<script>
  import { utils, ethers, providers, BigNumber } from "ethers";
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
  let proposalExists = false;
  let proposalVoted = false;
  let proposalVoteWay;
  let block = 9;
  let blockAfterVote = 9;

  async function connectWallet() {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum);
    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send("eth_requestAccounts", []);
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer = provider.getSigner();
    let transactions = [];
    //safes the logged in account adress
    accountAdress = accounts[0];
    const transactionCount = await provider.getTransactionCount(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );
    const blockNumber = await provider.getBlockNumber();
    block = blockNumber;
    if (blockNumber < 10) {
      localStorage.clear();
    } else {
      if (localStorage.getItem("proposalID") != null) {
        proposalExists = true;
      }
      if (localStorage.getItem("Voted") != null) {
        proposalVoted = true;
        proposalVoteWay = localStorage.getItem("Voted");
      }
    }
    for (let i = 1; i < transactionCount; i++) {
      const transaction = await provider.getBlockWithTransactions(i);
      transactions.push(transaction);
      console.log(transaction)
    }

    if (transactions.length != 0) {
      setTimeout(() => {
        provider.on(
          "block",
          (currentBlock) => {
            console.log("Current Block: ");
            console.log(currentBlock);
            block = currentBlock;
          },
          1000
        );
      });
      metaMaskConnected = true;
      return transactions;
    } else {
      metaMaskConnected = false;
      throw new Error("didn't work");
    }
  }

  async function proposeBoxContract() {
    
    if (localStorage.getItem("proposalID") == null && proposalExists == false) {
      let args = [69];
      let functionToCall = "store";
      let proposalDescription = "Contract#1";

      console.log("Step 1: declare governor for Ethers");
      const governor = new ethers.Contract(
        "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
        GovernorContract.abi,
        signer
      );
      console.log("Governor declared...");
      const box = new ethers.Contract(
        "0xa513e6e4b8f2a923d98304ec87f64353c4d5c853",
        BoxContract.abi,
        signer
      );
      console.log("Step 2: declare box for Ethers");
      const encodedFunctionCall = box.interface.encodeFunctionData(
        functionToCall,
        args
      );
      console.log("Box declared...");
      console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`);
      console.log(`Proposal Description: \n ${proposalDescription}`);
      console.log("Step 3: propose from governor");

      const proposeTx = await governor.propose(
        [box.address],
        [0],
        [encodedFunctionCall],
        proposalDescription
      );
      console.log("proposed...");
      const proposeReceipt = await proposeTx.wait(1);
      const proposalId = await proposeReceipt.events[0].args.proposalId;
      console.log(`Proposed with proposal ID: \n ${proposalId}`);
      storeProposalId(proposalId);
      const proposalState = await governor.state(proposalId);
      const proposalVotingDelay = await governor.votingDelay();
      const proposalVotingPeriod = await governor.votingPeriod();
      console.log(`Current Proposal State: ${proposalState}`);
      console.log(`proposalVotingDelay: ${proposalVotingDelay}`);
      console.log(`proposalVotingPeriod: ${proposalVotingPeriod}`);

      proposalExists = true;
    } else {
      console.log("Error: Proposal already exists!");
    }
  }

  function storeProposalId(proposalId) {
    localStorage.setItem("proposalID", proposalId);
  }

  // 0 = Against, 1 = For, 2 = Abstain for this example
  async function vote(voteWay) {
    if (proposalExists == true) {
      if (proposalVoted == false) {
        let voteNumber = 0;
        if (voteWay == "yes") {
          voteNumber = 1;
        }
        if (voteWay == "no") {
          voteNumber = 0;
        }
        console.log(`Voting with ... ${voteWay}`);
        const reason = "test";

        const governor = new ethers.Contract(
          "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
          GovernorContract.abi,
          signer
        );
        const proposalId = localStorage.getItem("proposalID");

        const voteTx = await governor.castVoteWithReason(
          proposalId,
          voteNumber,
          reason
        );
        const voteTxReceipt = await voteTx.wait(1);
        console.log(voteTxReceipt.events[0].args.reason);
        const proposalState = await governor.state(proposalId);
        console.log(`Current Proposal State: ${proposalState}`);

        blockAfterVote = block;
        proposalVoted = true;
        localStorage.setItem("Voted", voteWay);
      } else {
        console.log("Already Voted");
      }
    } else {
      console.log("Please create a proposal first");
    }
  }

  async function queueAndExecute() {
    if (proposalExists == true) {
      if (proposalVoted == false) {
        console.log("Please Vote first");
      } else if (block < blockAfterVote + 5) {
        console.log("Still in Voting Time");
      } else {
        let args = [69];
      let functionToCall = "store";
      let proposalDescription = "Contract#1";
        const box = new ethers.Contract(
          "0xa513e6e4b8f2a923d98304ec87f64353c4d5c853",
          BoxContract.abi,
          signer
        );
        const encodedFunctionCall = box.interface.encodeFunctionData(
          functionToCall,
          args
        );
        const descriptionHash = ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes(proposalDescription)
        );
        const governor = new ethers.Contract(
          "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
          GovernorContract.abi,
          signer
        );
        console.log("Queueing...");
        const queueTx = await governor.queue(
          [box.address],
          [0],
          [encodedFunctionCall],
          descriptionHash
        );
        await queueTx.wait(1);

        console.log("Executing...");
        // this will fail on a testnet because you need to wait for the MIN_DELAY!
        const executeTx = await governor.execute(
          [box.address],
          [0],
          [encodedFunctionCall],
          descriptionHash
        );
        await executeTx.wait(1);
        console.log(`Box value: ${await box.retrieve()}`);
        localStorage.clear();
        proposalExists = false;
        proposalVoted = false;
      }
    } else {
      proposalExists = false;
      console.log("Please create a proposal first");
    }
  }

  let promisePropose;
  let promiseTx;
  let promiseVote;
  let promiseQueueAndExecute;

  function onClickConnectWallet() {
    promiseTx = connectWallet();
  }

  function onClickHandlePropose() {
    promisePropose = proposeBoxContract();
  }

  function onClickHandleVoteNo() {
    promiseVote = vote("no");
  }
  function onClickHandleVoteYes() {
    promiseVote = vote("yes");
  }
  function onClickHandleQueueAndExecute() {
    promiseQueueAndExecute = queueAndExecute();
  }

  async function onClickDev() {
    // get proposal id only from blockchain
   /*  let realId = localStorage.getItem("proposalID")
    let args = [69];
    let functionToCall = "store";
    let proposalDescription = "Contract#1";
    const descriptionHash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(proposalDescription)
    );
    const governor = new ethers.Contract(
      "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
      GovernorContract.abi,
      signer
    );
    console.log(governor.interface);

    const box = new ethers.Contract(
      "0xa513e6e4b8f2a923d98304ec87f64353c4d5c853",
      BoxContract.abi,
      signer
    );
    console.log(box.interface);
    const encodedFunctionCall = box.interface.encodeFunctionData(
      functionToCall,
      args
    );
    const hashedPropId = await governor.hashProposal(
      [box.address],
      [0],
      [encodedFunctionCall],
      descriptionHash
    );
    const hashedrealid = BigNumber.from("105704348824217936618812621952337896994109548838345781717919752782827019626800")
    console.log(`Created ID: ${hashedPropId} Real ID: ${hashedrealid}`)
     */
     const governorinterface = new ethers.utils.Interface(
      GovernorContract.abi
    );
     const transaction = await provider.getTransactionReceipt("0xfcb63fd08da46cbf3115c08afe92b0c0ce59af9d43e29cb48d6c47b202b8b8b3");
     const data = governorinterface.decodeFunctionResult("propose", "0xe0492f86bf3b8d7d0d77fd1ca258d3b6e976ea12cf63e4594202c803027995cf000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000b000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a513e6e4b8f2a923d98304ec87f64353c4d5c853000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000246057361d00000000000000000000000000000000000000000000000000000000000001a800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f436f6e7472616374233132343232340000000000000000000000000000000000")
     console.log(data)
     console.log(transaction)


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
      <div>Voting</div>
    </div>
    <div class="text-center">
      <div>Transaction History</div>
    </div>
    <div class="text-center">
      <div>Active votes</div>
    </div>

    <div class="text-center">
      <div id="proposalBlock" class="grid grid-cols-1 gap-2">
        <ComponentVoting />
        <button on:click={onClickHandlePropose} class="btn">Propose</button>
        <button on:click={onClickDev} class="btn">DevButton</button>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-2 text-center">
      Aktueller Block: {block}
      {#await promiseTx}
        <!-- promise is pending -->
        <div class="text-center">
          <button class="btn btn-square loading" />
        </div>
      {:then value}
        {#each value as t}
          <ComponentTransactions
            txAdress={t.transactions[0].hash}
            txFrom={t.transactions[0].from}
            txTo={t.transactions[0].to}
          />
        {/each}
      {/await}
    </div>
    <div class="text-center">
      <div class="grid grid-cols-1 gap-2" />
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <button on:click={onClickHandleVoteYes} class="btn">Yes</button>
          <button on:click={onClickHandleVoteNo} class="btn">No</button>
          <button on:click={onClickHandleQueueAndExecute} class="btn"
            >QueueAndExecute</button
          >
        </div>
      </div>
    </div>
  {/if}
</div>
