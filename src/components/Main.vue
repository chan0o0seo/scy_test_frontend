<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router';
import api from '../api'; 
import { useRouter } from 'vue-router';

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
  <!-- 클릭 이벤트에서 메서드 호출 시 () 없이 메서드 이름만 사용 -->
  <RouterView />
</template>

<style scoped>
</style>
