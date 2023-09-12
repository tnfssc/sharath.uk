<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import { rotate180 } from "$lib/transitions/rotate180";

  import menuIcon from "@iconify/icons-mdi/menu";
  import closeIcon from "@iconify/icons-mdi/close";

  export let isSidebarOpen: boolean;
</script>

<span class="btn btn-circle btn-xl h-4 rotate-0 border-none bg-white text-black shadow-lg hover:bg-gray-300">
  {#if isSidebarOpen}
    <span class="absolute" transition:rotate180={{ direction: "cw" }}><Icon icon={closeIcon} size={8} /></span>
  {:else}
    <span class="absolute" transition:rotate180={{ direction: "acw" }}><Icon icon={menuIcon} size={8} /></span>
  {/if}
</span>
