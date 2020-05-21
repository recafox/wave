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
      <div class='mt-10 d-flex flex-column'>
        <div class='d-md-flex flex-wrap justify-content-center mb-3'>
          <div
            class='btn-neon-primary category-box'
            @click='cancelSearching'
            :class='{"active":query===""}'
            >
            <p>全部商品</p>
          </div>
          <div
            v-for='genre in genres'
            :key='genre.title'
            class='btn-neon-primary category-box'
            @click='getQuery({query:genre.title})'
            :class='{"active":query===genre.title}'>
            <p>{{ genre.title }}</p>
          </div>
        </div>
        <div
          v-if='isSearching'
          class='d-flex mb-2'>
          <h5 class='text-white m-0'>
            搜尋:{{ query }}
          </h5>
          <button
            @click='cancelSearching'
            class='btn-border-info ml-2'>
            取消搜尋
          </button>
        </div>
        <div class='align-self-center d-flex flex-wrap justify-content-center'>
          <router-link
          :to='{name:"Product_detail", params:{id:item.id}}'
          class='text-white product-card m-lg-4 m-2 col-5 col-sm-2 position-relative'
          v-for='item in products'
          :key='item.title'>
          <img
            :src='item.imageUrl'
            class='img-shadow'>
          <div class='d-flex flex-column align-items-center p-1 mt-md-2 col-sm-10'>
            <h5 class='mt-3 text-center'>
              {{ item.title }}
            </h5>
            <h6 class='mt-2 text-center'>
              {{ item.unit }}
            </h6>
            <p class='text-white text-centerr'>
              {{ item.category }}
            </p>
            <p
              class='text-line-through text-gray text-center mt-2'
              v-if='item.price!==item.origin_price'>
              $ {{ item.origin_price }}
            </p>
            <p class='font-m text-center mt-2'>
              $ {{ item.price }}
            </p>
          </div>
					<div class='d-flex flex-column flex-md-row position-absolute bottom-0 mb-3'>
						<router-link
							:to='{name:"Product_detail", params:{id:item.id}}'
							class='m-2'>
							<button class='btn btn-border-primary btn-lg'>
								查看
							</button>
						</router-link>
						<button
							class='btn btn-border-success m-2 btn-lg'
							@click.prevent='addToCart(item)'>
							購買
						</button>
					</div>
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
		<!-- <random-pick
      v-if='randomPick'
      :randomPick='randomPick'>
    </random-pick> -->
  </div>
</template>
<script>
import Searchbar from '../Search.vue';
import Pagination from '../Pagination.vue';
// import RandomPick from './Home-RandomPick.vue';
import Cart from './Cart.vue';

export default {
  name: 'Custom-product',
  components: {
    Cart,
    // RandomPick,
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
        { value: 'Rock/搖滾', title: 'Rock/搖滾' },
        { value: 'Pop/流行', title: 'Pop/流行' },
        { value: 'Dance/舞曲', title: 'Dance/舞曲' },
        { value: 'Country/鄉村', title: 'Country/鄉村' },
        { value: 'Hip-Hop/嘻哈', title: 'Hip-Hop/嘻哈' },
        { value: 'R&B/節奏藍調', title: 'R&B/節奏藍調' },
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
  margin: 0 1rem;
  @include mobile{
    display:inline-block;
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
  // width:calc(100% / 6);
  @include mobile{
    // width:100%;
    // flex-direction: row;
    // justify-content: center;
    // align-items:center;
    // height:auto;
    // padding: 0 2rem;
    img{
      width:90%;
    }
  }
}
</style>
