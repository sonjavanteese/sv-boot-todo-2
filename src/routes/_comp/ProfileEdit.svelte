<script>
  import Loader from "../../lib/data/comp/Loader.svelte";
  import { _user, supabase, sleep, _settings } from "../../lib/data";
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

      if (!data.length) {
        generateProfil();
      } else {
        img_url = data[0].img_url;
        username = data[0].username;
        location = data[0].location;
        website = data[0].website;
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

{#each data as udata}

<div class="container-lg py-4">
    <div class="row">
      <div class="col-md-5 text-center text-md-start">
       <!--  <h3>Profile</h3> -->
        <img
          src={udata.img_url
            ? udata.img_url
            : "http://pinegrow.com/placeholders/img18_thumb.jpg"}
          width="120"
          height="120"
          alt="img"
          class="img-thumbnail mb-4 mb-md-0"
        />
      </div>
      <div class="col-md-7">
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
      </div>
    </div>
  </div>

 
   
  {/each}
{/await}
</section>