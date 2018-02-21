import firebase from 'react-native-firebase'

export const setRemoteConfig = remoteConfig => state => {
  return {
    ...state,
    remoteConfig: {
      ...state.remoteConfig,
      ...remoteConfig,
    },
  }
}

export const fetchRemoteConfig = delta => state => async (dispatch, getState) => {
  const defaultValues = {
    hasExperimentalFeature: false
  }

  firebase.config().setDefaults(defaultValues)
  let remoteConfigValues

  try {
    await firebase.config().fetch()
    await firebase.config().activateFetched()

    const snapshots = await firebase.config().getValues(Object.keys(defaultValues))

    let remoteValues = {}
    for (let key of Object.keys(snapshots)) {
      const snapshot = snapshots[key]
      remoteValues[key] = snapshot.val()
    }

    remoteConfigValues = {
      ...defaultValues,
      ...remoteValues,
    }

  } catch (_) {
    remoteConfigValues = defaultValues
  }

  return dispatch(setRemoteConfig(remoteConfigValues))
}
