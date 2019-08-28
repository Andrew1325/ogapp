<template>
  <v-layout row wrap justify-center style="padding: 0 20px;">
    <v-dialog
      v-model="progress"
      hide-overlay
      persistent
      width="300"
    >
      <v-card style="text-align:center">
        <v-card-text>
          Processing your registration
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
      <div  style="background-color:white; padding:16px; outline: 1px solid grey; outline-offset: -8px">
        <h3>Card Payment Security</h3>
        <p style=" font-weight:400;">Security is one of the biggest considerations in everything we do. If you have any questions after reading this, or encounter any issues, please let us know.</p>
        <p style=" font-weight:400;">We use <a href="https://stripe.com/au">Stripe</a> for out payment processing, one of the largest and most secure payment processing companies in the world. Your credit card details are only ever seen by Stripe. Our website cannot access your details and we do not handle or store any data relating to your credit card. The payment is handled entirely by Stripe, we are simply advised that the correct amount will be charged to your card. </p>
        <p></p>
        <v-btn outline color="cyan" @click="cardSafe = !cardSafe">Got it</v-btn>
      </div>
    </v-dialog>
    
    <v-flex xs12 md10 xl8 offset-md1 offset-xl2>
      <v-layout row wrap style="padding: 0 20px;">
          
          <v-flex xs12 lg6 offset-lg3>
            
            <br><br>
            <div class="details">
              <h3>Ordinary Goddesses Event Registration</h3>
        <br>
        <p>Please complete the details below to register for <strong>{{event.title}}</strong>.
          <span v-if="!event.free && event.cost > 0">The cost for this event is ${{event.cost.toFixed(2)}}.</span>
          <span v-if="!event.free && event.cost === 0">Registration for this event is by donation. The amount you donate is up to you but must be a minimum of $5.</span>
          <span v-if="!event.free">You will be asked for credit card details when you click "Enter Card Details".</span>
          <span v-if="!event.free && event.cost === 0"></span>
        </p>
              <h3>Your Details</h3>
              <small>* required fields</small>
              <v-form ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field v-model="form.email" :rules="emailRules" placeholder="email*" type="email"></v-text-field>
                <v-text-field placeholder="confirm email*" :rules="emailConfRules" type="email"></v-text-field>
                <v-text-field v-model="form.name" :rules="nameRules" placeholder="full name*" required></v-text-field>
                <v-text-field v-model="form.phone" placeholder="phone number" ></v-text-field>
                <v-text-field v-model="form.address" placeholder="number and street" ></v-text-field>
                <v-text-field v-model="form.town" placeholder="suburb or town"></v-text-field>
                <v-select
                  :items="states"
                  label="state"
                ></v-select>
                <v-text-field v-model="form.country" placeholder="Australia" value="Australia" disabled />
                <v-text-field v-model="form.postcode" placeholder="postcode" />
              
              <v-layout row class="addons">
              <v-flex xs6><small>I have special</small><br><v-btn @click="delivery = !delivery" small flat outline color="grey">Requirements</v-btn></v-flex>
              </v-layout>
              <div class="billing" v-if="delivery">
                <v-textarea v-model="form.specReq" rows="6" cols="20" placeholder="Dietary or other requirements"></v-textarea>
              </div>
                <template v-if="event.free">
                  <p>Ordinary Goddesses is a volunteer run organisation. Any donations are gladly accepted and if you would like to donate while registering for this event you can do so by entering an amount in the area below.</p>
                  <v-text-field v-model="form.donation" type="number" placeholder="Enter donation amount" />
                </template>
                <v-text-field v-if="!event.free && event.cost === 0" v-model="form.donation" :rules="donationRules" type="number" placeholder="Enter donation amount" />
              
              <template v-if="!event.free || form.donation > 0">
                <v-flex xs3>
                  <v-btn
                    v-if="!snackbar"
                    :disabled="!valid"
                    color="success"
                    @click="validate"
                  >
                    Enter Card Details
                  </v-btn>
                </v-flex>
                <small v-if="snackbar">The total payable today is ${{payable}}. Please complete payment to finalise registration.<br><br></small>
                <small v-if="snackbar">Enter your credit card details.<br></small>
               
                <card
                  v-if="snackbar"
                  style="border-bottom: 1px solid grey; color: grey"
                  class="form-control"
                  stripe="pk_live_9xydjtqH4c0UBy3DKWYboHUl"
                  :options='stripeOptions'
                />
                 <span v-if="snackbar" style="cursor:pointer;" @click="cardSafe = !cardSafe"><br>About<v-icon >help_outline</v-icon></span>
              </template>
              <template v-else>
                <v-flex xs3 offset-xs1>
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    @click="nopay"
                  >
                    Register
                  </v-btn>
                </v-flex>
              </template>

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
import { Card, createToken } from 'vue-stripe-elements-plus'
import { mapGetters, mapMutations } from 'vuex'
import gql from 'graphql-tag'

export default {
  components: {
    Card
  },
  data() {
    return {
      stripeOptions: {
        hidePostalCode:true
      },
      valid: true,
      delivery: false,
      cardSafe: false,
      states: [
        'ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'
      ],
      form: {
        event: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        town: '',
        state: '',
        country: '',
        postcode: '',
        specReq: '',
        token: '',
        cost: 0,
        donation: '',
      },
      dat: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Name must be at least 6 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      emailConfRules: [v => v === this.form.email || 'Email must match'],
      donationRules: [
        v => !!v || 'Donation is required',
        v => v > 4.99 || 'Donation must be a minimum of $5'
      ],
      snackbar: false,
      progress: false
    }
  },
  computed: {
    ...mapGetters ({
      events: 'event/events'
    }),
    event() {
      return this.events.find(e => e.id === this.$route.params.id)
    },
    payable() {
      if (this.form.donation === '') {
        return this.event.cost.toFixed(2)
      }
      return (parseFloat(this.event.cost) + parseFloat(this.form.donation)).toFixed(2)
    }
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
      if (this.$refs.form.validate()) {
        this.progress = true
        await createToken().then(data => this.form.token = data.token.id)
        this.form.cost = parseFloat(this.event.cost)
        if (this.form.donation === '') {
          this.form.donation = 0
        }
        this.form.donation = parseFloat(this.form.donation)
        this.form.event = this.$route.params.id
        this.$apollo.mutate({
          mutation: gql`mutation createRegistration(
            $event: String!
            $email: String!
            $name: String!
            $phone: String
            $address: String
            $town: String
            $state: String
            $country: String
            $postcode: String
            $specReq: String
            $cost: Float!
            $donation: Float!
            $token: String!
          ) {
            createRegistration (
              data:{
                event: $event
                email: $email
                name: $name
                phone: $phone
                address: $address
                town: $town
                state: $state
                country: $country
                postcode: $postcode
                specReq: $specReq
                cost: $cost
                donation: $donation
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
          this.dat = { ...data }
          alert(`Your registration has been successfully processed. Your confirmation number is ${this.dat.data.createRegistration.id}. An email has been sent to your email address, ${this.form.email}. If you do not receive this email please check your spam/junk folder, or contact admin@ordinarygoddesses.com.au. Thank you for registering for ${this.event.title}.`)
          this. form = {
            event: '',
            email: '',
            name: '',
            phone: '',
            address: '',
            town: '',
            state: '',
            country: '',
            postcode: '',
            specReq: '',
            token: '',
            cost: 0,
            donation: ''
          }
          this.$router.push('/events')
        }).catch((error) => {
          this.progress = false
          console.error(error)
        })
      } else {
        this.valid = false
      }
    },
    nopay() {
      if (this.$refs.form.validate()) {
        this.progress = true
        if (this.form.donation === '') {
          this.form.donation = 0
        }
        this.form.donation = parseFloat(this.form.donation)
        this.form.event = this.$route.params.id
        this.$apollo.mutate({
          mutation: gql`mutation createRegistration(
            $event: String!
            $email: String!
            $name: String!
            $phone: String
            $address: String
            $town: String
            $state: String
            $country: String
            $postcode: String
            $specReq: String
            $cost: Float!
            $donation: Float!
            $token: String!
          ) {
            createRegistration (
              data:{
                event: $event
                email: $email
                name: $name
                phone: $phone
                address: $address
                town: $town
                state: $state
                country: $country
                postcode: $postcode
                specReq: $specReq
                cost: $cost
                donation: $donation
                token: $token
            }) {
              id
            }
          }`,
          variables: this.form
        })
        .then((data) => {
          this.progress = false
          this.dat = { ...data }
          alert(`Your registration has been successfully processed. Your confirmation number is ${this.dat.data.createRegistration.id}. An email has been sent to your email address, ${this.form.email}. If you do not receive this email please check your spam/junk folder, or contact admin@ordinarygoddesses.com.au. Thank you for registering for ${this.event.title}.`)
          this. form = {
            event: '',
            email: '',
            name: '',
            phone: '',
            address: '',
            town: '',
            state: '',
            country: '',
            postcode: '',
            specReq: '',
            token: '',
            cost: 0,
            donation: ''
          }
          this.$router.push('/events')
        }).catch((error) => {
          console.error(error)
        })
      } else {
        this.valid = false
      }
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
</style>
