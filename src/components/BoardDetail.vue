<template>
    <div>
        <h1>게시글 상세</h1>
        <div v-if="board">
            <h2>{{ board.title }}</h2>
            <p>{{ board.content }}</p>
            <p><strong>Writer:</strong> {{ board.writer }}</p>

            <div v-if="board.comments && board.comments.length">
                <h3>댓글</h3>
                <div v-for="comment in board.comments" :key="comment.idx">
                    <p><strong>{{ comment.writer }}:</strong> {{ comment.content }}</p>
                </div>
            </div>
            <div v-else>
                <p>댓글이 없습니다.</p>
            </div>
        </div>
        <div>
            <router-link :to="{ name: 'board_list' }">목록</router-link>
            <v-sheet class="mx-auto" width="300">
                <v-form @submit.prevent="submit">
                    <v-text-field v-model="writer" label="작성자"></v-text-field>
                    <v-textarea v-model="content" label="내용" variant="outlined" @keyup.enter="submit" ></v-textarea>
                    <v-btn class="mt-2" type="submit" block>제출</v-btn>
                </v-form>
            </v-sheet>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'

const route = useRoute()
const board = ref(null);
const writer = ref();
const content = ref();
const submit = async () => {
  try {
    const response = await api.writeComment(board.value.idx, writer.value, content.value);
    console.log('댓글 작성 성공:', response);
    const boardIdx = route.params.idx
    const boardResponse = await api.getBoardDetail(boardIdx)
    board.value = boardResponse.data // 새로 가져온 게시글과 댓글 목록으로 갱신

    // 입력값 초기화
    writer.value = ''
    content.value = ''
  } catch (error) {
    console.log('댓글 작성 실패:', error);
  }
}
onMounted(async () => {
    const boardIdx = route.params.idx
    const response = await api.getBoardDetail(boardIdx)
    board.value = response.data
    console.log(board.value)
})
</script>

<style scoped></style>