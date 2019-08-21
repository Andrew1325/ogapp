<template>
  <div>
    <component :is="adminLinks.component"/>
    <div style="height: 100px;"></div>
  </div>
</template>

<script>
import AddEventForm from '@/components/admin/AddEventForm.vue'
import EditEventForm from '@/components/admin/EditEventForm.vue'
import EventWelcomePage from '@/components/admin/EventWelcomePage.vue'
import AddRegistrant from '@/components/admin/AddRegistrant.vue'
import EmailRegistrant from '@/components/admin/EmailRegistrant.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  layout: 'admin',
  components: {
    AddEventForm,
    EditEventForm,
    EventWelcomePage,
    AddRegistrant,
    EmailRegistrant
  },
  mounted() {
    if (!this.adminLinks.name) {
      this.setLink({component: 'EventWelcomePage'})
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

