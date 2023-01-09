import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore'

export const state = () => ({
  questions: [],
  size: 0,
})


export const mutations = {
  setQuestions(state, questions) {
    state.questions = questions
  },
  setSize(state, size) {
    state.size = size
  },
}

export const actions = {
  async fetchQuestions({commit}, payload) {
    try {
      const db = getFirestore(this.$firebase)
      const questionsRef = collection(db, 'questions')

      const q = query(
        questionsRef,
        where('userUid', '==', payload.userUid),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)
      const questions = []
      querySnapshot.forEach((doc) => {
        questions.push({ ...doc.data() })
      })

      commit('setQuestions', questions)
      commit('setSize', querySnapshot.size)
    } catch (e) {
      alert(e)
    }
  },
}

export const getters = {
  getQuestions: (state) => state.questions,
  getSize: (state) => state.size,
}