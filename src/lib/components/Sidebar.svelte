<script lang="ts">
  import Item from "$lib/components/Sidebar/Item.svelte";

  import homeIcon from "@iconify/icons-material-symbols/home";
  import contactIcon from "@iconify/icons-material-symbols/contact-page-rounded";
  import aboutIcon from "@iconify/icons-mdi/information-outline";
  import serverNetwork from "@iconify/icons-mdi/server-network";

  export let isOpen = false;
  export let toggleSidebar: () => void;

  const items = [
    {
      href: "/",
      icon: homeIcon,
      text: {
        content: "home",
        strokeLength: 260,
      },
    },
    {
      href: "/contact",
      icon: contactIcon,
      text: {
        content: "contact",
        strokeLength: 210,
      },
    },
    {
      href: "/projects",
      icon: aboutIcon,
      text: {
        content: "projects",
        strokeLength: 210,
      },
    },
    {
      href: "/self-hosted",
      icon: serverNetwork,
      text: {
        content: "self-hosted",
        strokeLength: 210,
      },
    },
  ];
</script>

{#if isOpen}
  <ul
    class="menu h-screen w-full bg-base-100 p-4 text-base-content sm:w-[460px]"
    on:click={toggleSidebar}
    on:keydown={() => ""}
  >
    {#each items as item (item.href)}
      <li class="py-2">
        <a href={item.href}>
          <span class="h-12" />
          <Item
            delay={100}
            strokeLength={item.text.strokeLength}
            strokeWidth={2}
            height={96}
            fontSize={64}
            duration={1000}
            text={item.text.content}
          />
        </a>
      </li>
    {/each}
  </ul>
{/if}

<style>
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
