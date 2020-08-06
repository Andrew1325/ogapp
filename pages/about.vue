<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12>
      <div flat class="one">
        <div class="box-logo"></div>
        <div class="about">
          <br />
          <br />
          <br />
          <br />

          <p
            style="font-weight:400; text-align: center;"
          >Nadine, Fiona and Courtney are women who are passionate about our community and creating opportunities for women to connect, have fun, and step into and honour their true selves; to gather in a place where they can drop all sense of professional responsibility, life expectations, and labels – such as those of wife, mother, caretaker, dinner maker – and lovingly focus on their inner Goddess. We are women who are healers, yogis, artists, cooks, professionals, entrepreneurs, farmers, gardeners, girlfriends, wives, sisters, daughters...but most of all, just like you, we are GODDESSES.</p>
        </div>
      </div>
    </v-flex>
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
  background: linear-gradient(rgba(0, 0, 0, 0.6) 100%, rgba(0, 0, 0, 0.6) 100%),
    url("/about.jpg");
  background-size: cover;
  position: fixed;
  height: 100vh;
  width: 100vw;
}
.box-logo {
  width: 8%;
  min-height: 18vw;
  background-image: url("/boxLogo.svg");
  background-size: contain;
  position: absolute;
  left: 46%;
  top: 30px;
}
.about {
  position: relative;
  width: 60vw;
  margin: 200px auto;
  color: white;
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
