<template>
    <div class="board-detail">
        <div v-if="board">

            <h2>제목 {{ board.title }}</h2>
            <v-row class="mb-6" no-gutters>
                <v-col cols="3" offset="3">
                    <v-sheet class="pa-2 ma-2">
                        <p><strong>Writer:</strong> {{ board.writer }}</p>
                    </v-sheet>
                </v-col>
            </v-row>

            <v-divider></v-divider>
            <div class="board-content">

                <p>{{ board.content }}</p>
            </div>

            <v-divider></v-divider>
            
            <div style="display: flex;">
            
            <h3>댓글 작성</h3>

            <v-sheet class="mx-auto" width="300" >
                <v-form @submit.prevent="submit">
                    <v-text-field v-model="writer" label="작성자"></v-text-field>
                    <v-textarea v-model="content" label="내용" variant="outlined" @keyup.enter="submit"></v-textarea>
                    <v-btn class="mt-2" type="submit" block>제출</v-btn>
                </v-form>
            </v-sheet>
        </div>
            
            <div v-if="board.comments && board.comments.length">
                <div v-for="(comment,index) in board.comments" :key="comment.idx" class="comment-container">
                    <p>   <strong>작성자: {{ comment.writer }}</strong> </p>
                    <div class="comment-content">
                        {{ comment.content }}
                    </div>
                </div>
            </div>
            <div v-else class="comment-container">
                <p>댓글이 없습니다.</p>
            </div>
        </div>

        <v-btn class="mt-2" @Click = goList> 목록</v-btn>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import api from '../api'

const route = useRoute();
const router = useRouter();
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
const goList = () => {
    router.push({ name: 'board_list' })
}
onMounted(async () => {
    const boardIdx = route.params.idx
    const response = await api.getBoardDetail(boardIdx)
    board.value = response.data
    console.log(board.value)
})
</script>

<style scoped>
.title-container {
    display: flex;
}

.board-detail {
    min-width: 1000px;
    justify-content: center;
}

.board-content {
    font-size: x-large;
    padding: 100px;
}
.comment-container {
    padding: 10px;
    margin-top: 10px;
}
.comment-content {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: large;
}
</style>