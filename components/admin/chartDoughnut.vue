<template>
  <div>
    <div class="card">
      <chartjs-doughnut
        v-bind:bind="true"
        v-bind:datasets="datasets"
        v-bind:labels="labels"
        v-bind:option="option"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
      labels: ["Tablet", "Phone", "Desktop"],
      option: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Device type visited with",
        },
        legend : {
          position: 'bottom',
          labels: {
            boxWidth: 14,
            fontSize: 10,
            padding: 6
          }
        }
      }
    }
  },
  computed: {
    deviceData() {
      const deviceCounts = []
      deviceCounts[0] = this.$store.getters.devices.mobile
      deviceCounts[1] = this.$store.getters.devices.tablet
      deviceCounts[2] = this.$store.getters.devices.desktop
      return deviceCounts
    },
    datasets() {
      return [
        {
          data: this.deviceData,
          backgroundColor: ["#b388ff", "#80d8ff", '#b3a7af'],
          hoverBackgroundColor: ["#673ab7", "#03a9f4", '#b3556a']
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
