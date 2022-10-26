<script>
	import Hello from './Hello.svelte'
	async function connectWallet(){
		if(window.ethereum){
			window.web3 = new Web3(ethereum);
			await window.ethereum.send('eth_requestAccounts');
			metamaskConnected = window.ethereum.isConnected();
		}
	}
	function onClickConnectWallet(){
		promise = connectWallet;
	}
	$: promise = connectWallet();
	$: metamaskConnected = window.ethereum ? window.ethereum.isConnected() : false;
</script>

<main>
	{#if window.ethereum}
		<p>Browser wallet ist already connected to metamask {metamaskConnected}</p>
	{/if}
	{#if window.ethereum && !metamaskConnected}
		<button on:click={onClickConnectWallet}> Connect Wallet </button>
		{:else}
		<Hello />
	{/if}
</main>
