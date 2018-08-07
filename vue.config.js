module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/modules/_mixins.scss";
          @import "@/assets/scss/modules/_variables.scss";
        `
      }
    }
  }
}
