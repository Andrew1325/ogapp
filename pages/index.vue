<template>
  <v-layout class="fade-in" row wrap justify-center align-center v-if="loaded || greetDone">
    <v-flex xs12>
      <v-card flat class="all one">
        <!-- <div class="one__logo">
          <div class="one__logo-top" id="goddess">
            <img src="/goddessDeviceTop.svg" id="goddess-top" alt />
          </div>
          <div class="one__logo-bottom" id="goddess-words">
            <img src="/goddessDeviceBottom.svg" id="goddess-bottom" alt />
          </div>
        </div>-->
        <div class="box-logo"></div>
        <div class="teaser greeting" v-if="greet">
          <h1>
            Welcome back
            <br />
            {{ user.name.split(" ")[0] }}
          </h1>
        </div>
        <div class="teaser" style="line-height: 2.5rem;" v-else>
          <h1>
            <span id="seed">
              Transformational
              <br />Retreats
            </span>
            <span id="change">For Women</span>
          </h1>
          <br />
          <p class="what" style="font-weight: 400; line-height: 1.6rem;">
            Claim your sovereignty and find personal empowerment through the
            deep connection and community of true sisterhood
          </p>
          <div class="hero-btns">
            <v-btn nuxt to="/events" color="white" class="retreat-btn" outline>Retreats</v-btn>
            <v-btn nuxt to="/events" color="white" class="retreat-btn" outline>Programs</v-btn>
            <v-btn nuxt to="/events" color="white" class="retreat-btn" outline>Courses</v-btn>
          </div>
        </div>
      </v-card>
    </v-flex>

    <FirstFold />

    <v-flex id="shop" xs12>
      <v-card flat class="all three">
        <div class="para-div" style="height: 100vh"></div>
        <div class="teaser">
          <h1>
            Goddess
            <br class="hidden-sm-and-up" />Goods
          </h1>
          <p style="font-weight:400; padding:0 100px;">
            <br />
            <br />Coming Soon...
          </p>
          <v-btn nuxt to="/shop" outline color="white">Shop now</v-btn>
        </div>
      </v-card>
    </v-flex>

    <FirstFold :quotes="quotes" />

    <v-flex xs12>
      <v-card flat class="all five">
        <div class="para-div2" style="height: 120vh"></div>
        <div class="teaser">
          <h1>
            Goddess
            <br class="hidden-sm-and-up" />Blog
          </h1>
          <p class="blog-quote">
            <i>
              “When women get together, they tell stories. That is how it has
              always been. Telling stories is our way of saying where we have
              come from, what we know, and where we might be headed.
            </i>
            <br />
            <br />
            <small>Jalaja Bonheim</small>
            <br />
            <br />
          </p>

          <v-btn nuxt to="/blog" outline color="white">Read now</v-btn>
        </div>
      </v-card>
    </v-flex>
    <main-footer />
  </v-layout>
  <div class="loading-page" v-else>
    <div class="black">
      <img class="fade-in" src="/goddessDeviceDev.svg" alt="goddess logo" />
    </div>
    <div class="white">
      <img src="/goddessDeviceDevBlk.svg" alt="goddess logo" />
    </div>
  </div>
</template>

<script>
import MainFooter from "@/components/MainFooter";
import FirstFold from "@/components/FirstFold";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    merge: false,
    greet: false,
    quotes: [
      "You women are wonderful. Thank you so much for all you give. I think it is beautiful what you are creating and offering to women. It feels so inclusive of everyone who comes and accessible and comfortable.",
      "Was awesome – thank you. Being financially stretched usually means I can’t attend events like this. So glad it was by donation. Next time hopefully I'll be able to donate more! Blessings and light to the goddesses.",
      "The atmosphere and connecting with other women in love and friendship that wish to improve themselves and the world.",
      "The relaxed energy and time, location. Loved drumming, my first time. Food was great. Friendship & sisterhood was fantastic."
    ],
    loaded: false,
    last: 20000,
    lastBottom: 20000,
    lastGoddess: 20000,
    sheet: null,
    sheet2: null
  }),
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loaded = true;
        this.greeted();
      }, 3500);
      setTimeout(() => {
        let elem1 = document.getElementById("capture");
        let elem2 = document.getElementById("shop");
        // let elem3 = document.getElementById("goddess");
        // this.sheet = document.styleSheets[46]; // - dev cssRules[14] & cssRules[15]
        // this.sheet2 = document.styleSheets[93]; // -dev
        this.sheet = document.styleSheets[2]; // - prod cssRules[14] & cssRules[15]
        // this.sheet2 = document.styleSheets[93]; // -prod
        console.log(document.styleSheets);

        function buildThresholdList() {
          let thresholds = [];
          let numSteps = 40;

          for (let i = 1.0; i <= numSteps; i++) {
            let ratio = i / numSteps;
            thresholds.push(ratio);
          }

          thresholds.push(0);
          return thresholds;
        }

        //############# start nav intersection observer

        const io_options = {
          root: null,
          rootMargin: "0px",
          threshold: buildThresholdList()
        };
        let io_observer;

        io_observer = new IntersectionObserver(this.io_callback, io_options);
        io_observer.observe(elem1);
        io_observer.observe(elem2);
        // io_observer.observe(elem3);
        //############# end
      }, 6000);
    });
  },
  components: {
    MainFooter,
    FirstFold
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
      events: "event/events",
      greetDone: "greetDone"
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
    },
    ...mapActions(["greeted"]),

    io_callback(entries) {
      let bef = this.sheet.cssRules[3807].style; // -prod
      let af = this.sheet.cssRules[3808].style; // -prod
      // let bef = this.sheet.cssRules[14].style; // -dev
      // let af = this.sheet.cssRules[15].style; //-dev
      // let words = this.sheet2.cssRules[15].style;
      entries.forEach(entry => {
        if (entry.target.id === "capture") {
          if (entry.isIntersecting) {
            let st = entry.boundingClientRect.top;
            let sb = entry.boundingClientRect.bottom;

            if (st < this.last) {
              // console.log("down", st);
              if (this.last - st > 120) {
                // console.log("fast");
                if (st <= 200 && st >= -40) {
                  bef.removeProperty("background-color");
                  bef.setProperty("background-color", "rgb(0,0,0)");
                  af.removeProperty("background-color");
                  af.setProperty("background-color", "rgb(0,0,0)");
                }
              } else {
                // console.log("slow");
                if (st <= 110 && st >= 60) {
                  bef.removeProperty("background-color");
                  bef.setProperty("background-color", "rgb(0,0,0)");
                  af.removeProperty("background-color");
                  af.setProperty("background-color", "rgb(0,0,0)");
                }
              }
              this.last = st;
            } else {
              // console.log("up");
              if (st - this.last > 120) {
                // console.log("fast");
                if (st <= 200 && st >= -40) {
                  bef.removeProperty("background-color");
                  bef.setProperty("background-color", "rgb(255, 255, 255)");
                  af.removeProperty("background-color");
                  af.setProperty("background-color", "rgb(255, 255, 255)");
                }
              } else {
                // console.log("slow");
                if (st <= 110 && st >= 60) {
                  bef.removeProperty("background-color");
                  bef.setProperty("background-color", "rgb(255, 255, 255)");
                  af.removeProperty("background-color");
                  af.setProperty("background-color", "rgb(255, 255, 255)");
                }
              }
              this.last = st;
            }
          }
        }
        if (entry.target.id === "shop") {
          if (entry.isIntersecting) {
            let st = entry.boundingClientRect.top;
            let sb = entry.boundingClientRect.bottom;

            if (sb < this.lastBottom) {
              // console.log("down shop", sb);
              if (this.lastBottom - sb < -40) {
                // console.log("fast shop", sb - this.lastBottom);
                if (sb <= 200 && sb >= 0) {
                  bef.removeProperty("background-color");
                  bef.setProperty("background-color", "rgb(255,255,255)");
                  af.removeProperty("background-color");
                  af.setProperty("background-color", "rgb(255,255,255)");
                }
              } else {
                // console.log("slow shop", sb - this.lastBottom);
                if (sb <= 110 && sb >= 60) {
                  bef.removeProperty("background-color");
                  bef.setProperty("background-color", "rgb(255,255,255)");
                  af.removeProperty("background-color");
                  af.setProperty("background-color", "rgb(255,255,255)");
                }
              }
              this.lastBottom = sb;
            } else {
              // console.log("up shop");
              if (sb - this.lastBottom > 80) {
                // console.log("fast shop", sb - this.lastBottom);
                if (sb <= 200 && sb >= 0) {
                  bef.removeProperty("background-color");
                  bef.setProperty("background-color", "rgb(0,0,0)");
                  af.removeProperty("background-color");
                  af.setProperty("background-color", "rgb(0,0,0)");
                }
              } else {
                // console.log("slow shop", sb - this.lastBottom);
                if (sb <= 110 && sb >= 60) {
                  bef.removeProperty("background-color");
                  bef.setProperty("background-color", "rgb(0,0,0)");
                  af.removeProperty("background-color");
                  af.setProperty("background-color", "rgb(0,0,0)");
                }
              }
              this.lastBottom = sb;
            }
          }
        }
        if (entry.target.id === "goddess") {
          if (entry.isIntersecting) {
            let st = entry.boundingClientRect.top;
            let sb = entry.boundingClientRect.bottom;
            if (sb < this.lastBottom) {
              if (sb <= 100 && sb >= 70) {
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.black {
  position: fixed;
  z-index: 1;
  background-color: black;
  height: 100vh;
  width: 100vw;
}
.black > img,
.white > img {
  height: 70vh;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.white > img {
  opacity: 1;
  animation: whatout 0.9s ease-in 4.1s 1 forwards;
}
.white {
  overflow: hidden;
  position: fixed;
  z-index: 2;
  background-color: black;
  height: 100vh;
  width: 0px;
  left: 50vw;
  animation: whitein 1.5s ease-in 2s 1 forwards;
}
@keyframes whatout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes whitein {
  0% {
    width: 0vw;
    left: 50vw;
  }
  60% {
    width: 80vw;
    left: 10vw;
  }
  100% {
    width: 100vw;
    left: 0vw;
  }
}
.fade-in {
  opacity: 0;
  animation: whatin 0.9s ease-in 0.4s 1 forwards;
}
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
.one__logo {
  position: relative;
  top: 2.5rem;
  left: 2.5rem;
}
.one__logo img {
  width: 6.5rem;
}
.one__logo-bottom {
  position: relative;
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
.hero-btns {
  width: 600px;
  position: relative;
  left: 50%;
  top: 70px;
  transform: translate(-50%, -50%);
  margin: 0.1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-template-rows: auto;
  grid-gap: 0.1rem;
  grid-auto-flow: dense;
}
.gallery {
  position: relative;
  margin-top: 11vh;
  z-index: 0;
}
.gallery > .gallery__list {
  margin: 0.1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-template-rows: auto;
  grid-gap: 0.1rem;
  grid-auto-flow: dense;
}
.two-holder {
  position: relative;
  margin: 0 auto;
  color: rgb(22, 22, 22);
}
.two-first > .two-img-holder {
  border: 4px solid grey;
  position: relative;
  left: -10%;
  transform: translate(-6%, -6%);
}
.two-second > .two-img-holder {
  border: 4px solid grey;
  position: relative;
  height: 30vh;
  width: fit-content;
  transform: translate(6%, 6%);
}
.two-third > .two-img-holder {
  border: 4px solid grey;
  position: relative;
  transform: translate(18%, 0%);
}
.two-holder p {
  font-family: sans-serif !important;
  font-weight: 300 !important;
  line-height: 1.8rem !important;
}
.two-first > p,
.two-second > p,
.two-third > p {
  padding: 24px 20%;
}
.two-first > .two-img-holder > img {
  height: 35vh;
  transform: translate(-6%, -6%);
}
.two-second > .two-img-holder > img {
  height: 100%;
  transform: translate(-6%, -6%);
}
.two-third > .two-img-holder > img {
  height: 35vh;
  transform: translate(6%, -6%);
}
.two-second {
  position: relative;
  top: 27%;
}

.two-third {
  position: relative;
  top: 0%;
  margin-bottom: 26%;
}
.two-first > img,
.two-second > img {
  height: 124px;
  position: relative;
  left: 50%;
}
.two-third > img {
  height: 164px;
  position: relative;
  left: 50%;
  margin-top: 68%;
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
  margin-top: 11vh;
  font-size: 2rem;
}
.said {
  margin-top: 20px;
  line-height: normal;
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
.blog-quote {
  font-weight: 400;
  font-size: 1.3rem;
}
@media (max-width: 660px) {
  .box-logo {
    width: 28vw;
    min-height: 22vh;
    left: 36vw;
  }
  .hero-btns {
    width: 360px;
    position: relative;
    left: 50%;
    top: 70px;
    transform: translate(-41%, -50%);
    margin: 0.1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 0.8fr));
    grid-template-rows: auto;
    grid-gap: 0.1rem;
    grid-auto-flow: dense;
  }
  .teaser p,
  .five-text-holder p,
  .tri-sm-4 p {
    font-weight: 400;
    font-size: 1.1rem;
  }
  .blog-quote {
    padding: 8px 76px;
    font-size: 1.2rem;
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
  .gallery > .gallery__list {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  .two-image-holder-holder,
  .two-text-holder-holder {
    padding: 12px;
  }
  .two-image-holder,
  .two-text-holder {
    padding: 12px;
  }
}
@media (min-width: 660px) and (max-width: 1023px) {
  .box-logo {
    width: 14%;
    left: 43%;
  }
  .teaser p {
    font-size: 1.2rem;
  }
  .teaser h1,
  .two-text-holder h1 {
    font-size: 2.9rem;
    letter-spacing: 0.3rem;
    font-weight: 100;
  }
}
#seed {
  position: relative;
  opacity: 0;
  animation: seedback 3s ease-in 1s 1 forwards;
  font-size: smaller;
}
#change {
  opacity: 0;
  animation: changein 3s ease-in 1s 1 forwards;
  font-size: smaller;
}

@media (min-width: 300px) and (max-width: 1000px) {
  .two-first,
  .two-second,
  .two-third {
    position: relative;
    top: 0%;
    margin-top: 46px;
  }
  .two-first > .two-img-holder {
    left: -10%;
    width: fit-content;
  }
  .two-first > p,
  .two-second > p,
  .two-third > p {
    padding: 12px 10%;
  }
  .two-second > .two-img-holder {
    position: relative;
    left: 78vw;
    transform: translate(-55%, 0%);
    width: fit-content;
    height: 35vh;
  }
  .two-second > .two-img-holder > img {
    transform: translate(6%, -6%);
  }
  .two-third > .two-img-holder {
    position: relative;
    left: -10%;
    width: fit-content;
    height: 35vh;
    transform: translate(0%, 0%);
  }
  .two-third > .two-img-holder > img {
    transform: translate(-6%, -12%);
  }
}
@media (min-width: 1001px) and (max-width: 1505px) {
  .gallery > .gallery__list {
    margin-bottom: 26%;
  }
  .two-first > .two-img-holder {
    border: 4px solid grey;
    position: relative;
    left: -10%;
    width: fit-content;
  }
  .two-second > .two-img-holder {
    border: 4px solid grey;
    position: relative;
    height: 35vh;
    width: fit-content;
    left: 20%;
  }
  .two-third > .two-img-holder {
    border: 4px solid grey;
    position: relative;
    left: -20%;
    width: fit-content;
  }
  .two-holder p {
    font-family: sans-serif !important;
    font-weight: 300 !important;
  }
  .two-first > p,
  .two-second > p,
  .two-third > p {
    padding: 18px 10%;
  }
  .two-first > .two-img-holder > img {
    height: 40vh;
    transform: translate(-6%, -6%);
  }
  .two-second > .two-img-holder > img {
    height: 100%;
    transform: translate(6%, -6%);
  }
  .two-third > .two-img-holder > img {
    height: 40vh;
    transform: translate(-6%, -6%);
  }
  .two-second {
    position: relative;
    top: 40%;
  }

  .two-third {
    position: relative;
    top: 34%;
  }
}
@media (max-width: 1505px) {
  .two-third > img {
    margin-top: 0%;
  }
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
