<script>
  import { connected, chainId, defaultEvmStores } from "svelte-web3";
  import EduDaoLogo from "./images/EduDaoLogo2.svelte";
  import ComponentContentButtons from "./components/ComponentContentButtons.svelte";
  import ComponentLerninhalte from "./components/ComponentLerninhalte.svelte";
  import Router from "svelte-spa-router";
  import HomePage from "./routes/HomePage.svelte"
  import AccountPage from "./routes/AccountPage.svelte";
  import ContentPage from "./routes/ContentPage.svelte";
  import VotingPage from "./routes/VotingPage.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Content from "./routes/Content.svelte";
  let current;
  let routes = {
    "/": HomePage,
    "/account": AccountPage,
    "/contentPage": ContentPage,
    "/voting": VotingPage,
    "/content/:id": Content, 

    "*": NotFound
  }

  let adress = "";
  let connectText = "Connect to MetaMask";
  let activeButton = 3;

  function handleClick() {
    if (window.ethereum) {
      defaultEvmStores.setProvider();
    }
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
  </div>

<main>
    <Router {routes}/>
</main>
