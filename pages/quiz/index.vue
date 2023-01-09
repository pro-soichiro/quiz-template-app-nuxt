<template>
  <div>
    <TitleLayout :title="title" />
    <v-card>
      <v-card-title>問題数を選択してください。</v-card-title>
      <v-card-text>
        <v-select
          v-model="numberOfQuestion"
          label="問題数"
          :items="_.range(1, maxNumberOfQuestion + 1)"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!numberOfQuestion"
          color="green lighten-1 white--text"
          @click="startQuiz"
        >
          <v-icon left>
            mdi-run-fast
          </v-icon>
          start
        </v-btn>
      </v-card-actions>
    </v-card>
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
      this.$store.dispatch('quiz/reset')


      // this.questions.forEach(q=> q.choices.shuffleする)
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
