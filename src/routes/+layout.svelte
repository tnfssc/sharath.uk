<script>
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import { Toaster } from "svelte-french-toast";
</script>

<svelte:head>
  <title>sharath.uk</title>
</svelte:head>
<Toaster position="top-end" />
<Navbar>
  <slot />
</Navbar>
