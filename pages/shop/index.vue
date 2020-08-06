<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12>
      <v-card flat class="all one" align-content="center">
        <div class="cover-screen"></div>
        <div class="teaser">
          <h1>Goddess Shop</h1>
          <img src="/brush-stroke.svg" height="62px;" />
          <p style="font-weight:400;">&nbsp;</p>
          <v-btn outline color="#fefefe">coming soon...</v-btn>
        </div>
      </v-card>
    </v-flex>
    <!-- 
    <v-flex xs12>
      <v-card flat class="all two">
        <br>
        <h2>Latest products</h2><br>
        <v-layout row wrap>
          <v-flex xs12 sm10 offset-sm1 xl8 offset-xl2>
            <v-layout row wrap>
              <v-flex v-for="i in 3" :key="i" xs12 md4>
                <v-card style="margin:18px; outline: 1px solid rgb(157,157,157); outline-offset: 12px;">
                  <v-img src="/candle-prod.jpg" style="border: 5px solid white;">
                    <h2 style="background:rgba(255,255,255,0.7); outline 1px solid rgba(255,255,255,0.7); outline-offset: 8px; padding 12px;">Brand new product</h2>
                  </v-img>  
                  <v-card-title><p>Stuff about product</p>
                    <v-spacer></v-spacer><p>$10.00</p>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn><p>Buy</p></v-btn>
                  </v-card-actions>
                </v-card>  
              </v-flex>
            </v-layout>
            <br>
          </v-flex>  
        </v-layout> 
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card flat class="all three">
        <v-layout row wrap>
          <v-flex xs12 md8 offset-md2>
            <br><br>
            <h1>Categories</h1>
            <p>Once a Contribution is added by the terms and conditions of merchantability.</p>
            <v-layout row wrap>
              <v-flex xs12 sm6 md4 v-for="i in items" :key="i.name" >
                <v-card flat style="background: transparent; padding: 40px;">
                  <img :src="i.img" width="100%" alt="">
                  <h1>{{ i.name }}</h1>
                  <p>Once a Contribution is added by the terms and conditions of merchantability.</p>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <main-footer/>-->
  </v-layout>
</template>

<script>
import MainFooter from "@/components/MainFooter";

export default {
  data: () => ({
    items: [
      { name: "Clothing", img: "/t-shirt.svg", link: "" },
      { name: "Books", img: "/book.svg", link: "" },
      { name: "Jewelery", img: "/jewelery.svg", link: "" },
      { name: "Yoga", img: "/yoga.svg", link: "" },
      { name: "Accessories", img: "/accessories.svg", link: "" },
      { name: "Herbal Teas", img: "/tea.svg", link: "" }
    ]
  }),
  components: {
    MainFooter
  },
  computed: {
    getYear() {
      let y = new Date();
      this.year = y.getFullYear();
      return this.year;
    }
  }
};
</script>

<style scoped>
.one {
  background-image: url("/boxes.jpg");
  background-size: cover;
  position: relative;
}
.cover-screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.3;
}
.two {
  background-color: rgb(194, 194, 194);
  min-height: 360px;
}
.two h2 {
  font-family: "Roboto";
  font-weight: 300;
  color: rgb(91, 91, 91);
  font-size: 2.4rem;
}
.holder {
  height: 100%;
  line-height: 100%;
  padding: 0 10vw;
  text-align: center;
}
.holder span {
  display: inline-block;
  vertical-align: middle;
  line-height: 18pt;
  font-size: 1.2rem;
  color: rgb(157, 157, 157);
}
.holder h1 {
  font-size: 2.8rem;
  letter-spacing: 0.4rem;
}
.three {
  background-color: rgb(218, 173, 119);
  text-align: center;
}
@media (max-width: 660px) {
  .teaser >>> p {
    padding: 0 58px;
    font-weight: 400;
    font-size: 1.1rem;
  }
  .teaser h1 {
    font-size: 2.4rem;
    letter-spacing: 0.3rem;
    font-weight: 100;
  }
}
</style>
