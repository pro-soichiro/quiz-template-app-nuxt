<template>
  <div>
    <v-row class="ma-2">
      <div class="text-h5">Create Quiz</div>
    </v-row>
    <v-card>
      <ValidationObserver v-slot="{ invalid }">
        <v-card-text>
          <v-row>
            <v-col>
              <ValidationProvider
                v-slot="{ errors }"
                name="問題文"
                rules="required"
              >
                <v-textarea
                  v-model="question.content"
                  label="問題"
                  :rules="errors"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-radio-group v-model="question.answer">
            <div class="d-flex">
              <v-radio :value='0' />
              <ValidationProvider
                v-slot="{ errors }"
                name="選択肢1"
                rules="required"
                class="flex-grow-1"
              >
                <v-text-field
                  v-model="question.choices.choice0.content"
                  label="選択肢1"
                  :rules="errors"
                />
              </ValidationProvider>
            </div>
            <div class="d-flex">
              <v-radio :value='1' />
              <ValidationProvider
                v-slot="{ errors }"
                name="選択肢2"
                rules="required"
                class="flex-grow-1"
              >
                <v-text-field
                  v-model="question.choices.choice1.content"
                  label="選択肢2"
                  :rules="errors"
                />
              </ValidationProvider>
            </div>
            <div class="d-flex">
              <v-radio :value='2' />
              <ValidationProvider
                v-slot="{ errors }"
                name="選択肢3"
                rules="required"
                class="flex-grow-1"
              >
                <v-text-field
                  v-model="question.choices.choice2.content"
                  label="選択肢3"
                  :rules="errors"
                />
              </ValidationProvider>
            </div>
            <div class="d-flex">
              <v-radio :value='3' />
              <ValidationProvider
                v-slot="{ errors }"
                name="選択肢4"
                rules="required"
                class="flex-grow-1"
              >
                <v-text-field
                  v-model="question.choices.choice3.content"
                  label="選択肢4"
                  :rules="errors"
                />
              </ValidationProvider>
            </div>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="brown lighten-1 white--text"
            class="ma-2"
            :disabled="invalid"
            @click="create"
          >
          <v-icon left>
            mdi-send
          </v-icon>
          create</v-btn>
        </v-card-actions>
      </ValidationObserver>
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
