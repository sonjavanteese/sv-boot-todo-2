<script>
	import SignOut from '../../lib/components/SignOut.svelte';
  import Loader from "../../lib/data/comp/Loader.svelte";
  import Icon from "../../lib/components/Icon.svelte";
  import { _user, supabase, sleep, _settings } from "../../lib/data";
  let loading;
  let promise;
  let username, website, img_url, location;
  let icon_size = "20";
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
      promise = getProfil();
    } catch (error) {
      alert(error.message);
    } finally {
      loading = false;
    }
  };
  // const updateProfile = async () => {
  //   try {
  //     loading = true;
  //     let uid = $_user.id;
  //     const updates = {
  //       id: uid,
  //       username,
  //       website,
  //       img_url,
  //       location,
  //       updated_at: new Date().toISOString(),
  //     };

  //     let { error } = await supabase.from("profiles").upsert(updates);

  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       alert(error.message);
  //     }
  //   } finally {
  //     loading = false;
  //   }
  // };
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
{:then value}

{#each value as data}


<div class="container-lg py-4">
  <div class="row">
    <div class="col-md-5 text-center text-md-start">
      <!-- <h3>Profile</h3> -->
      <img
        src={data.img_url
          ? data.img_url
          : "http://pinegrow.com/placeholders/img18_thumb.jpg"}
        width="120"
        height="120"
        alt="img"
        class="img-thumbnail mb-4 mb-md-0"
      />
    </div>
    <div class="col-md-7">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div
            class="align-items-start d-flex fs-6 justify-content-between"
          >
            <span> <Icon name="user" style={icon_style} /></span>
            <span class="ms-1 text-truncate">{data.username}</span>
          </div>
        </li>
        <li class="list-group-item">
          <div
            class="align-items-start d-flex fs-6 justify-content-between"
          >
            <span> <Icon name="location" style={icon_style} /></span>
            <span class="ms-1 text-truncate">{data.location}</span>
          </div>
        </li>
        <li class="list-group-item">
          <div
            class="align-items-start d-flex fs-6 justify-content-between"
          >
            <span> <Icon name="link" style={icon_style} /></span>
            <span class="ms-1 text-truncate">{data.website}</span>
          </div>
        </li>
        <li class="list-group-item">
          <div
            class="align-items-start d-flex fs-6 justify-content-between"
          >
            <span> <Icon name="team" style={icon_style} /></span>
            <span class="ms-4 text-truncate fs-6">{data.img_url}</span>
          </div>
        </li>
        <li class="list-group-item text-muted">
          <div
            class="align-items-start d-flex fs-6 justify-content-between"
          >
            <span> <Icon name="mail" style={icon_style} /></span>
            <span class="ms-1 text-truncate"
              >{$_user && $_user.email ? $_user.email : ""}</span
            >
          </div>
        </li>
        <li class="list-group-item text-muted">
          <div
            class="align-items-start d-flex fs-6 justify-content-between"
          >
            <span> <Icon name="power" style={icon_style} /></span>
            <span class="ms-4 text-truncate"
              >{$_user && $_user.id ? $_user.id : ""}</span
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="row mt-4 ">
      <div class="col py-5 text-center text-md-start">
        <SignOut bind:loading>
          <button type="button" class="btn btn-danger btn-lg">{loading ? "... loading" : "User Logout"}</button>
        </SignOut>
      </div>
    </div>
  </div>
</div>
{/each}


{/await}
</section>