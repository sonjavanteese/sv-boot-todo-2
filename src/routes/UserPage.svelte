<script>
  import Profil from "./_comp/Profil.svelte";
 export let name = "User Profil";
</script>

<div class="container-lg py-4">
  <h4>
    {name}
  </h4>
  <hr>
 <Profil></Profil>
</div>
