<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card flat class="all three">
        <v-layout row wrap>
          <v-flex xs12 md8 offset-md2>
            <br><br>
            <v-card class="three-cont">
              <v-img :src="nextEvent.image"><div class="main-event-title-holder"><span class="main-event-title">{{nextEvent.title}}</span></div></v-img>
              <v-content>
                <v-divider></v-divider><br>
                <p v-if="nextEvent.end_date === null">{{niceDate(nextEvent.start_date)}}</p>
                <p v-else>{{new Date(nextEvent.start_date).toDateString()}} - {{new Date(nextEvent.end_date).toDateString()}}</p>
                <p v-if="nextEvent.free">Free Event - book by {{new Date(nextEvent.bookings_close).toDateString()}}</p>
                <p v-else-if="nextEvent.cost === 0">By donation - Bookings close {{new Date(nextEvent.bookings_close).toDateString()}}</p>
                <p v-else>Event Cost ${{nextEvent.cost.toFixed(2)}} - Bookings close {{new Date(nextEvent.bookings_close).toDateString()}}</p>
                <v-divider></v-divider><br>
                <h4>{{nextEvent.subtitle}}</h4><br>
                <div class="e-body" v-html="nextEvent.body"></div>
              </v-content>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="bookingsOpen(nextEvent.bookings_close) && nextEvent.bookings_open" color="rgb(219, 155, 59)" outline nuxt :to="'/events/register/'+nextEvent.id">
                  <v-icon>how_to_reg</v-icon>
                  Register now
                </v-btn>
                <v-btn v-else color="rgb(219, 155, 59)" outline disabled>
                  <v-icon>how_to_reg</v-icon>
                  Registrations Closed
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  head () {
    return {
      title: "Ordinary Goddesses Event",
      meta: [
        { hid: 'description', name: 'description', content: 'Viewing event from Ordinary Goddesses' }
      ]
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters ({
      events: 'event/events'
    }),
    nextEvent() {
      return this.events.find(e => e.id === this.$route.params.id)
    }
  },
  methods: {
    bookingsOpen(date) {
      let today = Date.parse(new Date())
      let bookingsClose = Date.parse(date)
      if (bookingsClose > today) {
        return true
      }
      return false
    },
  }
}
</script>

<style scoped>
  .e-body {
    text-align: justify;
  }
  .e-body >>> p {
    font-weight: 400 !important;
    color:rgb(75, 75, 75);
  }
  .e-body >>> ul {
    font-family: 'Raleway';
    font-size: 1.4rem;
    font-weight: 400;
    color:rgb(75, 75, 75);
    list-style: circle outside none;
  }
  .three {
    /* background-color: rgb(218, 173, 119); */
    text-align: center;
  }
  .main-event-title-holder {
    background:rgba(153, 129, 133, 0.411);
    position:relative;
    top:46px;
  }
  .main-event-title {
    text-align: center;
    font-size: 5.8rem !important;
  }
  .main-event-title, .other >>>p {
    font-family: 'Playfair Display';
    font-size: 4.7rem;
    font-weight: 600;
    color:rgb(231, 231, 231);
    letter-spacing:0.4rem;
    text-align: center;
  }
  @media (max-width: 660px) {
    .main-event-title, .other >>>p {
      font-size: 4.0rem;
      line-height: unset;
      top: 24px;
    }
    p {
      padding: 28px;
    }
  }
  .three h2 {
    font-family: 'Roboto';
    font-weight: 300;
    color: rgb(145, 145, 145);
    font-size: 2.7rem;
  }
  .three-cont {
    margin: 12px 0;
    padding: 12px;
  }
  .three-cont p {
    font-weight: 400;
  }
  .three-cont h4 {
    font-weight: 200;
    font-size: 1.8rem;
  }
</style>
