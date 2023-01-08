<template>
  <div>
    <TitleLayout :title="title" />
    <QuizForm :question="question" @question="question = $event">
      <template #default="slotProps">
          <v-spacer></v-spacer>
          <v-btn
            color="brown lighten-1 white--text"
            class="ma-2"
            :disabled="slotProps.invalid"
            @click="create"
          >
          <v-icon left>
            mdi-send
          </v-icon>
          create</v-btn>
      </template>
    </QuizForm>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      title: 'クイズ 作成',
      question: {
        content: '',
        answer: 0,
        choices: {
          choice0: {
            content: '',
          },
          choice1: {
            content: '',
          },
          choice2: {
            content: '',
          },
          choice3: {
            content: '',
          },
        },
      },
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  methods: {
    async create() {
      try {
        const db = getFirestore(this.$firebase)
        await addDoc(collection(db, 'questions'), {
          ...this.question,
        })
        this.$store.dispatch('message/setFlashMessage', {
          content: '作成しました',
          timeout: 3000,
          type: 'success',
        })
        this.$router.push('/db')
      } catch (e) {
        alert('error: ' + e)
      }
    },
  },
}
</script>

<style></style>
