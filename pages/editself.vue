<template>
  <div>
    <v-dialog
      v-model="submitting"
      hide-overlay
      persistent
      width="300"
    >
      <v-card style="text-align:center">
        <v-card-text>
          submitting your details...
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
    <div class="bg"></div>
    <div class="holder">
      <div class="contenter">
        <div class="welc">
          <img src="/logoIcon.png" alt="" width="172px">
          <p>Update your details</p>
          <small class="signin">Updating user with email: {{user.email}}</small>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleSubmit">
            <div class="fields">
              <v-alert
                :value="done"
                type="success"
              >
                User Updated
              </v-alert>
              <v-alert
                :value="fail"
                type="error"
              >
                Update Failed
              </v-alert>
              <small>Full Name</small><br>
              <v-text-field rounded color="#f8a83644" v-model="userForm.name" :rules="nameRules"></v-text-field><br>
              <small>Old Password - leave blank to retain existing</small><br>
              <v-text-field rounded slot flat type="password" style="position:relative; z-index:0;" color="#f8a83644" v-model="oldPassword"></v-text-field><br>
              <small>New Password - leave blank to retain existing</small><br>              
              <v-text-field rounded slot type="password" flat style="position:relative; z-index:0;" color="#f8a83644" v-model="newPassword"></v-text-field><br>
              <small>Address</small><br>
              <v-text-field rounded color="#f8a83644" v-model="userForm.address"></v-text-field><br><br>
              <label class="check-container"><span style="position:relative;left:-10px;"><small>Keep me informed about new events and other info.</small></span>
                <input type="checkbox">
                <span class="checkmark"></span>
              </label>
              <button v-if="!snackbar" :disabled="!valid" type="submit">Sign Up</button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import gql from 'graphql-tag'
import { mapActions, mapGetters } from 'vuex';

export default {
  layout: 'fullscreen',
  data() {
    return {
      valid: true,
      snackbar: false,
      submitting: false,
      done: false,
      fail: false,
      oldPassword: '',
      newPassword: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Name must be at least 6 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    userForm() {
      const usr = {}
      usr.name = this.user.name
      usr.newPassword = this.newPassword
      usr.address = this.user.address
      return usr
    }
  },
  methods: {
    async handleSubmit() {
      let newUser
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.submitting = true
        const usForm = {...this.userForm}
        if (this.oldPassword === '') {
          usForm.password = null
          usForm.newPassword = null
        } else {
          usForm.password = this.oldPassword
          usForm.newPassword = this.newPassword
        }
        try {
          const res = await this.$apollo.mutate({
            mutation: gql `mutation updateUser($name: String, $password: String, $newPassword: String, $address: String) {
              updateUser (
                data: {
                  name: $name,
                  password: $password,
                  newPassword: $newPassword,
                  address: $address
                }
              ) {
                id
                name
              }
            }`,
            variables: usForm
          }).then(({data}) => newUser = data)
            console.log(newUser)
            this.submitting = false
            this.done = true
            alert('You details have been updated.')
            this.$router.push('/')
        } catch (e) {
          console.error(e)
          this.submitting = false
          this.fail = true
          alert('Unable to update details')
          this.$router.push('/signin')
        }
      }
    },
    ...mapActions ({
      setUser: 'auth/setUser'
    })
  }
}
</script>

<style scoped>
  .bg {
    background-color: #fafafa;
    height:900px;
    width: 100vw;
    position: absolute;
    left: -14px;
  }
  @media (max-height:425px) {
    .bg {
      height:180vh;
      width: 100vw;
      position: absolute;
      left: -14px;
    }
  }
  .holder {
    width: 344px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
  .contenter {
    width: 100%;
    position: absolute;
    top: 60px;
    margin-bottom: 24px;
  }
  @media (max-height: 1220px) {
    .contenter {
      top: 0px;
    }
  }
  .signin {
    position: relative;
    top: -30px;
    color: rgb(146, 146, 146);
  }
  .welc {
    width: 100%;
    text-align: center;
  }
  .welc > p {
    font-size: 1.8rem;
    font-weight: 600;
    color: rgb(97, 97, 97);
    position: relative;
    top: -12px;
  }
  .fields {
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 3px;
    padding: 12px 22px;
    text-align: left;
    position: relative;
    top: -18px;
  }
  .fields > small {
    color:rgb(160, 158, 158);
  }
  .fields > .v-input {
    height: 38px;
    margin-top: 12px;
    padding: 4px 6px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    width: 300px;
  }
  .v-text-field:focus {
    border: 1px solid lightgrey;
    border-radius: 3px;
    outline:none;
    background-color: #f8a83644;
  }
  .fields > button {
    height: 38px;
    margin-top: 12px;
    padding: 4px 6px;
    background-color: #f8a836ff;
    border-radius: 3px;
    width: 300px;
    color: #fafafa;
  }
  .check-container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 14px;
    color: rgb(160, 158, 158);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

/* Hide the browser's default checkbox */
  .check-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

/* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
  }

/* On mouse-over, add a grey background color */
  .check-container:hover input ~ .checkmark {
    background-color: #ccc;
  }

/* When the checkbox is checked, add a blue background */
  .check-container input:checked ~ .checkmark {
    background-color: #f8a836ff;
  }

/* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

/* Show the checkmark when checked */
  .check-container input:checked ~ .checkmark:after {
    display: block;
  }

/* Style the checkmark/indicator */
.check-container .checkmark:after {
  left: 8px;
  top: 4px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
