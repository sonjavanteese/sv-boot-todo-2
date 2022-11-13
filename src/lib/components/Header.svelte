<script>
  export let titel = "Nwp-Studio";
  export let sub = "Application";
  export let bg =
    "https://nwp-cgn.de/studio/upload/kat11/server/php/files/jc1.png";
</script>

<section class="bg-dark text-light">
  <div class="container-lg py-4">
    <header class="text-light">
      <h1 class="display-6 fw-semibold mb-1">
        {titel}
      </h1>
      <h2 class="fw-light fs-2 text-muted">
        {sub}
      </h2>
      <slot />
    </header>
  </div>
</section>
