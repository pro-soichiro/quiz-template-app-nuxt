<template>
  <div>
    <v-row class="ma-2">
      <div class="text-h5">Show Quiz</div>
    </v-row>
    <v-card>
        <v-list>
          <v-subheader>問題</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{  question.content }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list disabled>
          <v-subheader>選択肢</v-subheader>
          <v-list-item-group
            v-model="question.answer"
            color="red"
          >
            <v-list-item>
              <v-list-item-content>
                {{ question.choices.choice0.content }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ question.choices.choice1.content }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ question.choices.choice2.content }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ question.choices.choice3.content }}
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark
            color="green lighten-1"
            @click="editQuiz"
          >
            <v-icon left>
              mdi-pencil-outline
            </v-icon>
            edit
          </v-btn>
          <v-btn
            dark
            color="deep-orange lighten-1"
            @click="deleteQuiz"
          >
            <v-icon left>
              mdi-trash-can-outline
            </v-icon>
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      title: 'Edit',
      id: '',
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
      }
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  async created() {
    const db = getFirestore(this.$firebase)
    this.id = this.$route.params.id
    const docRef = doc(db, "questions", this.id);
    const docSnap = await getDoc(docRef);
    this.question = { ...docSnap.data(), id: this.id }
  },
  methods: {
    editQuiz() {
      this.$router.push(`/db/${this.id}/edit`)
    },
    async deleteQuiz() {
      const db = getFirestore(this.$firebase)
      await deleteDoc(doc(db, 'questions', this.id))
        .then(()=> {
          this.$router.push('/db')
        })
        .catch( e => {
          alert(e)
        })
    },
  },
}
</script>

<style></style>
