<script>
   import {ethers} from "ethers";
  import EduDaoLogo from "./images/EduDaoLogo.svelte";
  import Router from "svelte-spa-router";
  import HomePage from "./routes/HomePage.svelte"
  import AccountPage from "./routes/AccountPage.svelte";
  import ContentPage from "./routes/ContentPage.svelte";
  import VotingPage from "./routes/VotingPage.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Content from "./routes/Content.svelte";
  import GovernanceToken from "./contracts/contracts/GovernanceToken.sol/GovernanceToken.json";

  async function handleClickBuyPower(){
     // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send("eth_requestAccounts", []);
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();
    const accountAdress = accounts[0];
    console.log("Step 1: declare governorToken for Ethers");
    const governorToken = new ethers.Contract(
          "0x5fbdb2315678afecb367f032d93f642f64180aa3",
          GovernanceToken.abi,
          signer
        );
    console.log("declaring...");
    console.log("Step 2: mint token");
    const contrat= await governorToken.transfer("0x70997970C51812dc3A010C7d01b50e0d17dc79C8",100)
    //
    //const eduPowerBalance = await governorToken.transferFrom("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8",100)
    //console.log(eduPowerBalance)
    console.log("token minted")
      


  }
 

  let routes = {
    "/": HomePage,
    "/account": AccountPage,
    "/contentPage": ContentPage,
    "/voting": VotingPage,
    "/content/:id": Content, 

    "*": NotFound
  }
</script>

<div class="grid grid-cols-3 gap-8 mx-8 mt-8  ">
    <div>
      <EduDaoLogo />
    </div>

    <div class="m-auto mt-6">
      <div class="grid grid-cols-4">
        <div class="navbar bg-base-100">
            <a href="#/" class="btn btn-ghost normal-case text-xl">Home</a>
        </div>
        <div class="navbar bg-base-100">
            <a href="#/contentPage" class="btn btn-ghost normal-case text-xl">Inhalte</a>
        </div>
        <div class="navbar bg-base-100">
            <a href="#/voting" class="btn btn-ghost normal-case text-xl">Votings</a>
        </div>
        <div class="navbar bg-base-100">
            <a href="#/account" class="btn btn-ghost normal-case text-xl">Account</a>
        </div>
      </div>
    </div>
    <div class="text-right mt-10 mr-8">
      <button on:click={handleClickBuyPower} class="btn">EduPower kaufen</button>
    </div>
  </div>

<main>
    <Router {routes}/>
</main>
