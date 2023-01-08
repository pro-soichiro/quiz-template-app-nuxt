<template>
    <v-card>
        <v-list>
          <v-subheader>問題</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <p>{{  content }}</p>
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
            <v-list-item>
              <v-list-item-content>
                {{ choices.choice0.content }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ choices.choice1.content }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ choices.choice2.content }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                {{ choices.choice3.content }}
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
      type: Object,
      required: true,
    }
  },
}
</script>

<style>

</style>