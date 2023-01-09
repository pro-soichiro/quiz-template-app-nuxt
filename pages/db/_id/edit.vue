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
          @click="update"
        >
        <v-icon left>
          mdi-update
        </v-icon>
        update</v-btn>
      </template>
    </QuizForm>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      title: 'クイズ 編集',
      id: '',
      question: {
        content: '',
        answer: 0,
        choices: [
          {
            index: 0,
            content: '',
          },
          {
            index: 1,
            content: '',
          },
          {
            index: 2,
            content: '',
          },
          {
            index: 3,
            content: '',
          },
        ],
      }
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  async created() {
    const db = getFirestore(this.$firebase)
    this.id = this.$route.params.id
    const docRef = doc(db, "questions", this.id);
    const docSnap = await getDoc(docRef);
    this.question = { ...docSnap.data(), id: this.id }
  },
  methods: {
    async update() {
      try {
        const db = getFirestore(this.$firebase)
        const docRef = doc(db, "questions", this.id)
        await updateDoc(docRef, {...this.question})
          .then(() => {
            this.$store.dispatch('message/setFlashMessage', {
              content: '更新しました',
              timeout: 3000,
              type: 'success',
            })
            this.$router.push(`/db/${this.id}`)
          })
          .catch((e) => {
            alert('error: ' + e.message)
          })
      } catch (e) {
        alert('error: ' + e.message)
      }
    }
  },
}
</script>

<style></style>
