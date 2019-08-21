<template>
  <v-card >
    <h3>Create Category</h3>
    <p>Creating a category is not something to undertake lightly. A category is a very broad descriptor of a broad swathe of products and shouldn't be created for specialised items. </p>
    <p>IF YOU ARE UNSURE whether you need a new category, you probably don't, and click cancel now.</p>
    <p>All categories must have at least one subcategory so you must supply one here. An example of a category and a subcategory is "Clothing" and "Shirts".</p>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field :rules="catRules" v-model="newCat" placeholder="Category name"></v-text-field>
      <v-text-field :rules="subRules" v-model="newSub" placeholder="SubCategory name"></v-text-field>
    </v-form>  
    <v-btn @click="addCat" color="warning" :disabled="!valid">Add category</v-btn>
    <v-btn @click="close" color="danger">Cancel</v-btn>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      newCat: '',
      catRules: [
        v => !!v || 'Category is required',
        v => (v && v.length >= 4) || 'Category must be more than 4 characters'
      ],
      newSub: '',
      subRules: [
        v => !!v || 'SubCategory is required',
        v => (v && v.length >= 4) || 'SubCategory must be more than 4 characters'
      ],
      valid: true,
    }
  },
  methods: {
    addCat() {
      if (this.$refs.form.validate()) {
        let catName = this.newCat
        let subNam = this.newSub
        this.$apollo.mutate({
          mutation: gql`mutation ($name: String!, $subName: String) {
            createCategory (name: $name, subName: $subName) {
              id
              name
              subcategories {
                name
              }
            }
          }`,
          variables: {
            name: catName,
            subName: subNam
          }
        })
        .then((res) => {
          this.$refs.form.reset()
          this.$emit('fromaddcat', res.data.createCategory)
        })
      }
    }, 
    close() {
      this.$refs.form.reset()
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
