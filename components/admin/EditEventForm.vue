<template>
  <v-card>
    <v-content v-if="event === null">
      <div class="selecter">
        <h2>
          Select event to edit:
        </h2>
        <v-select
          v-model="selectedEvent"
          :items="eventNames"
          label="Select Event"
        ></v-select>
        <br><br>
        <v-btn @click="editer" :disabled="selectedEvent === null">
          Edit event
        </v-btn>
      </div>
    </v-content>
    <v-content v-else>
      <add-event-form :event="event" />
    </v-content>
  </v-card>
</template>

<script>
import AddEventForm from './AddEventForm'
import { mapGetters } from 'vuex'
export default {
  components: {
    AddEventForm
  },
  data() {
    return {
      event: null,
      selectedEvent: null
    }
  },
  computed: {
    ...mapGetters ({
      events: 'event/events'
    }),
    eventNames() {
      let names = []
      for (let i = 0; i < this.events.length; i++) {
        names.push(this.events[i].title)
      }
      return names
    }
  },
  methods: {
    editer() {
      let ev = this.events.find(e => e.title === this.selectedEvent)
      this.event = ev
    }
  }
}
</script>

<style scoped>
  .selecter {
    padding: 14px;
  }
</style>
