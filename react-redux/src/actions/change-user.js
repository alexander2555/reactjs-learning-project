const fetchUserData = () => {
  return new Promise(res => {
    setTimeout(() => {
      res({
        name: 'Peter',
        age: 40,
      })
    }, 1000)
  })
}
export const changeUserAsync = dispatch =>
  fetchUserData().then(userData => dispatch({ type: 'CHANGE_USER', payload: userData }))
