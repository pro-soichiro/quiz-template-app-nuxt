<template>
  <v-app>
    <HeaderLayout />
    <MessageLayout />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <FooterLayout />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
    }
  },
}
</script>
