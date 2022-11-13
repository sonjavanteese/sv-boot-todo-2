<script>
  import SetForm from "./_comp/SetForm.svelte";
  export let name = "Einstellungen";
</script>

<div class="container-xl py-4">
  <h4>
    {name}
  </h4>
  <hr />
  <SetForm />
</div>
