<template>
  <div>
    <div class="bg"></div>
    <div class="holder">
      <div class="contenter">
        <div class="welc">
          <img src="/logoIcon.png" alt="" width="172px">
          <p>Welcome</p>
          <small class="signin">Please enter your details to register</small>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleSubmit">
            <div class="fields">
              <v-alert
                :value="done"
                type="success"
              >
                User Registered
              </v-alert>
              <v-alert
                :value="fail"
                type="error"
              >
                User Exists
              </v-alert>
              <small>Full Name</small><br>
              <v-text-field rounded color="#f8a83644" v-model="userForm.name" :rules="nameRules"></v-text-field><br><br>
              <small>Email</small><br>
              <v-text-field rounded color="#f8a83644" v-model="userForm.email" :rules="emailRules"></v-text-field><br><br>
              <small>Password</small><br>
              <v-text-field type="password" rounded slot flat style="position:relative; z-index:0;" color="#f8a83644" v-model="userForm.password" :rules="passRules"></v-text-field><br><br><br>
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
import { mapActions } from 'vuex';

export default {
  layout: 'fullscreen',
  data() {
    return {
      valid: true,
      snackbar: false,
      done: false,
      fail: false,
      userForm: {
        name: "",
        email: "",
        password: ""
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Name must be at least 6 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters'
      ],
    }
  },
  methods: {
    async handleSubmit() {
      let newUser
      if (this.$refs.form.validate()) {
        this.snackbar = true
        try {
          const res = await this.$apollo.mutate({
            mutation: gql `mutation createUser($name: String!, $email: String!, $password: String!) {
              createUser (
                data: {
                  name: $name,
                  email: $email,
                  password: $password
                }
              ) {
                token
                user {
                  id
                }
              }
            }`,
            variables: this.userForm
          }).then(({data}) => newUser = data)
            console.log(newUser)
            await this.$apolloHelpers.onLogin(newUser.createUser.token, undefined, 7)
            this.setUser(res)
            this.done = true
            alert('Thank You for registering with Ordinary Goddesses. You are now logged in.')
            this.$router.push('/')
        } catch (e) {
          console.error(e)
          this.fail = true
          alert('A user with this email already exists')
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
