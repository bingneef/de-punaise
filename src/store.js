import Store, { thunk } from 'repatch'
import { AsyncStorage } from 'react-native'

export const initialState = {
  user: null,
  remoteConfig: null,
  onboarding: {},
  rehydrated: false,
  navigation: {},
  posts: [],
}

const hydrate = store => next => async reducer => {
  const state = store.getState()
  const nextState = reducer(state)

  try {
    await AsyncStorage.setItem('@hydration', JSON.stringify(nextState))
  } catch (error) { }

  return next(_ => nextState)
}

const store = new Store(initialState).addMiddleware(hydrate).addMiddleware(thunk)
export default store
