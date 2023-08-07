<script lang="ts">
  export let title: string;
</script>

<footer class="bg-dark text-light text-center p-3 max-w-100">
  <div class="container-fluid">
    <section class="row">
      <article class="col-sm-3 d-flex justify-content-center align-items-center mb-2">
        <img
          src="http://thionville-echecs.fr/wp-content/uploads/2022/05/cropped-logo-blanc2x-192x192.png"
          alt="Logo"
          width={48}
          height={48}
        />
      </article>
      <article class="col-sm-9">
        <p><em>{title} @2023</em></p>
        <p class="fs-6">
          Créé et maintenu par <a href="https://www.melvin-doucet.com/">Melvin Doucet</a> du club de
          Thionville Échecs.
        </p>
      </article>
    </section>
  </div>
</footer>
