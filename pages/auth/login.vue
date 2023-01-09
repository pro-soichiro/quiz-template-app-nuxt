<template>
  <div>
    <TitleLayout :title="title" />
    <v-row>
      <v-col sm="8">
        <v-card>
          <v-card-text>
            <v-text-field v-model="email" label="メールアドレス" />
            <v-text-field
              v-model="password"
              label="パスワード"
              :append-icon="passwordDisplay ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordDisplay ? 'text' : 'password'"
              @click:append="passwordDisplay = !passwordDisplay"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="secondary" to="./signup">ユーザー登録</v-btn>
            <v-btn color="brown lighten-1 white--text" @click="login">ログイン</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'ログイン',
      email: '',
      password: '',
      passwordDisplay: false,
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>

<style></style>
