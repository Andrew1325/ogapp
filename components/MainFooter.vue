<template>
  <v-flex xs12>
    <v-card flat class="foot six">
      <div class="six-line">
        <v-layout row wrap>
          <v-flex xs12>
            <div class="hidden-sm-and-down" style="height: 80px;"></div>
          </v-flex>
          <v-flex xs12 md4 offset-md3>
            <div style="padding: 36px 0 0 16px;">
              <p class="six-title">ordinary goddesses</p>
              <br />
              <br />
              <br />
              <div style>
                <v-layout row>
                  <v-flex xs2>
                    <a href="https://www.facebook.com/ordinarygoddesses" target="_blank">
                      <img src="/facebook.svg" alt height="24px" />
                    </a>
                  </v-flex>
                  <v-flex xs2>
                    <a href="https://www.instagram.com/ordinarygoddesses/" target="_blank">
                      <img src="/instagram.svg" alt height="24px" />
                    </a>
                  </v-flex>
                  <v-flex xs2>
                    <a href="https://www.pinterest.com.au/ordinarygoddesses" target="_blank">
                      <img src="/pinterest.svg" alt height="24px" />
                    </a>
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </v-flex>
          <v-flex xs12 md5>
            <div class="connect">
              <span class="hidden-sm-and-down">
                <br />
                <br />
              </span>
              <p>Transformational retreats for women</p>
              <p>
                <v-icon color="rgb(127,127,127)" small>email</v-icon>&nbsp; admin@ordinarygoddesses.com.au
              </p>
            </div>
          </v-flex>
          <v-flex xs12>
            <div class="copy">
              <small v-if="!!user">
                You are logged in as {{user.name}}.
                <nuxt-link to="/editself">Update your details.</nuxt-link>
              </small>
              <br />
              <br />
              <small>
                &copy;2017 — {{getYear}} Ordinary Goddesses&nbsp;&nbsp; |&nbsp;&nbsp; made by
                <a
                  href="http://www.132east.com"
                >132East</a>
              </small>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    getYear() {
      let y = new Date();
      this.year = y.getFullYear();
      return this.year;
    },
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style scoped>
.foot {
  min-height: 400px;
  overflow: hidden;
  color: white;
}
.six {
  background-image: linear-gradient(to right bottom, #0b0b0b, #3f3f3f);
  opacity: 0.9;
}
.six-line {
  position: relative;
  top: 16px;
  height: 100%;
  width: 100%;
  border-top: 0.1rem solid rgb(231, 231, 231);
}
.six-title {
  font-family: "Playfair Display";
  font-size: 2.2rem;
  letter-spacing: 0.3rem;
}
.connect {
  padding: 36px 0 0 16px;
}
.copy {
  text-align: center;
  margin-top: 25px;
  font-family: "Raleway", sans-serif;
}
.copy a {
  text-decoration: none;
  color: white;
}
@media (max-width: 1076px) {
  .copy {
    margin-top: 0px;
  }
  .copy > small {
    font-size: 9pt;
  }
  .six-title {
    font-size: 2rem;
  }
  .foot {
    text-align: center;
  }
}
</style>


