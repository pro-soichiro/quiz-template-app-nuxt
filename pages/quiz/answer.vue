<template>
  <div>
    <TitleLayout :title="title">
      <v-spacer></v-spacer>
      <div class="text-h6">{{ currentIndex + 1 }} / {{ numberOfQuestion }}</div>
    </TitleLayout>
    <v-row>
      <v-progress-linear
        v-model="progressNum"
        color="blue lighten-1"
      ></v-progress-linear>
      <br>
    </v-row>

    <v-card>
      <v-list>
        <v-subheader>問題</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <p class="question">{{ currentQuestion.content }}</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-subheader>選択肢</v-subheader>
        <v-list-item-group
          v-model="selectAnswer"
          color="blue lighten-1"
        >
          <v-list-item
            v-for="(choice, i) in currentQuestion.choices"
            :key="i"
          >
            <v-list-item-content>
              {{ choice.content }}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-show="!lastQuestion"
          :disabled="selectAnswer === undefined"
          color="blue lighten-1 white--text"
          @click="nextQuestion"
        >
          Next
          <v-icon right>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        <v-btn
          v-show="lastQuestion"
          :disabled="selectAnswer === undefined"
          color="green lighten-1 white--text"
          @click="checkAnswer"
        >
          <v-icon left>
            mdi-playlist-check
          </v-icon>
          Result
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (!store.state.quiz.numberOfQuestion) {
      return redirect('/quiz')
    }
  },
  data() {
    return {
      title: 'クイズ',
      selectAnswer: undefined,
      selectAnswers: [],
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
    progressNum() {
      if(this.currentIndex === 0) return 0
      return Math.round(this.currentIndex / this.numberOfQuestion * 100)
    },
    lastQuestion() {
      return this.currentIndex === (this.numberOfQuestion - 1)
    },
  },
  methods: {
    nextQuestion() {
      this.$store.dispatch('quiz/incrementIndex')
      this.selectAnswers.push(this.selectAnswer)
      this.selectAnswer = undefined
    },
    checkAnswer() {
      this.selectAnswers.push(this.selectAnswer)
      this.$store.commit('quiz/setSelectAnswers', this.selectAnswers)
      this.$router.push('/quiz/result')
    },
  },
}
</script>

<style scoped>
p.question {
  white-space: pre-wrap;
}
</style>
