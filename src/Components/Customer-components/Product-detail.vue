<template>
<!-- eslint-disable max-len -->
  <div class='container-fluid d-flex flex-column align-items-center position-relative p-5'>
    <cart
      @cartOpen='displayPage = false'
      @cartClose='displayPage = true'
      ref='cart'>
    </cart>
    <div class='item-bg'>
      <img :src='product.imageUrl'>
    </div>
    <div
      class='col-sm-8 product-detail m-5'
      :class='scrollingSwitch'>
      <div class='row text-white position-relative d-flex flex-column align-items-center'>
        <div class='d-flex mb-5 w-100 text-white'>
          <router-link
            class='text-white'
            :to='{name:"Homepage"}'>
            首頁
          </router-link>
          <span class='ml-1 mr-1'>/</span>
          <router-link
            class='text-white'
            :to='{name:"Custom_products"}'>
            全部商品
          </router-link>
          <span class='ml-1 mr-1'>/</span>
          <p>{{ product.unit }} - {{ product.title }}</p>
        </div>
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
          <div class='d-flex'>
            <qty-controller
              class='mt-2'
              :product='product'
              @updateQTY='updateQTY'
            >
              <button
                class='btn-neon-warning buy-btn h-100'
                @click='addToCart'>
                購買
              </button>
            </qty-controller>
          </div>
        </div>
      </div>
      <div
        class='row col-12 text-white mt-5 d-flex flex-column'
        style='white-space:pre-line'>
        <h3 class='title-primary mb-2'>
          曲目表
        </h3>
        <p>
          {{product.description}}
        </p>
        <h3
          class='title-primary mb-4 text-left mt-5'
          v-if='alikes.length >0'>
          類似商品
        </h3>
        <div
          v-if='alikes.length >0'
          class='d-flex'>
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
import qtyController from './QTY-Controller.vue';

export default {
  name: 'Product_detail',
  components: {
    Cart,
    qtyController,
  },
  data() {
    return {
      product: {},
      alikes: [],
      displayPage: true,
      qty: 1,
    };
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
    updateQTY(num) {
      const vm = this;
      vm.qty = num;
    },
    addToCart() {
      const vm = this;
      const refCart = vm.$refs.cart;
      let doubled = refCart.cart.filter((data) => data.product_id === vm.product.id);
      if (doubled.length > 0) {
        vm.$bus.$emit('message:push', '購物車已經有這項物品', 'info');
      } else {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        vm.$http.post(api, { data: { product_id: vm.product.id, qty: vm.qty } }).then((response) => {
          vm.$bus.$emit('message:push', response.data.message, 'info');
          refCart.getCart();
        });
      }
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
