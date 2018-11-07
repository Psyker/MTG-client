<template>
  <div class="home">
    <div class="row centered" ref="searchField">
      <div class="search-field">
        <input class="form-field" type="text" v-model="name" placeholder="Search a card, type, color...">
        <Loader v-if="$apollo.loading" size="small" with-background inline/>
      </div>
    </div>
    <transition-group name="list" tag="div" class="cards-container" v-if="cards">
      <Card :ref="'card-' + card.id" v-for="card in cards.items" :card="card" :key="card.id" @click.prevent="showCard(card)"/>
    </transition-group>
    <InfiniteLoading v-if="cards && cards.hasMore" :distance="5" @infinite="loadMore"/>
  </div>
</template>

<script>
  import Card from "../components/Card";
  import Loader from "../components/ui/Loader";
  import InfiniteLoading from "vue-infinite-loading";
  import {disapear, scaleAndTransform} from "../utils/anim";

  export default {
    components: {Loader, Card, InfiniteLoading},
    data() {
      return {
        name: "",
        page: 1,
        loadingCard: ''
      }
    },
    watch: {
      name() {
        if (this.page === 1) return
        this.page = 1
      }
    },
    methods: {
      loadMore(state) {
        this.page++
        this.$apollo.queries.cards.fetchMore({
          variables: {
            page: this.page
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            const newCards = fetchMoreResult.cards.items
            const hasMore = fetchMoreResult.cards.hasMore
            state.loaded()
            if (!hasMore) state.complete()

            return {
              cards: {
                __typename: previousResult.cards.__typename,
                items: [...previousResult.cards.items, ...newCards],
                hasMore
              }
            }
          }
        })
      },
      async showCard({ id, name, set, number }) {
        if (this.loadingCard === id) return
        let $card = this.$refs['card-' + id][0].$el
        let $cards = Object
          .keys(this.$refs)
          .filter(ref => ref.includes('card') && !ref.includes(id))
          .map(ref => this.$refs[ref])
          .filter(ref => ref.length > 0)
          .map(ref => ref[0].$el)

          $cards.forEach(card => {
            disapear(card)
          })

        disapear(this.$refs.searchField)
        this.loadingCard = id
        await scaleAndTransform($card)
        await this.$apolloProvider.defaultClient.query({
          query: require(`../graphql/queries/CardDetailQuery.graphql`),
          variables: {name, set, number},
          fetchPolicy: 'cache-first'
        })
        this.loadingCard = ''
        this.$router.push({name: 'card.detail', params: { name, set, number }})
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
