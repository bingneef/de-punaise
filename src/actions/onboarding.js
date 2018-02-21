export const setOnboarding = (newState = {}) => state => ({
  ...state,
  onboarding: { ...newState },
})
