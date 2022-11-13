<script>
  export let todo, updateTodo, deleteTodo;
</script>

<div class="p-0" class:done={todo.isComplete}>
 
  <div class="input-group my-1">
    <div class="input-group-text">
      <input class="form-check-input mt-0" type="checkbox"
      checked={todo.isComplete}
      on:change={(e) => {
        todo.isComplete = e.currentTarget.checked;
        updateTodo(todo);
      }}>
    </div>
    <input type="text"
    value={todo.task}
    on:input={(e) => {
      todo.task = e.currentTarget.value;
      updateTodo(todo);
    }} class="form-control" placeholder="...">
    <button class="btn btn-outline-danger" type="button" on:click={() => deleteTodo(todo)}>Delete</button>
  </div>
</div>

<style>

  .done {
    opacity: 0.5;
  }
  .done input[type="text"] {
    text-decoration: line-through;
  }
</style>
