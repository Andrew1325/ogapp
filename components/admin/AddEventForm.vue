<template>
  <v-card>
    <v-dialog
    v-model="submitting"
    hide-overlay
    persistent
    width="300"
  >
    <v-card style="text-align:center">
      <v-card-text>
        submitting your event...
        <br><br>
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-card-text>
    </v-card>
  </v-dialog>
        <v-card-title>
          <span v-if="!isEmpty(event)" class="headline">Edit an Event</span>
          <span v-else class="headline">Add an Event</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="form.title" label="Event name*" hint="Name should be less than 100 Characters" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="form.subtitle" label="Event sub-title" hint="This should be less than 100 Characters" required></v-text-field>
              </v-flex>
              <v-flex xs12>
              <v-radio-group v-model="costGroup" column>
                <v-radio
                  color="#666"
                  value="free"
                  key="1"
                  label="Free Event"
                ></v-radio>
                <v-radio
                 color="#666"
                  value="donation"
                  key="2"
                  label="By Donation Event"
                ></v-radio>
                <v-radio
                 color="#666"
                  value="paid"
                  key="3"
                  label="Paid Event"
                ></v-radio>
              </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-if="costGroup === 'paid'" v-model="form.cost" label="Event price" hint="Set event cost" required></v-text-field>
              </v-flex>
              <v-flex xs12>
              <v-radio-group v-model="radioGroup" row>
                <v-radio
                  color="#666"
                  value="single"
                  key="1"
                  label="Single Day Event"
                ></v-radio>
                <v-radio
                  color="#666"
                  value="multiple"
                  key="2"
                  label="Multiple Day Event"
                ></v-radio>
              </v-radio-group>
              </v-flex>
              <br><br>
              <v-divider></v-divider>
              <v-flex xs12>
                <div>Select <span v-if="radioGroup != 'single'">start</span> date.
                  <v-menu
                    ref="menu"
                    :close-on-content-click="true"
                    v-model="menu"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="picker"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker :min="date+1" v-model="picker" no-title scrollable>
                    </v-date-picker>
                  </v-menu>
                </div>
              </v-flex>
              <v-flex xs12>
                <div> Select start time
                 <v-text-field v-model="time" label="Start Time" hint="Set start time in 24hr mode, eg 14:30. Hours and minutes must be separated with a colon." required></v-text-field>
                </div>
              </v-flex>
              <v-flex xs12>
                <div v-if="radioGroup != 'single'">Select end date.
                  <v-menu
                    ref="menu"
                    :close-on-content-click="true"
                    v-model="menu2"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="picker2"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker :min="picker+1" v-model="picker2" no-title scrollable>
                    </v-date-picker>
                  </v-menu>
                 </div>
              </v-flex>
              <v-flex xs12>
                <v-switch
                  v-model="form.bookings_open"
                  :label="`Open for bookings?: ${form.bookings_open.toString()}`"
                ></v-switch>
              </v-flex>
              <v-flex xs12>
                <div>Select bookings close date.
                  <v-menu
                    ref="menu"
                    :close-on-content-click="true"
                    v-model="menu3"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="picker3"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker :min="date+1" v-model="picker3" no-title scrollable>
                    </v-date-picker>
                  </v-menu>
                </div>
              </v-flex>
              <v-divider></v-divider>
              <v-flex xs12><br><br><hr><br><br></v-flex>
              <v-flex xs12>
                <span v-if="editing">Edit</span><span v-else>Add an</span> event image*
                <v-layout row class="image-input">
                  <v-flex xs6>
                      <v-btn style="min-width:auto" raised color="info" @click="onPickFile">Upload Image</v-btn>
                      <p style="margin-left:20px; font-weight:600;" v-if="editing && !editImage">Skip to the next step to retain existing image</p>
                  </v-flex>
                  <v-flex xs12 sm9 d-flex class="input">
                      <input type="file"
                      style="display:none"
                      ref="fileInput"
                      accept="image/*"
                      @change="onFilePicked"
                      >
                  </v-flex>
                </v-layout>
                <v-layout v-if="editing && !editImage" row class="image-display">
                    <v-flex xs12 sm6>
                        <img :src="form.image" height="150">
                    </v-flex>
                </v-layout>
                <v-layout row class="image-display">
                    <v-flex xs12 sm6>
                        <img :src="titleImageUrl" height="150">
                    </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12>
                Event Description*
                <vue-editor id="editor"
                  :rules="bodyRules"
                  placeholder="Write something..."
                  :editor-toolbar="editorOption"
                  v-model="form.body">
                </vue-editor>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="editing" color="red darken-1" flat @click="handleUpdatingContent">Delete Event</v-btn>
          <v-btn v-if="editing" color="blue darken-1" flat @click="handleUpdatingContent">Update</v-btn>
          <v-btn v-else color="blue darken-1" flat @click="handleSavingContent">Save</v-btn>
          <v-btn color="blue darken-1" flat @click="onCancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import gql from 'graphql-tag'
 
export default {
  props: {
    event: {
      type: Object
    }
  },
  data() {
    return {
      submitting: false,
      radioGroup: 'single',
      costGroup: 'free',
      openToBook: true,
      picker: new Date().toISOString().substr(0, 10),
      picker2: new Date().toISOString().substr(0, 10),
      picker3: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      form: {
        title: '',
        subtitle: '',
        body: '',
        image: '',
        start_date: '',
        end_date: '',
        bookings_open: false,
        bookings_close: '',
        cost: '',
        free: false,
      },
      time: '',
      titleImageUrl: '',
      image: '',
      editing: false,
      editImage: false,
      bodyRules: [
        v => !!v || 'Body is required',
      ],
      editorOption:  [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  mounted() {
    if(this.event && this.event.hasOwnProperty('title')){
        this.form = this.event
        this.editing = true
        if (Date.parse(new Date(this.event.end_date)) > Date.parse(new Date(this.event.start_date))) {
          this.radioGroup = 'multiple'
          this.picker = new Date(this.event.start_date).toISOString().substr(0, 10),
          this.picker2 = new Date(this.event.end_date).toISOString().substr(0, 10),
          this.picker3 = new Date(this.event.bookings_close).toISOString().substr(0, 10)
        } else {
          this.picker = new Date(this.event.start_date).toISOString().substr(0, 10),
          this.picker3 = new Date(this.event.bookings_close).toISOString().substr(0, 10)
        }
        this.time = this.getTime(this.event.start_date)
        if (!this.event.free) {
          if (this.event.cost === 0) {
            this.costGroup = 'donation'
          } else {
            this.costGroup = 'paid'
          } 
        }
      }
  },
  watch: {
    event: function(){
      if (this.isEmpty(this.event)) {
          console.log('empty')
      } else {
        this.editing = true
        this.form = this.event
        console.log(this.event)
      }
    }
  },
  methods: {
    ...mapMutations ({
      setLink: 'auth/SET_ADMIN_LINKS'
    }),
    isEmpty(obj) {
      if(obj && obj.hasOwnProperty('title')){
        return false;
      }
      return true;
    },
    getTime(date) {
      let h = new Date(date).getHours()
      let m = new Date(date).getMinutes()
      return h+':'+m
    },
    onPickFile() {
      if (this.editing) {
        this.editImage = true
      }
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
        const files = event.target.files
        let filename = files[0].name
        this.form.image = '/' + filename
        if (filename.lastIndexOf('.') <=0) {
            return alert('Please select a valid image file')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
            this.titleImageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
    },
    imageSubmit () {
      const formData = new FormData()
      formData.append('file', this.image)
      this.$axios.post('api/upload', formData)
      this.image = ''
    },
    onCancel() {
      this.submitting = false
      this.form = {
        title: '',
        subtitle: '',
        body: '',
        image: '',
        start_date: '',
        end_date: '',
        bookings_open: false,
        bookings_close: '',
        cost: '',
        free: false,
      }
      this.titleImageUrl = ''
      this.time = ''
      this.radioGroup = 'single',
      this.costGroup = 'free',
      this.openToBook = true,
      this.picker = new Date().toISOString().substr(0, 10),
      this.picker2 = new Date().toISOString().substr(0, 10),
      this.picker3 = new Date().toISOString().substr(0, 10)
    },
    handleImageAdded() {

    },
    handleSavingContent() {
      this.submitting = true
      this.form.start_date = new Date(this.picker+' '+this.time).toISOString()
      this.form.end_date = new Date(this.picker2).toISOString()
      let start = new Date(this.picker)
      let end = new Date(this.picker2)
      if (start >= end) {
        this.form.end_date = null
      }
      this.form.bookings_close = new Date(this.picker3).toISOString()
      if (this.costGroup === 'free') {
        this.form.free = true
        this.form.cost = 0
      }
      if (this.costGroup === 'donation') {
        this.form.free = false
        this.form.cost = 0
      }
      this.form.cost = parseFloat(this.form.cost)
      const form = this.form
      console.log(form)
      this.imageSubmit()
      this.$apollo.mutate({
        mutation: gql`mutation createEvent(
          $title: String!
          $subtitle: String!
          $body: String!
          $image: String!
          $start_date: String!
          $end_date: String
          $bookings_open: Boolean!
          $bookings_close: String!
          $cost: Float!
          $free: Boolean!
        ) {
          createEvent (
            data:{
              title: $title
              subtitle: $subtitle
              body: $body
              image: $image
              start_date: $start_date
              end_date: $end_date
              bookings_open: $bookings_open
              bookings_close: $bookings_close
              cost: $cost
              free: $free
            }
          ) {
            id
            title
          }
        }`,
        variables: form
      })
      .then((data) => {
        this.submitting = false
        console.log({...data.data.createEvent})
        alert('You have successfully added '+form.title)
        this.setLink({component: 'EventWelcomePage'})
        this.onCancel()
      }).catch((error) => {
        this.submitting = false
        console.error(error)
      })
      
    },
    handleUpdatingContent() {
      this.submitting = true
      this.form.start_date = new Date(this.picker+' '+this.time).toISOString()
      this.form.end_date = new Date(this.picker2).toISOString()
      let start = new Date(this.picker)
      let end = new Date(this.picker2)
      if (start >= end) {
        this.form.end_date = null
      }
      this.form.bookings_close = new Date(this.picker3).toISOString()
      if (this.costGroup === 'free') {
        this.form.free = true
        this.form.cost = 0.00
      } else {
        this.form.free = false
      }
      this.form.cost = parseFloat(this.form.cost)
      if (!this.editImage) {
        this.imageSubmit()
      }
      const form = {...this.form}
      delete form.__typename
      delete form.donation
      console.log(form)

      this.$apollo.mutate({
        mutation: gql`mutation updateEvent(
          $id: ID!
          $title: String!
          $subtitle: String!
          $body: String!
          $image: String!
          $start_date: String!
          $end_date: String
          $free: Boolean!
          $cost: Float!
          $bookings_close: String!
          $bookings_open: Boolean!
        ) {
          updateEvent (
            id: $id,
            data:{
              title: $title
              subtitle: $subtitle
              body: $body
              image: $image
              start_date: $start_date
              end_date: $end_date
              free: $free
              cost: $cost
              bookings_close: $bookings_close
              bookings_open: $bookings_open
            }
          ) {
            id
            title
          }
        }`,
        variables: form
      })
      .then((data) => {
        this.submitting = false
        console.log({...data.data.updateEvent})
        alert('You have successfully changed '+form.title)
        this.setLink({component: 'EventWelcomePage'})
        this.onCancel()
      }).catch((error) => {
        this.submitting = false
        console.error(error)
      })
      
    }
  }
}
</script>

<style scoped>
  .image-button {
    width: auto;
    padding: 0 20px;
  }
</style>
