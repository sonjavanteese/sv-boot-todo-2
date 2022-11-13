<script>
  import { _user, supabase, sleep } from "../../lib/data";
  import Todos from "../../lib/components/Todos.svelte";
  import TodosAdd from "./TodosAdd.svelte";
  import TodoHead from "../../lib/components/TodoHead.svelte";
  import Loader from "../../lib/data/comp/Loader.svelte";
  import { Accordion, AccordionGroup } from "renderless-svelte";
  import { onMount } from "svelte";
  export let open;
  let ops = { od: "id", asc: false, id: false };
  let todos = [];
  const getAllTodos = async () => {
    let uid = $_user.id;
    let query = supabase.from("todos").select("*");
    if (uid) {
      query = query.eq("user_id", uid);
    }
    if (ops && ops.od) {
      query = query.order(ops.od, { ascending: ops.asc });
    }
    try {
      let { data, error } = await query;
      if (error) throw error;
      todos = data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async (todo) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({
          task: todo.task,
          info: todo.info,
          isComplete: todo.isComplete,
        })
        .eq("id", todo.id);
      await getAllTodos();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTodo = async (todo) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .delete()
        .eq("id", todo.id);
      await reload();
    } catch (err) {
      console.log(err);
    }
  };
  const reload = async () => {
    await getAllTodos();
  };
  let promise;

  onMount(async () => {
    promise = getAllTodos();
  });
</script>

{#await promise}
  <Loader />
{:then value}
  <section {...$$restProps}>
    {#if open}
      <header class="mb-4">
        <TodosAdd {reload} bind:open />
        <hr />
      </header>
    {/if}

    <div class="list-group">
      <AccordionGroup>
        {#each todos as todo}
          <Accordion>
            <button
              class="list-group-item list-group-item-action"
              slot="header"
              let:toggle
            >
              <TodoHead {todo} {toggle} />
            </button>
            <Todos {todo} {updateTodo} {deleteTodo} />
          </Accordion>
        {:else}
          <div class="list-group-item text-center fs-4">Keine Eintraege</div>
        {/each}
      </AccordionGroup>
    </div>
  </section>
{/await}

<style>
  :global(.switch) {
    color: lightskyblue;
    cursor: pointer;
  }

  :global(.switch:hover) {
    text-decoration: underline;
  }
</style>
