<template>
  <div class="loader" :class="{'loader-inline': inline, 'with-background': withBackground, [size]: true}">
    <img src="../../assets/images/tail-spin.svg" class="loader-icon" alt="">
  </div>
</template>

<script>
  export default {
    name: "loader",
    props: {
      inline: { type: Boolean, required: false, default: false },
      size: { type: String, required: false, default: 'medium' },
      withBackground: { type: Boolean, required: false, default: false },
    }
  };
</script>

<style lang="scss" scoped>
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    &.loader-inline {
      display: inline-flex;
    }
    &.with-background {
      padding: 10px;
      background: transparentize(black, 0.6);
      border-radius: 2px;
    }
    &.small {
      padding: 4px;
      & img {
        width: 14px;
      }
    }
    &.medium {
      padding: 8px;
      & img {
        width: 20px;
      }
    }
    &.large {
      padding: 14px;
      & img {
        width: 30px;
      }
    }
  }
</style>
