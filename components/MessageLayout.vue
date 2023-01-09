<template>
  <v-snackbar
    v-model="message"
    top
    outlined
    elevation="18"
    :color="type"
  >
    {{ content }}
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters['message/getMessage']
    },
    content() {
      return this.$store.getters['message/getContent']
    },
    type() {
      return this.$store.getters['message/getType']
    },
  }
}
</script>

<style>

</style>