<script>
  import { ethers } from "ethers";
  import ComponentAccountDetails from "../components/ComponentAccountDetails.svelte";
  import GovernanceToken from "../contracts/contracts/GovernanceToken.sol/GovernanceToken.json";

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

    const governorToken = new ethers.Contract(
          "0x5fbdb2315678afecb367f032d93f642f64180aa3",
          GovernanceToken.abi,
          signer
        );
    
    const eduPowerBalance = await governorToken.balanceOf(accountAdress)
    console.log(governorToken.interface)
    eduPower = eduPowerBalance
    ether = balanceInEth.slice(0,9)
    adress = accountAdress.slice(0,12) + "...";

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
      <ComponentAccountDetails {role} {adress} {ether} {eduPower}/>
    </div>
    <div />
  {/if}
</div>
