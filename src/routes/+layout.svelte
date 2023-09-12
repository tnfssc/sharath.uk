<script>
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<svelte:head>
  <title>sharath.uk</title>
</svelte:head>
<Navbar>
  <slot />
</Navbar>
