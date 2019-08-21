<template>
  <v-card >
    <h3>Create Variant</h3>
    <p>A variant is specified detail of a base variant. For example "Blue" is a variant for "Color" or "Small" is a variant for "Size". Each variant must include a descriptor. This is used in product rendering on the user pages. If you are adding a colour this descriptor will be a code for a particular colour you select from a colour wheel.</p>
    
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-select
        v-model="vValue"
        :items="vars"
        box
        chips
        label="Base Variant"
      ></v-select>
      <v-text-field :rules="subRules" v-model="newVar" placeholder="variant name"></v-text-field>
      
      <v-layout v-if="vValue === 'Colour'" justify-center>
        <chrome-picker v-model="colors" />
      </v-layout>
      <v-text-field v-else :rules="subRules" v-model="newVarDes" placeholder="variant descriptor"></v-text-field>
      <br><br>
      {{vValue}}
      {{colors.hex}}
      <hr v-if="vValue === 'Colour'">
    </v-form>  
    <v-btn @click="addVarDes" color="warning" :disabled="!valid">Add variant</v-btn>
    <v-btn @click="close" color="danger">Cancel</v-btn>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import VueColor from 'vue-color'

export default {
  apollo: {
    variants: gql`query {
      variants {
        id
        name
      }
    }`
  },
  components: {
   'chrome-picker': VueColor.Chrome
  },
  props: ['cats'],
  data() {
    return {
      vValue: null,
      newVar: '',
      newVarDes: '',
      subRules: [
        v => !!v || 'Variant and descriptor are required',
        v => (v && v.length >= 4) || 'Must be more than 4 characters'
      ],
      colors: '',
      valid: true,
    }
  },
  computed: {
    vars() {
      if (!!this.variants) {
        return this.variants.map(v => v.name)
      }
      return []
    }
  },
  methods: {
    addVarDes() {
      if (this.$refs.form.validate()) {
        let varId = this.variants.find(v => v.name === this.vValue)
        let varName = this.newVar
        var desc = ""
        if (this.vValue === 'Colour') {
          desc = this.colors.hex
        } else {
          desc = this.newVarDes
        }
        console.log(desc)
        this.$apollo.mutate({
          mutation: gql`mutation ($name: String!, $descriptor: String!, $varId: String!) {
            createVariantDescriptor (
              data: {
                name: $name
                descriptor: $descriptor
                varId: $varId
              }
            ) {
              id
              name
              descriptor
            }
          }`,
          variables: {
            name: varName,
            descriptor: desc,
            varId: varId.id
          }
        })
        .then((res) => {
          this.$refs.form.reset()
          this.$emit('fromaddvar', res.data.createVariantDescriptor)
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
