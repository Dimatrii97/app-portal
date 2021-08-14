module.exports = {
  devServer: {
    host: 'localhost'
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_media.scss";
        `
      }
    }
  }
}
