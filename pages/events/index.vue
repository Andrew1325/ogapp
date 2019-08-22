<template>
  <v-layout
    row wrap
    justify-center
    align-center
  >
    <v-flex xs12>
      <v-card flat class="all one">
        <div class="cover-screen"></div>
        <div class="teaser">
          <h1>Goddess Events</h1><br>
          <p>Seed. Germinate. Sprout. Grow. Blossom.</p>
          <br>          
          <p>This year, join the Ordinary Goddesses on a journey through the seasons of growth and change, beginning with an introspective, intention-setting one day retreat at the beginning of Autumn. Plant the seeds of change, nourish them, and watch them grow with the support of your sisterhood.</p>
          
        </div>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card flat class="all three">
        <v-layout row wrap>
          <v-flex xs12 md8 offset-md2>
            <br><br>
            <h2>Our Latest Event</h2>
            <v-card class="three-cont" v-if="!!nextEvent && nextEvent.image">
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
    
    <v-flex xs12>
      <v-card flat class="all two">
        <br>
        <h2>Other Events</h2><br>
        <v-layout row wrap>
          <v-flex xs12 sm10 offset-sm1 xl8 offset-xl2>
            <v-layout row wrap>
              <v-flex v-for="event in otherEvents" :key="event.title" xs12 md4>
                <v-card style="margin:18px; outline: 1px solid rgb(157,157,157); outline-offset: 12px;">
                  <v-img :src="event.image" style="border: 5px solid white; min-height:280px;">
                    <div class="title-holder">
                      <h3 class="other" v-html="`<p>${(event.title.split(' ')).join('<br>')}</p>`"></h3>
                    </div>
                  </v-img>  
                  <v-card-title style="color:#333;font-size:2.2rem; line-height:2rem;">
                    <p style="color:#333; font-weight:400;">{{event.subtitle}}</p>
                  </v-card-title>
                    <div class="other-content">
                      <v-divider style="opacity:0.7; margin-bottom: 18px;"></v-divider>
                       <p style="color:#333; font-weight:400;">{{niceDate(event.start_date)}}</p>
                    </div>
                  <v-card-actions>
                    <v-btn nuxt :to="'/events/'+event.id" ><p style="padding-top: 8px; font-weight: 400;">See More</p></v-btn>
                  </v-card-actions>
                </v-card>  
              </v-flex>
            </v-layout>
            <br>
          </v-flex>  
        </v-layout> 
      </v-card>
    </v-flex>
    <main-footer/>
  </v-layout>
</template>

<script>
import MainFooter from '@/components/MainFooter'
import { mapGetters } from 'vuex';

export default {
  head () {
    return {
      title: "Ordinary Goddesses Events",
      meta: [
        { hid: 'description', name: 'description', content: 'The events page of Ordinary Goddesses' }
      ]
    }
  },
  data: () => ({
    
  }),
  components: {
    MainFooter
  },
  computed: {
    ...mapGetters ({
      events: 'event/events'
    }),
    getYear() {
      let y = new Date()
      this.year = y.getFullYear()
      return this.year
    },
    dates() {
      let dates = []
      for (let i = 0; i < this.events.length; i++) {
        dates.push(this.events[i].start_date)
      }
      return dates
    },
    nearestDate() {
      let ms = []
      let now = Date.parse(new Date())
      for (let i = 0; i < this.dates.length; i++) {
        ms.push(Date.parse(this.dates[i]) - now)
      }
      var pos = ms.filter(t => t > 0)
      if (pos.length === 0) {
        return false
      }
      var min = Math.min(...pos)
      var ind = ms.findIndex(i => i === min)
      return this.dates[ind]
    },
    nextEvent() {
      if (this.nearestDate) {
        return this.events.find(e => e.start_date == this.nearestDate)
      }
      return this.events[this.events.length - 1]
    },
    otherEvents() {
      let evs = [...this.events]
      let ce = evs.findIndex(e => e.start_date == this.nearestDate)
      evs.splice(ce, 1)
      return evs
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
  .teaser > p {
    font-weight: 400;
    font-size: 1.4rem;
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
  @media (max-width:756px){
    .main-event-title {
      top:24px;
    }
    .teaser > p {
      font-size: 1.1rem;
      padding: 0 80px;
    }
    .teaser > h1 {
      font-size: 3rem;
      padding: 0 60px;
      margin-top: -30px;
    }
  }
  .one {
    background-image: url('/bud.jpg');
    background-size: cover;
    position:relative;
  }
  .cover-screen {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.3;
  }
  .two {
    background-color: rgba(42, 43, 42, 0.479);
    min-height: 360px;
  }
  .holder {
    height: 100%;
    line-height: 100%;
    padding: 0 10vw;
    text-align: center;
  }
  .holder span {
    display: inline-block;
    vertical-align: middle;
    line-height: 18pt;
    font-size: 1.2rem;
    color: rgb(104, 104, 104);
  }
  .holder h1 {
    font-size: 2.8rem;
    letter-spacing: 0.4rem;
  }
  .three {
    /* background-color: rgb(218, 173, 119); */
    text-align: center;
    
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
  .title-holder {
    height: 100%;
    width: 100%;
    background-color: rgba(77, 77, 77, 0.411);
  }
  
  .three h2, .two h2 {
    font-family: 'Raleway';
    font-weight: 400;
    color: rgb(230, 230, 230);
    font-size: 3.2rem;
  }
  .three-cont {
    margin: 12px 0;
    padding: 12px;
  }
  .three-cont p {
    font-weight: 400;
  }
  .three-cont h4 {
    font-weight: 400;
    font-size: 1.8rem;
  }
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
  .other-content {
    padding: 0 14px;
  }
</style>
