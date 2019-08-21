<template>
  <v-layout row wrap style="background-color: #eceaec;">
    <v-flex xs12 >
      <div class="topLogo">
        <v-btn @click="go" flat top class="back"><v-icon>chevron_left</v-icon>back to products</v-btn>
        
        <h1 style="position:absolute; right:30px; top:14px; color: #5a5a5a; letter-spacing:0.4rem;">ORDINARY SHOP</h1>
      </div>
    </v-flex>
    <v-flex xs12>
    </v-flex>
    <v-flex xs12 md10 offset-md1 >
      <div class="product">
        <v-layout row wrap class="prodDetail">
          <v-flex xs12 sm7>
            <v-img :src="!!prod.image ? prod.image : product.image">

            </v-img>
          </v-flex>
          <v-flex xs12 sm5>
            <div class="specifics">
              <h3 class="product-name">{{product.name}}</h3><br>
              <p>{{ product.description }}</p>
            </div>
            <div class="options">
              <p style="font-weight: 400">product options</p>
            </div>
            <v-layout class="specifics" column>
              <span v-for="(a, index) in breakupObj(variantsCount)" :key="a.variant">
                Available in {{a.count}}&nbsp;{{a.variant}}<span v-if="a.count > 1">s&nbsp;<small v-if="!prod.name">*</small></span>
                <v-flex xs12 class="rads">
                  <v-radio-group height="16px" style="font-size: 0.4rem; margin: 4px;" row mandatory>
                    <template v-for="(c, i) in breakdown.filter(v => v.variant === a.variant)">
                      <v-radio :style="`background-color:${c.descriptor}; padding:4px; border-radius:16px; margin-right: 72px; width:32px;`" :key="c.name" :label="c.name" :value="i" @change="dealWith(i, a.variant, index)"></v-radio>
                    </template>
                  </v-radio-group>
                </v-flex>
                <br>
              </span>
              <small v-if="!prod.name">* options must be selected</small>
              <span class="selected-product" v-if="prod.name">  Current selection: {{prod.name}}</span>
              <div class="out-stock" v-if="prod.stock === 0" disabled>Product Out of Stock</div>
              <v-btn v-else :disabled="!prod.name" @click="addToCart(prod)" color="#dcdcdc" fluid>Add to cart</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
      <div class="bottom-spacer"></div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['productdetail'],
  data() {
    return {
      breakdown: [],
      variants: [],
      productVariantData: [],
      filterVariants: [],
      product: this.productdetail
    }
  },
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
    },
    ...mapMutations ({
      addToCart: 'cart/ADD_TO_CART'
    }),
    go() {
      this.$emit('close')
    }
  }
}

</script>

<style scoped>
  .topLogo {
    height: 76px;
    width: 100%;
    background-color: white;
    color: black;
  }
  .topName {
    font-size: 1.6rem;
    letter-spacing: 0.4rem;
  }
  .product {
    width: 100%;
  }
  .prodDetail {
    margin: 102px 6px;
  }
  .specifics {
    margin: 6px;
    padding: 8px;
  }
  .colBox {
    height: 16px;
    width: 16px;
    border-radius: 3px;
    outline-offset: 3px;
  }
  .bottom-spacer {
    height: 55vh;
  }
  .product-name {
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 1.6rem;
    letter-spacing: 0.4rem;
    text-align: center;
  }
  .options {
    margin: 6px 16px;
    padding: 18px 0 10px 0;
    text-align: center;
    background-color: #dcdcdc;
    font-size: 1.2rem
  }
  @media (min-width: 600px) and (max-width: 1015px) {
    .rads {
      margin-top: 28px;
    }
  }
  .selected-product {
    font-size: 1.2rem;
  }
  small {
    color: red;
  }
  .back {
    text-transform: lowercase;
    font-size: 1.4rem; 
    font-weight:300;
  }
  @media (max-width: 600px) {
    .back {
      margin-top: 40px;
    }
    .topLogo {
      height: 116px;
    }
  }
  .out-stock {
    width: 100%;
    margin: 6px;
    background-color: rgb(197, 63, 63);
    color: #dcdcdc;
    padding: 10px 8px;
    text-align: center;
    font-weight: 600;
  }
</style>
