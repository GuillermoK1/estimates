<script setup lang="ts">
const links = [
  [{
    label: 'Inicio',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'Calculador',
    icon: 'i-heroicons-calculator',
    to: '/estimates'
  }, {
    label: 'Contacto',
    icon: 'i-heroicons-envelope',
    to: '/contact'
  },
  {
    label: 'Buscar profesionales cercanos',
    icon: 'i-heroicons-magnifying-glass',
    to: '/plasmap'
  }]
]
</script>

<template>
  <UHorizontalNavigation :links="links" class="bg-gray-200 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 rounded w-fit" />
</template>

