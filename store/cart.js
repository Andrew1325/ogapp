import Vue from 'vue'
import setCart from '../apollo/queries/setCart.gql'

export const state = () => ({
  cart: [],
  cartTotal: 0,
  cartDialog: false
})

export const mutations = {
  async SET_CART(state, cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
      Vue.set(state.cart, i, cartItems[i])
    }
  },
  ADD_TO_CART(state, item) {
    item.quantity = 1
    var exists = state.cart.find(p => p.id === item.id)
    if (exists) {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === item.id) {
          state.cart[i].quantity++
        }
      }
    } else {
      state.cart.push(item)
    }
    this.$cookiez.remove('cart')
    this.$cookiez.set('cart', state.cart, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  },
  CHANGE_QTY(state, params) {
    var ind = params[0]
    var qty = params[1]
    if (qty < 1) {
      qty = 1
    }
    const cartItem = {...state.cart[ind]}
    if (cartItem.stock < qty) {
      cartItem.quantity = cartItem.stock
      alert(`Only ${cartItem.stock} ${cartItem.name} are available.`)
    } else {
      cartItem.quantity = qty
    }
    Vue.set(state.cart, ind, cartItem)
    this.$cookiez.remove('cart')
    this.$cookiez.set('cart', state.cart, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  },
  REMOVE_FROM_CART(state, id) {
    let x = state.cart.findIndex(p => p.id === id)
    state.cart.splice(x, 1)
  },
  CART_TOTAL(state) {
    let tot = 0
    for (let i = 0; i < state.cart.length; i++) {
      tot += state.cart[i].quantity * state.cart[i].product.price
    }
    state.cartTotal = tot
  },
  CHANGE_DIALOG(state) {
    state.cartDialog = !state.cartDialog
  },
  EMPTY_CART(state) {
    this.$cookiez.remove('cart')
    state.cart = []
  }
}

export const actions = {
  async setCartItems( vuexContext, cartData) {
    let ids = cartData.map(v => v.id)
    var cartItems = []
    const client = this.app.apolloProvider.defaultClient
    await client.query({
      query: setCart,
      variables: {
        query: JSON.stringify(ids)
      }
    })
    .then(({ data }) => {
      cartItems = data.cartVariants
    })
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].stock < cartData[i].quantity) {
        cartItems[i].quantity = cartItems[i].stock
      } else {
        cartItems[i].quantity = cartData[i].quantity
      }
    }
    this.$cookiez.remove('cart')
    this.$cookiez.set('cart', cartItems, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    vuexContext.commit('SET_CART', cartItems)
  }
}

export const getters = {
  cart: state => state.cart,
  cartTotal: state => state.cartTotal,
  cartDialog: state => state.cartDialog
}