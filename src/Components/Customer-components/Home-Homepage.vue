<template>
<!-- eslint-disable max-len -->
  <div class='container-fluid pt-2'>
    <banner></banner>
    <cart
      @cartOpen='displayPage = false'
      @cartClose='displayPage = true'
      ref='cart'>
    </cart>
    <div class='inner-container d-flex flex-column' :class='{"fade":displayPage===false}'>
      <newest
        :newest='newest'
        v-if='newest'
		@buyItem='addToCart'
		class='align-self-center col-sm-12'>
      </newest>
      <random-pick
        :randomPick='randomPick'
        v-if='randomPick'
		@buyItem='addToCart'
		class='mt-5'>
      </random-pick>
      <new-item
        class='mt-10'
        v-if='allProducts'
        :allProducts='allProducts'>
      </new-item>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Banner from './Home-Banner.vue';
import Cart from './Cart.vue';
import RandomPick from './Home-RandomPick.vue';
import Newest from './Home-Newest.vue';
import NewItem from './Home-NewItem.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    Cart,
    RandomPick,
    Newest,
    NewItem,
  },
  data() {
    return {
      randomPick: null,
      genres: [
        { value: 'Rock/搖滾', title: 'Rock/搖滾' },
        { value: 'Pop/流行', title: 'Pop/流行' },
        { value: 'Dance/舞曲', title: 'Dance/舞曲' },
        { value: 'Country/鄉村', title: 'Country/鄉村' },
        { value: 'Hip-Hop/嘻哈', title: 'Hip-Hop/嘻哈' },
        { value: 'R&B/節奏藍調', title: 'R&B/節奏藍調' },
      ],
      newest: null,
      allProducts: null,
      displayPage: true,
    };
  },
  methods: {
    stopScrolling(status) {
      if (status === true) {
        $('.content-container').addClass('_stop-scrolling');
      } else {
        $('.content-container').removeClass('_stop-scrolling');
      }
    },
    addToCart(item) {
      const vm = this;
      const refCart = vm.$refs.cart;
      let doubled = refCart.cart.filter((data) => data.product_id === item.id);
      if (doubled.length > 0) {
        vm.$bus.$emit('message:push', '購物車已經有這項物品', 'info');
      } else {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        vm.$http.post(api, { data: { product_id: item.id, qty: 1 } }).then((response) => {
          vm.$bus.$emit('message:push', response.data.message, 'info');
          refCart.getCart();
        });
      }
    },
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(api).then((response) => {
        vm.allProducts = response.data.products;
        const showLength = 7;
        const randomNum = parseInt(Math.random() * response.data.products.length - showLength, 10);
        const random = randomNum >= 0 ? randomNum : 0;
        vm.randomPick = response.data.products.slice(random, random + showLength);

        const newest = response.data.products.sort((a, b) => {
          const aTime = new Date(a.content);
          const bTime = new Date(b.content);
          const aStr = aTime.getTime();
          const bStr = bTime.getTime();
          return aStr < bStr ? 1 : -1;
        });
        const found = [];
        vm.genres.forEach((g) => {
          found.push(newest.find((el) => el.category === g.title));
        });
        vm.newest = found.sort((a, b) => {
          const aTime = new Date(a.content);
          const bTime = new Date(b.content);
          const aStr = aTime.getTime();
          const bStr = bTime.getTime();
          return aStr < bStr ? 1 : -1;
        });
      });
    },

  },
  mounted() {
    const vm = this;
    vm.getProducts();
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    vm.$bus.$emit('home-navbarClose');
    next();
  },
};
</script>
<style lang="scss">
@import '../../assets/all.scss';

.inner-container{
  width:100%;
  position:relative;
  height:auto;
  margin-top: 800px;
  @include mobile{
    margin-top:700px;
  }
}
.inner-container.fade{
	display:none !important;
}


</style>
