export const setNavigation = (newState = {}) => state => ({
  ...state,
  navigation: { ...newState },
})
