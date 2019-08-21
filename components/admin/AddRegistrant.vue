<template>
  <v-card style="padding: 18px;">
     <v-dialog
      v-model="progress"
      hide-overlay
      persistent
      width="300"
    >
      <v-card style="text-align:center">
        <v-card-text>
          Processing registration
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
    <h3>Select Event</h3>
    <v-select
      :items="eventNames"
      label="Event"
      v-model="eName"
    ></v-select>
    <br>
    <template v-if="eName !== ''">
      <h3>Enter Registrant Details</h3>
      <small>* required fields</small>
      <v-form 
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field v-model="form.email" :rules="emailRules" placeholder="email*" type="email"></v-text-field>
        <v-text-field v-model="conf" placeholder="confirm email*" :rules="emailConfRules" type="email"></v-text-field>
        <v-text-field v-model="form.name" :rules="nameRules" placeholder="full name*" required></v-text-field>
        <v-text-field v-model="form.phone" placeholder="phone number" ></v-text-field>
        <v-text-field v-model="form.address" placeholder="number and street" ></v-text-field>
        <v-text-field v-model="form.town" placeholder="suburb or town"></v-text-field>
        <v-select
          :items="states"
          label="state"
          v-model="form.state"
        ></v-select>
        <v-text-field v-model="form.country" placeholder="Australia" value="Australia" disabled />
        <v-text-field v-model="form.postcode" placeholder="postcode" />

      <v-layout row class="addons">
      <v-flex xs6><small>Special</small><br><v-btn @click="delivery = !delivery" small flat outline color="grey">Requirements</v-btn></v-flex>
      </v-layout>
      <div class="billing" v-if="delivery">
        <v-textarea v-model="form.specReq" rows="6" cols="20" placeholder="Dietary or other requirements"></v-textarea>
      </div>
        
      <br><br>
    
      <template >
        <v-flex xs3>
          <v-btn
            :disabled="!valid"
            color="success"
            @click="handleRegister"
          >
            Register
          </v-btn>
        </v-flex>
      </template>

      </v-form>
    </template>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import gql from 'graphql-tag'
export default {
  data() {
    return {
      valid: true,
      delivery: false,
      progress: false,
      eName: '',
      form: {
        email: '',
        name: '',
        phone: '',
        address: '',
        town: '',
        state: '',
        country: '',
        postcode: '',
        specReq: ''
      },
      conf: '',
      states: [
        'ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Name must be at least 6 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      emailConfRules: [v => v === this.form.email || 'Email must match'],
    }
  },
  computed: {
    ...mapGetters ({
      events: 'event/events'
    }),
    eventNames() {
      return this.events.map(e => e.title)
    }
  },
  methods: {
    handleRegister() {
      if (this.$refs.form.validate()) {
        this.progress = true
        let ev = this.events.find(e => e.title === this.eName)
        this.form.event = ev.id
        console.log(this.form)
        this.$apollo.mutate({
          mutation: gql`mutation adminCreateRegistration(
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
          ) {
            adminCreateRegistration (
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
            }) {
              id
            }
          }`,
          variables: this.form
        })
        .then((data) => {
          this.progress = false
          this.dat = { ...data }
          alert(`Registration successfully processed. The registration number is ${this.dat.data.adminCreateRegistration.id}. An email has been sent to ${this.form.email}.`)
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
          }
          this.conf = ''
          this.valid = true
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  }
}
</script>

<style scoped>
  .v-card {
    padding: 18px;
  }
</style>


