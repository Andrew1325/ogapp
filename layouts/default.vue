<template>
  <v-app>
    <v-content>
      <div class="menu-btn">
        <nuxt-link style="color:#c1c1c1; text-decoration:none; cursor:pointer" to="/">
          <p class="menu-button">ORDINARY GODDESSES</p>
        </nuxt-link>
        <div class="menu-holder" @click="drawer = !drawer"></div>
        <p class="menu-button" style="cursor:pointer" @click="drawer = !drawer">MENU</p>
      </div>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        style="background-color: rgba(44, 40, 42, 0.962);"
        class="darken-3"
        fixed
        dark
        temporary
        width="320"
      >
        <div class="block"></div>
        <v-list class="pt-0 menu-list" dense>
          <v-divider light></v-divider>

          <v-list-tile v-for="item in items" :key="item.title" style="padding: 20px 0">
            <v-list-tile-action>
              <v-icon class="material-icons-outlined">{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <nuxt-link style="color:white; text-decoration: none;" :to="item.link">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </nuxt-link>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0 menu-list" dense>
          <v-divider light></v-divider>
          <template v-for="(item, i) in items2">
            <v-list-tile
              v-if="i === 0 && !user || i === 1 && !!user && user.permissions > 1 || i === 2 && !!user || i === 3 && !!user"
              :key="item.title"
              style="padding: 20px 0"
              nuxt
              :to="item.link"
            >
              <v-list-tile-action>
                <v-icon class="material-icons-outlined">{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <!-- <v-divider></v-divider> -->

        <v-list class="pa-1 menu-list">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile avatar tag="div">
            <v-btn class="fr" icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-container fluid style="padding:0px;">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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

