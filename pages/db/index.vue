<template>
  <div>
    <h1>クイズ 一覧</h1>
    <v-btn
      color="primary"
      to="/db/new"
    >新規作成</v-btn>
    <div v-for="(question, index) in questions" :key="index">
      <v-card class="my-1">
        <v-card-text>
          <v-row>
            <v-col>
              {{ question.content }}
            </v-col>
          </v-row>
          <p>正解: {{ question.answer }}</p>
          <v-row>
            <v-col>
              {{ question.choices.choice1.content }}
              <br>
              {{ question.choices.choice2.content }}
              <br>
              {{ question.choices.choice3.content }}
              <br>
              {{ question.choices.choice4.content }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            @click="show"
          >詳細</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore'

export default {
  data() {
    return {
      title: 'データベース',
      questions: []
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase)
      const querySnapshot = await getDocs(collection(db, 'questions'))
      querySnapshot.forEach( doc => {
        this.questions.push(doc.data())
      })
    } catch(e) {
      alert('error:', e)
    }
  }
}
</script>

<style>

</style>