<script>
  import { connected, chainId, defaultEvmStores } from "svelte-web3";
  import ComponentAccountDetails from "../components/ComponentAccountDetails.svelte";

  let connectText = "Connect to MetaMask";
  let accountAdress = "";
  let accountBalance = "";

  async function connectWallet() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      await window.ethereum.send("eth_requestAccounts");
      metamaskConnected = window.ethereum.isConnected();
    }
  }
  function onClickConnectWallet() {
    promise = connectWallet;
  }
  $: promise = connectWallet();
  $: metamaskConnected = window.ethereum
    ? window.ethereum.isConnected()
    : false;
</script>

<div class="grid grid-cols-3  gap-8 mx-8 mt-8">
  {#if !metamaskConnected}
    <div />
    <div class="text-center">
      <div class="hero bg-base-100">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">
              Bitte Verbinde dich mit Metamask!
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
  {:else}
    <div />
    <div>
      <ComponentAccountDetails/>
    </div>
    <div />
  {/if}
</div>
