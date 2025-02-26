<script setup>
import { ref } from 'vue'
import api from '../api';

const title = ref();
const writer = ref();
const content = ref();

const submit = async () => {
  try {
    const response = await api.write(title.value, writer.value, content.value);
    console.log('게시글 작성 성공:', response);
  } catch (error) {
    console.log('게시글 작성 실패:', error);
  }
}

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="title"
        label="제목"
      ></v-text-field>
      <v-text-field
        v-model="writer"
        label="작성자"
      ></v-text-field>
      <v-textarea v-model="content" label="내용" variant="outlined"></v-textarea>
      <v-btn class="mt-2" type="submit" block>제출</v-btn>
    </v-form>
  </v-sheet>
    
</template>

<style scoped>
</style>
