<template>
  <div>
    <TitleLayout :title="title" />
    <v-card>
      <v-card-title>
        スコア：
        {{ numberOfCorrect }} / {{ numberOfQuestion }}問
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          dark
          color="deep-orange lighten-1"
          to="/quiz"
        >
          <v-icon left>
            mdi-autorenew
          </v-icon>
          もう一度解く
        </v-btn>
        <v-btn
          dark
          color="brown lighten-1"
          to="/mypage"
        >
          <v-icon left>
            mdi-home
          </v-icon>
          my page
        </v-btn>
      </v-card-actions>
    </v-card>
    <div
      v-for="(question, index) in questions" :key="index"
      class="my-1"
    >
      <v-card>
        <v-list>
          <v-row>
            <v-col>
              <v-subheader>問題</v-subheader>
            </v-col>
            <v-col class="text-right">
              <div
                class="mt-2 mr-4"
                :class="question.answer === selectAnswers[index]
                ? 'green--text'
                : 'red--text'"
              >
                正解
                <br>
                {{ question.choices[`choice${question.answer}`].content }}
              </div>
            </v-col>
          </v-row>
          <v-list-item>
            <v-list-item-content>
              <p class="question">{{ question.content }}</p>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list disabled>
          <v-subheader>選択肢</v-subheader>
          <v-list-item-group
            :value="selectAnswers[index]"
            color="blue lighten-1"
          >
          <v-list-item
            v-for="(choice, i) in question.choices"
            :key="i"
          >
            <v-list-item-content>
              {{ choice.content }}
            </v-list-item-content>
          </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <slot></slot>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default {
  middleware({ store, redirect }) {
    if (!store.state.quiz.numberOfQuestion) {
      return redirect('/quiz')
    }
  },
  data() {
    return {
      title: '結果',
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    questions() {
      return this.$store.getters['quiz/getQuestions']
    },
    numberOfQuestion() {
      return this.$store.getters['quiz/getNumberOfQuestion']
    },
    selectAnswers() {
      return this.$store.getters['quiz/getSelectAnswers']
    },
    numberOfCorrect() {
      return this.$store.getters['quiz/getNumberOfCorrect']
    },
  },
  async created() {
    this.$store.dispatch('quiz/checkAnswer')
    try {
      const db = getFirestore(this.$firebase)
      await addDoc(collection(db, 'scores'), {
        userUid: this.$store.getters['auth/getUserUid'],
        numberOfQuestion: this.numberOfQuestion,
        numberOfCorrect: this.numberOfCorrect,
        createdAt: new Date(),
      })
    } catch (e) {
      alert('error: ' + e)
    }
  },
  methods: {
  },
}
</script>

<style scoped>
p.question {
  white-space: pre-wrap;
}
</style>
