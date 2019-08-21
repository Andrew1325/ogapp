import me from '../apollo/queries/me.gql'

export const state = () => ({
  user: null,
  adminLinks: {},
})

export const mutations = {
  SET_USER (state, usr) {
    let data = JSON.parse(JSON.stringify(usr.me))
    state.user = {
      id: data.id,
      name: data.name,
      permissions: data.role.permissions
    }
    console.log(state.user)
  },
  SET_ADMIN_LINKS (state, link) {
    state.adminLinks = link
  }
}

export const actions = {
  async setUser({ commit }, res) {
    let client = this.app.apolloProvider.defaultClient
    await client.query({
      query: me
    }).then(({data}) => commit('SET_USER', data))
  }
}

export const getters = {
  user: state => {
    return state.user
  },
  adminLinks: state => {
    return state.adminLinks
  }
}
