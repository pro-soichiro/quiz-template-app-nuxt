export const state = () => ({
  content: '',
  type: '',
})

export const mutations = {
  setContent(state, content) {
    state.content = content
  },
  setType(state, type) {
    state.type = type
  },
}

export const actions = {
  setFlashMessage({ commit }, payload) {
    if (typeof payload.content === 'undefined') {
      payload.content = 'メッセージを引数に渡してください'
    }
    if (typeof payload.type === 'undefined') {
      payload.type = 'info'
    }
    let timeout = payload.timeout
    if (typeof timeout === 'undefined') {
      timeout = 3000
    }

    commit('setContent', payload.content)
    commit('setType', payload.type)

    setTimeout(() => {
      commit('setContent', '')
      commit('setType', '')
    }, timeout)
  },
}

export const getters = {
  getContent: (state) => state.content,
  getType: (state) => state.type,
}
