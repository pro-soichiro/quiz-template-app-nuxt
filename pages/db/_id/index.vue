<template>
  <div>
    <TitleLayout :title="title">
      <v-spacer></v-spacer>
      <v-btn dark class="brown lighten-1" to="/db">
        <v-icon left>
          mdi-database
        </v-icon>
        database</v-btn>
    </TitleLayout>
    <QuizCard v-bind="question">
      <v-spacer></v-spacer>
      <v-btn
        dark
        color="green lighten-1"
        class="mr-2"
        @click="editQuiz"
      >
        <v-icon left>
          mdi-pencil-outline
        </v-icon>
        edit
      </v-btn>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            color="deep-orange lighten-1"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>
              mdi-trash-can-outline
            </v-icon>
            delete
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Confirm
          </v-card-title>

          <v-card-text class="pt-4 text-center">
            クイズを削除します。よろしいでしょうか？
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-grey lighten-1"
              text
              @click="dialog = false"
            >
              いいえ
            </v-btn>
            <v-btn
              color="deep-orange lighten-1"
              text
              @click="deleteQuiz"
            >
              はい
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </QuizCard>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      title: 'クイズ 詳細',
      dialog: false,
      id: '',
      question: {
        content: '',
        answer: 0,
        choices: [
          {
            index: 0,
            content: '',
          },
          {
            index: 1,
            content: '',
          },
          {
            index: 2,
            content: '',
          },
          {
            index: 3,
            content: '',
          },
        ],
        createdAt: '',
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
          this.$store.dispatch('message/setFlashMessage', {
            content: '削除しました',
            timeout: 3000,
            type: 'success',
          })
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
