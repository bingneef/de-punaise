export const setGameScore = (key, val) => state => ({
  ...state,
  game: {
    ...state.game,
    [key]: val
  },
})
