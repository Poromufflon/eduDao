<script>
    import { connected, chainId, defaultEvmStores } from "svelte-web3";
    import EduDaoLogo from "../images/EduDaoLogo2.svelte";
    import ComponentContentButtons from "../components/ComponentContentButtons.svelte";
    import ComponentLerninhalte from "../components/Lerninhalt.svelte";
  
    let connectText = "Connect to MetaMask";
  
    function handleClick() {
      if (window.ethereum) {
        defaultEvmStores.setProvider();
      }
    }
  </script>
  
  <div class="grid grid-cols-3  gap-8 mx-8 mt-8">
    <div>

    </div>
    <div>
        
    </div>
    <div class="container">
      <div class="fixed text-right">
        <button
          class="btn btn-primary btn-lg bg-primary ml-52 mt-64"
          id="connectButton"
          on:click={handleClick}
        >
          {connectText}
        </button>
      </div>
    </div>
  </div>
  