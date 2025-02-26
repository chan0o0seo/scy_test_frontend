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
  <v-container class="container">
    <!-- 상단 글쓰기 버튼 -->
    <v-row justify="end">
      <v-col cols="auto">
        <v-btn color="primary" @click="$router.push({ name: 'board_write' })">
          글쓰기
        </v-btn>
      </v-col>
    </v-row>

    <!-- 게시글 목록 -->
    <v-row>
      <v-col v-for="(board, index) in boards" :key="board.idx" cols="12" md="6" lg="4">
        <v-card class="mx-auto" @click="goToBoardDetail(board.idx)" elevation="2">
          <v-card-subtitle class="text-h6">
            게시글 번호 {{ index + 1 }}
          </v-card-subtitle>
          <v-card-title class="text-h5">제목: {{ board.title }}</v-card-title>
          <v-card-text>
            <p><strong>작성자:</strong> {{ board.writer }}</p>
            <p><strong>댓글 수:</strong> {{ board.comments.length }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
/* 카드에 호버 효과 추가 */
.v-card {
  transition: transform 0.2s ease-in-out;
}
.v-card:hover {
  transform: scale(1.05);
  cursor: pointer;
}
.container {
  min-width: 1000px;
}
</style>

