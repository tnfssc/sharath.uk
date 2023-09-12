<script>
  import { scale } from "svelte/transition";
  import { shuffleArray } from "$lib/utils/shuffleArray";
  import { onMount } from "svelte";
  import Icon from "$lib/components/Icon.svelte";

  import ghostIcon from "@iconify/icons-logos/ghost";
  import jitsiIcon from "@iconify/icons-simple-icons/jitsi";
  import appsmithIcon from "@iconify/icons-simple-icons/appsmith";
  import fileIcon from "@iconify/icons-mdi/file";
  import pastebinIcon from "@iconify/icons-simple-icons/pastebin";
  import portainerIcon from "@iconify/icons-simple-icons/portainer";
  import minioIcon from "@iconify/icons-simple-icons/minio";
  import paddingIcon from "@iconify/icons-material-symbols/padding";
  import bitwardenIcon from "@iconify/icons-simple-icons/bitwarden";
  import leafletIcon from "@iconify/icons-simple-icons/leaflet";
  import visualstudiocodeIcon from "@iconify/icons-simple-icons/visualstudiocode";
  import uptimekumaIcon from "@iconify/icons-simple-icons/uptimekuma";
  import consoleIcon from "@iconify/icons-mdi/console";

  const selfHosted = shuffleArray([
    {
      content: "Ghost",
      href: "//blog.sharath.co.in",
      background: "bg-gradient-to-tl from-green-900 to-green-400",
      description: "Private blog",
      icon: ghostIcon,
    },
    {
      content: "Jitsi",
      href: "//meet.sharath.co.in",
      background: "bg-gradient-to-tl from-purple-900 to-orange-500",
      description: "Alternative to Google Meet",
      icon: jitsiIcon,
    },
    {
      content: "Appsmith",
      href: "//appsmith.sharath.co.in",
      background: "bg-gradient-to-tl from-orange-900 to-orange-700",
      description: "Power Apps alternative",
      icon: appsmithIcon,
      private: true,
    },
    {
      content: "RxResume",
      href: "//resume.sharath.co.in",
      background: "bg-gradient-to-tl from-yellow-900 to-orange-400",
      description: "Resume builder",
      icon: fileIcon,
    },
    {
      content: "dpaste",
      href: "//bin.sharath.co.in/",
      background: "bg-gradient-to-tl from-stone-900 to-stone-900",
      description: "Private paste bin service",
      icon: pastebinIcon,
    },
    {
      content: "Portainer",
      href: "//portainer.sharath.co.in",
      background: "bg-gradient-to-tl from-cyan-900 to-cyan-500",
      description: "Container management",
      icon: portainerIcon,
      private: true,
    },
    {
      content: "MinIO",
      href: "//minio.sharath.co.in",
      background: "bg-gradient-to-tl from-red-900 to-red-500",
      description: "Minio",
      icon: minioIcon,
      private: true,
    },
    {
      content: "RustPad",
      href: "//pad.sharath.co.in/",
      background: "bg-gradient-to-tl from-yellow-500 to-stone-500",
      description: "Online collaborative notepad",
      icon: paddingIcon,
    },
    {
      content: "BitWarden",
      href: "//vaultwarden.sharath.co.in",
      background: "bg-gradient-to-tl from-blue-900 to-blue-700",
      description: "Open source password manager",
      icon: bitwardenIcon,
      private: true,
    },
    {
      content: "Netdata",
      href: "//netdata.sharath.co.in",
      background: "bg-gradient-to-tl from-green-900 to-green-500",
      description: "My node stats",
      icon: leafletIcon,
      private: true,
    },
    {
      content: "VSCode",
      href: "//code.sharath.co.in",
      background: "bg-gradient-to-tl from-blue-900 to-blue-500",
      description: "VSCode in browser",
      icon: visualstudiocodeIcon,
      private: true,
    },
    {
      content: "Tabby",
      href: "//tabby.sharath.co.in",
      background: "bg-gradient-to-tl from-stone-700 to-stone-500",
      description: "SSH in browser",
      icon: consoleIcon,
    },
  ]);

  let show = false;

  onMount(() => {
    show = true;
  });
</script>

{#if show}
  <div class="grid grid-cols-1 gap-6 py-10 text-center sm:grid-cols-3 xl:grid-cols-4">
    {#each selfHosted as site, i (site.href)}
      <div class="tooltip" data-tip={site.description}>
        <a
          target="_blank"
          class="w-48 hover:scale-105 {site.background}"
          href={site.href}
          in:scale={{ delay: i * 50 }}
          on:click|preventDefault={(e) => {
            if (site.private && !e.ctrlKey) e.preventDefault(); // User needs to press `ctrl` and click to open private services
            else window.open(site.href, "_blank");
          }}
        >
          <span>
            <Icon icon={site.icon} size={25} />
          </span>
          <span class="mt-4">{site.content}</span>
        </a>
      </div>
    {/each}
    <div class="tooltip col-span-full" data-tip="Status page">
      <a
        target="_blank"
        href="//status.sharath.co.in"
        class="w-full hover:scale-105"
        in:scale={{ delay: selfHosted.length * 50 }}
      >
        <span>
          <Icon icon={uptimekumaIcon} size={25} />
        </span>
        <span class="mt-4">Uptime Kuma</span>
      </a>
    </div>
  </div>
{/if}

<style>
  a {
    @apply btn btn-lg flex h-48 flex-col items-center normal-case text-white;
  }
</style>
