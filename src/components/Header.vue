<template>
<v-app-bar rounded>
  <template v-slot:prepend>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </template>

  <v-app-bar-title>Cheeese</v-app-bar-title>

  <template v-slot:append>
    <v-btn icon="mdi-login"></v-btn>

    <v-btn icon="mdi-account"></v-btn>
  </template>
</v-app-bar>
</template>

<script setup>
</script>

<style scoped>

</style>