<template>
  <v-card>
    <v-content v-if="post === null">
      <div class="selecter">
        {{selectedPost}}
        <h2>
          Select post to edit:
        </h2>
        <v-select
          v-model="selectedPost"
          :items="postNames"
          label="Select Post"
        ></v-select>
        <br><br>
        <v-btn @click="editer" :disabled="selectedPost === null">
          Edit post
        </v-btn>
      </div>
    </v-content>
    <v-content v-else>
      <add-post-form :post="post" @cancelEdit="post = null" />
    </v-content>
  </v-card>
</template>

<script>
  import gql from 'graphql-tag'
  import AddPostForm from '../../components/admin/AddPostForm'

  export default {
    apollo: {
      myPosts: {
        query: gql `query {
          myPosts {
            id
            title
            headline
            title_image
            body
            published
            category {
              id
              name
            }
          }
        }`,
        prefetch: true
      }
    },
    data() {
      return {
        post: null,
        selectedPost: null
      }
    },
    components: {
      AddPostForm
    },
    computed: {
      postNames() {
        let names = []
        if (!!this.myPosts) {
          for (let i = 0; i < this.myPosts.length; i++) {
            names.push(this.myPosts[i].title)
          }
        }
        return names
      }
    },
    methods: {
      editer() {
        let po = this.myPosts.find(e => e.title === this.selectedPost)
        this.post = po
      }
    } 
  }
</script>

<style scoped>
  .selecter {
    padding: 14px;
  }
</style>
