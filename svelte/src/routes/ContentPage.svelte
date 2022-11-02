<script>
  import { connected, chainId, defaultEvmStores } from "svelte-web3";
  import EduDaoLogo from "../images/EduDaoLogo2.svelte";
  import ComponentContentButtons from "../components/ComponentContentButtons.svelte";
  import ComponentLerninhalte from "../components/ComponentLerninhalte.svelte";
  import ComponentTopContent from "../components/ComponentTopContent.svelte";

  let connectText = "Connect to MetaMask";

  function handleClick() {
    if (window.ethereum) {
      defaultEvmStores.setProvider();
    }
  }
</script>

<div class="grid grid-cols-3  gap-8 mx-8 mt-8">
  <ComponentContentButtons/>
  <ComponentLerninhalte/>
  <ComponentTopContent/>
</div>
