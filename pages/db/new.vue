<template>
  <div>
    <h1>クイズ 新規作成</h1>
    <v-btn
      color="primary"
      to="/db"
    >一覧</v-btn>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="question.content"
              label="問題"
            />
          </v-col>
        </v-row>
        <v-radio-group v-model="question.answer">
          <div class="d-flex">
            <v-radio value="choice1" />
            <v-text-field
              v-model="question.choices.choice1.content"
              label="選択肢1"
            />
          </div>
          <div class="d-flex">
            <v-radio value="choice2" />
            <v-text-field
              v-model="question.choices.choice2.content"
              label="選択肢2"
            />
          </div>
          <div class="d-flex">
            <v-radio value="choice3" />
            <v-text-field
              v-model="question.choices.choice3.content"
              label="選択肢3"
            />
          </div>
          <div class="d-flex">
            <v-radio value="choice4" />
            <v-text-field
              v-model="question.choices.choice4.content"
              label="選択肢4"
            />
          </div>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="create"
        >追加</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      title: 'クイズ 新規作成',
      question: {
        content: '',
        answer: 'choice1',
        choices: {
          choice1: {
            content: '',
          },
          choice2: {
            content: '',
          },
          choice3: {
            content: '',
          },
          choice4: {
            content: '',
          },
        }
      },
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  methods: {
    async create() {
      try {
        const db = getFirestore(this.$firebase)
        await addDoc(collection(db, 'questions'), {
          ...this.question
        })
        this.$router.push('/db')
      } catch(e) {
        alert('error:', e)
      }
    }
  },
}
</script>

<style>

</style>