<template>
  <div>
    <div class="header">
      <h1>GODDESS BLOG</h1>
    </div>
    <main class="gallery">
      <div class="text-xs-center push" v-if="newPosts.length === 0">
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
      <div class="gallery__list" v-else>
        <div class="box" :class="i===0 ? 'first' : ''" v-for="(post, i) in newPosts" :key="post.id">
          <nuxt-link :to="`/blog/${post.id}`">
            <div class="pre-holder">
              <div class="img-display">
                <img :src="post.title_image" alt="">
              </div>
              <h3><span class="heady">{{ post.title }}</span><br><br><small class="preview">{{ post.headline }}</small><br><br><small class="author-tah">by {{ post.author.name }} on {{ niceDate(post.updated_at) }}</small></h3>
            </div>
          </nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  head () {
    return {
      title: "Ordinary Goddesses Blog",
      meta: [
        { hid: 'description', name: 'description', content: 'The blog page of Ordinary Goddesses' }
      ]
    }
  },
  apollo: {
    posts: {
      query: gql `query {
        posts {
          id
          title
          headline
          title_image
          updated_at
          author {
            name
          }
        }
      }`,
      prefetch: true
    }
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
  },
  computed: {
    newPosts() {
      if (this.posts && this.posts.length > 0) {
        return this.posts.reverse()
      }
      return []
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>

<style scoped>
  p {
    color: rgb(97, 97, 97);
  }
  h3 {
    font-size: 14pt;
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
  .gallery {
    position: relative;
    z-index: 0;
  }
  .gallery > .gallery__list {
    margin: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-template-rows: 260px repeat(auto-fill, 260px) 300px;
    grid-gap: 1rem;
    grid-auto-flow: dense;
  }
  
  @media (min-width: 960px) {
    .first {
      grid-column: span 2; /* Spans two columns */
      grid-row: span 2; /* Spans two rows */
    }
  }
  .pre-holder {
    max-height: 100%;
    overflow: hidden;
    position: relative;
    line-height: 9pt;
  }
  .heady {
    line-height: 14pt;
  }
  .pre-holder >>> h3 {
    background-color: rgba(49, 49, 49, 0.515);
    color: white;
    padding: 12px;
    position: absolute;
    bottom: 13px;
    width: 100%;
    z-index: 1001;
    overflow: hidden;
  }
  .img-display {
    position: relative;
    margin: -0.5rem;
    z-index: 1;
    max-height: 100%;
    overflow: hidden;
  }
  .img-display > img{
    width: 120%;
    height: 100%;
    object-fit: center;
    overflow: hidden;
  }
  .img-display > h3 {
    background-color: rgba(23, 173, 68, 0.615);
    color: white;
    padding: 12px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
  }
  .head-p {
    font-style: italic;
    font-weight: 500;
    padding: 6px;
    margin-top: 6px;
  }
  .rest-p {
    font-size: 1rem;
    padding: 6px;
    margin-top: -22px;
  }
  .preview {
    font-weight: 200;
    font-size: 9.5pt;
    line-height: 10pt !important;
  }
  .author-tah {
    font-weight: 200;
    font-size: 9.5pt;
    font-style: italic;
    text-align: right;
    float: right;
  }
</style>


