<script>
  import Loader from "../../lib/data/comp/Loader.svelte";
  import { _user, supabase, sleep, _settings } from "../../lib/data";
  export let img;
  let loading;
  let promise;
  let username, website, img_url, location;
  const updateProfile = async () => {
    try {
      loading = true;
      let uid = $_user.id;
      const updates = {
        id: uid,
        username,
        website,
        img_url,
        location,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
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

      if (!data.length) {
        generateProfil();
      } else {
        img_url = data[0].img_url;
        return data;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      loading = false;
    }
  };
  $: if ($_user) {
    promise = getProfil($_user.id);
  }
</script>

<section {...$$restProps}>
{#await promise}
  <Loader />
{:then data}
  <div class="text-center">
    <img
      src={img_url
        ? img_url
        : "https://nwp-cgn.de/studio/upload/kat11/server/php/files/alieness_128.png"}
      width="80"
      height="80"
      class="img-fluid"
      alt="avatar"
    />
  </div>
  <hr>
  {#each data as udata}
    <form class="" on:submit|preventDefault={updateProfile}>
      <div class="mb-2 row">
        <label for="in1" class="col-3 col-form-label"> User Name </label>
        <div class="col-9">
          <input
            id="in1"
            type="text"
            class="form-control"
            placeholder="Username"
            value={udata.username ? udata.username : ""}
            on:change={(e) => {
              username = e.currentTarget.value;
            }}
          />
        </div>
      </div>
      <div class="mb-2 row">
        <label for="in2" class="col-3 col-form-label"> Location </label>
        <div class="col-9">
          <input
            id="in2"
            type="text"
            class="form-control"
            placeholder="Location"
            value={udata.location ? udata.location : ""}
            on:change={(e) => {
              location = e.currentTarget.value;
            }}
          />
        </div>
      </div>
      <div class="mb-2 row">
        <label for="in3" class="col-3 col-form-label"> Website </label>
        <div class="col-9">
          <input
            id="in3"
            type="url"
            class="form-control"
            placeholder="https://"
            value={udata.website ? udata.website : ""}
            on:change={(e) => {
              website = e.currentTarget.value;
            }}
          />
        </div>
      </div>
      <div class="mb-2 row">
        <label for="in4" class="col-3 col-form-label"> Avatar </label>
        <div class="col-9">
          <input
            id="in4"
            type="url"
            class="form-control"
            placeholder="https://"
            value={udata.img_url ? udata.img_url : ""}
            on:blur={(e) => {
              img_url = e.currentTarget.value;
            }}
          />
        </div>
      </div>
      <hr class="mb-2" />

      <div class="mb-2 py-2 row g-2">
        <div class="col">
          <a href="/user" class="d-block w-100 btn btn-outline-secondary"
            >Cancel</a
          >
        </div>
        <div class="col">
          <button type="submit" class="d-block w-100 btn btn-primary"
            >{loading ? "... loading" : "Save Profil"}</button
          >
        </div>
        
      </div>
    </form>
  {/each}
{/await}
</section>