<script>
  import Todos from "./_comp/Todos.svelte";
  export let name = "Todos";
</script>

<div class="container-xl py-4">
  <header>
    <span class="fs-2">
      {name}
    </span>
  </header>

  <hr />
  <Todos />
</div>


