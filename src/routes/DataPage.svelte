<script>
  import TodosList from "./_comp/TodosList.svelte";
  import Icon from "../lib/components/Icon.svelte";
  export let name = "Todos";
  let open = false;
</script>

<div class="container-xl py-4">
  <header>
    <span class="fs-2">
      {name}
    </span>
    <span class="me-2 p-2" on:click={() => (open = !open)}>
      <Icon name={open ? 'close' : 'add'} style="--fs: 20px;" />
    </span>
  </header>

  <hr />
  <TodosList bind:open />
</div>

<style>
  header {
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
  span {
    cursor: pointer;
  }
</style>
