<template>
  <div class="card" @click="$emit('click', $event)">
    <transition>
      <Loader v-if="loading"></Loader>
    </transition>
    <img :src="card.imageUrl" :alt="card.name">
  </div>
</template>

<script>
    import Loader from "./ui/Loader";
    export default {
        name: "Card",
      components: {Loader},
      props: {
          loading: {type: Boolean, default: false},
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
