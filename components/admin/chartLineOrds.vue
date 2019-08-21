<template>
  <div>
    <div class="card" v-if="orders.length > 1">
      <chartjs-line
        display="false"
        :option="option"
        :labels="dates"
        :datasets="datasets"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
        borderColor: 'rgb(74, 211, 11)',
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Past week's daily orders",
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
      orders: 'orders'
    }),
    datasets() {
      return [
        {
          data: this.orders,
          borderColor: '#b388ff'
        }
      ]
    }
  },
  
  methods: {
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
