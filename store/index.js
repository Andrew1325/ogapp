import devices from '../apollo/queries/devices.gql'
import orders from '../apollo/queries/orders.gql'
import weeksReg from '../apollo/queries/weeksReg.gql'
import updateDevice from '../apollo/mutations/updateDevices.gql'
import setVisit from '../apollo/mutations/setVisit.gql'
import visits from '../apollo/queries/visits.gql'
import me from '../apollo/queries/me.gql'
import Vue from 'vue'

export const strict = false

export const state = () => ({
  reload: false,
  visits: [],
  devices: [],
  regs: [],
  regsDetail: [],
  orders: [],
})

export const getters = {
  visits: state => {
    return state.visits
  },
  devices: state => {
    return state.devices
  },
  regsDetail: state => {
    return state.regsDetail
  },
  regs: state => {
    return state.regs
  },
  orders: state => {
    return state.orders
  },
  user: state => {
    return state.user
  }
}

export const mutations = {
  setVisits (state, data) {
    state.visits = data
  },
  setDevices (state, data) {
    state.devices = data.updateDevice
  },
  setOrders (state, data) {
    state.orders = data
  },
  setWeeksRegDetail (state, data) {
    state.regsDetail = data
  },
  setRegs (state, data) {
    state.regs = data
  },
  SET_USER (state, usr) {
    if (usr === null) {
      Vue.set(state, 'user', null)
    } else {
      let data = JSON.parse(JSON.stringify(usr.me))
      Vue.set(state, 'user', {
        id: data.id,
        name: data.name,
        email: data.email,
        permissions: data.role.permissions
      })
    }
  },
}

export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('getUser')
    await dispatch('event/getEvents')
  },

  async getUser (vuexContext) {
    const tokenCookie = await this.$cookiez.get('apollo-token')
    console.log(tokenCookie)
    if (!!tokenCookie) {
      let client = this.app.apolloProvider.defaultClient
      await client.query({
        query: me
      }).then(({data}) => vuexContext.commit('SET_USER', data))
    }
  },

  onLogout (vuexContext) {
    vuexContext.commit('SET_USER', null)
  },

  async getIP ({ commit }) {
    let ip = await this.$axios.$get('https://icanhazip.com')
    ip = ip.trim()
    const client = this.app.apolloProvider.defaultClient
    await client.mutate({
      mutation: setVisit,
      variables: {
        ip: ip
      }
    })

    var date = new Date();
    var last = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000))
    var weekago = last.toISOString()
    
    let vis = await client.query({
      query: visits,
      variables: {
        query: weekago
      }
    })

    var dayStart = new Date()
    dayStart = Date.parse(dayStart)
    
    var counts = []
    const weeksVisits = JSON.parse(JSON.stringify(vis.data.visits))
    for (let i = 0; i < 7; i++) {
      let thisDay = []
      for (let a = 0; a < weeksVisits.length; a++) {
        if (Date.parse(weeksVisits[a].created_at) > (dayStart - (86400000*(i+1))) && Date.parse(weeksVisits[a].created_at) < (dayStart - (86400000*(i)))) {
          thisDay.push(weeksVisits[a])
        }
      }
      counts.push(thisDay.length)
    }
    commit('setVisits', counts.reverse())
  },

  async getRegisters({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    var date = new Date();
    var last = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000))
    var weekago = last.toISOString()

    let regs = await client.query({
      query: weeksReg,
      variables: {
        date: weekago
      }
    })
    console.log(regs.data.weeklyRegistrations)
    commit("setWeeksRegDetail", regs.data.weeklyRegistrations)
    let regCount = []

    var dayStart = new Date()
    dayStart = Date.parse(dayStart)
    let weeksRegs = regs.data.weeklyRegistrations
    for (let i = 0; i < 7; i++) {
      let thisDay = []
      for (let a = 0; a < weeksRegs.length; a++) {
        if (Date.parse(weeksRegs[a].created_at) > (dayStart - (86400000*(i+1))) && Date.parse(weeksRegs[a].created_at) < (dayStart - (86400000*(i)))) {
          thisDay.push(weeksRegs[a])
        }
      }
      regCount.push(thisDay.length)
    }
    commit('setRegs', regCount.reverse())
  },

  async getOrders({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    var date = new Date();
    var last = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000))
    var weekago = last.toISOString()

    let regs = await client.query({
      query: orders,
      variables: {
        date: weekago
      }
    })
    const weeksOrds = JSON.parse(JSON.stringify(regs.data.orders))
    let count = [0,0,0,0,0,0,0]

    var dayStart = new Date()
    dayStart = Date.parse(dayStart)

    const reducer = (accumulator, currentValue) => accumulator + currentValue
    if (weeksOrds.length > 0) {
      for (let i = 0; i < 7; i++) {
        let thisDay = weeksOrds.find(o => Date.parse(o.created_at) > (dayStart - (86400000*(i+1))) && Date.parse(o.created_at) < (dayStart - (86400000*(i))) )
        if (thisDay.length > 0) {
          let daysTots = thisDay.map(x => x.order_detail.total)
          daysTots = daysTots.reduce(reducer)
          count[i] = daysTots
        }
      }
    }
    
    commit('setOrders', count.reverse())
  },

  async nuxtClientInit( vuexContext, { req }, ctx) {
    const client = this.app.apolloProvider.defaultClient
    let deviceCount = await client.query({
      query: devices
    })
    let counter = [deviceCount.data.devices[0].mobile,deviceCount.data.devices[0].tablet,deviceCount.data.devices[0].desktop]
    
    let device
    if (this.$device.isTablet) {
      device = 'Tablet'
      counter[0]++
    }
    if (this.$device.isMobile) {
      device = 'Mobile'
      counter[1]++
    }
    if (this.$device.isDesktop) {
      device = 'Desktop'
      counter[2]++
    }
    let updateDevices = {
      id: deviceCount.data.devices[0].id,
      mobile: counter[0],
      tablet: counter[1],
      desktop: counter[2]
    }
    console.log('devices '+updateDevices.id)
    const res = await client.mutate({
      mutation: updateDevice,
      variables: updateDevices
    }).then(({data}) => vuexContext.commit('setDevices', data))
    
    const cartStore = await this.$cookiez.get('cart')
    if (!!cartStore) {
      vuexContext.dispatch('cart/setCartItems', cartStore)
    }
    vuexContext.dispatch('getIP')
    vuexContext.dispatch('getRegisters')
    vuexContext.dispatch('getOrders')
  },
  
}