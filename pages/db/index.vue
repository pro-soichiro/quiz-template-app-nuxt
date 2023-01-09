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

export default {
  data() {
    return {
      title: 'Database',
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    questions() {
      return this.$store.getters['question/getQuestions']
    },
    size() {
      return this.$store.getters['question/getSize']
    },
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
    fetchQuestions(userUid) {
      this.$store.dispatch('question/fetchQuestions', { userUid })
    },
    showQuiz(id) {
      this.$router.push(`/db/${id}`)
    },
  },
}
</script>

<style></style>
