<script>
  import { ethers } from "ethers";
  import jsonata from "jsonata";
  import ComponentAccountDetails from "../components/ComponentAccountDetails.svelte";

  let connectText = "Mit MetaMask Account verbinden";
  let accountAdress;
  let role = "Gast";
  let adress = "wow";
  let eduPower = 0;
  let eduToken = 0;
  let ether ="0";
  let userCount = 0;
  let teacherCount = 0;
  let modCount = 0;

  

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
    accountAdress = accounts[0];
    const balance = await provider.getBalance(accountAdress)
    const balanceInEth = ethers.utils.formatEther(balance)
    ether = balanceInEth.slice(0,6)
    adress = accounts[0].slice(0,12) + "...";

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
    <div />
    <div>
      <ComponentAccountDetails {role} {adress} {ether}/>
    </div>
    <div />
  {/if}
</div>
