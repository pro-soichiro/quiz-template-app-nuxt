<template>
  <div>
    <TitleLayout :title="title" />
    <v-select
      v-model="numberOfQuestion"
      label="問題数"
      :items="_.range(1, maxNumberOfQuestion + 1)"
    ></v-select>
    <v-btn @click="startQuiz">start</v-btn>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
} from 'firebase/firestore'

export default {
  data() {
    return {
      title: 'クイズ',
      questions: [],
      numberOfQuestion: 0,
      maxNumberOfQuestion: 0,
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
      const questionsRef = collection(db, 'questions');

      const querySnapshot = await getDocs(questionsRef)

      querySnapshot.forEach((doc) => {
        this.questions.push({...doc.data(), id: doc.id })
      })
      this.maxNumberOfQuestion = querySnapshot.size

      // eslint-disable-next-line no-undef
      this.questions = _.shuffle(this.questions)
    } catch (e) {
      alert('error:' + e)
    }
  },
  methods: {
    startQuiz() {
      this.$store.dispatch('quiz/startQuiz', {
        questions: this.questions,
        numberOfQuestion: this.numberOfQuestion,
      })
      this.$router.push('/quiz/answer')
    },
  },
}
</script>

<style></style>
