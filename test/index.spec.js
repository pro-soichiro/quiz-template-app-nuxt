import { mount } from '@vue/test-utils'
import index from '@/pages/index.vue'

describe('index', () => {
  test('コンポーネントが存在する', () => {
    const wrapper = mount(index)
    expect(wrapper.exists()).toBeTruthy()
  })
})
