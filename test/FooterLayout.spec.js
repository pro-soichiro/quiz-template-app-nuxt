import { mount } from '@vue/test-utils'
import FooterLayout from '@/components/FooterLayout.vue'

describe('FooterLayout', () => {
  test('コンポーネントが存在する', () => {
    const wrapper = mount(FooterLayout)
    expect(wrapper.exists()).toBeTruthy()
  })
})
