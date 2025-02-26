<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router';
import api from '../api'; 
import { useRouter } from 'vue-router';
import Header from './Header.vue';

const router = useRouter();

const list = async () => {
  console.log('getList');

  try {
    const res = await api.getList();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <v-app>

    <Header />
    <div class="container">
      <RouterView />
    </div>
  </v-app>
</template>

<style scoped>
.container {
  margin-top: 200px;
}
</style>
