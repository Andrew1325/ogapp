<template>
  <v-app>
    <v-toolbar flat color="#1DE9B6" app>
      <v-toolbar-title><nuxt-link to="/"><img style="margin-top:8px;" src="/logo.svg" height="48px" alt=""></nuxt-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="links">
      <nuxt-link style="margin-top: 20px;text-decoration: none" to="/"><v-icon>store</v-icon></nuxt-link>
      <nuxt-link style="margin-top: 20px;text-decoration: none" to="/signout"><v-icon v-if="user.name">lock</v-icon></nuxt-link>
      <v-icon class="hidden-md-and-up" @click.prevent="open">menu</v-icon>
    </v-toolbar-items>
    </v-toolbar>
    <br>
    <v-content>
      <v-container style="padding:0px;">
        <div class="hidden-sm-and-down">
          <v-toolbar
            color="white"
            dark
            tabs
            flat
          >

            <template v-slot:extension>
              <v-tabs
                v-model="model"
                centered
                color="white"
                slider-color="transparent"
              >
                <v-tab
                  v-for="(admin,i) in admins"
                  :key="i"
                  :href="`#tab-${i}`"
                  style="color:#888"
                  @click="adminLink(admin.links[0])"
                >
                  <nuxt-link :to="admin.link" class="tab-link"><v-icon style="color:#888" >{{ admin.icon }}</v-icon>{{ admin.name }}</nuxt-link>
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="model">
            <v-tab-item
              v-for="(admin, i) in admins"
              :key="i"
              :value="`tab-${i}`"
              style=" margin: 0 24px 0 24px;"
            >
              <v-card flat>
                <v-card-text style="background-color:#fafafa;"><span v-for="link in admin.links" :key="link.name"><v-btn color="#b5b5b5" :style="adlink.name === link.name ? act : noact" @click="adminLink(link)" flat outline>{{link.name}}</v-btn></span></v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
        <nuxt/>
      </v-container>
    </v-content>
    <v-navigation-drawer
      :value="opened"
      fixed
      class="hidden-md-and-up"
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          prepend-icon="menu"
          value="false"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Menu Links</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-group
            no-action
            sub-group
            value="false"
            v-for="(admin, i) in admins"
            :key="i"
          >
            <template v-slot:activator>
              <v-list-tile
                nuxt :to="admin.link"
                >
                <v-list-tile-title>{{admin.name}}</v-list-tile-title>
                <v-icon>{{admin.icon}}</v-icon>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="ad in admin.links"
              :key="ad.name"
              @click="componentClick(ad, admin.link)"
            >
              <v-list-tile-title>{{ad.name}}</v-list-tile-title>
              <v-list-tile-action>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import AddProductForm from '@/components/admin/AddProductForm.vue'
import { mapGetters, mapMutations } from 'vuex'
  export default {
    data: () => ({
      opened: false,
      act: "color:green",
      noact: '',
      admins: [
        {name: 'Dashboard', icon: 'dashboard', link: '/admin/', text: 'one', links: [{name: 'Welcome to your dashboard'}]},
        {name: 'Blog', icon: 'art_track', link: '/admin/blog', text: 'two', links: [{name: 'Add Post', component: 'AddPostForm'}, {name: 'Edit Post', component: 'EditPostForm'}]},
        {name: 'Events', icon: 'spa', link: '/admin/events', text: 'three', links: [{name: 'Add Event', component: 'AddEventForm'}, {name: 'Edit Event', component: 'EditEventForm'}, {name: 'Add Registration', component: 'AddRegistrant'}, {name: 'Manage Registrations', component: 'EmailRegistrant'}]},
        {name: 'Shop', icon: 'store', link: '/admin/shop', text: 'four', links: [{name: 'Add Product', component: 'AddProductForm'}, {name: 'Edit Product', component: 'EditProductForm'}, {name: 'Create Specials', component: 'Specials'}]},
        {name: 'Site', icon: 'devices', link: '/admin/site', text: 'five', links: [{name: 'Soon', component: 'Something'}]}
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ],
      model: 'tab-0',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      component: ''
    }),
    mounted(){
      if (this.$route.name !== 'admin') {
        for (let i = 0; i < this.admins.length; i++) {
          if (this.$route.name === `admin-${this.admins[i].name.toLowerCase()}`) {
            this.model = `tab-${i}`
          }
        }
      }
    },
    computed: {
      year() {
        return new Date().getFullYear()
      },
      ...mapGetters ({
        user: 'user',
        adlink: 'auth/adminLinks'
      }),
    },
    methods: {
      open() {
        this.opened = !this.opened
      },
      go() {
        this.$router.push('/')
      },
      ...mapMutations ({
        logout: 'auth/logout',
        adminLink: 'auth/SET_ADMIN_LINKS'
      }),
      componentClick(c, a) {
        if (this.$route.path !== a) {
          this.$router.push(a)
        }
        this.adminLink(c)
        this.opened = false
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .nuxt-link
    margin-top: 12px
    text-decoration: none
</style>

<style scoped>
  .drawer {
    content: "";
    background: transparent;
    -webkit-box-shadow: none ;
    box-shadow: none;
    border-left: 0px;
    
  }
  .drawer-extra {
    background: #ffbd00dd;
    outline: 1px solid white;
    outline-offset: 15px;
    height: 100%;
    width: 500px;
    border-left: 0px;
    -webkit-transform: skewX(10deg) translateZ(0);
    transform: skewX(10deg) translateZ(0);
    -webkit-transform-origin: top left;
    transform-origin: top left;
    padding: 30px;
  }
  .drawer-content {
    position: relative;
    left: 100px;
    -webkit-transform: skewX(-10deg) translateZ(0);
    transform: skewX(-10deg) translateZ(0);
  }
  .nav-drawer {
    position: fixed;
    right:20px;
    top: 10px;
    z-index: 601;
  }
  .links{
    margin-left: 160px;
  }
  .footer {
    height: 740px;
  }
  .v-icon {
    margin: 0 10px;
  }
  .ad-links {
    color: #979797
  }
  .tab-link {
    text-decoration: none;
    color: #979797;
  }
</style>
