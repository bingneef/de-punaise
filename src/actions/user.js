import { initialState } from '../store'
import firebase from 'react-native-firebase'

export const anonymousLogin = delta => state => async (dispatch, getState) => {
  try {
    const { user } = await firebase.auth().signInAnonymouslyAndRetrieveData()
    dispatch(setUser(user))
  } catch (error) {
    return dispatch(setUser({failed: true}))
  }
}


export const setUser = (user = null) => state => async (dispatch, getState) => {
  let newUser = user
  if (newUser._user) {
    newUser = newUser._user
  }

  dispatch(state => ({
    ...state,
    user: newUser,
  }))
}

export const logout = delta => state => async (dispatch, getState) => {
  try {
    await firebase.signOut()
  } catch (_) { }

  return dispatch(setUser())
}
