<template>
    <v-card>
      <v-card-title class="headline">
        Your Cart<span v-if="cartTotal === 0">...</span>
      </v-card-title>
      <v-card-text>
        <table v-if="cartTotal > 0">
          <thead>
          <tr style="font-weight:600;">
              <td>Product</td>
              <td></td>
              <td>Unit</td>
              <td>Qty</td>
              <td>Price</td>
          </tr>
          </thead>
          <tbody>
          <tr class="item-row" v-for="(item, i) in cart" :key="item.id">
            <td><v-avatar><img :src="item.image" alt=""></v-avatar></td>
            <td>
              <h3>{{item.name}}</h3>
            </td>
            <td>${{item.product.price.toFixed(2)}}</td>
            <td v-if="$route.path !== '/checkout'"><input style="width:30px; text-align:center;" type="number" :value="item.quantity" @change="changeQuant(i, $event)"><v-icon style="margin-left: 14px;" @click="removeProd(item.id)" small>remove_shopping_cart</v-icon></td>
            <td v-else>{{item.quantity}}</td>
            <td>${{(item.quantity * item.product.price).toFixed(2)}}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td><h3>Cart Total:</h3></td>
            <td></td>
            <td>${{cartTotal.toFixed(2)}}</td>
          </tr>
          </tbody>
        </table>
        <div v-else style="width:80vw">
          <h3 style="margin-left:140px;">is empty</h3>
        </div>
        <v-layout row wrap v-if="$route.path !== '/checkout'">
          <v-flex xs12><br>
            <div v-if="$route.path !== '/checkout'">
              <p>Confirm the above items and quantities are correct before proceeding to checkout. You can not edit these in the checkout.</p>
            </div>
          <br></v-flex>
          <v-flex xs8></v-flex>
          <v-spacer></v-spacer>
          <v-flex xs2><v-btn @click="changeDialog" color="warning">Close</v-btn></v-flex>
          <v-flex xs2><v-btn @click="checkout" color="red darken-1">Checkout</v-btn></v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters ({
      cart: 'cart/cart',
      cartTotal: 'cart/cartTotal'
    })
  },
  methods: {
    ...mapMutations ({
      changeQty: 'cart/CHANGE_QTY',
      cartTot: 'cart/CART_TOTAL',
      changeDialog: 'cart/CHANGE_DIALOG',
      removeItem: 'cart/REMOVE_FROM_CART'
    }),
    changeQuant(i, event) {
      var val = event.target.value
      val = parseInt(val)
      const params = []
      params.push(i)
      params.push(val)
      console.log(params)
      this.changeQty(params)
      this.cartTot()
    },
    removeProd(id) {
      this.removeItem(id)
    },
    checkout() {
      this.changeDialog()
      this.$router.push('/checkout')
    }
  }
}
</script>

<style scoped>
  table { 
    border-collapse: separate; 
    width: 100%; 
    border-spacing: 0;
    border: 1px solid #dadada;
    border-radius: 10px;
  }
  thead td {
    border-bottom: 1px solid #dadada;
  }
  td {
    padding: 4px;
    text-align: center;
  }
  @media (max-width: 600px) {
    h3 {
      font-size: 0.7rem;
    }
    table {
      width: 92vw;
    }
  }
  @media (max-width: 400px) {
    table {
      width: 82vw;
    }
  }
  .item-row td {
    border-bottom: 1px solid #dadada;
  }
  .cart-card {
    max-width: 600px;
  }
</style>
