<script>
  export let todo, toggle;
</script>

<div class="d-flex w-100 justify-content-between">
  <h4 class="mb-0 fs-5 fw-semibold">{todo.task}</h4>
  <!-- <a href="/data" on:click|preventDefault={toggle}>Edit</a> -->
</div>
<p class="mb-1 text-muted">{todo.info}</p>
<ul class="list-inline mb-0">
  <li class="list-inline-item">
    <a href="/data" on:click|preventDefault={toggle}>Edit</a>
  </li>
</ul>


<style>
  .done {
    opacity: 0.75;
    background-color: var(--bs-gray-100);
  }
</style>
