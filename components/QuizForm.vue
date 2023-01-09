<template>
  <v-card>
    <ValidationObserver v-slot="{ invalid }">
      <v-card-text>
        <v-row>
          <v-col>
            <ValidationProvider
              v-slot="{ errors }"
              name="問題文"
              rules="required"
            >
              <v-textarea
                v-model="compQuestion.content"
                label="問題"
                :rules="errors"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-radio-group v-model="compQuestion.answer">
          <div
            v-for="(choice,i) in compQuestion.choices"
            :key="i"
            class="d-flex"
          >
            <v-radio :value='i' />
            <ValidationProvider
              v-slot="{ errors }"
              :name="'選択肢' + (i+1)"
              rules="required"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="choice.content"
                :label="'選択肢' + (i+1)"
                :rules="errors"
              />
            </ValidationProvider>
          </div>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <slot :invalid="invalid"></slot>
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  computed: {
    compQuestion: {
      get() {
        return this.question;
      },
      set(newValue) {
        this.$emit('question', newValue)
      }
    }
  }
}
</script>

<style>

</style>