<template>
  <div>
    <div class="text-xs-center push" v-if="!post">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="value"
        color="teal"
      >
        {{ value }}
      </v-progress-circular>
    </div>
    <div v-else>
      <div class="header">
        <nuxt-link to="/blog" style="color:rgb(99, 99, 99); text-decoration:none;"><h1>GODDESS BLOG</h1></nuxt-link>
      </div>
      <main>
        <div class="intro" :style="!!post.title_image ? `background-image:url(${post.title_image})` : '/soap-bubble.jpg'">
        <div class="title">
          <h2>{{ post.title }}</h2><br><hr><br>
          <p><strong>{{post.headline}}</strong></p>
          <p class="by"><small>by {{post.author.name}} on {{niceDate(post.updated_at)}}</small></p>
        </div>
      </div>
      <div class="guts">
        <p v-html="post.body"></p>
      </div>
      <main-footer style="position:relative; top:122px;"></main-footer>
      </main>
    </div>
  </div>
</template>

<script>
import MainFooter from '~/components/MainFooter.vue'
import gql from 'graphql-tag'

export default {
  head () {
    return {
      title: !!this.post ? this.post.title : 'Goddess Blog',
      meta: [
        { hid: 'description', name: 'description', content: 'The blog page of Ordinary Goddesses' }
      ]
    }
  },
  apollo: {
    post: {
      query: gql `query ($id: ID!) {
        post (
          id: $id
        ) {
          title
          title_image
          headline
          body
          category {
            color
            name
          }
          author {
            name
          }
          updated_at
        }
      }`,
      prefetch: false,
      variables() {
        return {
          id: this.$route.params.id
        }
      }
    }
  },
  components: {
    MainFooter
  },
  data () {
    return {
      interval: {},
      value: 0
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 400)
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>

<style scoped>
  .push {
    position: relative;
    top: 30vh;
  }

  .header {
    width: 100%;
    height: 74px;
    background-color: rgba(224, 201, 219, 0.911);
    text-align: center;
    color: rgb(99, 99, 99);
  }
  .header >>> h1 {
    line-height: 74px;
    letter-spacing: 0.4rem;
  }
  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
    margin: 0 20%;
  }
  .intro {
    position: relative;
    top: 6px;
    width: 960px;
    max-width: 100vw;
    height: 600px;
    margin: auto;
    background-size: cover;
    background-position: center;
  }
  .title {
    height: 260px;
    width: 380px;
    position: absolute;
    bottom: 24px;
    right: 24px;
    text-align: center;
    padding: 18px;
    background-color: rgba(224, 201, 219, 0.911);
    outline: 1px solid rgba(224, 201, 219, 0.911);
    outline-offset: 4px;
    color: rgb(70, 70, 70);
    overflow: hidden;
  }
  
  .title >>> h2 {
    font-size: 1.9rem;
    letter-spacing: 0.4rem;
  }
  .title >>> small {
    font-style: italic;
    font-size: 0.9rem;
  }
  .by {
    position: absolute;
    bottom: 0px;
    right: 6px;
  }
  .guts {
    position: relative;
    top: 104px;
    width: 900px;
    max-width: 90vw;
    margin: auto;
  }
  .guts >>> p {
    font-weight: 400;
  }
  .guts >>> img {
    position: relative;
    width: 60%;
    margin-left: 20%;
    outline: 1px solid lightgrey;
    outline-offset: 6px;
  }
  @media (max-width: 400px) {
    .title {
      width: 280px;
      height: 260px;
    }
    .guts >>> img {
      width: 90%;
      margin-left: 5%;
    }
  }
</style>
