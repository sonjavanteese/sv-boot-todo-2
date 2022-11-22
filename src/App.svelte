<script>
  import { pageData, _user, supabase, sleep } from "./lib/data";
  import { Route, router } from "tinro";
  import NotFound from "./routes/NotFound.svelte";
  import TopBar from "./lib/components/TopBar.svelte";
  import Iconlib from "./lib/components/Iconlib.svelte";
  import Transition from "./lib/components/Transition.svelte";
  import StartPage from "./routes/StartPage.svelte";
  import DataPage from "./routes/DataPage.svelte";
  import SettingsPage from "./routes/SettingsPage.svelte";
  import UserPage from "./routes/UserPage.svelte";
  import SignIn from "./lib/components/SignIn.svelte";
  import Page from "./lib/components/Page.svelte";
  import { onMount } from "svelte";
  import SignUp from "./lib/components/SignUp.svelte";
  router.mode.hash();

  const changeAuth = async (user = null, delay = 1000) => {
    await sleep(delay);
    if (user) {
      _user.set(user);
    } else {
      _user.set(null);
    }
  };

  onMount(async () => {
    const {
      data: { supauser },
    } = await supabase.auth.getUser();
    _user.set(supauser);
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_IN") {
      changeAuth(session.user);
    } else {
      changeAuth(null);
    }
  });
</script>

<TopBar />

<Transition>
  <Route path="/">
    <Page>
      <StartPage {...pageData[0]} />
    </Page>
  </Route>
  {#if $_user}
    <Route path="/data">
      <Page>
        <DataPage />
      </Page>
    </Route>
    <Route path="/settings">
      <Page>
        <SettingsPage />
      </Page>
    </Route>
    <Route path="/user">
      <Page>
        <UserPage />
      </Page>
    </Route>
    <Route path="/login" redirect="/" />
    <Route path="/signup" redirect="/" />
  {:else}
    <Route path="/data" redirect="/login" />
    <Route path="/user" redirect="/login" />
    <Route path="/settings" redirect="/login" />
    <Route path="/login">
      <Page center>
        <SignIn />
      </Page>
    </Route>
    <Route path="/signup">
      <Page center>
        <SignUp />
      </Page>
    </Route>
  {/if}

  <Route fallback>
    <NotFound />
  </Route>
</Transition>

<Iconlib />
