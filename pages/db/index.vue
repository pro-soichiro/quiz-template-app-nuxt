<template>
  <div>
    <v-row class="ma-2">
      <div class="text-h5">Database</div>
      <v-spacer></v-spacer>
      <v-btn dark class="brown lighten-1" to="/db/new">
        <v-icon left>
          mdi-folder-plus-outline
        </v-icon>
        new</v-btn>
    </v-row>
    <div
      v-for="(question, index) in questions" :key="index"
      class="my-1"
    >
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
          >
            <v-icon left>
              mdi-pencil-outline
            </v-icon>
            edit
          </v-btn>
          <v-btn
            dark
            color="deep-orange lighten-1"
          >
            <v-icon left>
              mdi-trash-can-outline
            </v-icon>
            delete
          </v-btn>
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
      title: 'Database',
      questions: [],
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase)
      const querySnapshot = await getDocs(collection(db, 'questions'))
      querySnapshot.forEach((doc) => {
        this.questions.push(doc.data())
      })
    } catch (e) {
      alert('error:', e)
    }
  },
}
</script>

<style></style>
