<template>
  <v-app>
    <v-content>
      <Nav :user="user" />
      <v-container fluid style="padding:0px;">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Nav from "../components/Nav.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Nav
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "home", link: "/" },
        { title: "Events", icon: "event", link: "/events" },
        { title: "Shop", icon: "store", link: "/shop" },
        { title: "Blog", icon: "art_track", link: "/blog" },
        { title: "About", icon: "bubble_chart", link: "/about" }
      ],
      items2: [
        { title: "Login", icon: "fingerprint", link: "/signin" },
        { title: "Admin", icon: "settings", link: "/admin" },
        { title: "Logout", icon: "lock", link: "/signout" },
        { title: "Edit Details", icon: "account_circle", link: "/editself" }
      ],
      mini: false,
      right: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style>
h1,
h2 {
  font-family: "Playfair Display";
  text-align: center;
}
p {
  font-family: "Raleway";
  font-weight: 200;
}
.all {
  min-height: 100vh;
  overflow: hidden;
}
.teaser {
  color: white;
  text-align: center;
  height: 120px;
  width: 480px;
  position: absolute;
  top: calc(50vh - 60px);
  left: calc(50vw - 240px);
}
.teaser p {
  font-weight: 100;
  font-size: 1.4rem;
}
.teaser h1,
.two-text-holder h1 {
  font-size: 3.6rem;
  letter-spacing: 0.6rem;
  font-weight: 100;
}
</style>


<style scoped>
.menu-btn {
  position: fixed;
  z-index: 1;
  height: 100vh;
  width: 50px;
}
.menu-button {
  writing-mode: vertical-rl;
  text-orientation: sideways-right;
  position: relative;
  font-weight: 200;
  font-size: 1.1rem;
  background-color: rgba(0, 0, 0, 0.449);
  border-radius: 5px;
  padding: 8px 6px;
  left: calc(20% - 5px);
  top: 20px;
  color: #c1c1c1;
}
.menu-holder {
  height: 40px;
  width: 35px;
  position: relative;
  top: 10px;
  left: 5px;
  background-color: rgba(0, 0, 0, 0.449);
  background-image: url("/menu-full.svg");
  background-size: contain;
  border-radius: 5px;
  cursor: pointer;
  transition-delay: 120ms;
  transition-duration: 120ms;
}
.menu-holder:hover {
  background-image: url("/menu-post.svg");
  transition-delay: 120ms;
  transition-duration: 120ms;
}
.block {
  height: 40%;
  width: 60%;
  position: relative;
  top: 30%;
  left: 20%;
  background-color: rgba(41, 36, 39, 0.842);
  z-index: -1;
}
.menu-list {
  background: transparent;
  position: relative;
  top: -200px;
}
@media (min-width: 260px) and (max-width: 780px) {
  .menu-list {
    top: -160px;
  }
}
@media (min-width: 781px) and (max-width: 1024px) {
  .menu-list {
    top: -80px;
  }
}
.darken-3 {
  background-color: rgba(44, 40, 42, 0.962);
  font-family: "Playfair Display";
  letter-spacing: 12px;
}
.fl {
  float: left;
}
.fr {
  margin-right: 20px;
}
</style>

