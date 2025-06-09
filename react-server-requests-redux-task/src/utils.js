export const debounce = (func, delay) => {
  let tId
  return function (...params) {
    clearTimeout(tId)
    tId = setTimeout(() => {
      func.apply(this, params)
    }, delay)
  }
}
