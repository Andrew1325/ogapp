import Vue from 'vue'

Vue.mixin({
  methods: {
    niceDate(date) {
      let ap = "am"
      let h = new Date(date).getHours()
      if (h >= 12) {
        ap = "pm"
      }
      if (h > 12) {
        h = h - 12
      }
      let m = new Date(date).getMinutes()
      if (m < 10) {
        m='0'+m
      }
      return new Date(date).toDateString()+' @ '+h+':'+m+ap
    },
  }
})