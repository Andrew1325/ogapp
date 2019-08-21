<template>
  <div>
    <div class="card">
      <chartjs-bar
        display="false"
        :option="options"
        :data="regs"
        :labels="dates"
      />
    </div>
  </div>
</template>

<script>
import {  mapGetters } from 'vuex'

export default {
  data() {
    return {
      
      week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      options: {
        
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Event Registrations last 7 days",
        },
        fill: false,
        tooltips: {
          label: "Days Sales",
        },
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
    }

  },
  computed: {
    ...mapGetters ({
      regs: 'regs'
    }),
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
  },
  methods: {
    daysAgo(d) {
      var date = new Date();
      var last = new Date(date.getTime() - (d * 24 * 60 * 60 * 1000))
      return last.toISOString()
    },
    
  }
}
</script>