<script>
  import ProfileEdit from "./_comp/ProfileEdit.svelte";
  export let name = "Profil Editor";
</script>

<div class="container-xl py-4">
  <h4>
    {name}
  </h4>
  <hr />
  <ProfileEdit />
</div>
