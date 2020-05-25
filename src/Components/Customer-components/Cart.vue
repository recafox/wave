<template>
  <div
    class='content bg-black cart'
    :class='cartSwitch'>
    <div
      class='cart-btn notice-btn d-flex justify-content-center btn-fixed-position-responsive'>
      <div class='notice-badge'>
		{{ cart.length }}
      </div>
      <span
        class='d-flex align-items-center'
        @click='cartOpen'>
          <font-awesome-icon class='icon-l' icon='shopping-cart'/>
      </span>
    </div>
    <div class='container-fluid text-white d-flex flex-column'>
      <button
        class='btn icon-l text-white align-self-end'
        @click='cartClose'>
        &times;
      </button>
      <div v-if='cart.length===0'>
        <p class='text-gray font-m text-center'>
          沒有商品
        </p>
      </div>
      <div
        class='mt-5 align-self-center col-sm-10 table-responsive'
        v-else>
		<h3 class='title-primary mt-2'>購物車</h3>
        <table class='table table-borderless text-white mt-3'>
          <tbody>
            <tr
              v-for='item in cart'
              :key='item.id'>
              <td class='border-bottom'>
                <img :src='item.product.imageUrl'>
              </td>
              <td class='align-middle border-bottom'>
                <p>{{ item.product.title }}</p>
                <p>$ {{ item.product.price }}</p>
                <p>共 {{item.qty }} 個</p>
                <p>總價: $ {{ item.total }}</p>
              </td>
              <td class='border-bottom align-middle text-center'>
                <button
                  class='btn btn-border-success'
                  @click='deleteItem(item)'>
                  刪除
                </button>
              </td>
            </tr>
            <tr>
              <td class='align-middle text-center'>總價</td>
              <td class='align-middle'>
                $ {{ total }}
              </td>
              <td class='align-middle text-center'>
                <router-link
                  :to='{name:"Custom_bill"}'>
                  <button class='btn-lg btn-border-warning'>
                    結帳
                  </button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  data() {
    return {
      showCart: false,
      cart: [],
      final_total: 0,
      total: 0,
    };
  },
  methods: {
    deleteItem(item) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
      vm.$http.delete(api).then((response) => {
        vm.$bus.$emit('message:push', response.data.message, 'info');
        vm.getCart();
      });
    },
    cartOpen() {
      const vm = this;
      vm.showCart = true;
      vm.$emit('cartOpen');
      vm.getCart();
    },
    cartClose() {
      const vm = this;
      vm.showCart = false;
      vm.$emit('cartClose');
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(api).then((response) => {
        vm.final_total = response.data.data.final_total;
        vm.total = response.data.data.total;
        vm.cart = response.data.data.carts;
      });
    },
  },
  computed: {
    cartSwitch() {
      const vm = this;
      if (vm.showCart) {
        return 'show';
      }
      return '';
    },
  },
  mounted() {
    const vm = this;
    vm.getCart();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/all.scss';

 .content{
    width:100%;
    height:100%;
    color:$white;
    position:fixed;
    top:0;
    left:0;
    z-index:10;
    transform: translateX(100%);
    transition:0.5s;
    table img{
      height:150px;
      @include mobile{
        height:100px;
      }
    }
 }
 .cart.show{
  transform: translateX(0);
  overflow-y: scroll;
 }

 .cart-btn{
  position: absolute;
  left:calc(-4% - 100px);
  top:80%;
  border-radius: 50%;
}
</style>
