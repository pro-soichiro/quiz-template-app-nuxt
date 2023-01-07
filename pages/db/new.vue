<template>
  <div>
    <v-row class="ma-2">
      <div class="text-h5">Create Quiz</div>
    </v-row>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="question.content"
              label="問題"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-radio-group v-model="question.answer">
          <div class="d-flex">
            <v-radio :value='0' />
            <v-text-field
              v-model="question.choices.choice0.content"
              label="選択肢1"
              :rules="[rules.required]"
            />
          </div>
          <div class="d-flex">
            <v-radio :value='1' />
            <v-text-field
              v-model="question.choices.choice1.content"
              label="選択肢2"
              :rules="[rules.required]"
            />
          </div>
          <div class="d-flex">
            <v-radio :value='2' />
            <v-text-field
              v-model="question.choices.choice2.content"
              label="選択肢3"
              :rules="[rules.required]"
            />
          </div>
          <div class="d-flex">
            <v-radio :value='3' />
            <v-text-field
              v-model="question.choices.choice3.content"
              label="選択肢4"
              :rules="[rules.required]"
            />
          </div>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          dark
          color="brown lighten-1"
          class="ma-2"
          @click="create"
        >
        <v-icon left>
          mdi-send
        </v-icon>
        create</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      title: 'Create',
      question: {
        content: '',
        answer: 0,
        choices: {
          choice0: {
            content: '',
          },
          choice1: {
            content: '',
          },
          choice2: {
            content: '',
          },
          choice3: {
            content: '',
          },
        },
      },
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  methods: {
    async create() {
      try {
        const db = getFirestore(this.$firebase)
        await addDoc(collection(db, 'questions'), {
          ...this.question,
        })
        this.$router.push('/db')
      } catch (e) {
        alert('error:', e)
      }
    },
  },
}
</script>

<style></style>
