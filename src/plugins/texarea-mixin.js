const mixin = {
  methods: {
    mixin_textarea_resize(el) {
      el.style.height = "5px";
      el.style.height = el.scrollHeight + "px";
    },
    mixin_textarea_clearResize(el, height) {
      el.style.height = height;
    }
  }
};
export default mixin;
