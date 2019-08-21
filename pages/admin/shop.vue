<template>
  <div> admin/shop
    <component :is="adminLinks.component"/>
    <div style="height: 100px;"></div>
  </div>
</template>

<script>
import AddProductForm from '@/components/admin/AddProductForm.vue'
import Specials from '@/components/admin/Specials.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  layout: 'admin',
  components: {
    AddProductForm,
    Specials
  },
  mounted() {
    if (!this.adminLinks.name) {
      this.setLink({component: 'AddProductForm'})
    }
  },
  computed: {
    ...mapGetters ({
      adminLinks: 'auth/adminLinks'
    })
  },
  methods: {
    ...mapMutations ({
      setLink: 'auth/SET_ADMIN_LINKS'
    })
  }
}
</script>

