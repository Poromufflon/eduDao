<script>
    let connectText = "Connect to MetaMask";
  
    function handleClick() {
      if (window.ethereum) {
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
  