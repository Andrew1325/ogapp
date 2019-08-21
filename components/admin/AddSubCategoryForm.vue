<template>
  <v-card >
    <h3>Create SubCategory</h3>
    <p>A new sub-category is a new branch of the categor(y)(ies) you have selected. This should be something of the like of "shirts" as a sub-category of "clothing".</p>
    <p>Sub-categories can belong to more than one category and if you think this would be the case here please ensure you have selected all the categories this sub-category could apply to. To do so, close this window, select all the applicable categories and open this window again. An example of a subcategory belonging to more that one category would be "Yoga Pants" belong to "Clothing" and "Yoga"</p>
    
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field :rules="subRules" v-model="newSub" placeholder="SubCategory name"></v-text-field>
    </v-form>  
    <v-btn @click="addCat" color="warning" :disabled="!valid">Add sub-category</v-btn>
    <v-btn @click="close" color="danger">Cancel</v-btn>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: ['cats'],
  data() {
    return {
      
      newSub: '',
      subRules: [
        v => !!v || 'SubCategory is required',
        v => (v && v.length >= 4) || 'SubCategory must be more than 4 characters'
      ],
      valid: true,
    }
  },
  computed: {
    otherCats() {
      return [...this.cats]
    }
  },
  methods: {
    addCat() {
      if (this.$refs.form.validate()) {
        let subName = this.newSub
        let ids = this.cats
        console.log(ids)
        this.$apollo.mutate({
          mutation: gql`mutation ($name: String!, $ids: [String!]!) {
            createSubCategory (data: {
              name: $name,
              ids: $ids
            }) {
              id
              name
            }
          }`,
          variables: {
            name: subName,
            ids: ids
          }
        })
        .then((res) => {
          this.$refs.form.reset()
          this.$emit('fromaddsub', res.data.createSubCategory)
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
