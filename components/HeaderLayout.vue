<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app dark color="green lighten-1">
      <div v-show="isLoggedIn">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </div>
      <v-toolbar-title >{{ title }}</v-toolbar-title>
      <v-spacer />
      <div v-show="isLoggedIn" class="mr-1">
        {{ email }}
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'HeaderLayout',
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'My Page',
          to: '/mypage',
        },
        {
          icon: 'mdi-head-question',
          title: 'Quiz',
          to: '/quiz',
        },
        {
          icon: 'mdi-database',
          title: 'Quiz Database',
          to: '/db',
        },
        {
          icon: 'mdi-logout',
          title: 'Log Out',
          to: '/auth/logout',
        },
      ],
      title: 'Quiz Template App - Nuxt',
    }
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters['auth/getLoggedIn']
    },
    email() {
      return this.$store.getters['auth/getEmail']
    },
  }
}
</script>

<style>

</style>