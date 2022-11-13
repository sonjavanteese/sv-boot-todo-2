<script>
  import Icon from "../../lib/components/Icon.svelte";
  import Loader from "../../lib/data/comp/Loader.svelte";
  import { _user, supabase, sleep } from "../../lib/data";
  let loading;
  let promise;
  let icon_size = "19";
  let icon_style = `--fs: ${icon_size}px;`;
  const generateProfil = async () => {
    console.log("generateProfil");
    try {
      loading = true;
      let uid = $_user.id;
      const { data, error } = await supabase
        .from("profiles")
        .insert([{ id: uid, username: "New User" }]);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      loading = false;
      promise = getProfil($_user.id);
    }
  };
  const getProfil = async (id) => {
    try {
      loading = true;
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id);
      if (error) throw error;

      if (!data.length) generateProfil();
      return data;
    } catch (error) {
      alert(error.message);
    } finally {
      loading = false;
    }
  };
  const signOut = async () => {
    loading = true;
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert("Error Logout!");
    } finally {
      await sleep(800);
      loading = false;
    }
  };
  $: if ($_user) {
    promise = getProfil($_user.id);
  }
</script>

{#await promise}
  <Loader />
{:then data}
  {#each data as udata}
    <!-- content here -->

    <section {...$$restProps}>
      <div class="position-relative p-4 borderx rounded-2">
        <a
          class="position-absolute top-0 end-0 mt-4 me-4"
          href="/"
          on:click|preventDefault
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 11.5C14.3284 11.5 15 10.8284 15 10C15 9.17157 14.3284 8.5 13.5 8.5C12.6716 8.5 12 9.17157 12 10C12 10.8284 12.6716 11.5 13.5 11.5Z"
              fill="#7A899B"
            />
            <path
              d="M6.5 11.5C7.32843 11.5 8 10.8284 8 10C8 9.17157 7.32843 8.5 6.5 8.5C5.67157 8.5 5 9.17157 5 10C5 10.8284 5.67157 11.5 6.5 11.5Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <!-- Media Objekt -->
        <header class="d-flex mb-4">
          <div class="flex-shrink-0">
            <img
              width="80"
              height="80"
              class="img-fluid"
              src={udata.img_url
                ? udata.img_url
                : "https://images.unsplash.com/photo-1593789382576-54f489574d26?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"}
              alt="avatar"
            />
          </div>
          <div class="flex-grow-1 ms-3 d-flex flex-column">
            <h4 class="fs-3">
              {$_user && $_user.email ? $_user.email : "no user"}
            </h4>
            <small class="text-muted"
              >{$_user && $_user.id ? $_user.id : "0000-0000-0000-0000"}</small
            >
          </div>
        </header>

        <hr />
        <!-- Username -->
        <div class="d-flex mb-1 align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <Icon name="team" style={icon_style} />
            <p class="mb-0 ps-2">Name</p>
          </div>
          <p class="mb-0 fw-semibold">{udata.username}</p>
        </div>
        <!-- Location -->
        <div class="d-flex mb-1 align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <Icon name="location" style={icon_style} />
            <p class="mb-0 ps-2">Location</p>
          </div>
          <p class="mb-0 fw-semibold">{udata.location}</p>
        </div>

        <!-- Website -->
        <div class="d-flex mb-3 align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <Icon name="link" style={icon_style} />
            <p class="mb-0 ps-2">Link</p>
          </div>
          <p class="mb-0 fw-semibold">{udata.website}</p>
        </div>
        <!-- Email -->
        <div class="d-flex mb-1 align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <Icon name="mail" style={icon_style} />
            <p class="mb-0 ps-2">Email</p>
          </div>
          <p class="mb-0 fw-light">
            {$_user && $_user.email ? $_user.email : "no user"}
          </p>
        </div>
        <hr class="mb-3" />
        <!-- ButtonBar -->
        <footer class="d-flex align-items-center justify-content-center">
          <a
            href="/edit"
            class="btn me-2 w-100 btn-outline-primary d-flex align-items-center justify-content-center"
          >
            <span>Edit</span>
          </a>
          <button
            on:click={signOut}
            class="btn w-100 btn-outline-danger d-flex align-items-center justify-content-center"
          >
            <span>Logout</span>
          </button>
        </footer>
      </div>
    </section>
  {:else}{/each}
{/await}
