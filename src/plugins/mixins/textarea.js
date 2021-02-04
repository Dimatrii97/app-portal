const mixin = {
  methods: {
    m_textarea_resize(el) {
      el.style.height = '5px'
      el.style.height = el.scrollHeight + 'px'
    },
    m_textarea_clearResize(el) {
      el.style.height = '41px'
    }
  }
}
export default mixin
