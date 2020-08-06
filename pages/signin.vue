<template>
  <div>
    <v-dialog v-model="submitting" hide-overlay persistent width="300">
      <v-card style="text-align:center">
        <v-card-text>
          submitting your details...
          <br />
          <br />
          <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="bg"></div>
    <div class="holder">
      <div class="contenter">
        <div class="welc">
          <img src="/logoIcon.png" alt width="172px" />
          <p>Welcome Back</p>
          <small class="signin">Please enter your details to login</small>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleSubmit">
            <div class="fields">
              <v-alert :value="isAuthenticated" type="success">User logged in</v-alert>
              <v-alert :value="fail" type="error">Error logging in</v-alert>
              <small>Email</small>
              <br />
              <v-text-field
                rounded
                color="#f8a83644"
                v-model="credentials.email"
                :rules="emailRules"
              ></v-text-field>
              <br />
              <br />
              <small>Password</small>
              <br />
              <v-text-field
                type="password"
                rounded
                slot
                flat
                style="position:relative; z-index:0;"
                color="#f8a83644"
                v-model="credentials.password"
                :rules="passwordRules"
              ></v-text-field>
              <br />
              <br />
              <br />
              <button v-if="!snackbar" :disabled="!valid" type="submit">Sign In</button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import loginUser from "../apollo/mutations/loginUser.gql";

export default {
  layout: "fullscreen",
  data: () => ({
    isAuthenticated: false,
    fail: false,
    snackbar: false,
    submitting: false,
    error: null,
    credentials: {
      email: "",
      password: ""
    },
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 6) || "Password must be at least 6 characters"
    ],
    loading: false
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async handleSubmit() {
      this.submitting = true;
      this.snackbar = true;
      const credentials = this.credentials;
      let logUser;
      try {
        const res = await this.$apollo
          .mutate({
            mutation: loginUser,
            variables: credentials
          })
          .then(({ data }) => (logUser = data));
        await this.$apolloHelpers.onLogin(
          logUser.loginUser.token,
          undefined,
          7
        );
        await this.setUser();
        this.submitting = false;
        this.isAuthenticated = true;
        this.credentials = {
          email: "",
          password: ""
        };
        this.$router.push("/");
      } catch (e) {
        console.error(e);
        this.error = e;
        this.submitting = false;
        this.snackbar = false;
        this.fail = true;
      }
    },
    ...mapActions({
      setUser: "getUser"
    })
  }
};
</script>

<style scoped>
.bg {
  background-color: #fafafa;
}
@media (max-height: 425px) {
  .bg {
    height: 180vh;
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
  color: rgb(160, 158, 158);
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
  outline: none;
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
</style>
