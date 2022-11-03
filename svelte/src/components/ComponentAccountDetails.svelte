<script>
    export let role = "none";
    export let adress = "none";
    export let eduPower = 0;
    export let eduToken = 0;
    export let ether = "0";
    export let userCount = 0;
    export let teacherCount = 0;
    export let modCount = 0;
</script>


<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="grid grid-cols-1 text-center">
      <div class="avatar mx-auto">
        <div class="w-24 rounded-full">
            <figure><img src="https://placeimg.com/192/192/people" alt="Frosch"/></figure>
        </div>
      </div>
      <div class="stats stats-vertical lg:stats-horizontal shadow mt-6">
        <div class="stat">
          <div class="stat-title">Aktuelle Rolle:</div>
          <div class="stat-value">{role}</div>
        </div>
      </div>
      <div class="stats stats-vertical lg:stats-horizontal shadow mt-6">
        <div class="stat">
          <div class="stat-title">Aktuelle Adresse:</div>
          <div class="stat-value">{adress}</div>
        </div>
      </div>
      <div>
        <div class="stats stats-vertical lg:stats-horizontal shadow mt-6">
          <div class="stat">
            <div class="stat-title">EduPower</div>
            <div class="stat-value">{eduPower}</div>
          </div>

          <div class="stat">
            <div class="stat-title">EduToken</div>
            <div class="stat-value">{eduToken}</div>
          </div>

          <div class="stat">
            <div class="stat-title">Ether</div>
            <div class="stat-value">{ether}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
