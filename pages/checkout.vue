<template>
  <v-layout row wrap justify-center >
    <div class="header">
      <h1>Ordinary Shop</h1>
    </div>
    <v-flex xs12><p style="text-align:center;">_</p></v-flex>

    <v-dialog
      v-model="progress"
      hide-overlay
      persistent
      width="300"
    >
      <v-card style="text-align:center">
        <v-card-text>
          Processing your order
          <br><br>
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cardSafe" style="background-color:white;">
      <div  style="background-color:white; padding:6px;">
        <h3>Card Payment Security</h3>
        <p>Security is one of the biggest considerations in everything we do. If you have any questions after reading this, or encounter any issues, please let us know.</p>
        <p>We use <a href="https://stripe.com/au">Stripe</a> for out payment processing, one of the largest and most secure payment processing companies in the world. Your credit card details are only ever seen by Stripe. Our website cannot access your details and we do not handle or store any data relating to your credit card. The payment is handled entirely by Stripe, we are simply advised that the correct amount will be charged to your card. </p>
        <p></p>
        <v-btn outline color="cyan" @click="cardSafe = !cardSafe">Got it</v-btn>
      </div>
    </v-dialog>
    <v-flex xs12 md6 style="padding: 0 20px;">
      <div>
        <h3>Ordinary Shop Checkout</h3>
        <p>Please complete the details below to finalise your purchase. You will be asked for credit card details when you click "Enter Card Details". If the items in your cart are not correct you will have to use your browser's back button, click the cart icon, and edit your cart from there.</p>
      </div>
    </v-flex>
    <v-flex xs12 md6 lg5 offset-lg2>
      <cart/>
      <br><br><br>
    </v-flex>
    <v-flex xs12 md6 lg5>
      <v-layout row wrap style="padding: 0 20px;">
          
          <v-flex xs12 sm10 lg6>
            <small><v-icon>local_shipping</v-icon>&nbsp;Free standard delivery on orders over $75</small><br>
            <small><v-icon>local_shipping</v-icon>&nbsp;Free express delivery on orders over $150</small><br>
            <small><v-icon>local_post_office</v-icon>&nbsp;Standard $10 | Express $14.95</small>
            <br><br>
            <div class="details">
              <h3>Shipping Details</h3>
              <v-form ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field v-model="form.email" :rules="emailRules" placeholder="email" type="email"></v-text-field>
                <v-text-field placeholder="confirm email" :rules="emailConfRules" type="email"></v-text-field>
                <v-text-field v-model="form.name" :rules="nameRules" placeholder="full name" required></v-text-field>
                <v-text-field v-model="form.phone" :rules="phoneRules" placeholder="phone number" ></v-text-field>
                <v-text-field v-model="form.address" :rules="addressRules" placeholder="number and street" ></v-text-field>
                <v-text-field v-model="form.town" :rules="townRules" placeholder="suburb or town"></v-text-field>
                <v-select
                  :items="states"
                  label="state"
                  v-model="state"
                ></v-select>
                <v-text-field v-model="form.country" placeholder="Australia" value="Australia" disabled />
                <v-text-field v-model="form.postcode" :rules="postcodeRules" placeholder="postcode" />
              
              <v-layout row class="addons">
              <v-flex xs6><small>I need separate</small><br><v-btn @click="billing = !billing" small flat outline color="grey">Billing</v-btn></v-flex>
              <v-flex xs6><small>I need special</small><br><v-btn @click="delivery = !delivery" small flat outline color="grey">Delivery</v-btn></v-flex>
              </v-layout>
              <div class="billing" v-if="billing">
                <small>billing details</small>
                <v-text-field v-model="form.billingAddress" placeholder="number and street" ></v-text-field>
                <v-text-field v-model="form.billingTown" placeholder="suburb or town"></v-text-field>
                <v-select
                  :items="states"
                  label="state"
                  v-model="billingState"
                ></v-select>
                <v-text-field v-model="form.billingCountry" placeholder="Australia" value="Australia" disabled />
                <v-text-field v-model="form.billingPostcode" placeholder="postcode" />
              </div>
              <div class="billing" v-if="delivery">
                <v-textarea v-model="form.deliveryInst" rows="6" cols="20" placeholder="Delivery instructions"></v-textarea>
              </div>
              <v-flex xs3 offset-xs1>
                <v-btn
                  v-if="!snackbar"
                  :disabled="!valid"
                  color="success"
                  @click="validate"
                >
                  Enter Card Details
                </v-btn>
              </v-flex>
              <small v-if="snackbar">Enter your credit card details.<span style="float:right; cursor:pointer;" @click="cardSafe = !cardSafe">About<v-icon >help_outline</v-icon></span></small>
              <card
                v-if="snackbar"
                style="border-bottom: 1px solid grey; color: grey"
                class="form-control"
                stripe="pk_live_9xydjtqH4c0UBy3DKWYboHUl"
                :options='stripeOptions'
              />
              </v-form>
              
              <v-flex v-if="snackbar" xs3 offset-xs6><v-btn @click="pay" :disabled="!valid" color="success">Pay Now<v-icon>chevron_right</v-icon></v-btn></v-flex>
            </div>
            <br><br>
          </v-flex>
        </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Cart from '@/components/Cart.vue'
import { Card, createToken } from 'vue-stripe-elements-plus'
import { mapGetters, mapMutations } from 'vuex'
import gql from 'graphql-tag'

export default {
  layout: 'shop',
  components: {
    Cart,
    Card
  },
  data() {
    return {
      stripeOptions: {
        hidePostalCode:true
      },
      valid: true,
      billing: false,
      delivery: false,
      cardSafe: false,
      states: [
        'ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'SA', 'WA'
      ],
      form: {
        email: '',
        name: '',
        phone: '',
        address: '',
        town: '',
        state: '',
        country: '',
        postcode: '',
        billingAddress: '',
        billingTown: '',
        billingState: '',
        billingCountry: '',
        billingPostcode: '',
        deliveryInst: '',
        token: '',
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Name must be at least 6 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [v => !!v || 'Phone is required'],
      addressRules: [v => !!v || 'Address is required'],
      townRules: [v => !!v || 'Town is required'],
      postcodeRules: [v => !!v || 'Postcode is required'],
      emailConfRules: [v => v === this.form.email || 'Email must match'],
      snackbar: false,
      progress: false
    }
  },
  watch: {
    progress (val) {
      if (!val) return

      setTimeout(() => (this.progress = false), 4000)
    }
  },
  computed: {
    ...mapGetters ({
      cartTotal: 'cart/cartTotal',
      cart: 'cart/cart'
    })
  },
  methods: {
    ...mapMutations ({
      emptyCart: 'cart/EMPTY_CART'
    }),
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    async pay() {
      this.progress = true
      await createToken().then(data => this.form.token = data.token.id)
      this.form.total = this.cartTotal
      this.form.cart = JSON.stringify(this.cart)
      this.$apollo.mutate({
        mutation: gql`mutation createOrder(
          $cart: String!
          $email: String!
          $name: String!
          $phone: String!
          $address: String!
          $town: String!
          $state: String
          $country: String
          $postcode: String!
          $billingAddress: String
          $billingTown: String
          $billingState: String
          $billingCountry: String
          $billingPostcode: String
          $deliveryInst: String
          $total: Float!
          $token: String!
        ) {
          createOrder (
            data:{
              cart: $cart
              email: $email
              name: $name
              phone: $phone
              address: $address
              town: $town
              state: $state
              country: $country
              postcode: $postcode
              billingAddress: $billingAddress
              billingTown: $billingTown
              billingState: $billingState
              billingCountry: $billingCountry
              billingPostcode: $billingPostcode
              deliveryInst: $deliveryInst
              total: $total
              token: $token
          }) {
            id
          }
        }`,
        variables: this.form
      })
      .then((data) => {
        this.progress = false
        console.log(data)
        alert(`Your order has been successfully processed. Your Order number is ${data.createOrder.id}. An email has been sent to your email address, ${this.form.email}. If you do not receive this email please check your spam/junk folder, or contact orders@ordinarygoddesses.com.au. Thank you for your order.`)
        this.emptyCart()
        this.$router.push('/shop')
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
   small .v-icon {
    font-size: 1.2rem;
  }
  form .v-text-field {
    position: relative;
    top: -14px;
    margin-bottom: -18px;
  }
  .details {
    width: 100%;
    background-color: #eeeeee;
    border-radius: 5px;
    padding: 8px;
    outline: 1px solid #eeeeee;
    outline-offset: 8px;
  }
  .details input, textarea {
    padding: 0 6px; 
    margin: 8px 0; 
    height:34px; 
    width: 100%; 
    border: 1px solid grey; 
    border-radius:3px;
  }
  .addons .v-btn {
    position: relative;
    left: -8px;
    top: -8px;
  }
  .billing {
    border: 1px solid grey;
    border-radius: 3px;
    margin: 6px;
    padding: 6px;
  }
  .header {
    width: 100%;
    height: 74px;
    background-color: #ffe600;
    text-align: center;
    color: rgb(99, 99, 99);
  }
  .header >>> h1 {
    line-height: 74px;
    letter-spacing: 0.4rem;
  }
</style>
