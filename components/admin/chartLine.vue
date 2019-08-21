<template>
  <div>
    <div class="card" v-if="visits.length > 1">
      <chartjs-line
        display="false"
        :option="option"
        :data="visits"
        :labels="dates"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      day: 12,
      labels: {
        day: ['8th', '9th', '10th', '11th', '12th', '13th', '14th'],
        week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      },
      radio: "day",
      option: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Unique daily visitors",
        },
        fill: false,
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: true
            },
            scaleLabel: {
              display: false
            }
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: false
            },
            ticks: {
              fontFamily: "Montserrat",
              maxTicksLimit: 2,
            },
          }]
        },
        legend : {
          // position: 'bottom',
          // labels: {
          //   boxWidth: 10,
          //   fontSize: 10,
          //   padding: 6
          // }
          display: false
        }
      }
    };
  },
  mounted() {
    
  },
  computed: {
    dates () {
      let week = []
      for (let index = 6; index > -1; index--) {
        var date = new Date();
        date.setDate(date.getDate() - index);
        var formDate = date.getDate() + '/' + (date.getMonth() + 1)
        week.push(formDate)
      }
      return week
    },
    weekAgo() {
      var date = new Date();
      var last = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000))
      return last.toISOString()
    },
    ...mapGetters ({
      visits: 'visits'
    })
    // visits () {
    //   var dayStart = new Date()
    //   dayStart = Date.parse(dayStart)
    //   var counts = []
    //   const weeksVisits = JSON.parse(JSON.stringify(this.$store.getters.visits))
    //   for (let i = 0; i < 7; i++) {
    //     let thisDay = []
    //     for (let a = 0; a < weeksVisits.length; a++) {
    //       if (Date.parse(weeksVisits[a].created_at) > (dayStart - (86400000*(i+1))) && Date.parse(weeksVisits[a].created_at) < (dayStart - (86400000*(i)))) {
    //         thisDay.push(weeksVisits[a])
    //       }
    //     }
    //     counts.push(thisDay.length)
    //   }

    //   return counts.reverse()
    //   // return [23,34,23,33,12,18,29]
    // },
  },
  
  methods: {
    ...mapMutations ({
      setVisits: 'setVisits'
    }),
    daysAgo(d) {
      var date = new Date();
      var last = new Date(date.getTime() - (d * 24 * 60 * 60 * 1000))
      return last.toISOString()
    },
    formatDate(d) {
      let date = new Date(d);
      return date.getDate()+'/' + (date.getMonth()+1)
    },
  }
};
</script>

<style scoped>

</style>
