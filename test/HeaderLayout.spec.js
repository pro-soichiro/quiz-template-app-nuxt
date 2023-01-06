import { mount } from '@vue/test-utils'
import HeaderLayout from '@/components/HeaderLayout.vue'

describe('HeaderLayout', () => {
  test('コンポーネントが存在する', () => {
    const wrapper = mount(HeaderLayout)
    expect(wrapper.exists()).toBeTruthy()
  })
})
