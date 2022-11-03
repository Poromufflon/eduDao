<script>
  import { ethers } from "ethers";
  import ComponentActiveVotes from "../components/ComponentActiveVotes.svelte";
  import ComponentContractCreator from "../components/ComponentContractCreator.svelte";
  import ComponentTransactions from "../components/ComponentTransactions.svelte";
  import ComponentVoting from "../components/ComponentVoting.svelte";

  let connectText = "Mit MetaMask Account verbinden";
  //maybe safe account adress in local storage ? 
  let accountAdress;
  let transactions = [];
  let firstAdress = "";

  async function onClickConnectWallet() {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send("eth_requestAccounts", []);
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()

    metaMaskConnected = true;
    //safes the logged in account adress
    accountAdress = accounts[0];
    const transactionCount = await provider.getTransactionCount(accountAdress)
    for(let i = 0; i<transactionCount;i++){
      const transaction = await provider.getBlockWithTransactions(i);
      transactions.push(transaction)
    }
    console.log(transactions)
  }
  function w(){
    console.log(transactions)
  }
  let cmps = [];
  $: cmps = cmps.filter(el => el);
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
    <div class="text-center">
      <div class="grid grid-cols-1 gap-2">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="grid grid-cols-4 gap-4">
              <div class="bg-neutral-focus text-neutral-content rounded-full w-12 ">
                <span>TX</span>
              </div>
              <div on:load={w}  class="text-center mt-3">
                {transactions[0]}
              </div>
              <div>
              </div>
              <div>
                  <div class="ml-4">
                      Von:0x0
                      <div>
                        Nach:0x0
                      </div>
                    </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <div class="grid grid-cols-1 gap-2">
        <ComponentActiveVotes />
      </div>
    </div>
  {/if}
</div>
