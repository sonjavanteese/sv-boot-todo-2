<script>
  export let todo, updateTodo, deleteTodo;
</script>

<div
  class="list-group-item list-group-item-actionx"
  class:done={todo.isComplete}
>
  <div class="py-2">
    <h4 class="mb-4">Edit Task</h4>
    <div class="input-group mb-2">
      <span class="input-group-text">Task</span>
      <input
        type="text"
        value={todo.task}
        on:change={(e) => {
          todo.task = e.currentTarget.value;
          updateTodo(todo);
        }}
        class="form-control"
        placeholder="..."
      />
      <div class="input-group-text">
        <input
          class="form-check-input mt-0"
          type="checkbox"
          checked={todo.isComplete}
          on:change={(e) => {
            todo.isComplete = e.currentTarget.checked;
            updateTodo(todo);
          }}
        />
      </div>
    </div>
    <div class="input-group mb-2">
      <span class="input-group-text">Info</span>
      <input
        type="text"
        value={todo.info}
        on:change={(e) => {
          todo.info = e.currentTarget.value;
          updateTodo(todo);
        }}
        class="form-control"
        placeholder="..."
      />
    </div>
    <div class="pt-1">
      <button
        on:click={() => {
          updateTodo(todo);
        }}
        type="button"
        class="btn btn-link">Save</button
      >
      <button on:click={() => {
        deleteTodo(todo);
      }} type="button" class="btn btn-link">Delete</button>
    </div>
  </div>
</div>

<!-- <div class="list-group-item" class:done={todo.isComplete}>

    <input
      type="text"
      value={todo.task}
      on:input={(e) => {
        todo.task = e.currentTarget.value;
        updateTodo(todo);
      }}
      class="form-control"
      placeholder="..."
    />
  
</div> -->
<style>
  .done {
    opacity: 0.75;
    background-color: var(--bs-gray-100);
  }
</style>
