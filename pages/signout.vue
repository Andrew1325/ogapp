<template>
  
</template>

<script>
  export default {
    created() {
      this.onLogout()
    },
    methods: {
      async onLogout(){
        await this.$apolloHelpers.onLogout()
        await this.$store.dispatch('onLogout')
        this.$router.push('/')
      }
    }
  }
</script>