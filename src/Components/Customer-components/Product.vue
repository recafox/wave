<template>
<!-- eslint-disable max-len -->
  <div class='container-fluid position-relative'>
    <Searchbar
      :genres='genres'
      :sortModes='sortModes'
      @sendQuery='getQuery'
      @startSearch='displayPage = false'
      @endSearch='displayPage = true'
      @click='query = ""'
      ref='child'>
    </Searchbar>
    <cart
      @cartOpen='displayPage = false'
      @cartClose='displayPage = true'
			ref='cart'>
    </cart>
    <div
      class='inner-container'
      :class='scrollingSwitch'>
			<div
				class='flex-column text-center'>
				<h3 class='title-primary text-center'>全部商品</h3>
				<div
					v-if='isSearching'
					class='text-white mt-3 d-flex justify-content-center'>
					<p class='ml-2'>{{ query }}</p>
					<button
					@click='cancelSearching'
					class='btn-border-info ml-2'>
					取消
				</button>
				</div>
			</div>
      <div class='mt-3 d-flex flex-column'>
        <div class='mb-3 d-md-flex justify-content-center d-block'>
          <div
            class='btn-neon-primary category-box d-inline-block d-md-block'
            @click='cancelSearching'
            :class='{"active":query===""}'
            >
            <p>全部商品</p>
          </div>
          <div
            v-for='genre in genres'
            :key='genre.value'
            class='btn-neon-primary category-box d-inline-block d-md-block'
            @click='getQuery({query:genre.value})'
            :class='{"active":query===genre.value}'>
            <p>{{ genre.title }}</p>
          </div>
        </div>
        <div class='row col-sm-12 align-self-center d-flex flex-wrap justify-content-center p-0'>
          <router-link
          :to='{name:"Product_detail", params:{id:product.id}}'
          class='text-white product-card m-lg-4 m-2 col-5 col-sm-2 position-relative'
          v-for='product in products'
          :key='product.title'>
          <card
						:product='product'
						@buyProduct='addToCart'>
					</card>
        </router-link>
        </div>
      </div>
      <Pagination
        v-if='!isSearching'
        :pagination = pagination
        @turnTo='changePage'
        class='align-self-center'>
      </Pagination>
    </div>
  </div>
</template>
<script>
import Searchbar from '../Search.vue';
import Pagination from '../Pagination.vue';
import Card from './Product-card.vue';
import Cart from './Cart.vue';

export default {
  name: 'Custom-product',
  components: {
    Cart,
    Card,
    Searchbar,
    Pagination,
  },
  data() {
    return {
      randomPick: [],
      products: [],
      allProducts: [],
      isAdding: false,
      genres: [
        { value: 'Rock/搖滾', title: 'Rock / 搖滾' },
        { value: 'Pop/流行', title: 'Pop / 流行' },
        { value: 'Dance/舞曲', title: 'Dance / 舞曲' },
        { value: 'Country/鄉村', title: 'Country / 鄉村' },
        { value: 'Hip-Hop/嘻哈', title: 'Hip-Hop / 嘻哈' },
        { value: 'R&B/節奏藍調', title: 'R&B / 節奏藍調' },
      ],
      sortModes: [
        { value: 'content', title: '發行日期' },
        { value: 'origin_price', title: '原價' },
        { value: 'price', title: '售價' },
      ],
      query: '',
      isSearching: false,
      displayPage: true,
      pagination: {},
      cartConfirming: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    vm.$bus.$emit('home-navbarClose');
    next();
  },
  methods: {
    addToCart(item) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.post(api, { data: { product_id: item.id, qty: 1 } }).then((response) => {
        vm.$bus.$emit('message:push', response.data.message, 'info');
        vm.$refs.cart.getCart();
      });
    },
    startSearch() {
      const vm = this;
      vm.displayPage = false;
    },
    endSearch() {
      const vm = this;
      vm.displayPage = true;
    },
    getProductsAll() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(api).then((response) => {
        vm.allProducts = response.data.products;
        const showLength = 7;
        const randomNum = parseInt(Math.random() * response.data.products.length - showLength, 10);
        const random = randomNum >= 0 ? randomNum : 0;
        vm.randomPick = response.data.products.slice(random, random + showLength);
      });
    },
    getProductsWithPage(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    changePage(page = 1) {
      const vm = this;
      vm.pagination.current_page = page;
      vm.getProductsWithPage(page);
    },
    sortBy(arr, mode, type) {
      if (mode === 'content') {
        switch (type) {
          case 'ascend':
            return arr.sort((a, b) => {
              const aTime = new Date(a.content);
              const bTime = new Date(b.content);
              const aStr = aTime.getTime();
              const bStr = bTime.getTime();
              return aStr > bStr ? 1 : -1;
            });

          case 'descend':
            return arr.sort((a, b) => {
              const aTime = new Date(a.content);
              const bTime = new Date(b.content);
              const aStr = aTime.getTime();
              const bStr = bTime.getTime();
              return aStr < bStr ? 1 : -1;
            });
          default:
            return new Error('nothing found');
        }
      } else {
        switch (type) {
          case 'ascend':
            return arr.sort((a, b) => (a[mode] > b[mode] ? 1 : -1));
          case 'descend':
            return arr.sort((a, b) => (a[mode] < b[mode] ? 1 : -1));
          default:
            return new Error('nothing found');
        }
      }
    },
    filterBy(arr, filterWord) {
      return arr.filter(
        (item) => item.title.toUpperCase().includes(filterWord.toUpperCase())
                  || item.unit.toUpperCase().includes(filterWord.toUpperCase())
                  || item.category.toUpperCase() === filterWord.toUpperCase(),
      );
    },
    getQuery(q) {
      const vm = this;
      let type = '';
      let mode = '';
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.$http.get(api).then((response) => {
        const valueList = Object.values(response.data.products);
        let filtered;
        let sorted;
        switch (true) {
          case q.query.length > 0:
            filtered = vm.filterBy(valueList, q.query);
            switch (true) {
              case q.sortMode !== undefined && q.sortType !== undefined:
                if (q.sortType === 'ascend') {
                  type = '低至高';
                } else if (q.sortType === 'descend') {
                  type = '高至低';
                }
                vm.sortModes.forEach((m) => {
                  if (m.value === q.sortMode) {
                    mode = m.title;
                    sorted = vm.sortBy(filtered, m.value, q.sortType);
                  }
                });
                vm.products = sorted;
                vm.query = `${q.query}/${mode}/${type}`;
                vm.isSearching = true;
                break;
              case q.sortMode === undefined && q.sortType === undefined:
                vm.products = filtered;
                vm.isSearching = true;
                vm.query = q.query;
                break;
              case q.sortMode.length === 0 && q.sortType.length === 0:
                vm.products = filtered;
                vm.isSearching = true;
                vm.query = q.query;
                break;
              default:
                vm.cancelSearching();
                break;
            }

            break;
          case q.query.length === 0:
            switch (true) {
              case q.sortMode.length > 0 && q.sortType.length > 0:
                if (q.sortType === 'ascend') {
                  type = '低至高';
                } else if (q.sortType === 'descend') {
                  type = '高至低';
                }
                vm.sortModes.forEach((m) => {
                  if (m.value === q.sortMode) {
                    mode = m.title;
                    sorted = vm.sortBy(valueList, m.value, q.sortType);
                  }
                });
                vm.products = sorted;
                vm.query = `${mode}/${type}`;
                vm.isSearching = true;
                break;
              default:
                vm.cancelSearching();
                break;
            }

            break;
          default:
            break;
        }
        vm.closePanel();
      });
    },
    cancelSearching() {
      const vm = this;
      vm.isSearching = false;
      vm.query = '';
      vm.changePage();
    },
    closePanel() {
      const vm = this;
      vm.$refs.child.closePanel();
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
  mounted() {
    const vm = this;
    vm.getProductsAll();
    vm.getProductsWithPage();
  },


};
</script>

<style lang="scss" scoped>
@import '../../assets/all.scss';

.category-box{
  padding: 0.5rem 2rem;
  margin: 1rem;
  @include mobile{
    padding:0.5rem;
    margin:0.5rem;
  }
}
.inner-container{
  position:relative;
  height:auto;
  margin-top:100px;
  display:flex;
  flex-direction: column;
  @include mobile{
    width:100%;
  }

}
.inner-container._stop-scrolling{
  display:none !important;
}

.product-card{
  @include mobile{
    img{
      width:90%;
    }
  }
}
</style>
