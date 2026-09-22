<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="min-h-screen bg-black text-white flex items-center justify-center px-6">
    <div class="text-center max-w-xl">
      <p class="text-yellow-400 font-semibold tracking-widest uppercase mb-3">
        404 Error
      </p>

      <h1 class="text-4xl md:text-6xl font-bold mb-5">
        Page Not Found
      </h1>

      <p class="text-gray-300 mb-8">
        The page you are looking for does not exist or may have been moved.
      </p>

      <RouterLink
        :to="{ name: 'home' }"
        class="inline-flex items-center justify-center rounded-md bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
      >
        Back to Home
      </RouterLink>
    </div>
  </main>
</template>