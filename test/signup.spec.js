import { mount } from '@vue/test-utils'
import signup from '@/pages/auth/signup.vue'

describe('signup', () => {
  test('コンポーネントが存在する', () => {
    const wrapper = mount(signup)
    expect(wrapper.exists()).toBeTruthy()
  })
})
