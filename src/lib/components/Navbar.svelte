<script lang="ts">
  import Sidebar from "$lib/components/Sidebar.svelte";
  import MenuButton from "./MenuButton.svelte";

  let isSidebarOpen = false;
  let openBtn: HTMLInputElement;
  const toggleSidebar = () => {
    openBtn.click();
  };
</script>

<div class="fixed bottom-6 right-4 z-20">
  <label for="main-navbar" class="drawer-button">
    <MenuButton {isSidebarOpen} />
  </label>
</div>

<div class="drawer drawer-end">
  <input bind:this={openBtn} id="main-navbar" type="checkbox" bind:checked={isSidebarOpen} class="drawer-toggle" />
  <div class="drawer-content flex min-h-screen min-w-0 flex-col">
    <slot />
  </div>
  <div class="drawer-side">
    <label for="main-navbar" class="drawer-overlay" />
    <Sidebar isOpen={isSidebarOpen} {toggleSidebar} />
  </div>
</div>

<style>
  .drawer-content {
    justify-content: safe center;
    align-items: safe center;
  }
</style>
