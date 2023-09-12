<script lang="ts">
  import FsSection from "$lib/components/FSSection.svelte";
  import ScrollMore from "$lib/components/ScrollMore.svelte";

  const enum Section {
    Hi = "hi",
    WhoIAm = "whoiam",
    WhatIAm = "whatiam",
    WhatIDid = "whatidid",
  }
</script>

<main>
  <FsSection id={Section.Hi} className="bg-gradient-to-bl from-teal-900 to-teal-700 snap-start">
    <div class="text-8xl">Hi</div>
    <ScrollMore slot="bottom" href="#{Section.WhoIAm}" text="scroll down" />
  </FsSection>

  <FsSection id={Section.WhoIAm} className="bg-gradient-to-bl from-yellow-900 to-yellow-700 snap-start">
    <span class="text-4xl">I am Sharath 🤓</span>
    <ScrollMore slot="bottom" href="#{Section.WhoIAm}" text="keep going" />
  </FsSection>

  <FsSection id={Section.WhatIAm} className="bg-gradient-to-bl from-blue-900 to-blue-700 snap-start">
    <span class="flex flex-col items-center">
      <span class="p-3 text-4xl">I am a software developer</span>
      <span class="p-3 text-4xl">I craft 💻 software</span>
    </span>
    <ScrollMore slot="bottom" href="#{Section.WhoIAm}" text="there's more" />
  </FsSection>

  <FsSection id={Section.WhatIDid} className="bg-gradient-to-bl from-green-900 to-green-700 snap-start">
    <span class="flex flex-col items-center">
      <span class="p-3 text-4xl">I have built</span>
      <span class="p-3 text-4xl">👨‍💻 web apps</span>
      <span class="p-3 text-4xl">📱 mobile apps?</span>
      <span class="p-3 text-4xl">🖥️ desktop apps?</span>
      <a class="animate-pulse p-3 text-xl hover:underline" href="/projects">Learn more</a>
    </span>
  </FsSection>
</main>

<style>
  main {
    scroll-snap-type: y mandatory;
    overflow-y: auto;
    height: 100vh;
    width: 100vw;
    scroll-behavior: smooth;
  }
</style>
