<script lang="ts">
  export let id: string;
  export let className = "";
  export let style = "";
</script>

<section {id} class={className}>
  <span class="flex h-full flex-col items-center justify-between p-8" {style}>
    <span>
      <slot name="top" />
    </span>
    <slot />
    <span>
      <slot name="bottom" />
    </span>
  </span>
</section>

<style>
  section {
    display: grid;
    place-items: center;
    height: 100vh;
    text-align: center;
  }
</style>
