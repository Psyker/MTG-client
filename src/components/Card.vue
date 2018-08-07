<template>
    <div class="card">
      <img :src="card.imageUrl" :alt="card.name">
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: {
          card: {
            type: Object,
            required: true
          }
        }
    }
</script>

<style scoped lang="scss">
  .card {
    overflow: hidden;
    border-radius: $cardRadius;
    transition: all $transitionCardDuration;
    cursor: pointer;
    box-shadow: $shadowCard;
    width: 223px;
    height: 311px;
    display: inline-block;
    margin: 20px;
    position: relative;
    &:after {
      transition: all $transitionCardDuration;
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      z-index: 1;
      opacity: 0.3;
      border-radius: $cardRadius;
    }
    &:hover {
      transform: translateY(-4px) scale(1.025);
      box-shadow: $shadowHoverCard;
      &:after {
        opacity: 0;
      }
    }
  }
</style>
