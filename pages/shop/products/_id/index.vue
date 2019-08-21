<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="topLogo">

      </div>
    </v-flex>
    <v-flex xs12>
      <div class="topBorder">

      </div>
    </v-flex>
    <v-flex xs12>
      <div class="topName">
        <h1>Product Name</h1>
      </div>
    </v-flex>
    <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
      <div class="product">
        <v-layout row wrap class="prodDetail">
          <v-flex xs12 sm6>
            <v-img src="/product1.jpg">

            </v-img>
          </v-flex>
          <v-flex xs12 sm6>
            <div class="specifics">
              <h3>Product Details</h3>
              <p>Lovely product stuff all about the lovely product and stuff and also some things and that.</p>
            </div>
            <v-layout column>
              <span v-for="(a, index) in breakupObj(variantsCount)" :key="a.variant">
                Available in {{a.count}}&nbsp;{{a.variant}}<span v-if="a.count > 1">s</span>
                <!-- <v-flex xs12>
                  <v-radio-group height="16px" style="font-size: 0.4rem; margin: 4px;"  v-if="a.variant === 'Size'" v-model="sizeInd" row mandatory>
                    <template v-for="(s, i) in size">
                      <v-radio style="font-size: 0.4rem; margin: 2px;" :key="s.name" :label="s.descriptor" :value="i"></v-radio>
                    </template>
                  </v-radio-group>
                </v-flex> -->
                <v-flex xs12>
                  <v-radio-group height="16px" style="font-size: 0.4rem; margin: 4px;" row mandatory>
                    <template v-for="(c, i) in breakdown.filter(v => v.variant === a.variant)">
                      <v-radio :style="`background-color:${c.descriptor}; padding:4px; border-radius:3px; margin: 2px; width:94px;`" :key="c.name" :label="c.name" :value="i" @change="dealWith(i, a.variant, index)"></v-radio>
                    </template>
                  </v-radio-group>
                </v-flex>
                <br>
              </span>
              <span v-if="typeof prod === 'object'">  Current selection: {{prod.name}}</span>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
      <br><br>
      {{productVariantData}}
      <br><br>
      <!-- {{prod}} -->
      <br><br>

      {{product.id}}<br>
      {{product.name}}<br>
      {{product.description}}<br>
      {{product.image}}<br>
      {{product.price}}<br>
      {{product.price_adjust}}<br>
      
      <br><br>
      {{product}}

    </v-flex>
  </v-layout>
</template>

<script>
import product from '../../../../apollo/queries/product.gql'

export default {
  apollo: {
    product: {
      query: product,
      prefetch: true,
      variables() {
        return {
          id: this.$route.params.id
        }
      }
    }
  },
  data: () => ({
    breakdown: [],
    variants: [],
    productVariantData: [],
    filterVariants: [],
  }),
  computed: {
    variantsCount() {
      var array = this.product.product_variants.map((v) => {
        return v.variant_descriptors
      })
      var collected = []
      for (let i = 0; i < array.length; i++) {
        for (let a = 0; a < array[i].length; a++) {
          collected.push({name: array[i][a].name, variant: array[i][a].variant.name, descriptor: array[i][a].descriptor})
        }
      }
      this.variants = array
      const result = Array.from(new Set(collected.map(s => s.name)))
        .map(name => {
          return {
            name: name,
            variant: collected.find(s => s.name === name).variant,
            descriptor: collected.find(s => s.name === name).descriptor
          }
        })
      this.breakdown = result
      const getting = result.map((v) => {
        return v.variant
      })
      var counts = {};
      getting.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
      return counts
    },
    prod() {
      var array = []
      var prodVars = [...this.product.product_variants]
      
      if (this.productVariantData.length === this.breakupObj(this.variantsCount).length) {
        var array = []
        for (let a = 0; a < this.product.product_variants.length; a++) {
          for (let b = 0; b < this.product.product_variants[a].variant_descriptors.length; b++) {
            for (let i = 0; i < this.productVariantData.length; i++) {
              if (this.product.product_variants[a].variant_descriptors[b].name === this.productVariantData[i].name) {
                array.push(a)
              }
            }
          }
        }
      }
      if (array.length > 0) {
        var thing = this.mode(array)
        console.log(thing)
        return prodVars[thing]
      }
      return prodVars
    }
  },
  methods: {
    breakupObj(target) {
      var array = []
      for (var k in target){
          if (target.hasOwnProperty(k)) {
            array.push({variant: k, count: target[k]})
          }
      }
      const result = Array.from(new Set(array.map(s => s.variant)))
        .map(variant => {
          return {
            variant: variant,
            count: array.find(s => s.variant === variant).count
          }
        })
      return result
    },
    dealWith(i, v) {
      var array = []
      array = this.breakdown.filter(x => x.variant === v)
      var thing = array[i]
      let index = this.productVariantData.findIndex(p => p.variant === thing.variant)
      if (index === -1) {
        this.productVariantData.push(thing)
      } else {
        this.productVariantData.splice(index, 1)
        this.productVariantData.push(thing)
      }
    },
    mode(array) {
      if(array.length == 0)
          return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for(var i = 0; i < array.length; i++)
        {
            var el = array[i];
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }
  }
}

</script>

<style scoped>
  .topLogo {
    height: 46px;
    width: 100%;
  }
  .topBorder {
    background-image: linear-gradient(to right, #cfcecf, #d4d3d4, #d9d8d9, #dedede, #e3e3e3, #e4e4e4, #e4e4e4, #e5e5e5, #e2e2e2, #dedede, #dbdbdb, #d8d8d8);
    border-top: 1px solid rgb(157, 157, 157);
    border-bottom: 1px solid rgb(157, 157, 157);
    height: 32px;
    width: 100%;
  }
  .topName {
    font-size: 1.6rem;
    letter-spacing: 0.4rem;
  }
  .product {
    width: 100%;
    border: 1px solid #ca1616;
  }
  .prodDetail {
    margin: 6px;
  }
  .specifics {
    margin: 6px
  }
  .colBox {
    height: 16px;
    width: 16px;
    border-radius: 3px;
    outline-offset: 3px;
  }
</style>
