<script>
  import EduDaoLogo from "./images/EduDaoLogo2.svelte";
  import Router from "svelte-spa-router";
  import HomePage from "./routes/HomePage.svelte"
  import AccountPage from "./routes/AccountPage.svelte";
  import ContentPage from "./routes/ContentPage.svelte";
  import VotingPage from "./routes/VotingPage.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Content from "./routes/Content.svelte";
  let current;
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)
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
  </div>

<main>
    <Router {routes}/>
</main>
