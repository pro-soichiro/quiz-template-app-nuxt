<template>
  <div>
    <h1>ログイン</h1>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="email"
          label="メールアドレス"
        />
        <v-text-field
          v-model="password"
          label="パスワード"
          :append-icon="passwordDisplay ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordDisplay ? 'text' : 'password'"
          @click:append="passwordDisplay = !passwordDisplay"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn
          color="primary"
          @click="login"
        >ログイン</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          text
          color="secondary"
          to="./signup"
        >ユーザー登録</v-btn>
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
      this.$store.dispatch('auth/login',{
        email: this.email,
        password: this.password,
      })
    }
  }
}
</script>

<style>

</style>