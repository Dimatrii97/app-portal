module.exports = {
  css: {
    loaderOptions: {

      sass: {
        additionalData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_media.scss";
        `
      }
      // sass: {
      //   additionalData: '@import "@/assets/styles.scss";'
      // }
    }
  }
};
