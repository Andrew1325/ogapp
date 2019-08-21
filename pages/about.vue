<template>
  <v-layout
    row wrap
    justify-center
    align-center
  >
    <v-flex xs12>
      <div flat class="one">
        <div class="box-logo"></div>
        <div class="about"><br><br><br><br>

          <p style="font-weight:400;">Founded in 2018, Ordinary Goddesses Here, I have invoked the createdb utility and passed it the patrick user to use for connecting to the database. It is that user whose permissions will be checked to execute the create command.

It is very, very rare that you will want to change a database after it is created. The only things you can change are its name and some configuration parameters. Changing configuration parameters (such as collation or character sets) have implications that go far outside of this tutorial. However, we can change the name if we’d like.

Again, there is no command line tool to change a database once it’s created. We must use psql.</p>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import MainFooter from '@/components/MainFooter'

export default {
  data: () => ({
    items: [
      {name:'Clothing', img: '/t-shirt.svg', link: ''},
      {name:'Books', img: '/book.svg', link: ''},
      {name:'Jewelery', img: '/jewelery.svg', link: ''},
      {name:'Yoga', img: '/yoga.svg', link: ''},
      {name:'Accessories', img: '/accessories.svg', link: ''},
      {name:'Herbal Teas', img: '/tea.svg', link: ''}
    ]
  }),
  components: {
    MainFooter
  },
  computed: {
    getYear() {
      let y = new Date()
      this.year = y.getFullYear()
      return this.year
    },
  }
}
</script>

<style scoped>
  .one {
    background:linear-gradient( rgba(0, 0, 0, 0.6) 100%, rgba(0, 0, 0, 0.6)100%),url("/about.jpg");
    background-size: cover;
    position: fixed;
    height: 100vh;
    width: 100vw;
  }
  .box-logo {
    width: 8%;
    min-height: 18vw;
    background-image: url('/boxLogo.svg');
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
  
  @media (max-width: 660px){
    .teaser >>> p{
      padding: 0 58px;
      font-weight: 400;
      font-size: 1.1rem;
    }
    .teaser h1{
      font-size: 2.4rem;
      letter-spacing: 0.3rem;
      font-weight: 100;
    }
  }
</style>
