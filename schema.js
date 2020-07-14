const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const tmbdQueryUrl = (query) => `https://api.themoviedb.org/3${query}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;

// Movie Type
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
    poster_path: {
      type: GraphQLString,
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      args: {
        query: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios.get(`${tmbdQueryUrl('/movie/now_playing')}`)
          .then(res => res.data.results)
          .catch(er => er);
      },
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
});
