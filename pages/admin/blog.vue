<template>
  <div>
    <component :is="adminLinks.component"/>
    <div style="height: 100px;"></div>
  </div>
</template>

<script>
import AddPostForm from '@/components/admin/AddPostForm.vue'
import EditPostForm from '@/components/admin/EditPostForm.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  layout: 'admin',
  components: {
    AddPostForm,
    EditPostForm
  },
  mounted() {
    if (!this.adminLinks.name) {
      this.setLink({component: 'AddPostForm'})
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

