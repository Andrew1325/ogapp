<template>
  <v-card style="padding: 12px;">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="18"
        :rules="nameRules"
        label="Category Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="color"
        :rules="colorRules"
        label="Color"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        @click="handleSubmit"
      >
        Submit
      </v-btn>

      <v-btn
        color="error"
        @click="reset"
      >
        Cancel
      </v-btn>

    </v-form>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 18) || 'Name must be less than 18 characters'
      ],
      color: '',
      colorRules: [
        v => !!v || 'Color is required'
      ],
    }
  },
  methods: {
    handleSubmit () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        
        this.$apollo.mutate({
          mutation: gql `mutation ($name: String!, $color: String!) {
            createPostCat ( name: $name, color: $color ) {
              id
              name
            }
          }`,
          variables: {
            name: this.name,
            color: this.color
          }
        })
        .then((res) => {
          this.$refs.form.reset()
          this.$emit('shutup', res.data.createPostCat)
        })
      }
    },
    reset () {
      this.$refs.form.reset()
      this.$emit('shutup')
    }
  }
}
</script>
