<template>
  <div class="home">
    <label>
      <input type="text" v-model="name">
    </label>
    <!--<ApolloQuery :debounce="400" :variables="{name}" :query="require('../graphql/queries/CardsQuery.graphql')">-->
      <!--<template slot-scope="{result:  {loading, error, data}}">-->
        <div v-if="$apollo.loading">Loading ...</div>
       <div v-else-if="cards" v-for="card in cards" :key="card.id">
         <img :src="card.imageUrl" alt="">
         <div v-for="color in card.colors" :key="color">{{color}}</div>
       </div>
      <!--</template>-->
    <!--</ApolloQuery>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: ""
      }
    },
    apollo: {
      cards: {
        query: require('../graphql/queries/CardsQuery.graphql'),
        variables() {
          return {name: this.name}
        },
        debounce: 400
      }
    }
  }
</script>
