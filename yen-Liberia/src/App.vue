<script setup>
import AppNavbar from "@/components/layout/AppNavbar.vue"
import AppFooter from "@/components/layout/AppFooter.vue"
</script>

<template>
  <div class="min-h-screen w-full">
    <AppNavbar />

    <RouterView />

    <AppFooter />
  </div>
</template>