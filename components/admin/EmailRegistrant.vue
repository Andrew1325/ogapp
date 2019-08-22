<template>
  <v-card style="padding:14px;">
    <div>
      <h2>
        Select event to view:
      </h2>
      <v-select
        v-model="selectedEvent"
        :items="eventNames"
        label="Select Event"
      ></v-select>
      <v-btn color="warning" outline @click="editer" :disabled="selectedEvent === null">
        Select event
      </v-btn>
      <br><br>
    </div>
    <div v-if="event !== null">
      <p style="font-size: 2.1rem; font-weight:600;">Current Registrations for {{event.title}}</p>
      <v-data-table
        v-if="event !== null"
        v-model="selected"
        :headers="headers"
        :items="registrants"
        :rows-per-page-items="rppi"
        item-key="user.name"
        select-all
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item.user.name }}</td>
          <td class="text-xs-left">{{ props.item.user.email }}</td>
          <td class="text-xs-left">{{ niceDate(props.item.created_at) }}</td>
          <td class="text-xs-left">{{ props.item.donation }}</td>
        </template>
      </v-data-table>
      <br>
      <v-layout row v-if="!emReg && !delReg">
        <v-flex xs12 sm4>
          <v-checkbox v-model="emReg" label="Email Registrant"></v-checkbox>
        </v-flex>
        <v-flex xs12 sm4>
          <v-checkbox v-model="delReg" label="Delete Registrant"></v-checkbox> 
        </v-flex>
      </v-layout>
      
      <template v-if="emReg">
        <p>Select registered attendees above to add to email list</p>
        <v-text-field v-model="email.subject" placeholder="Subject of email"></v-text-field>
        <v-textarea v-model="email.body" placeholder="Body of email"></v-textarea>
        <div v-if="!file">
          <h2>Select a file to attach</h2>
          <input type="file" @change="onFileChange">
        </div>
        <div v-else>
          <p><strong>Attachment: </strong>{{fileName}}</p>
          <v-btn @click="removeImage">Remove file</v-btn>
        </div>
        <v-btn @click="sendMail">Send Mail</v-btn>
      </template>
      <template v-if="delReg">
        <p v-if="selected.length > 0">
          The following names have been selected to have their registrations for {{event.title}} deleted:
          <br><br>
          <ul v-for="name in regNames" :key="name">
            <li>{{name}}</li>
          </ul>
        </p>
        <p v-else>Select registered attendees above to delete their registration</p>
        <v-btn @click="deleteReg">Delete Attendees</v-btn>
      </template>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import gql from 'graphql-tag'
import registrations from '../../apollo/queries/registrations.gql'
export default {
  data() {
    return {
      selected: [],
      headers: [
        { text: 'Name', align: 'left', value: 'user.name' },
        { text: 'Email', align: 'left', value: 'user.email' },
        { text: 'Date Reg', align: 'left', value: 'created_at' },
        { text: 'Donation Amount', align: 'left', value: 'donation' },
      ],
      rppi: [10,25,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
      event: null,
      selectedEvent: null,
      registrants: [],
      recips: [],
      email: {
        subject: '',
        body: ''
      },
      file: '',
      fileName: '',
      emReg: false,
      delReg: false
    }
  },
  computed: {
    ...mapGetters ({
      events: 'event/events'
    }),
    regNames() {
      if (this.selected.length > 0) {
        return this.selected.map(n => n.user.name)
      }
      return []
    },
    eventNames() {
      let names = []
      for (let i = 0; i < this.events.length; i++) {
        names.push(this.events[i].title)
      }
      return names
    },
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.fileName = files[0].name
      this.createFile(files[0]);
    },
    createFile(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.file = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.file = '';
    },
    editer() {
      let ev = this.events.find(e => e.title === this.selectedEvent)
      this.event = ev
      this.$apollo.query({
        query: registrations,
        variables: {
          event: ev.id
        }
      })
      .then((data) => {
        this.registrants = data.data.registrations
      })
      this.emReg = false
      this.delReg = false
    },
    attachSubmit () {
      const formData = new FormData()
      formData.append('file', this.file)
      this.$axios.post('api/upload', formData)
      this.file = ''
    },
    sendMail() {
      if (this.file !== '') {
        this.attachSubmit()
      }
      let recipiants = []
      for (let i = 0; i < this.selected.length; i++) {
        recipiants.push(this.selected[i].user.email)
      }
      recipiants = recipiants.join()
      this.email.to = recipiants
      this.email.fileName = this.fileName
      this.$apollo.mutate({
        mutation: gql `mutation addUploadedPdf($filename: String!) {
          addUploadedPdf (filename: $filename) {
            id
          }
        }`,
        variables: {
          filename: this.fileName
        }
      })
      this.$axios.post('api/email', this.email)
      .then(res => console.log('ok'))
      .catch(err => console.log('not ok'))
    },
    deleteReg() {
      let delIds = this.selected.map(i => i.id)
      this.$apollo.mutate({
        mutation: gql `mutation deleteRegistration($ids: [String!]!) {
          deleteRegistration (ids: $id) {
            count
          }
        }`,
        variables: {
          ids: delIds
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log('not ok'))
    }
  }
}
</script>

<style scoped>
  .selecter {
    padding: 14px;
  }
</style>
