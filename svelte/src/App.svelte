<script>
  import {connected,chainId, defaultEvmStores } from "svelte-web3";
  import EduDaoLogo from './images/EduDaoLogo2.svelte'
  import Lerninhalt from './components/Lerninhalt.svelte'

    let adress = "";
    let connectText = "Connect to MetaMask";
    $: metaMaskConnected = false;
    let metaMaskInstalled = false;
    

    function handleClick() {
       if(window.ethereum){
		defaultEvmStores.setProvider()
	   }
    }

</script>

<main>
    {#if !$connected}
            <div class="grid grid-cols-3 gap-8 mx-8 mt-8 ">
                <div>
                    <EduDaoLogo/>
                </div>
                <div class="m-auto mt-6">
                    <div class="btn-group">
                        <button class="btn btn-active">Inhalte</button>
                        <button class="btn">Votings</button>
                        <button class="btn">Account</button>
                      </div>
                </div>
                <div>
                </div>

            </div>
			<div class="grid grid-cols-3  gap-8 mx-8 mt-8"> 
				<div class="container">
                    <div class="fixed ">
                        <div class="grid grid-cols-1 mt-52">
                            <button class="btn">Computerwissenschaften</button>
                            <button class="btn">Chemie</button>
                            <button class="btn">Biologie</button>
                            <button class="btn">Physik</button>
                            <button class="btn">Literatur</button>
                        </div>
                    </div>
				</div>
				<div>
                    <div>
                        <Lerninhalt/>
                        <Lerninhalt/>
                        <Lerninhalt/>
                        <Lerninhalt/>
                        <Lerninhalt/>
                    </div>
                </div>
				<div class="container">
					<div class="fixed text-right">
						<button class="btn btn-primary btn-lg bg-primary ml-52" id="connectButton" on:click={handleClick}>
                            {connectText}
                        </button>
					</div>
				</div>
			</div>

        <!-- -->
    {:else}
        <div class ="container mx-auto">
            <div class= "block px-12 mt-12 top-10 max-w-full bg-palesilver-500 rounded-t-lg h-screen pt-12">
                    <!--<div class= "grid grid-rows-4 grid-flow-col gap-4 max-h-full">
                        <div class="row-span-4 bg-darkseagreen-900 pl-4 ">EduDao <br> <br> <br> Biologie <br> Chemie <br> Computerwissenschaften </div>
                        <div class="col-span-2 bg-white text-center pl-4 pt-4">Lehrinhalte | Accountdetails | Votings</div>
                        <div class="row-span-3 col-span-2 bg-blue-500 pl-4 pt-4"> Lerninhalt 1: Der Frosch <br> Dieser Lerninhalt bringt das Thema Frösche näher <br> <br> Lerninhalt 2: Der Corona <br> Dieser Lerninhalt bringt das Thema Corona näher</div>
                        <div class="row-span-4 col-span-1 bg-yellow-600 pl-4 pt-4">EduPower kaufen <br> Mit MetaMaskVerbinden? <br> Lehrer des Monats <br> Top Inhalt </div>
                    </div>-->
            </div>
        </div>
    {/if}
</main>
