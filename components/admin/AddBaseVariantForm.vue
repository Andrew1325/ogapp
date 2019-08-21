<template>
  <v-card >
    <h3>Create Base Variant</h3>
    <p>A base variant is a general variation that a product may have, which needs a variant descriptor to complete it. For example, with clothing, size would be a base variant, and size then has the variant descriptors of s, m, l and xl. A base variant does not relate to only one product, or one category, it can be used across all products.</p>
    <p>If you are unsure you probably shouldn't be adding a base variant. An example of something not being a base variant would be with books and having some being hard-cover. Hard cover is not a base variant because it doesn't need a descriptor to complete it.</p>
    
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      
      <v-text-field :rules="subRules" v-model="newVar" placeholder="variant name"></v-text-field>
      
    </v-form>  
    <v-btn @click="addVar" color="warning" :disabled="!valid">Add base variant</v-btn>
    <v-btn @click="close" color="danger">Cancel</v-btn>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import VueColor from 'vue-color'

export default {
  data() {
    return {
      newVar: '',
      subRules: [
        v => !!v || 'Variant is required',
        v => (v && v.length >= 4) || 'Must be more than 4 characters'
      ],
      valid: true,
    }
  },
  methods: {
    addVar() {
      if (this.$refs.form.validate()) {
        let varName = this.newVar
        this.$apollo.mutate({
          mutation: gql`mutation ($name: String!) {
            createVariant (name: $name) {
              id
              name
            }
          }`,
          variables: {
            name: varName,
          }
        })
        .then((res) => {
          this.$refs.form.reset()
          this.$emit('fromaddbasvar', res.data.createVariant)
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
