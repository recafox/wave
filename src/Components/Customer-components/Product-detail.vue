<template>
<!-- eslint-disable max-len -->
  <div class='container-fluid d-flex flex-column align-items-center position-relative p-5'>
    <cart
      @cartOpen='displayPage = false'
      @cartClose='displayPage = true'>
    </cart>
    <div class='item-bg'>
      <img :src='product.imageUrl'>
    </div>
    <div
      class='col-sm-8 product-detail'
      :class='scrollingSwitch'>
      <div class='row text-white position-relative'>
        <img
          :src='product.imageUrl'
          class='img-shadow mb-3 p-0'>
        <div class='col-sm-6 d-flex flex-column align-items-end justify-content-center'>
          <h3>
            {{ product.title }}
          </h3>
          <p>
            {{ product.unit }}
          </p>
          <p>
            {{ product.content }}
          </p>
          <p
            class='font-m mt-2 text-line-through'
            v-if='product.origin_price!==product.price'>
            $ {{ product.origin_price }}
          </p>
          <p class='font-m mt-3'>
            $ {{ product.price }}
          </p>
          <div class='d-flex align-items-center mt-3 w-100 justify-content-end'>
            <button
              class='btn btn-border-warning mr-1'
              @click='qty-=1'>
              <font-awesome-icon icon='minus'/>
            </button>
            <input
              class='border border-warning text-center h-100 rounded pt-2 pb-2 text-white'
              type='number'
              v-model='qty'
              disabled
              style='width:50px'>
            <button
              class='btn btn-border-warning ml-1 mr-3'
              @click='qty+=1'>
              <font-awesome-icon icon='plus'/>
            </button>
            <button
              class='btn-neon-warning buy-btn'
              @click='addToCart'>
              購買
            </button>
          </div>
        </div>
      </div>
      <div
        class='row col-12 text-white mt-5'
        style='white-space:pre-line'>
        <p>
          {{product.description}}
        </p>
      </div>
      <div
        class='mt-5 col-12'
        v-if='alikes.length>0'>
        <h3
          class='text-white mb-4 text-center'>
          類似商品
        </h3>
        <div>
          <div
            v-for='item in alikes'
            :key='item.title'
            class='alike-item'>
            <router-link
              :to='{name:"Product_detail", params:{ id:item.id }}' target='_blank'>
              <img
                :src='item.imageUrl'
                class='img-shadow'>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from './Cart.vue';

export default {
  name: 'Product_detail',
  components: {
    Cart,
  },
  data() {
    return {
      product: {},
      qty: 1,
      alikes: [],
      displayPage: true,
    };
  },
  watch: {
    qty: {
      handler(newVal) {
        const vm = this;
        if (newVal <= 1) {
          vm.qty = 1;
        }
      },
    },
  },
  computed: {
    scrollingSwitch() {
      const vm = this;
      if (!vm.displayPage) {
        return '_stop-scrolling';
      }
      return '';
    },
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    vm.$bus.$emit('home-navbarClose');
    next();
  },
  methods: {
    addToCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.post(api, { data: { product_id: vm.product.id, qty: vm.qty } }).then((response) => {
        vm.$bus.$emit('message:push', response.data.message, 'info');
      });
    },
    getAlikes() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(api).then((response) => {
        const alikeArr = response.data.products.filter((p) => p.category === vm.product.category);
        const showLength = 4;
        if (alikeArr.length <= showLength) {
          vm.alikes = alikeArr;
        } else if (alikeArr.length > showLength) {
          const random = parseInt(Math.random() * alikeArr.length - showLength, 10);
          let randomNumber;
          if (random > 0) {
            randomNumber = random * alikeArr.length - showLength;
          } else {
            randomNumber = 0;
          }
          vm.alikes = alikeArr.slice(randomNumber, randomNumber + showLength);
        }
      });
    },
  },
  mounted() {
    const vm = this;
    const { id } = vm.$route.params;
    const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
    vm.$http.get(api).then((response) => {
      vm.product = response.data.product;
      vm.getAlikes();
    });
  },
};
</script>

<style lang='scss' scoped>
@import '../../assets/all.scss';
.container-fluid{
  @include mobile{
    overflow-x: hidden;
  }
  .buy-btn{
    border-radius: 0.375rem;
    height:38px;
    letter-spacing: 0.3rem;
    text-indent: 0.3rem;
    font-size: 20px;
  }
}
.product-detail{
  img{
    @include sizing(250px);
  }
}
.product-detail._stop-scrolling{
  display:none !important;
}
.item-bg{
  height:100vh;
  opacity:0.3;
  position:absolute;
  top:0;
  img{
    height:100vh;
    filter:blur(5px);
  }

}

.alike-item{
  display:inline-block;
  width:20%;
  margin:2.5%;
  transition:0.5s;
  &:hover{
    transition:0.1s;
    opacity:0.2;
  }
  img{
    @include sizing(100%);
  }
  @include mobile{
    width:40%;
    margin:5%;
  }
}
</style>
