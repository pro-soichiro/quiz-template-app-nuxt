<template>
  <div>
    <TitleLayout :title="title" >
      <div class="text-h6 ml-3">{{ size }}件</div>
      <v-spacer></v-spacer>
      <v-btn dark class="brown lighten-1" to="/db/new">
        <v-icon left>
          mdi-folder-plus-outline
        </v-icon>
        new</v-btn>
    </TitleLayout>
    <div v-show="!size">クイズはありません。</div>
    <div
      v-for="(question, index) in questions" :key="index"
      class="my-1"
    >
      <QuizCard v-bind="question">
        <v-spacer></v-spacer>
        <v-btn
          dark
          color="green lighten-1"
          @click="showQuiz(question.id)"
        >
          <v-icon left>
            mdi-eye
          </v-icon>
          show
        </v-btn>
      </QuizCard>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore'

export default {
  data() {
    return {
      title: 'Database',
      questions: [],
      size: 0,
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase)
      const querySnapshot = await getDocs(collection(db, 'questions'))
      querySnapshot.forEach((doc) => {
        this.questions.push({ ...doc.data(), id: doc.id })
      })
      this.size = querySnapshot.size
    } catch (e) {
      alert('error:' + e)
    }
  },
  methods: {
    showQuiz(id) {
      this.$router.push(`/db/${id}`)
    },
  },
}
</script>

<style></style>
