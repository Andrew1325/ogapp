<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12>
      <v-card flat class="all one">
        <div class="box-logo"></div>
        <div class="teaser greeting" v-if="greet">
          <h1>
            Welcome back
            <br />
            {{user.name.split(" ")[0]}}
          </h1>
        </div>
        <div class="teaser" v-else>
          <h1>
            <span id="seed">Transformational Retreats</span>
            <span id="change">For Women</span>
          </h1>
          <p
            class="what"
            style="font-weight: 400;"
          >Claim your sovereignty and find personal empowerment through the deep connection and community of true sisterhood</p>
          <!-- <v-btn nuxt to="/theme" class="whatbtn" outline color="white">Read More</v-btn> -->
        </div>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 class="too too-left">
      <div class="two-image-holder" data-aos="fade-up-right">
        <img src="/mandalaGrey.svg" width="100%" />
        <h1></h1>
        <br />
        <p style="text-align:center;">
          <br />
          <br />
          <i>“Every woman who heals herself helps heal all the women who came before her, and all those who come after her.”</i>
          <br />
          <small>Christine Northrup</small>
        </p>
        <v-divider color="white"></v-divider>
        <br />
        <br />
        <p style="text-align:center; font-weight:400; font-size:1.4rem;">
          <v-btn nuxt to="/events" class="retreat-btn" color="rgb(244, 24, 244)" outline>Retreats</v-btn>
          <br />
          <br />
          <v-btn nuxt to="/events" class="retreat-btn" color="rgb(214, 24, 214)" outline>Programs</v-btn>
          <br />
          <br />
          <v-btn nuxt to="/events" class="retreat-btn" color="rgb(184, 24, 184)" outline>Courses</v-btn>
          <br />
          <br />
        </p>
      </div>
    </v-flex>
    <v-flex xs12 md6 class="too too-right">
      <div
        class="two-text-holder"
        data-aos="fade-up-left"
        data-aos-delay="300"
        data-aos-anchor-placement="center-bottom"
      >
        <br />
        <br />
        <br />

        <p>Do you feel as though you give so much of your time and energy to others that you have none left for yourself?</p>
        <p>Do you have a deep longing for true sisterhood and nourishing connection with like-minded women?</p>
        <p>Do you want to spend time in a space where nobody needs anything from you; to reconnect with yourself, replenish your soul, and return to your life feeling lighter, stronger, and sovereign?</p>
        <p>Are you ready to go on a journey of shared + personal discovery and transformation?</p>
        <p>Would it feel good to be truly seen + heard without judgement, supported unconditionally, and loved for exactly who you are?</p>
        <p>If you answered yes to ANY of these questions, then an Ordinary Goddess Retreat is for YOU.</p>
        <div class="more-btn">
          <br />
          <br />
          <br />
          <v-btn
            nuxt
            to="/events"
            style="text-align: center"
            color="#888"
            outline
          >I want to know more</v-btn>
          <br />
        </div>
      </div>
    </v-flex>

    <!-- <v-flex xs12>
      <v-card flat class="all two hidden-sm-and-down">
        <v-parallax dark height="1280" src="/para-bg1.svg">
          <v-layout row wrap>
            <v-flex xs12 md6>
              <div class="two-image-holder" data-aos="fade-up-right">
                <img src="/logo.svg" width="100%" />
                <h1>transformational retreats for women</h1>
                <br />
                <p style="text-align:center;">
                  <i>“Every woman who heals herself helps heal all the women who came before her, and all those who come after her.”</i>
                  <br />
                  <small>Christine Northrup</small>
                </p>
                <v-divider color="white"></v-divider>
                <br />
                <br />
                <p style="text-align:center; font-weight:400; font-size:1.4rem;">
                  <span v-if="openEvent">We are currently taking bookings for</span>
                  <span v-else>Our latest event:</span>
                  <br />
                  <br />
                  <span style="font-size:1.8rem;">{{events[0].title}}</span>
                  <br />
                  <br />For details and to book...
                  <br />
                  <br />
                  <v-btn nuxt to="/events" color="white" outline>See Events</v-btn>
                </p>
              </div>
            </v-flex>
            <v-flex xs12 md6>
              <div
                class="two-text-holder"
                data-aos="fade-up-left"
                data-aos-delay="300"
                data-aos-anchor-placement="center-bottom"
              >
                <h1>What is a Goddess?</h1>
                <p>
                  A woman who is in the process of learning to accept and love herself on all levels: Mind, Body and Spirit. A woman who knows and understands herself, her wants and her needs, inside and out. A woman who, because she focuses on personal growth and self-awareness, experiences a life filled with peace, love, joy, passion and fun. A woman who understands that she has the capacity to steer her life in any direction she wants, and who is inspired to give to those around her due to her sense of gratitude and abundance.
                  <br />
                  <br />There is a goddess within each and every one of us. So whether you need to find her, awaken her, or simply nurture her and let her shine, know that you will be supported and guided through it all when you choose to attend an Ordinary Goddesses retreat.
                </p>
              </div>
            </v-flex>
          </v-layout>
        </v-parallax>
      </v-card>

      <v-card flat class="all two hidden-md-and-up">
        <v-parallax dark height="1230" src="/para-bg1.svg">
          <v-layout row wrap>
            <v-flex xs12 md6>
              <div class="two-sm-image-holder">
                <img src="/logo.svg" />
                <h1>transformational retreats for women</h1>
                <br />
                <p style="text-align:center;">
                  <i>“Every woman who heals herself helps heal all the women who came before her, and all those who come after her.”</i>
                  <br />
                  <small>Christine Northrup</small>
                </p>
              </div>
            </v-flex>
            <v-flex xs12 md6>
              <div class="two-sm-text-holder">
                <h1>What is a Goddess?</h1>
                <p>
                  A woman who is in the process of learning to accept and love herself on all levels: Mind, Body and Spirit. A woman who knows and understands herself, her wants and her needs, inside and out. A woman who, because she focuses on personal growth and self-awareness, experiences a life filled with peace, love, joy, passion and fun. A woman who understands that she has the capacity to steer her life in any direction she wants, and who is inspired to give to those around her due to her sense of gratitude and abundance.
                  <br />
                  <br />There is a goddess within each and every one of us. So whether you need to find her, awaken her, or simply nurture her and let her shine, know that you will be supported and guided through it all when you choose to attend an Ordinary Goddesses retreat.
                </p>
              </div>
            </v-flex>
          </v-layout>
        </v-parallax>
      </v-card>
    </v-flex>-->

    <v-flex xs12>
      <v-card flat class="all three">
        <div class="para-div" style="height: 100vh"></div>
        <div class="teaser">
          <h1>
            Shopping
            <br class="hidden-sm-and-up" />Goddess
          </h1>
          <p style="font-weight:400; padding:0 100px;">
            Check out our shop for all your goddess needs.
            <br />
            <br />Coming Soon...
          </p>
          <v-btn nuxt to="/shop" outline color="white">More...</v-btn>
        </div>
      </v-card>
    </v-flex>
    <!-- <v-flex xs12>
      <v-card flat class="all four">
        <v-parallax dark height="1230" src="/mand-bg.svg">
    <v-layout row wrap>-->
    <!-- <v-flex class="hidden-sm-and-down" md10 offset-md1 lg8 offset-lg2>
              <div
                class="trio"
                data-aos="zoom-out-right"
                @mouseenter="merge = true"
                @mouseleave="merge = false"
              >
                <v-layout>
                  <v-flex xs4>
                    <div class="tri1">
                      <h1>Do You</h1>
                      <div :class="[!merge ? 'tri1bg1' : 'tri1bg2']" class="tri-img2"></div>
                    </div>
                  </v-flex>
                  <v-flex xs4>
                    <div class="tri2">
                      <h1>Want</h1>
                      <div :class="[!merge ? 'tri1bg1' : 'tri1bg2']" class="tri-img1"></div>
                    </div>
                  </v-flex>
                  <v-flex xs4>
                    <div class="tri3">
                      <h1>More?</h1>
                    </div>
                  </v-flex>
                </v-layout>
              </div>
    </v-flex>-->
    <!-- <v-flex class="hidden-sm-and-down" md8 offset-md3 lg6 offset-lg4>
              <div class="tri-text" data-aos="zoom-out-left">
                <p style="font-size:1.4rem;">
                  <i>“An empowered woman tends her inner fire, lights up those around her and sparks divine transformation within and without.”</i>
                  <br />
                  <br />
                  <small>Shikoba</small>
                </p>
              </div>
    </v-flex>-->
    <v-flex xs12 class="for">
      <v-layout row wrap style="padding:14vh 0;">
        <v-flex xs12 md4>
          <div class="ts tri-sm-1">
            <h1>Do You</h1>
          </div>
        </v-flex>
        <v-flex xs12 md4>
          <div class="ts tri-sm-2">
            <h1>Want</h1>
          </div>
        </v-flex>
        <v-flex xs12 md4>
          <div class="ts tri-sm-3">
            <h1>More?</h1>
          </div>
        </v-flex>
        <v-flex xs10 offset-xs1>
          <div class="ts tri-sm-4">
            <p style="text-align:center;">
              <i>“An empowered woman tends her inner fire, lights up those around her and sparks divine transformation within and without.”</i>
              <br />
              <br />
              <small>Shikoba</small>
            </p>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- </v-layout>
        </v-parallax>
      </v-card>
    </v-flex>-->
    <v-flex xs12>
      <v-card flat class="carousel">
        <v-carousel interval="7500" hide-controls hide-delimiters>
          <h1 class="said">What women love about Ordinary Goddess Retreats</h1>
          <v-carousel-item v-for="(q, i) in quotes" :key="i" src>
            <div>
              <span>
                <h1 style="font-size:1.2rem;">"{{q}}"</h1>
              </span>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card flat class="all five">
        <div class="para-div2" style="height: 120vh"></div>
        <div class="five-cont">
          <v-layout row wrap>
            <v-flex xs12 md6>
              <div class="five-text-holder">
                <h1>Goddess Words</h1>
                <p style="font-weight:400; font-size:1.3rem;">
                  <i>“When women get together, they tell stories. That is how it has always been. Telling stories is our way of saying where we have come from, what we know, and where we might be headed.</i>
                  <br />
                  <br />
                  <small>Jalaja Bonheim</small>
                  <br />
                  <br />
                  <v-btn nuxt to="/blog" outline color="white">Read our blog</v-btn>
                </p>
              </div>
            </v-flex>
            <v-flex xs12 md6>
              <div
                class="five-image-holder hidden-xs-only"
                data-aos="fade-up-left"
                data-aos-delay="300"
              >
                <img src="/girl-candle.jpg" width="100%" />
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-flex>
    <main-footer />
  </v-layout>
</template>

<script>
import MainFooter from "@/components/MainFooter";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    merge: false,
    greet: false,
    quotes: [
      "You women are wonderful. Thank you so much for all you give. I think it is beautiful what you are creating and offering to women. It feels so inclusive of everyone who comes and accessible and comfortable.",
      "Was awesome – thank you. Being financially stretched usually means I can’t attend events like this. So glad it was by donation. Next time hopefully I'll be able to donate more! Blessings and light to the goddesses.",
      "The atmosphere and connecting with other women in love and friendship that wish to improve themselves and the world.",
      "The relaxed energy and time, location. Loved drumming, my first time. Food was great. Friendship & sisterhood was fantastic."
    ]
  }),
  components: {
    MainFooter
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/signin") {
      next(vm => vm.alerty());
    }
    next();
  },
  computed: {
    ...mapGetters({
      user: "user",
      events: "event/events"
    }),
    openEvent() {
      let op = [];
      if (!!this.events && this.events.length > 0) {
        op = [...this.events.filter(e => e.bookings_open === true)];
      }
      if (op.length > 0) {
        return false;
      }
      return true;
    }
  },
  methods: {
    alerty() {
      this.greet = true;
      var self = this;
      setTimeout(function() {
        self.greet = false;
      }, 1500);
    }
  }
};
</script>

<style scoped>
.greeting {
  opacity: 0;
  animation: greetin 1.5s ease-in 0s 1 forwards;
}
@keyframes greetin {
  0% {
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.one {
  background: linear-gradient(rgba(0, 0, 0, 0.3) 100%, rgba(0, 0, 0, 0.3) 100%),
    url("/tulip2.jpg");
  background-size: cover;
  position: relative;
  border: 4px solid white;
}
.box-logo {
  width: 8%;
  min-height: 18vw;
  background-image: url("/goddessDeviceDev.svg");
  background-size: contain;
  position: absolute;
  left: 46%;
  top: 30px;
}
.too {
  height: 100%;
  min-height: 56vh;
  width: 100%;
  border: 4px solid white;
  border-top: 0px;
}
.too-right {
  border-left: 0px;
  position: relative;
  padding: 30px 0;
}
.too-left {
  background: rgb(252, 252, 252);
  position: relative;
  padding: 30px 0;
}
.two {
  /* background-image: url("/lotus-bg.svg");
  background-size: cover;
  background-color: rgb(197, 197, 197); */
  border: 4px solid white;
  border-top: 0px;
}
.two-image-holder {
  position: relative;
  min-height: 130%;
  padding: 30px 16px;
  margin: 0 auto;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(244, 24, 244);
  border-radius: 0 6vw 0 6vw;
}
.two-image-holder > img {
  margin: 0 28%;
  width: 44%;
}
.two-sm-image-holder {
  width: 100%;
  margin-top: 18px;
  padding: 16px;
  background: rgba(179, 2, 149, 0.508);
  border-radius: 0 12vw 0 12vw;
}
.two-image-holder,
.two-sm-image-holder h1 {
  font-weight: 100;
}
.two-image-holder,
.two-sm-image-holder img {
  padding: 34px;
  opacity: 0.8;
}
.two-text-holder {
  min-height: 100%;
  padding: 84px 36px;
  position: relative;
  margin: 0px auto;
  background: rgb(254, 254, 254);
  border: 1px solid rgb(25, 250, 250);
  border-radius: 6vw 0 6vw 0;
  color: rgb(22, 22, 22);
}
.two-sm-text-holder {
  width: 100%;
  padding: 16px;
  background: rgba(226, 181, 0, 0.618);
  border-radius: 12vw 0 12vw 0;
  color: white;
}
.retreat-btn {
  min-width: 186px;
}
.more-btn {
  width: 90px;
  position: relative;
  margin: 0 auto;
  transform: translate(-50%, 0%);
}
.three {
  background-color: rgba(0, 0, 255, 0.329);
}
@media (max-height: 660px) {
  .three > .teaser {
    top: 10vh;
  }
  .box-logo {
    width: 18vw;
    min-height: 26vh;
    left: 41vw;
  }
}
.para-div {
  position: relative;
  background-image: url("/woman-log2.jpg");
  background-attachment: fixed;
  background-size: cover;
}
.for {
  background-color: rgb(66, 66, 77);
  background-image: url("/mand-bg.svg");
}
.trio {
  position: relative;
  top: 120px;
  background-image: url("/3women.jpg");
  background-size: cover;
}
.trio-text {
  position: absolute;
  top: 605px;
  left: -140px;
  width: 30vw;
  z-index: 203;
  color: white;
}
.trio h1 {
  text-align: center;
  line-height: 520px;
  letter-spacing: 0.6rem;
  font-size: 3.1rem;
  color: white;
}

.tri1 {
  position: relative;
  height: 520px;
  width: 100%;
  border-right: 12px solid rgb(66, 66, 77);
}
.tri2 {
  position: relative;
  height: 520px;
  width: 100%;
  border-right: 12px solid rgb(66, 66, 77);
}
.tri-img1 {
  position: absolute;
  top: 0;
  background-image: url("/candle.jpg");
  background-size: cover;
  opacity: 1;
  height: 100%;
  width: 100%;
}
.tri-img2 {
  position: absolute;
  top: 0;
  background-image: url("/yoga1.jpg");
  background-size: cover;
  opacity: 1;
  height: 100%;
  width: 100%;
}
.tri1bg1 {
  animation-name: bgfade;
  animation-direction: forwards;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.tri1bg2 {
  animation-name: bgfade2;
  animation-direction: forwards;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes bgfade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes bgfade2 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.tri3 {
  height: 520px;
  width: 101%;
  border-right: 12px solid rgb(66, 66, 77);
}
.tri-text {
  background: rgba(78, 36, 16, 0.418);
  border-radius: 4vw 0 4vw 0;
  color: white;
  font-size: 1.6rem;
  padding: 18px;
  text-align: center;
}
.tri-text h1 {
  font-size: 2.6rem;
  letter-spacing: 0.4rem;
  font-weight: 100;
}
.tri-text p {
  font-weight: 100;
  font-size: 1.1rem;
}
.ts {
  background-size: cover;
  min-height: 40vh;
  margin: 18px;
}
.ts h1 {
  text-align: center;
  line-height: 240px;
  letter-spacing: 0.6rem;
  font-size: 3.1rem;
  color: rgb(66, 66, 77);
}
.tri-sm-1 {
  background-image: url("/citrus.jpg");
}
.tri-sm-2 {
  background-image: url("/lensball.jpg");
}
.tri-sm-3 {
  background-image: url("/daylight.jpg");
}
.tri-sm-4 {
  background: rgba(78, 36, 16, 0.418);
  border-radius: 12vw 0 12vw 0;
  padding: 16px;
  margin-top: 14vh;
}
.tri-sm-4 > p {
  position: relative;
  margin-top: 17vh;
}
.said {
  margin-top: -10px;
}
.carousel {
  min-height: 50vh;
  background-image: url("/lotus-bg.svg");
  background-color: rgba(0, 0, 0, 0.11);
  color: rgb(127, 127, 127);
  font-style: italic;
  font-size: 0.8rem;
  outline: 1px solid rgb(127, 127, 127);
  outline-offset: -14px;
}
.carousel div {
  height: 340px;
  line-height: 140px;
  padding: 0 10vw;
  text-align: center;
}
.carousel span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
.five {
  background-color: bisque;
}
.five-cont {
  color: white;
  text-align: center;
  height: 100%;
  width: auto;
  position: absolute;
  top: 160px;
  left: 70px;
}
.para-div2 {
  position: relative;
  background-image: url("/bracelets-candle.jpg");
  background-attachment: fixed;
  background-size: cover;
}
.five-image-holder {
  width: 80%;
  float: right;
  padding: 16px;
  margin: 64px 44px 14px 14px;
  background: rgba(78, 16, 68, 0.418);
  border-radius: 0 6vw 0 6vw;
}
.five-image-holder > img {
  border-radius: 0 5vw 0 5vw;
}
.five-text-holder {
  width: 75%;
  padding: 16px;
  margin: 14px;
  background: rgba(78, 36, 16, 0.418);
  border-radius: 6vw 0 6vw 0;
  color: white;
}
@media (max-width: 660px) {
  .box-logo {
    width: 28vw;
    min-height: 22vh;
    left: 36vw;
  }
  .teaser p,
  .five-text-holder p,
  .tri-sm-4 p {
    font-weight: 400;
    font-size: 1.1rem;
  }
  .teaser h1,
  .five-text-holder h1,
  .two-text-holder h1 {
    font-size: 2.4rem;
    letter-spacing: 0.3rem;
    font-weight: 100;
  }
  .carousel h1 {
    font-size: 1.6rem;
  }
  .carousel div {
    padding: 0 5vw;
  }
  .five-image-holder,
  .five-text-holder {
    margin: 14px 14px 14px 14px;
  }
  .five-text-holder {
    width: 100%;
    margin: 0 -24px;
    border-radius: 12vw 0 12vw 0;
  }
  .five-cont {
    top: 20px;
  }
}
@media (min-width: 660px) and (max-width: 1023px) {
  .box-logo {
    width: 14%;
    left: 43%;
  }
  .teaser p {
    font-weight: 100;
    font-size: 1.1rem;
  }
  .teaser h1,
  .two-text-holder h1 {
    font-size: 2.9rem;
    letter-spacing: 0.3rem;
    font-weight: 100;
  }
}
@media (min-width: 1024px) {
  .two-image-holder {
    width: 80%;
  }
  .two-text-holder {
    width: 80%;
  }
}
#seed {
  position: relative;
  opacity: 0;
  animation: seedback 3s ease-in 1s 1 forwards;
}
#change {
  opacity: 0;
  animation: changein 3s ease-in 1s 1 forwards;
}
@keyframes seedback {
  0% {
    opacity: 0;
    left: 145px;
  }
  20% {
    opacity: 1;
    left: 145px;
  }
  50% {
    left: -5px;
    opacity: 1;
  }
  100% {
    left: -5px;
    opacity: 1;
  }
}
@keyframes changein {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.what {
  font-weight: 400;
  padding: 0 100px;
  opacity: 0;
  animation: whatin 1.5s ease-in 4.5s 1 forwards;
}

.whatbtn {
  opacity: 0;
  animation: whatin 1.5s ease-in 7s 1 forwards;
}

@keyframes whatin {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
