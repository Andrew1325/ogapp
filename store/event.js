import events from '../apollo/queries/events.gql'

export const state = () => ({
  events: []
})

export const mutations = {
  SET_EVENTS (state, data) {
    state.events = data
  }
}

export const actions = {
  async getEvents({ commit }, res) {
    let client = this.app.apolloProvider.defaultClient
    await client.query({
      query: events,
      variables: {
        first: 4
      }
    }).then(({data}) => commit('SET_EVENTS', data.events))
    .catch(err => console.log(err))
  }
}

export const getters = {
  events: state => {
    return state.events
  }
}