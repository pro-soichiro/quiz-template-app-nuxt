<template>
  <div>
    <v-row class="ma-2">
      <div class="text-h5">Sign Up</div>
    </v-row>
    <v-row>
      <v-col sm="8">
        <v-card>
          <v-card-text>
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="brown lighten-1"
              @click="signUp"
            >ユーザー登録</v-btn>
            <v-btn
              text
              color="secondary"
              to="./login"
            >ログイン</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      title: 'Sign Up',
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
    signUp() {
      const auth = getAuth(this.$firebase)
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then( userCredential => {
          console.log( userCredential.user )
          console.log('success')
        })
        .catch(e => {
          alert(e.message)
        })
    }
  }
}
</script>

<style>

</style>