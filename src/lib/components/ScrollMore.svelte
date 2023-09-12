<script lang="ts">
  import Icon from "./Icon.svelte";
  import arrowDown from "@iconify/icons-mdi/arrow-down";

  export let href = "#";
  export let text = "scroll down";
</script>

<a {href}>
  <span class="flex flex-col items-center">
    <span class="pb-2 text-sm">{text}</span>
    <Icon icon={arrowDown} size={16} />
  </span>
</a>
