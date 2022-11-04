<script>
  import { ethers } from "ethers";
  import ComponentActiveVotes from "../components/ComponentActiveVotes.svelte";
  import ComponentContractCreator from "../components/ComponentContractCreator.svelte";
  import ComponentTransactions from "../components/ComponentTransactions.svelte";
  import ComponentVoting from "../components/ComponentVoting.svelte";

  let connectText = "Mit MetaMask Account verbinden";
  //maybe safe account adress in local storage ? 
  let accountAdress;


  async function connectWallet() {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send("eth_requestAccounts", []);
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()

    let transactions = [];
    //safes the logged in account adress
    accountAdress = accounts[0];
    const transactionCount = await provider.getTransactionCount(accountAdress)
    for(let i = 1; i<transactionCount;i++){
      const transaction = await provider.getBlockWithTransactions(i);
      transactions.push(transaction)
    }
    if(transactions.length != 0){
      metaMaskConnected = true;
      return transactions;
    }else{
      metaMaskConnected = false;
      throw new Error("didn't work")
    }
  }
  let promiseTx = connectWallet()

  function onClickConnectWallet(){
    promiseTx = connectWallet();
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
        <ComponentContractCreator/>
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
      <div class="grid grid-cols-1 gap-2">
        <ComponentActiveVotes />
      </div>
    </div>
  {/if}
</div>
