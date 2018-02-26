import { AsyncStorage } from 'react-native'

export const setHydrated = (rehydratedState = {}) => {
  return state => {
    let obj = {
      ...state,
      rehydrated: true,
    }

    const items = ['user', 'remoteConfig', 'onboarding', 'navigation']

    for (let item of items) {
      obj[item] = {
        ...state[item],
        ...rehydratedState[item]
      }
    }

    return obj
  }
}

export const rehydrate = delta => state => async (dispatch, getState) => {
  try {
    const hydratedValues = await AsyncStorage.getItem('@hydration')
    return dispatch(setHydrated(JSON.parse(hydratedValues)))
  } catch (error) {
    return dispatch(setHydrated({}))
  }
}
