<script lang="ts">
  import type { Response } from "./+page.server";

  export let form: Response | undefined;
</script>

<div>
  <span class="flex flex-col items-center">
    <span class="md:text-2xl">Mail me at</span>
    <a href="mailto:me@sharath.uk" class="btn btn-ghost btn-xl h-20 text-3xl lowercase md:text-6xl">me@sharath.uk</a>
  </span>
  <div class="pt-16 text-center md:text-xl">or leave a message</div>
  <form action="/contact" method="post" class="flex flex-col">
    <div class="form-control">
      <label class="label" for="email">
        <span class="label-text md:text-xl">Email</span>
      </label>
      <input name="email" type="text" placeholder="Email" class="input input-bordered md:input-lg" id="email" />
      <label class="label" for="email">
        <span class="label-text-alt text-red-500 md:text-xl">
          {#if form?.errors?.fieldErrors.email?.length}
            {form.errors.fieldErrors.email.join("")}
          {/if}
        </span>
      </label>
      <label class="label" for="message">
        <span class="label-text md:text-xl">Message</span>
      </label>
      <textarea name="message" class="textarea textarea-bordered md:textarea-lg" placeholder="Message" id="message" />
      <label class="label" for="message">
        <span class="label-text-alt text-red-500 md:text-xl">
          {#if form?.errors?.fieldErrors.message?.length}
            {form.errors.fieldErrors.message}
          {/if}
        </span>
      </label>
    </div>
    <button type="submit" class="btn btn-primary md:btn-lg">Submit</button>
  </form>
</div>
