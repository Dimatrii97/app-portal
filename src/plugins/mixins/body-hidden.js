const mixin = {
  methods: {
    bodyOverflowToggle() {
      let body = document.querySelector("body");
      body.style.overflow === "hidden"
        ? (body.style = "overflow:auto;")
        : (body.style = "overflow:hidden;");
    }
  }
};
export default mixin;
