<template>
  <div>
    <TitleLayout :title="title" />
    <div>email: {{ email }}</div>
    <div>score: {{ score }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'My Page',
      score: 0,
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
  }
}
</script>

<style>

</style>