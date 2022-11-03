<script>
  export let transactionAdress = "0x00000000080789876987979";
  export let transactionAdressFrom = "0x00000000";
  export let transactionAdressTo = "0x00000000";
  export let number = 1;
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="grid grid-cols-4 gap-4">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-12 ">
          <span>{number}</span>
        </div>
        <div class="text-center mt-3">
        {transactionAdress}
        </div>
        <div>
        </div>
        <div>
            <div class="ml-4">
                Von:{transactionAdressFrom}
                <div>
                  Nach:{transactionAdressTo}
                </div>
              </div>
        </div>
       
        
    </div>
  </div>
</div>
