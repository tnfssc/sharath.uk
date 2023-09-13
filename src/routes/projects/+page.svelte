<script lang="ts">
  import FsSection from "$lib/components/FSSection.svelte";
  import ScrollMore from "$lib/components/ScrollMore.svelte";

  const enum Section {
    Covid19Tracker = "Covid19Tracker",
    HtOS = "htOS",
    OfficeOfCareerServices = "OfficeOfCareerServices",
    CEMS = "CEMS",
    Directions = "Directions",
    More = "More",
  }
</script>

<main class="snap-mandatory snap-y overflow-y-auto h-screen w-screen scroll-smooth text-white">
  <FsSection id={Section.Covid19Tracker} className="bg-gradient-to-bl from-orange-300 to-orange-500 snap-start">
    <span class="flex flex-col items-center">
      <a href="//covid19tracker.in" class="text-4xl hover:underline md:text-8xl">Covid19Tracker</a>
      <div class="mt-6 max-w-xl text-xl">
        This is a fork the (now discontinued) covid19india.org . It uses various APIs and web scraping techniques to collect the
        data. With traffic over 3 terabytes of data per month at it's peak, spread over millions http requests, this is my most
        popular project. And it only costs $20 per month to run it.
      </div>
    </span>
    <ScrollMore slot="bottom" href="#{Section.HtOS}" text="#{Section.HtOS}" />
  </FsSection>
  <FsSection id={Section.HtOS} className="bg-gradient-to-bl from-teal-500 to-teal-700 snap-start">
    <span class="flex flex-col items-center">
      <a href="//admin.htos.sharath.co.in" class="text-4xl hover:underline md:text-8xl">htOS</a>
      <div class="mt-6 max-w-xl text-xl">A Hostel Management System for IIT Hyderabad.</div>
    </span>
    <ScrollMore slot="bottom" href="#{Section.OfficeOfCareerServices}" text="#{Section.OfficeOfCareerServices}" />
  </FsSection>
  <FsSection id={Section.OfficeOfCareerServices} className="bg-gradient-to-bl from-purple-300 to-pink-500 snap-start">
    <span class="flex flex-col items-center">
      <a href="//ocs.iith.ac.in" class="text-4xl hover:underline md:text-8xl">Office of Career Services</a>
      <div class="mt-6 max-w-xl text-xl">One-stop-shop for all the career services of IIT Hyderabad.</div>
    </span>
    <ScrollMore slot="bottom" href="#{Section.CEMS}" text="#{Section.CEMS}" />
  </FsSection>
  <FsSection id={Section.CEMS} className="bg-gradient-to-bl from-gray-500 to-gray-700 snap-start">
    <span class="flex flex-col items-center">
      <a href="//cems.iith.ac.in" class="text-4xl hover:underline md:text-8xl">CEMS</a>
      <div class="mt-6 max-w-xl text-xl">A system of devices that monitors the energy consumption.</div>
    </span>
    <ScrollMore slot="bottom" href="#{Section.Directions}" text="#{Section.Directions}" />
  </FsSection>
  <FsSection id={Section.Directions} className="bg-gradient-to-bl from-yellow-500 to-yellow-700 snap-start">
    <span class="flex flex-col items-center">
      <a href="//x.tnfssc.vercel.app" class="text-4xl hover:underline md:text-8xl">Directions</a>
      <div class="mt-6 max-w-xl text-xl">A system of devices that monitors the energy consumption.</div>
    </span>
    <ScrollMore slot="bottom" href="#{Section.More}" text="#{Section.More}" />
  </FsSection>
  <FsSection id={Section.More} className="bg-gradient-to-bl from-blue-500 to-red-700 snap-start">
    <span class="flex flex-col items-center">
      <div class="text-4xl md:text-8xl">Many more</div>
      <div class="mt-6 max-w-xl text-xl">
        A lot of small experiments using tons of different technologies like Flutter, React Native, Tauri, Wails, Svelte,
        Android, Kafka and more.
      </div>
    </span>
  </FsSection>
</main>
