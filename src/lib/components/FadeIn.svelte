<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<div in:fade {...$$props}>
  {#if mounted}
    <slot />
  {/if}
</div>
