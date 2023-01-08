<template>
  <div>
    <TitleLayout :title="title" />

    <p>{{ currentIndex + 1 }} / {{ numberOfQuestion }}</p>
    <pre>
      {{ currentQuestion }}
    </pre>
    <v-btn @click="nextQuestion">Next</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'クイズ',
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    currentIndex() {
      return this.$store.getters['quiz/getCurrentIndex']
    },
    numberOfQuestion() {
      return this.$store.getters['quiz/getNumberOfQuestion']
    },
    currentQuestion() {
      return this.$store.getters['quiz/getCurrentQuestion']
    },
  },
  created() {

  },
  methods: {
    nextQuestion() {
      this.$store.dispatch('quiz/incrementIndex')
    },
  },
}
</script>

<style></style>
