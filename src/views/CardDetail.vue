<template>
  <div class="card-detail introduction">
    <Card ref="card" v-if="card" :key="card.id" :card="card"></Card>
    caca
  </div>
</template>

<script>
  import Card from "../components/Card";
  export default {
    name: "CardDetail",
    components: {Card},
    props: {
      set: {type: String, required: true},
      number: {type: String, required: true},
      name: {type: String, required: true}
    },
    apollo: {
      card: {
        query: require('../graphql/queries/CardDetailQuery.graphql'),
        variables () {
          return {
            set: this.set,
            number: this.number,
            name: this.name
          }
        },
        fetchPolicy: 'cache-first'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-detail {
    .card {
      transform: scale(1.5);
      transform-origin: left center;
      position: fixed;
      top: calc((50% - 175px) - 3px);
      left: 280px;
    }
  }
</style>
