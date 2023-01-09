<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-subheader>問題</v-subheader>
        <v-spacer></v-spacer>
        <v-subheader>
          {{ typeof createdAt === 'object' ? createdAt.toDate().toLocaleString() : createdAt }}
        </v-subheader>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <p class="question">{{ content }}</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list disabled>
      <v-subheader>選択肢</v-subheader>
      <v-list-item-group
        :value="answer"
        color="red"
      >
        <v-list-item
          v-for="(choice, i) in choices"
          :key="i"
        >
          <v-list-item-content>
            {{ choice.content }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-card-actions>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    answer: {
      type: Number,
      required: true,
    },
    choices: {
      type: Array,
      required: true,
    },
    createdAt: {
      type: [Object, String],
      required: true,
    },
  },
}
</script>

<style scoped>
p.question {
  white-space: pre-wrap;
}
</style>