export function throttling(cl, timeAwait) {
  let time = null
  return function() {
    if (!time) {
      time = setTimeout(() => {
        time = null
      }, timeAwait)
      cl.apply(this, arguments)
    }
  }
}
export function debounce(cl, time) {
  let timeout
  return function() {
    let later = () => {
      timeout = null
      cl.apply(this, arguments)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, time)
  }
}
