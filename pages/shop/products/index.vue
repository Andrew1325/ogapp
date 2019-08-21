<template>
  <v-container>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <product-view v-if="dialog" :productdetail="prod" @close="close"/>      
    </v-dialog>

    <v-layout>
      <v-flex xs12>
        <div class="welcome">
          <h1>Welcome to the Ordinary Goddesses Shop</h1>
          <p>Below you will find our list of available products. To make your shopping experience as straight-forward as possible, we've tried to make our store as easy to use as possible. You can browse through our entire range of products, or by clicking "filters" just below, can see only products matching what you want. You can enter a search term, or select one or many categories, or a price range or any combination to suit your needs, and we'll only show you what you want. Happy shopping.</p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout>
    <v-flex xs12>
      <div class="filters">
        <p>
        <v-btn
          outline
          color="blue-grey"
          @click="showFilters"
        >
          <v-icon left dark>tune</v-icon>
          Filters
        </v-btn> <span v-if="!openFilters" style="font-size: 1.4rem;">click "filters" to search and refine the product list...</span></p>
        <div >
          <v-container fluid v-if="openFilters">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  solo
                  outline
                  flat
                  color="blue-grey"
                  label="Search..."
                  append-icon="search"
                  v-model="search"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 sm3 md2>
                <p>Categories</p>
                <v-checkbox
                  v-for="(i, index) in Categories"
                  :key="index"
                  :label="i.name"
                  color="red"
                  @change="returnedSubs"
                  v-model="i.checked"
                  hide-details
                ></v-checkbox>
                <br><br><br>
              </v-flex>
              <v-flex xs6 sm3 md2>
                <p>Sub-Categories</p>
                <p v-if="filteredCategories.length === 0">Please select 1 or more categories to enable sub-category selection.</p>
                <v-checkbox
                  v-for="i in filteredCategories"
                  :key="i.name"
                  :label="i.name"
                  color="indigo"
                  v-model="i.checked"
                  hide-details
                ></v-checkbox>
                
              </v-flex>
              <v-flex xs12 sm6 md4>
                <p>Select price range</p>
                <v-layout>
                <v-flex xs2
                  shrink
                  style="max-width: 50px;"
                >
                  <v-text-field
                    v-model="price[0]"
                    class="mt-0"
                    hide-details
                    single-line
                    type="number"
                    readonly
                    reverse
                  ></v-text-field>
                </v-flex>

                <v-flex xs8>
                  <v-range-slider
                    v-model="price"
                    :max="highprice"
                    :min="lowprice"
                    :step="priceStep"
                    style="padding: 0 15px"
                  ></v-range-slider>
                </v-flex>

                <v-flex xs2
                  shrink
                  style="max-width: 50px"
                >
                  <v-text-field
                    v-model="price[1]"
                    class="mt-0"
                    hide-details
                    single-line
                    type="number"
                    reverse
                    readonly
                  ></v-text-field>
                  <br><br><br>
                </v-flex>
                </v-layout>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm6 md3 d-flex>
                <v-layout column>
                <p>Select Sort Order</p>
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    ref="formo"
                    :items="items"
                    :value="items[0]"
                    outline
                    style="min-height: 46px; min-width:180px;"
                    v-model="select"
                  ></v-select>
                </v-flex>
               </v-layout>
              </v-flex>
            </v-layout>
            <v-btn dark color="indigo" @click="applyFilters">Show me...</v-btn>
          </v-container>
        </div>
      </div>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="results">
        <h1 v-if="searchFilters.length === 0">Showing {{from}} - <span v-if="to < productCount">{{to}}</span><span v-else>{{productCount}}</span> of {{productCount}} products</h1>
          <h1 v-else>Showing {{from}} - <span v-if="to < productCount">{{to}}</span><span v-else>{{productCount}}</span> of {{productCount}} products that match your search.
          </h1>
      </div>
    </v-flex>
    <v-flex xs12>
      <v-divider></v-divider>
      <v-layout row wrap v-for="prod in products.products" :key="prod.id" style="border-top: 1px solid rgb(127, 127, 127); padding: 12px 0;">
       
        <v-flex xs12 sm3 @click="openDialog(prod.id)" style="cursor: pointer">
          <v-card flat>
            <v-img :src="prod.image"></v-img>
          </v-card>
        </v-flex>
        <v-flex xs12 sm9>
          <v-layout row wrap>
            <v-flex xs12 sm8 style="padding: 8px 20px">
              <p style="font-size:1.3rem; font-weight:500;">{{ prod.name }}</p>
              <small>{{prod.id}}</small><br>
              <small>{{ text_truncate(prod.description,102) }}</small>
            </v-flex><v-spacer></v-spacer>
            <v-flex xs12 sm4 style="padding: 8px 20px">
              <p><strong>
                ${{ parseFloat(prod.price*100 / 100).toFixed(2) }}  
              </strong></p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <div style="width:100%;height:1px;border-top: 1px solid rgb(127, 127, 127);"></div>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm8 md6 lg4 offset-sm2 offset-md3 offset-lg4>
          <div>
            <v-btn v-if="searchFilters.length === 0" :disabled="paginationCounter === 1" @click="backProducts"><v-icon>chevron_left</v-icon></v-btn>
            <v-btn v-else :disabled="paginationCounter === 1" @click="backFilteredProducts"><v-icon>chevron_left</v-icon></v-btn>
            Page {{paginationCounter}} of {{Math.ceil(productCount/5)}}
            <v-btn v-if="searchFilters.length === 0" :disabled="paginationCounter === Math.ceil(productCount/5)" @click="moreProducts"><v-icon>chevron_right</v-icon></v-btn>
            <v-btn v-else :disabled="paginationCounter === Math.ceil(productCount/5)" @click="moreFilteredProducts"><v-icon>chevron_right</v-icon></v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import products from '../../../apollo/queries/products.gql'
import filteredProducts from '../../../apollo/queries/filteredProducts.gql'
import categories from '../../../apollo/queries/categories.gql'
import ProductView from '@/components/ProductView.vue'
import product from '../../../apollo/queries/product.gql'

export default {
  layout: 'shop',
  apollo: {
    categories: {
      query: categories
    },
    products: {
      query: products
    }
    
  },
  components: {
    ProductView
  },
  data () {
    return {
      openFilters: false,
      price: [0,180],
      highPrice: [
        {
          "price": 125.50
        }
      ],
      lowPrice: [
        {
          "price": 7.5
        }
      ],
      items: ['Newest', 'Highest Price', 'Lowest Price'],
      filteredCategories: [],
      select: 'Newest',
      search: '',
      selectedCatNames: [],
      selectedSubNames: [],
      searchFilters: [],
      fetched: false,
      products: [],
      paginationCounter: 1,
      productCount: 0,
      from: 1,
      to: 5,
      prod: null,
      dialog: false
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.dialog) {
      next(false)
      alert("Click 'back to products' to return to all products")
      return ''
    }
    next()
  },
  mounted() {
    this.$nextTick(() => {
      this.price.splice(0,2)
      this.price.push(0)
      this.price.push(this.highprice)
      this.productCount = this.products.count
    })
  },
  computed: {
    Categories() {
      for (let i = 0; i < this.categories.length; i++) {
        this.categories[i].checked = false
      }
      return this.categories
    },
    highprice() {
      if (!!this.highPrice) {
        let high = this.highPrice[0].price
        return Math.ceil(high/10)*10
      }
      else {
        return 180
      }
    },
    lowprice() {
      if (!!this.highPrice) {
        let low = this.lowPrice[0].price
        if (low < 10) {
          return 0
        }
      return Math.ceil((low-1)/10)*10
      }
      else {
        return 0
      }
    },
    priceStep() {
      let x = (this.highprice - this.lowprice)/10
      return Math.ceil(x/10)*10
    },
  },
  methods: {
    checkgo() {
      if (this.dialog === true) {
        alert('Dialog Open')
        return true
      }
      return false
    },
    showFilters() {
      this.openFilters = !this.openFilters
    },
    returnedSubs() {
      this.filteredCategories = []
      let chkd = this.categories.filter(c => c.checked === true)
      
      for (let i = 0; i < chkd.length; i++) {
        
        for (let a = 0; a < chkd[i].subcategories.length; a++) {
          this.filteredCategories.push(chkd[i].subcategories[a])
        }
      }
      let ids = [...new Set(this.filteredCategories.map(item => item.id))];
      let names = [...new Set(this.filteredCategories.map(item => item.name))];
      this.filteredCategories = []
      for (let b = 0; b < names.length; b++) {
        let holder = {}
        holder.id = ids[b]
        holder.name = names[b]
        holder.checked = false
        this.filteredCategories.push(holder)
      }
    },
    applyFilters() {
      this.searchFilters = []
      let selectCat = this.categories.filter(c => c.checked === true)
      this.selectedCatNames = selectCat.map(c => c.name)
      selectCat = selectCat.map(c => c.id)
      for (let a = 0; a < selectCat.length; a++) {
        selectCat[a] = {id: selectCat[a]}
      }
      let selectSub = this.filteredCategories.filter(s => s.checked === true)
      this.selectedSubNames = selectSub.map(s => s.name)
      selectSub = selectSub.map(s => s.id)
      for (let b = 0; b < selectSub.length; b++) {
        selectSub[b] = {id: selectSub[b]}
      }
      this.searchFilters.push(this.search, selectCat, selectSub, this.price, this.select)
      this.paginationCounter = 1
      this.from = 1
      this.to = 5
      this.getProducts()
      this.showFilters()
    },
    text_truncate(str, length, ending) {
      if (length == null) {
        length = 100
      }
      if (ending == null) {
        ending = '...'
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending
      } else {
        return str
      }
    },
    getProducts() {
      this.$apollo.query({
        query: filteredProducts,
        variables: {
          query: JSON.stringify(this.searchFilters)
        }
      })
      .then(({ data }) => {
        this.products = data.products
        this.productCount = data.products.count
      })
      this.fetched = true
    },
    moreProducts() {
      let lastId = this.products.products[this.products.products.length-1].id
      this.$apollo.query({
        query: products,
        variables: {
          after: lastId
        }
      })
      .then(({ data }) => {
        this.products = data.products
      })
      this.paginationCounter++
      this.from += 5
      this.to += 5
      this.fetched = true
    },
    moreFilteredProducts() {
      let lastId = this.products.products[this.products.products.length-1].id
      this.$apollo.query({
        query: filteredProducts,
        variables: {
          query: JSON.stringify(this.searchFilters),
          after: lastId
        }
      })
      .then(({ data }) => {
        this.products = data.products
      })
      this.paginationCounter++
      this.from += 5
      this.to += 5
      this.fetched = true
    },
    backProducts() {
      let firstId = this.products.products[0].id
      console.log(firstId)
      this.$apollo.query({
        query: products,
        variables: {
          skip: this.from-6,
          before: firstId
        }
      })
      .then(({ data }) => {
        this.products = data.products
      })
      this.paginationCounter--
      this.from -= 5
      this.to -= 5
      this.fetched = true
    },
    backFilteredProducts() {
      let firstId = this.products.products[0].id
      this.$apollo.query({
        query: filteredProducts,
        variables: {
          query: JSON.stringify(this.searchFilters),
          skip: this.from-6,
          before: firstId
        }
      })
      .then(({ data }) => {
        this.products = data.products
      })
      this.paginationCounter--
      this.from -= 5
      this.to -= 5
      this.fetched = true
    },
    async openDialog(id) {
      await this.$apollo.query({
        query: product, 
        variables: {
          id 
        }
      })
      .then(({ data }) => {
        this.prod = data.product
      })
      console.log(this.prod)
      this.dialog = true
    },
    close() {
      this.prod = null,
      this.dialog = false
    }
  }
}


</script>

<style scoped>
  h4 {
    color: #00ff22
  }
  h1 {
    font-family: 'Raleway';
    font-weight: 400;
  }
  .results {
    padding: 24px 0;
  }
  .filters {
    width:100%;
    background:rgba(245, 188, 198, 0.445);
  }
  .noA {
    text-decoration: none;
    color: #5f5f5f
  }
</style>