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
  query,
  where,
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
  computed: {
    userUid() {
      return this.$store.getters['auth/getUserUid']
    },
  },
  created() {
    this.$store.watch((state) => state.auth.userUid,
    (userUid) => this.fetchQuestions(userUid))
  },
  mounted() {
    this.fetchQuestions(this.userUid)
  },
  methods: {
    async fetchQuestions(userUid) {
      try {
        const db = getFirestore(this.$firebase)
        const questionsRef = collection(db, 'questions');

        const q = query(
          questionsRef,
          where('userUid', '==', userUid),
        )

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
          this.questions.push({...doc.data()})
        })
        this.maxNumberOfQuestion = querySnapshot.size

        // eslint-disable-next-line no-undef
        this.questions = _.shuffle(this.questions)
      } catch (e) {
        alert(e)
      }

    },
    startQuiz() {
      this.$store.dispatch('quiz/reset')
      this.questions.forEach(q => {
        // eslint-disable-next-line no-undef
        q.choices =  _.shuffle(q.choices)
      })
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
