<script>
  import Profile from "./_comp/Profile.svelte";
  import ProfilEdit from "./_comp/ProfileEdit.svelte";
  import { _user } from "../lib/data";
  let act = 0;
</script>

<section>
  <div class="container-lg pt-4">
    <div class="row">
      <div>
        <h1>User Panel</h1>
        <hr />
      </div>
    </div>
  </div>
  <div class="container-lg py-4">
    <nav class="nav nav-fill nav-tabs" role="tablist">
      <button
        class="nav-link"
        class:active={act == 0}
        on:click={() => {
          act = 0;
        }}
        role="tab"
        aria-controls=""
        aria-expanded="true">Profile</button
      >

      <button
        class="nav-link"
        class:active={act == 1}
        on:click={() => {
          act = 1;
        }}
        role="tab"
        aria-controls=""
        aria-expanded="true">Edit</button
      >
    </nav>
  </div>
  {#if act == 1}
    <ProfilEdit />
  {:else}
    <Profile />
  {/if}
</section>


