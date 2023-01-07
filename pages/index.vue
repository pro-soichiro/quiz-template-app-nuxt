<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="headline">
          Quiz Template App - Nuxt
        </v-card-title>
        <v-card-text>
          <p>
            このアプリケーションはNuxtを利用して作成されたクイズアプリケーションです。
          </p>
          <p>
            メールアドレスとパスワードを設定し、ログインしてください。
          </p>
          <p>
            あなたのスコアを管理します。
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="brown lighten-1 white--text" nuxt to="/auth/login"> ログイン </v-btn>
          <v-btn color="blue-grey lighten-1 white--text" nuxt to="/auth/signup"> 新規登録 </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      title: 'Welcome',
    }
  },
  head() {
    return {
      title: this.title,
    }
  }
}
</script>
