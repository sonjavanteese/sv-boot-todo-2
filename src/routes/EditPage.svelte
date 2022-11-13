<script>
  import ProfilEdit from "./_comp/ProfilEdit.svelte";
  export let name = "Profil Editor";
</script>

<div class="container-lg py-4">
  <h4>
    {name}
  </h4>
  <hr />
  <ProfilEdit />
</div>
