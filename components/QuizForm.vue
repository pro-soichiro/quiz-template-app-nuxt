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
          <div class="d-flex">
            <v-radio :value='0' />
            <ValidationProvider
              v-slot="{ errors }"
              name="選択肢1"
              rules="required"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="compQuestion.choices.choice0.content"
                label="選択肢1"
                :rules="errors"
              />
            </ValidationProvider>
          </div>
          <div class="d-flex">
            <v-radio :value='1' />
            <ValidationProvider
              v-slot="{ errors }"
              name="選択肢2"
              rules="required"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="compQuestion.choices.choice1.content"
                label="選択肢2"
                :rules="errors"
              />
            </ValidationProvider>
          </div>
          <div class="d-flex">
            <v-radio :value='2' />
            <ValidationProvider
              v-slot="{ errors }"
              name="選択肢3"
              rules="required"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="compQuestion.choices.choice2.content"
                label="選択肢3"
                :rules="errors"
              />
            </ValidationProvider>
          </div>
          <div class="d-flex">
            <v-radio :value='3' />
            <ValidationProvider
              v-slot="{ errors }"
              name="選択肢4"
              rules="required"
              class="flex-grow-1"
            >
              <v-text-field
                v-model="compQuestion.choices.choice3.content"
                label="選択肢4"
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