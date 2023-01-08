<template>
  <v-row class="ma-2">
    <div class="text-h5">{{ title }}</div>
    <slot></slot>
  </v-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    }
  }
}
</script>

<style>

</style>