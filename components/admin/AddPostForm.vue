<template>
<v-form ref="form" :v-model="valid" @submit.prevent="handleSavingContent" lazy-validation>
  <v-dialog
    v-model="submitting"
    hide-overlay
    persistent
    width="300"
  >
    <v-card style="text-align:center">
      <v-card-text>
        submitting your post...
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
  <v-dialog v-model="howto">
    <v-card class="how">
      <p style="text-align:center;"><strong>Creating a new blog post</strong></p>
      <p>Blog post creation has been laid out in a step by step process, where each step must be completed before you can access the next step.
        <br><br>Although you will find hints to prompt you at each step, it is strongly recommended that you have your post prepared prior to entering it here. This means you should know what you want to put in at each step along the way. The main body text is often best prepared beforehand in a text editor, and any photo's you will be using should be sized and accessible.
        <br><br>You must first select a category that your post will be classified into. A dropdown shows the categories available. Each post can only belong to one category so please choose wisely. There is the option to create a new category but this should be carefully considered and if there is any doubt please consult a grownup.
        <br><br>From here the steps to creating your post are:
        <ol>
          <li>Enter the title. This is as it sounds, and should be as short as possible, to a maximum of 35 characters</li>
          <li>Enter a subtitle or preview. This is a sentence previewing the post content.</li>
          <li>Select a title photo. This is the main image for the post and will be seen on the blog homepage and the posts detail page. It should be a minimum of 800px wide and 600px high. The image file size optimumly should be less than 500kb.</li>
          <li>Finally there is the main body of the post. This is created in a text editor style window which allows the use of bold, italics etc. as well as inserting images. Images can be inserted by clicking the image icon (third from the right in toolbar). You should hit enter twice before and after inserting an image to ensure proper spacing. Many styling options are not available as the site styling is preset to ensure consistancy.</li>
          <li>The only remaining step now is to select whether the post will be published imediately and therefore visible to any site visitors or whether you want to save it as a draft. If saving as a draft you will have to access the post through the "Edit Post" button and set publish to true for it to become visible.</li>
          <li>Then you have to click the "Finish" button and then the "Publish" button on the right hand side.</li>
        </ol>
        <br>
        <v-btn color="primary" @click="howto = !howto" outline>Got it.</v-btn>
      </p>
    </v-card>
  </v-dialog>
  <v-dialog v-model="addCat" width="450px">
    <add-blog-cat-form v-on:shutup="newCat"/>
  </v-dialog>
  <br>
  <v-btn v-if="!editing" outline color="teal" @click="howto = !howto">How to create a blog post</v-btn>
  <v-btn v-else outline color="green">You are editing your post "{{post.title}}"</v-btn>
    <v-stepper ref="stepper" v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Select a category
        <small>Only one category may be selected</small>
        </v-stepper-step>

        <v-stepper-content step="1">
        <v-select
          v-model="selectedCat"
          :items="catNames"
          label="Select Category"
        ></v-select>
        <br>
        <v-btn color="primary" @click="catSelected">Next</v-btn>
        <v-btn color="warning" @click="addCat = !addCat" outline>Add Category</v-btn>
        </v-stepper-content>
        <v-stepper-step :rules="[() => ruleState1]" :complete="e6 > 2" step="2">
        Set the title
        <small>This should be less than 6 words</small>
        </v-stepper-step>

        <v-stepper-content step="2">
        <v-text-field
        v-model="postObj.title"
        :rules="titleRules"
        :counter="42"
        label="Title"
        required
        ></v-text-field>
        <br>
        <v-btn color="primary" @click="errorCheck1">Next</v-btn>
        <v-btn color="primary" @click="e6 = 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step :rules="[() => ruleState2]" :complete="e6 > 3" step="3">Enter a sentence for the preview text</v-stepper-step>

        <v-stepper-content step="3">
        <v-text-field
        v-model="postObj.preview"
        :rules="previewRules"
        :counter="92"
        label="Preview Text"
        required
        ></v-text-field>
        <v-btn color="primary" @click="errorCheck2">Next</v-btn>
        <v-btn color="primary" @click="e6 = 2">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step :rules="[() => ruleState3]" :complete="e6 > 4" step="4">Enter a title image</v-stepper-step>

        <v-stepper-content step="4">
            <v-layout row class="image-input">
                <v-flex xs6 sm3 d-flex>
                    <v-btn raised color="info" @click="onPickFile">Upload Image</v-btn>
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
            <v-layout row class="image-display">
                <v-flex xs12 sm6>
                    <p v-if="editing && !editImage">Skip to the next step to retain existing image</p>
                    <img :src="titleImage" height="150">
                </v-flex>
            </v-layout>
        
        <v-btn color="primary" @click="errorCheck3">Next</v-btn>
        <v-btn color="primary" @click="e6 = 3">Back</v-btn>
        </v-stepper-content>
        

        <v-stepper-step :rules="[() => ruleState4]" :complete="e6 > 5" step="5">Enter the post content</v-stepper-step>

        <v-stepper-content step="5">
            
          <vue-editor id="editor"
            :rules="bodyRules"
            placeholder="Write something..."
            useCustomImageHandler
            @imageAdded="handleImageAdded"
            v-model="postObj.body">
          </vue-editor>
            
        <v-btn color="primary" @click="errorCheck4">Next</v-btn>
        <v-btn color="primary" @click="e6 = 4">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 6" step="6">Publish your post?</v-stepper-step>

        <v-stepper-content step="6">
          <p>Do you want this post to be published now and visible to users or saved as a draft and invisible?</p>
          <v-switch
            v-model="postObj.published"
            :label="`Published: ${!!postObj.published ? postObj.published.toString() : 'false'}`"
          ></v-switch>
        <v-btn color="primary" @click="disabled = !disabled">Finish</v-btn>
        <v-btn color="primary" @click="e6 = 5">Back</v-btn>
        </v-stepper-content>

    </v-stepper>
    <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            color="red darken-1"
            flat="flat"
            @click="onCancel"
        >
            Cancel
        </v-btn>

        <v-btn
            color="green darken-1"
            flat="flat"
            type="submit"
            :disabled='disabled'
        >
            Publish
        </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
import postcats from '../../apollo/queries/postcats.gql'
import gql from 'graphql-tag'
import AddBlogCatForm from '../../components/admin/AddBlogCatForm'

export default {
    props: {
      post: {
        type: Object
      },
      user: {
        type: Object
      }
    },
    apollo: {
      postcats: {
        query: postcats,
      },
    },
    components: {
      AddBlogCatForm
    },
    data(){
      return {
        howto: false,
        addCat: false,
        submitting: false,
        e6: 1,
        selectedCat: null,
        postObj: {
          selectedCategory: 1,
          title: '',
          body: '',
          preview: '',
          title_image: '',
          id: 0,
          published: false
        },
        titleImageUrl: '',
        ruleState1: true,
        titleRules: [
          v => !!v || 'Title is required',
          v => (v && v.length <= 42) || 'Title must be less than 42 characters',
        ],

        ruleState2: true,
        previewRules: [
          v => !!v || 'Preview is required',
        ],
        ruleState3: true,
        titleImageRules: [
          v => !!v || 'Title image is required',
        ],
        image: null,

        ruleState4: true,
        bodyRules: [
          v => !!v || 'Body is required',
        ],
        disabled: true,
        editing: false,
        editImage: false,
        titleImage: '',
        image: '',
        valid: true,
        newContent: '',
        imageLocations: [],
        totalImages: 0,
        imageArray: [],
        finalImageArray: [],
        editorOption: {
        // some quill options
          modules: {
            toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ]
          }
        }
      }
    },
    mounted() {
      if(this.post && this.post.hasOwnProperty('title')){
          this.editing = true
          this.selectedCat = this.post.category.name
          this.postObj.selectedCategory = this.post.category.id
          this.postObj.title = this.post.title
          this.postObj.body = this.post.body
          this.postObj.preview = this.post.headline
          this.postObj.title_image = this.post.title_image
          this.titleImage = this.post.title_image
          this.postObj.id = this.post.id
          this.postObj.published = this.post.published
      }
    },
    watch: {
      post: function(){
        if (this.isEmpty(this.post)) {
          console.log('empty')
        } else {
          this.editing = true
          this.postObj = this.post
          console.log(this.post)
        }
      }
    },
    computed: {
      catNames() {
        if (this.postcats && this.postcats.length > 0) {
          return this.postcats.map(c => c.name)
        }
        let nams = []
        return nams
      }
    },
    methods: {
      newCat(dat) {
        if (dat) {
          this.$apollo.queries.postcats.refetch()
          this.selectedCat = dat.name
          this.addCat = !this.addCat
        } else {
          this.addCat = !this.addCat
        }
      },
      isEmpty(obj) {
        for(var key in obj) {
          if(obj.hasOwnProperty(key))
            return false;
        }
        return true;
      },
      trimImage(img) {
        let image = img.slice(img.lastIndexOf('/') + 1)
        return image
      },
      catSelected() {
        this.e6++
      },
      errorCheck1() {
        if (this.postObj.title.length <= 0 || this.postObj.title.length > 42 ) {
          this.ruleState1 = false
        } else {
          this.ruleState1 = true
          this.e6++
        }
      },
      errorCheck2() {
          if (this.postObj.preview === '') {
              this.ruleState2 = false
          } else {
              this.ruleState2 = true
              this.e6++
          }
      },
      errorCheck3() {
        if (!this.editing) {
          if (this.titleImage === '') {
              this.ruleState3 = false
          } else {
              this.ruleState3 = true
              this.e6++
          }
        } else {
          this.ruleState3 = true
          this.e6++
        }
      },
      errorCheck4() {
          if (this.postObj.body.length <= 0) {
              this.ruleState4 = false
          } else {
              this.ruleState4 = true
              this.e6++
          }
      },
      onCancel() {
        this.e6 = 1
        this.$emit('cancelEdit')
        this.postObj = {
          selectedCategory: 1,
          title: '',
          body: '',
          preview: '',
          title_image: '',
          id: 0,
          published: false
        }
        this.titleImageUrl = ''
        this.titleImage = ''
        this.editing = false
        this.ruleState1 = true
        this.ruleState2 = true
        this.ruleState3 = true
        this.ruleState4 = true
      },
      // onEditorBlur(editor) {
      //     // console.log('editor blur!', editor)
      // },
      // onEditorFocus(editor) {
      //     // console.log('editor focus!', editor)
      // },
      // onEditorReady(editor) {
      //     // console.log('editor ready!', editor)
      // },
      onEditorChange({ editor, html, text }) {
          this.postObj.body = html
      },
      onPickFile() {
          this.editedImage = true
          this.$refs.fileInput.click()
      },
      onFilePicked(event) {
          const files = event.target.files
          let filename = files[0].name
          this.titleImageUrl = '/' + filename
          console.log(this.postObj.title_image)
          if (filename.lastIndexOf('.') <=0) {
              return alert('Please select a valid image file')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
              this.titleImage = fileReader.result
          })
          fileReader.readAsDataURL(files[0])
          this.image = files[0]
          const formData = new FormData()
          formData.append('file', this.image)
          /////////////
          // check method
          ///////////

          this.$axios.post('/api/upload', formData)
          .then(res => {
              console.log('uploaded')
          })
            .catch (err => {
              console.log(err)
          })

          this.image = null
      },
      handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        var formData = new FormData()
        formData.append('file', file)
        /////////////
        // check method
        ///////////
        
        this.$axios({
          url: '/api/upload',
          method: 'POST',
          data: formData
        })
        .then(() => {
          let img = '/' + file.name
          Editor.insertEmbed(cursorLocation, 'image', img)
          resetUploader()
        })
        .catch((err) => {
          console.log(err);
        })
      },
      handleSavingContent() {
        this.submitting = true
        let cat = this.postcats.find(c => c.name === this.selectedCat)
        this.postObj.selectedCategory = cat.id
        if (this.editing && !this.editedImage) {
            this.postObj.title_image
        } else {
            this.postObj.title_image = this.titleImageUrl
        }
        const postData = {
          id: this.postObj.id,
          title: this.postObj.title,
          category: this.postObj.selectedCategory,
          headline: this.postObj.preview,
          body: this.postObj.body,
          title_image: this.postObj.title_image,
          published: this.postObj.published
        }
        console.log(postData)
        if (this.editing) {
          this.$apollo.mutate({
            mutation: gql `mutation (
              $id: ID!
              $title: String!,
              $headline: String!,
              $title_image: String!,
              $body: String!,
              $category: ID!,
              $published: Boolean!
            ) {
              updatePost (
                id: $id,
                data: {
                  title: $title,
                  headline: $headline,
                  title_image: $title_image,
                  body: $body,
                  category: $category,
                  published: $published
                }
              ) {
                id
              }
            }`,
            variables: postData
          })
          .then(response => {
            this.submitting = false
            this.disabled = true
            this.editing = false
            this.$refs.form.reset()
            alert('You have saved your post, '+postData.title)
            this.onCancel()
          })
          .catch(error => {
            alert(error)
            this.submitting = false
          })
        } else {
          this.$apollo.mutate({
            mutation: gql `mutation (
              $title: String!,
              $headline: String!,
              $title_image: String!,
              $body: String!,
              $category: ID!,
              $published: Boolean!
            ) {
              createPost (
                data: {
                  title: $title,
                  headline: $headline,
                  title_image: $title_image,
                  body: $body,
                  category: $category,
                  published: $published
                }
              ) {
                id
              }
            }`,
            variables: postData
          })
          .then((res) => {
            this.submitting = false
            this.disabled = true
            this.$refs.form.reset()
            alert('You have saved your post, '+postData.title)
            this.onCancel()
          })
          .catch((error) => {
            console.error(error)
          })
        }
      }
    }
}
</script>

<style scoped>
.quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
}
.how {
  padding: 10px;
}
</style>
