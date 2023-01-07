import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function({
  $firebase,
  store,
  route,
  redirect
}) {
  const auth = getAuth($firebase)
  const isAuthenticated = store.getters['auth/getLoggedIn']

  if(!isAuthenticated) {
    onAuthStateChanged(auth, user => {
      if(user) {
        store.dispatch('auth/addUserInfo', user)
      } else if (!route.path.match(/\/auth\//) && route.path.match(/\/.+/)) {
        redirect('/')
      }
    })
  }
}