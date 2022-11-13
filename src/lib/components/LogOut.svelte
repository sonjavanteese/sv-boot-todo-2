<script>
  import { _user, supabase } from "../data";
  import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";

  let open = false;
  let size = "sm";
  export let loading = false;
  const signOut = async () => {
    try {
      loading = true;
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      loading = false;
      open = false;
    }
  };

   const toggle = async () => {
    size = "sm";
    open = !open;
    return open;
  };
</script>

{#if $_user}
  <Modal isOpen={open} {toggle} {size}>
    <ModalHeader {toggle} class="bg-warning">Warning</ModalHeader>
    <ModalBody>
        <div class="fs-5 fw-semibold text-center">
            User abmelden ?
        </div>
        </ModalBody>
    <ModalFooter class="py-1">
      <button
        class="btn btn-md btn-warning"
        on:click={() => {
          toggle().then(signOut);
        }}
      >
        Logout
      </button>
      <button class="btn btn-md btn-secondary" on:click={toggle}>Cancel</button>
    </ModalFooter>
  </Modal>

  <span on:click={toggle} {...$$restProps}>
    <slot />
  </span>
{/if}
