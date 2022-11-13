<script>
    import {router} from 'tinro';
    import {fade} from 'svelte/transition';
    export let dura = 500;
</script>

{#key $router.path}
    <main in:fade="{{ duration: dura }}">
        <slot></slot>
    </main>
{/key}


<style global>
  main {
    flex: 1;
  }
</style>
