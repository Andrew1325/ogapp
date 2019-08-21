<template>
  <div>
    <v-dialog v-model="catDia" max-width="420px" persistent><add-category-form v-on:fromaddcat="newCateg" v-on:close="catDia = !catDia" style="padding:20px;"/></v-dialog>
    <v-dialog v-model="subDia" max-width="420px" persistent><add-sub-category-form :cats="catIds" v-on:fromaddsub="newSubCateg" v-on:close="subDia = !subDia" style="padding:20px;"/></v-dialog>
    <v-dialog v-model="varDia" max-width="420px" persistent><add-variant-form v-on:fromaddvar="newVarDes" v-on:close="varDia = !varDia" style="padding:20px;"/></v-dialog>
    <v-dialog v-model="basDia" max-width="420px" persistent><add-base-variant-form v-on:fromaddbasvar="newBasVar" v-on:close="basDia = !basDia" style="padding:20px;"/></v-dialog>
    <v-card v-if="createdProduct === null">
      <v-card-title>
        <span class="headline">Add a Product</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="form.name" label="Product name*" hint="Name should be less than 100 Characters" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea v-model="form.description" label="Product description*" required></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="form.price" label="Product price*" required type="number"></v-text-field>
            </v-flex>
            <div style="height: 84px"></div>
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
          <v-layout row class="image-display">
              <v-flex xs12 sm6>
                  <img :src="titleImageUrl" height="150">
              </v-flex>
          </v-layout>
          <div style="height: 84px"></div>
          <v-flex xs12></v-flex>
          <v-flex xs12 sm6>
            <v-select
              v-model="catValue"
              :items="cats"
              @change="getCatIds"
              box
              chips
              label="Categories"
              multiple
            ></v-select>
            <v-btn color="info" @click="catDia = !catDia" >Add new category</v-btn>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              v-model="subValue"
              :items="subs"
              box
              chips
              label="Sub-categories"
              multiple
            ></v-select>
            <v-btn v-if="catValue.length > 0" color="info" @click="subDia = !subDia">Add new sub-category</v-btn>
          </v-flex>
          </v-layout>
        </v-container>
        <br><br>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="handleSavingContent">Save</v-btn>
        <v-btn color="blue darken-1" flat @click="onCancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
    
    <v-card v-else>
      <v-btn style="margin-top:40px;" @click="varHelp = !varHelp"><v-icon>help</v-icon>&nbsp;About adding product variants</v-btn>
      <p v-if="variantsAdded.length > 0">You have added the following product variants: <span v-for="vari in variantsAdded" :key="vari.name">{{vari.name}}, </span></p>
      <v-card-title>
        <span class="headline">Add a Product Variant</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm8>
            <v-select
              v-model="vValue"
              :items="vars"
              box
              chips
              label="Base Variants"
            ></v-select>
          </v-flex>
          <v-flex xs4 sm2 offset-xs5 offset-sm0>
            <v-btn @click="basDia = !basDia" small>Add new base variant</v-btn>
          </v-flex>
          <v-flex xs12 sm8 v-if="!!vValue">
            <v-select
              v-model="pvValue"
              :items="prodvars"
              box
              chips
              label="Variants"
            ></v-select>
          </v-flex>
          <v-flex xs4 sm2 offset-xs5 offset-sm0 v-if="!!vValue">
            <v-btn @click="varDia = !varDia" small>Add new variant</v-btn>
          </v-flex>
          <v-flex xs12 v-if="variantArray.length > 0">
            You have added the following variants
            <p v-for="(vars, i) in variantArray" :key="i">{{vars}}</p>
          </v-flex>
          <v-flex xs12>
            <v-btn :disabled="vValue === null || pvValue === null ? true : false" @click="addVariant">Add</v-btn>
          </v-flex>
          <v-flex xs12>
              <v-text-field v-model="varForm.name" label="Variant name*" hint="Name should be less than 100 Characters" required></v-text-field>
            </v-flex>
            <v-flex xs12>
            <div style="height: 84px"></div>
            <v-layout row class="image-input">
              <v-flex xs12 sm6>
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
          <v-layout row class="image-display">
              <v-flex xs12 sm6>
                  <img :src="titleImageUrl" height="150">
              </v-flex>
          </v-layout>
          
          </v-flex>
            <v-flex xs4>
              <v-text-field v-model="varForm.cost" label="Cost*" required type="number"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field v-model="varForm.price_adjust" label="Price adjust*" required type="number"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field v-model="varForm.stock" label="Stock total*" required type="number"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-btn @click="submitVariant">Add Variant</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn nuxt to="/admin">I'm done</v-btn>
            </v-flex>
          </v-layout>
          
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog v-model="varHelp">
      <v-card>
        <v-card-title class="headline">Adding product variants</v-card-title>
        <v-card-text>
          <p>Each product you create is essentially a summary of what the product is. It is not the actual item that you sell. The item you sell is known as a Product Variant and this is the actual physical entity you are selling.</p>
          <p>To illustrate this we will use the example of a t-shirt. The Product you will enter for this shirt is "T-shirt with some logo". However to cater to everyone this shirt comes in a variety of colours and sizes.</p> 
          <p>If there are 4 colours and 4 sizes that is a total of 16 varieties of the one product. Obviously you don't want to have 16 varieties appearing to your users when they look at your products, so we create each of these 16 varieties as a Product Variant.</p>
          <p>When a user selects a product to purchase they are then given the option to choose their particular variety. In the case of a t-shirt that might be "size: small" and "color: purple"</p>
          <p>Here you are creating these Product Variants. Using the above example, you would now choose "Size" as the Base Variant. When that is selected, you then have the option to select "Small" from the next dropdown. If in either of these steps your preferred option isn't visible, you can create a new one</p>
          <p>After these selections you can click the "Add" button to store that and start a new variant. For this one you will choose "Colour" and then "Purple"</p>
          <p>Once you have added all the variants you need, you will need to complete the other inputs for Variant Name, Cost, Price Adjust, and Stock. Price adjust is to make this variant cheaper or more expensive than the base product. This is mainly used for temporary discounts but can be to add a premium or reduction to a base product. An example of this would be a t-shirt. If the gold coloured variant is actually made of spun gold it would likely be more expensive than it's cotton bretheren, and therefore would have a price_adjust to reflect this. By default price_adjust is set to 1. This is 1 x (times) the price of the base product. Therefore if a product variant was to be 10% more than the base product, the price_adjuct should be set to 1.1, and if it was to be 10% less, should be set to 0.9. If you are unsure about the maths of this please ask a grown-up.</p>
          <p>After completing all these you can click "Add Variant" and you will have added a "Small Purple T-shirt with Some Logo". Repeat this for all the varieties of product you have and click "I'm Done" after adding your last one. You can always add more variants later.</p>
          <p>Some products may not have any actual variants. This could be something like a bumper sticker. In this case you would create 1 product variant with a base variant of "Single Item" and a variant of "Standard".</p>

        </v-card-text>
        <v-spacer></v-spacer><v-btn left @click="varHelp = !varHelp">Close</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import gql from 'graphql-tag'
import categories from '../../apollo/queries/categories.gql'
import category from '../../apollo/subscriptions/category.gql'
import AddCategoryForm from './AddCategoryForm.vue'
import AddSubCategoryForm from './AddSubCategoryForm.vue'
import AddVariantForm from './AddVariantForm.vue'
import AddBaseVariantForm from './AddBaseVariantForm.vue'
 
export default {
  apollo: {
    categories: {
      query: categories,
    },
    sub_categories: gql`query {
      sub_categories {
        id
        name
      }
    }`,
    variant_descriptors: gql`query {
      variant_descriptors  {
        id
        name
        descriptor
        variant {
          name
        }
      }
    }`,
    variants: gql`query {
      variants {
        id
        name
      }
    }`
  },
  components: {
    AddCategoryForm,
    AddSubCategoryForm,
    AddVariantForm,
    AddBaseVariantForm
  },
  data: () => ({
    form: {
      name: '',
      description: '',
      image: '',
      price: null,
      price_adjust: null
    },
    varForm: {
      name: '',
      cost: null,
      price_adjust: null,
      stock: null
    },
    titleImageUrl: '',
    image: '',
    editing: false,
    editImage: false,
    catValue: [],
    subValue: [],
    pvValue: null,
    vValue: null,
    catIds: [],
    subIds: [],
    createdProduct: null,
    varHelp: false,
    variantArray: [],
    variantsAdded: [],
    catDia: false,
    subDia: false,
    varDia: false,
    basDia: false
  }),
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    cats() {
      if (!!this.categories) {
        return this.categories.map(c => c.name)
      }
      return []
    },
    subs() {
      let subArray = []
      for (let i = 0; i < this.catValue.length; i++) {
        for (let a = 0; a < this.categories.length; a++) {
          if (this.categories[a].name === this.catValue[i]) {
            for (let b = 0; b < this.categories[a].subcategories.length; b++) {
              subArray.push(this.categories[a].subcategories[b].name)
            }
          }
        }
      }
      return subArray
    },
    prodvars() {
      if (!!this.variant_descriptors && !!this.vValue) {
        const vs = this.variant_descriptors.filter(v => v.variant.name === this.vValue)
        return vs.map(v => v.name)
      }
      return []
    },
    vars() {
      if (!!this.variants) {
        return this.variants.map(v => v.name)
      }
      return []
    }
  },
  watch: {
    // event: function(){
    //   if (this.isEmpty(this.event)) {
    //       console.log('empty')
    //   } else {
    //     this.editing = true
    //     this.form = this.event
    //     console.log(this.event)
    //   }
    // }
  },
  methods: {
    // isEmpty(obj) {
    //   for(var key in obj) {
    //     if(obj.hasOwnProperty(key))
    //       return false;
    //   }
    //   return true;
    // },
    addVariant() {
      let vart = { [this.vValue]:this.pvValue }
      this.variantArray.push(vart)
      this.vValue = null
      this.pvValue = null
    },
    onPickFile() {
      this.editedImage = true
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
      this.image = null
    },
    onCancel() {
      this.form = {
        name: '',
        description: '',
        image: '',
        price: null,
        price_adjust: null
      }
    },
    newCateg(dat) {
      this.$apollo.queries.categories.refetch()
      this.catValue.push(dat.name)
      this.subValue.push(dat.subcategories.name)
      this.catDia = !this.catDia
    },
    newSubCateg(dat) {
      this.$apollo.queries.categories.refetch()
      this.subValue.push(dat.name)
      this.subDia = !this.subDia
    },
    newVarDes(dat) {
      this.$apollo.queries.variant_descriptors.refetch()
      this.pvValue = dat.name
      this.varDia = !this.varDia
    },
    newBasVar(dat) {
      this.$apollo.queries.variants.refetch()
      this.vValue = dat.name
      this.basDia = !this.basDia
    },
    getCatIds() {
      this.catIds = []
      for (let i = 0; i < this.catValue.length; i++) {
        for (let a = 0; a < this.categories.length; a++) {
          if (this.catValue[i] === this.categories[a].name) {
            this.catIds.push(this.categories[a].id)
          }
        }
      }
    },
    handleSavingContent() {
      this.getCatIds()
      for (let i = 0; i < this.subValue.length; i++) {
        for (let a = 0; a < this.sub_categories.length; a++) {
          if (this.subValue[i] === this.sub_categories[a].name) {
            this.subIds.push(this.sub_categories[a].id)
          }
        }
      }
      this.imageSubmit()
      this.form.categories = this.catIds
      this.form.subcategories = this.subIds
      this.form.price = parseFloat(this.form.price)
      const form = this.form
      this.$apollo.mutate({
        mutation: gql`mutation createProduct(
          $name: String!
          $description: String!
          $image: String!
          $price: Float!
          $price_adjust: Float
          $categories: [String!]!
          $subcategories: [String!]!
        ) {
          createProduct (
            data:{
              name: $name
              description: $description
              image: $image
              price: $price
              price_adjust: $price_adjust
              categories: $categories
              subcategories: $subcategories
            }
          ) {
            id
            name
            description
            image
            price
          }
        }`,
        variables: form
      })
      .then((data) => {
        this.createdProduct = {...data.data.createProduct}
        console.log(this.createdProduct)
      }).catch((error) => {
        console.error(error)
      })
    },
    submitVariant() {
      this.imageSubmit()
      let array = this.variantArray.map(obj => Object.values(obj))
      const variantIds = []
      for (let i = 0; i < array.length; i++) {
        let vari = this.variant_descriptors.find(v => v.name === array[i][0])
        variantIds.push(vari.id)
      }
      this.varForm.variant_descriptors = variantIds
      this.varForm.cost = parseFloat(this.varForm.cost)
      this.varForm.price_adjust = parseFloat(this.varForm.price_adjust)
      this.varForm.stock = parseInt(this.varForm.stock)
      this.varForm.product = this.createdProduct.id
      this.varForm.image = this.form.image
      const form = this.varForm
      console.log(form)
      this.$apollo.mutate({
        mutation: gql`mutation createProductVariant(
          $name: String!
          $cost: Float!
          $image: String!
          $price_adjust: Float
          $stock: Int!
          $product: String!
          $variant_descriptors: [String!]!
        ) {
          createProductVariant (
            data:{
              name: $name
              cost: $cost
              image: $image
              stock: $stock
              price_adjust: $price_adjust
              product: $product
              variant_descriptors: $variant_descriptors
          }) {
            id
            name
            cost
            image
            stock
            price_adjust
          }
        }`,
        variables: form
      })
      .then((data) => {
        console.log(data)
        this.variantsAdded.push(data.data.createProductVariant.name)
        this.varForm = {
          name: '',
          cost: null,
          price_adjust: null,
          stock: null
        }
        this.variantArray = []

      }).catch((error) => {
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
  .v-btn {
    margin-top: 20px;
  }
  @media (max-width: 400px) {
    .v-btn {
      margin-top: -10px;
      margin-bottom: 20px;
    }
  }
</style>
