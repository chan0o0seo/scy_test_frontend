<script setup>
import { ref } from 'vue'
import api from '../api'; 
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();


// 데이터를 저장할 ref 변수
const boards = ref([]);

// 데이터 가져오는 함수
const list = async () => {
  console.log('getList');
  try {
    const res = await api.getList(); // API 호출
    if (res && res.data) {
      boards.value = res.data; // 응답 데이터를 boards에 저장
    }
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
const goToBoardDetail = (boardIdx) => {
  router.push({ name: 'board_detail', params: { idx: boardIdx } })
}
onMounted(() => {
  list();
})
</script>

<template>
  <h1>Board List</h1>
  <button @click="$router.push({ name: 'board_write' })">글쓰기</button>
    <!-- boards 배열을 v-for로 반복하여 각 게시글을 출력 -->
    <div v-for="(board, index) in boards" :key="board.idx" class="board" @click="goToBoardDetail(board.idx)">
      <h2>게시글 번호 {{ index + 1 }}</h2>
      <h2>{{ board.title }}</h2>
      <p>{{ board.content }}</p>
      <p><strong>Writer:</strong> {{ board.writer }}</p>
      <p><strong>댓글 수:</strong> {{ board.comments.length }}</p>
  
      
    </div>
  </template>

<style scoped>
</style>
