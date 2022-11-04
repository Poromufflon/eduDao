<script>
    import { onMount } from "svelte";

    export var txAdress;
    export var txFrom;
    export var txTo;

    var txA  = "0x000000000000000000..."; 
    var txF = "0x0000000...";
    var txT = "0x0000000...";

    onMount(async ()=>{
        if(txAdress != null){
            txA = txAdress.slice(0,20) + "..."; 
        }
        if(txFrom != null){
            txF = txFrom.slice(0,9)+ "...";
        }
        if(txTo != null){
            txA = txAdress.slice(0,20) + "..."; 
            txT = txTo.slice(0,9)+ "...";
        } 
    })
    

    
</script>



<div class="text-center">
    <div class="grid grid-cols-1 gap-2">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="grid grid-cols-4 gap-4">
            <div class="avatar placeholder">
                <div class="bg-neutral-focus text-neutral-content rounded-full w-24 ">
                    <span>TX</span>
                </div>
            </div>
            <div class="text-left mt-6">
                Transaction: {txA}
            </div>
            <div>

            </div>
            
            <div>
                <div class="ml-4 text-left">
                    Von: {txF}
                    <div>
                      Nach: {txT}
                    </div>
                  </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>


