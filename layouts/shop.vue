<template>
  <v-app>
    <v-content>
      <v-dialog persistent max-width="900px" justify-center v-model="cartDialog">
        <cart/>
      </v-dialog>
      <div class="menu-btn">
        <div @click="drawer = !drawer">
          <v-icon>menu</v-icon>
        </div>
      </div>
      <div class="cart-btn" v-if="$route.path !== '/checkout' && cart.length > 0">
        <div @click="cartOpen">
          <div class="bubble">{{cart.length}}</div>
          <v-icon>shopping_cart</v-icon>
          
        </div>
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

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          style="padding: 20px 0"
        >
          <v-list-tile-action>
            <v-icon class="material-icons-outlined">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content >
            <nuxt-link style="color:white; text-decoration: none;" :to="item.link"><v-list-tile-title>{{ item.title }}</v-list-tile-title></nuxt-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      
      <v-list class="pt-0 menu-list" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items2"
          :key="item.title"
          style="padding: 20px 0"
        >
          <v-list-tile-action>
            <v-icon class="material-icons-outlined">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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
        <!-- {{carto}} -->
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Cart from '@/components/Cart.vue'
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      // cartDialog: false,
      drawer: null,
        items: [
          { title: 'Home', icon: 'home', link: '/' },
          { title: 'Events', icon: 'event', link: '/events' },
          { title: 'Shop', icon: 'store', link: '/shop' },
          { title: 'Blog', icon: 'art_track', link: '/blog' },
          { title: 'About', icon: 'bubble_chart', link: '/about' }
        ],
        items2: [
          { title: 'Login', icon: 'fingerprint' },
          { title: 'Admin', icon: 'settings' },
          { title: 'Logout', icon: 'lock' }
        ],
        mini: false,
        right: null,
    }
  },
  components: {
    Cart
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      cart: 'cart/cart',
      cartDialog: 'cart/cartDialog'
    }),
    carto() {
      return this.$cookiez.get('cart')
    }
  },
  methods: {
    ...mapMutations({
      cartTot: 'cart/CART_TOTAL',
      changeDialog: 'cart/CHANGE_DIALOG'
    }),
    cartOpen() {
      this.changeDialog()
      this.cartTot()
    }
  }

}
</script>

<style>
  h1, h2 {
    font-family: 'Playfair Display';
    text-align: center;
  }
  p {
    font-family: 'Raleway';
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
  .teaser p{
    font-weight: 100;
    font-size: 1.4rem;
  }
  .teaser h1, .two-text-holder h1{
    font-size: 3.6rem;
    letter-spacing: 0.6rem;
    font-weight: 100;
  }
  
</style>


<style scoped>
  .menu-btn {
    position: fixed;
    z-index: 1001;
    height: 38px;
    width: 38px;
    border-radius: 19px;
    top: 120px;
    right: 20px;
    background-color: white;
    border: 1px solid rgb(127,127,127);
    text-align: center;
    padding-top: 6px;
    cursor: pointer;
  }
  .menu-btn:hover {
    background-color: rgb(227,227,227)
  }
  .cart-btn {
    position: fixed;
    z-index: 1001;
    height: 38px;
    width: 38px;
    border-radius: 19px;
    top: 164px;
    right: 20px;
    background-color: white;
    border: 1px solid rgb(127,127,127);
    text-align: center;
    padding-top: 6px;
    cursor: pointer;
  }
  .cart-btn:hover {
    background-color: rgb(227,227,227)
  }
  .menu-button {
    writing-mode: vertical-rl;
    text-orientation: sideways-right;
    position: relative;
    left: 20%;
    top: 20px;
    color: white;
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
    position:relative;
    top:-200px;
  }
  @media (min-width: 260px) and (max-width: 780px) {
    .menu-list {
      top:-160px;
    }
  }
  @media (min-width: 781px) and (max-width: 1024px) {
    .menu-list {
      top:-80px;
    }
  }
  .darken-3 {
    background-color: rgba(44, 40, 42, 0.962);
    font-family: 'Playfair Display';
    letter-spacing: 12px;
  }
  .fl {
    float: left;
  }
  .fr {
    margin-right: 20px;
  }
  .bubble {
    height: 20px;
    width: 20px;
    background-color: rgb(255, 71, 71);
    border-radius: 10px;
    position: absolute;
    left: 18px;
    top: -2px;
    color: #eeeeee;
  }
  
</style>

