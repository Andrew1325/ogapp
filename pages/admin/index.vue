<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3>
          <div class="figs">
            <div class="figs-cont">
              <chart-line style="padding:6px"/>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <div class="figs">
            <div class="figs-cont">
              <chart-doughnut style="padding:6px"/>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <div class="figs">
            <div class="figs-cont">
              <chart-bar style="padding:6px"/>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <div class="figs">
            <div class="figs-cont figs2">
              <chart-line-ords style="padding:6px"/>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md9>
          <div class="second-row" style="margin-right:16px;">
            <template v-if="regsDetail && regsDetail.length > 0">
              <h2>Recent event registrations</h2>
              <table>
                <thead>
                  <tr>
                    <td>Event</td>
                    <td>Name</td>
                    <td>Date Registered</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="reg in regsDetail" :key="reg.id">
                    <td>{{reg.event.title}}</td>
                    <td>{{reg.user.name}}</td>
                    <td>{{niceDate(reg.created_at)}}</td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template v-else>
              {{regsDetail}}
              <h2>There have been no event registrations in the past week.</h2>
            </template>
            <br><br>
            <template v-if="false">
              <h2>Recent sales activity</h2>
              <table>
                <thead>
                  <tr>
                    <td>Event</td>
                    <td>Name</td>
                    <td>Date Registered</td>
                  </tr>
                  <tbody>
                    <tr v-for="reg in regsDetail" :key="reg.id">
                      <td>{{reg.event.title}}</td>
                      <td>{{reg.user.name}}</td>
                      <td>{{reg.created_at}}</td>
                    </tr>
                  </tbody>
                </thead>
              </table>
            </template>
            <template v-else>
              <h2>There have been no sales in the past week.</h2>
            </template>
          </div>
        </v-flex>
        <v-flex xs12 md3>
          <div class="second-row second-sec">
            
              ha <br>
              {{user}}
            
          </div>
        </v-flex>
      </v-layout>
    
  </v-container>
</template>

<script>
import ChartDoughnut from "@/components/admin/chartDoughnut"
import ChartLine from "@/components/admin/chartLine"
import ChartLineOrds from "@/components/admin/chartLineOrds"
import ChartBar from "@/components/admin/chartBar"
import AddPostForm from "@/components/admin/AddPostForm"
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    ChartDoughnut,
    ChartLine,
    ChartLineOrds,
    ChartBar,
    AddPostForm
  },
  layout: 'admin',
  data: () => ({
    figs2: {
      color: 'red',
      fontSize: '13px'
    },
  }),
  mounted() {
    if (!this.adminLinks) {
      this.setLink({component: 'AddPostForm'})
    }
  },
  computed: {
    ...mapGetters ({
      user: 'user',
      adminLinks: 'auth/adminLinks',
      regsDetail: 'regsDetail'
    })
  },
  methods: {
    ...mapMutations ({
      setLink: 'auth/SET_ADMIN_LINKS'
    })
  }
}
</script>

<style scoped>
  table, tr, td {
    border: 1px solid grey;
    border-collapse: collapse;
  }
  thead {
    font-weight: 800;
  }
  td {
    padding: 4px 12px;
    text-align: center;
  }
  .semi-bar{
    background-color: #e6e6e67e;
    height: 60px;
    border-radius: 0 6px;
    margin-top: -24px;
    margin-left: 160px;
  }
  .figs {
    width: 100%;
    background-color:#fff;
    margin-bottom: 16px;
    margin-top: 16px;
  }
  .figs-cont {
    background-color:#fafafa;
    height: 100%;
    border-radius: 0 6px;
    margin-right: 16px;
  }
  .figs2 {
    border-radius: 0 6px;
    margin-right: 0px;
  }
  
  @media (max-width: 960px) {
    .figs2 {
      margin-right: 16px;
    }
  }
  .second-row {
    background-color:#fafafa;
    margin-bottom: 16px;
    height: 500px;
    border-radius: 0 6px;
    text-align: left;
    padding: 14px;
  }
  .second-row >>> h2 {
    text-align: left;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.8rem;
    font-weight: 200;
  }
  @media (max-width: 960px) {
    .second-sec {
      margin-right: 16px;
    }
  }
  .v-tabs__item--active {
    background-color: #fafafa;
  }
</style>
