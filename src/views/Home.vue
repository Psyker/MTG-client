<template>
  <div class="home">
    <div class="row centered">
      <div class="search-field">
        <input class="form-field" type="text" v-model="name" placeholder="Search a card, type, color...">
        <Loader v-if="$apollo.loading" size="small" with-background inline/>
      </div>
    </div>
    <transition-group name="list" tag="div" class="cards-container" v-if="cards">
      <Card  v-for="card in cards.items" :card="card" :key="card.id"/>
    </transition-group>
    <div class="row centered spaced">
      <button v-if="cards && cards.hasMore" @click="loadMore">Load more ...</button>
    </div>
  </div>
</template>

<script>
  import Card from "../components/Card";
  import Loader from "../components/ui/Loader";
  export default {
    components: {Loader, Card},
    data() {
      return {
        name: "",
        page: 1,
      }
    },
    watch: {
      name() {
        if (this.page === 1) return
        this.page = 1
      }
    },
    methods: {
      loadMore() {
        this.page++
        this.$apollo.queries.cards.fetchMore({
          variables: {
            page: this.page
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            const newCards = fetchMoreResult.cards.items
            const hasMore = fetchMoreResult.cards.hasMore

            return {
              cards: {
                __typename: previousResult.cards.__typename,
                items: [...previousResult.cards.items, ...newCards],
                hasMore
              }
            }
          }
        })
      }
    },
    apollo: {
      cards: {
        query: require('../graphql/queries/CardsQuery.graphql'),
        variables() {
          return  {
            name: this.name,
            imageUrl: this.imageUrl
          }
        },
        debounce: 600
      }
    },
  }
</script>

<style scoped lang="scss">
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .search-field {
    position: relative;
    & .loader {
      position: absolute;
      right: 5px;
      top: 6px;
    }
  }
</style>
