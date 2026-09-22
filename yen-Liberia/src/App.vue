<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen w-full bg-white">
    <AppNavbar />

    <main>
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>