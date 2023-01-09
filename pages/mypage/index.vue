<template>
  <div>
    <TitleLayout :title="title" />
    <v-card
      class="mx-auto"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">
            Profile
          </div>
          <v-list-item-title class="text-h5 mb-1">
            {{ email }}
          </v-list-item-title>
          <v-list-item-subtitle>
            userUid: {{ userUid }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        ></v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-simple-table>
            <thead>
              <tr>
                <th>

                </th>
                <th class="text-right">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>正答率</td>
                <td class="text-right">{{ correctAnswerRate }}%</td>
              </tr>
              <tr>
                <td>回答数</td>
                <td class="text-right">{{ numberOfQuestion }}</td>
              </tr>
              <tr>
                <td>正解数</td>
                <td class="text-right">{{ numberOfCorrect }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-expansion-panels flat accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>History</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>
                      Score
                    </th>
                    <th class="text-right">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(score,i) in scores"
                    :key="i"
                  >
                    <td>{{ score.numberOfCorrect }}/{{ score.numberOfQuestion }}</td>
                    <td class="text-right">{{ score.createdAt.toDate().toLocaleString() }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>

export default {
  data() {
    return {
      title: 'My Page',
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    email() {
      return this.$store.getters['auth/getEmail']
    },
    userUid() {
      return this.$store.getters['auth/getUserUid']
    },
    scores() {
      return this.$store.getters['score/getScores']
    },
    correctAnswerRate() {
      return this.$store.getters['score/getCorrectAnswerRate']
    },
    numberOfQuestion() {
      return this.$store.getters['score/getNumberOfQuestion']
    },
    numberOfCorrect() {
      return this.$store.getters['score/getNumberOfCorrect']
    },
  },
  created() {
    this.$store.watch((state) => state.auth.userUid,
    (userUid) => this.scoresInit(userUid))
  },
  mounted() {
    this.scoresInit(this.userUid)
  },
  methods: {
    scoresInit(userUid) {
      this.$store.dispatch('score/scoresInit', {userUid})
    }
  },
}
</script>

<style></style>
