
<template lang="">
<!-- eslint-disable max-len -->
  <div>
    <Searchbar
      :genres='genres'
      :sortModes='sortModes'
      @sendQuery='getQuery'
      @endSearch='displayPage = true'
      @startSearch='displayPage = false'
      ref='child'>
    </Searchbar>
    <div
      :class='addBtnSwitch'
      @click='openProductModal(true)'>
    </div>
    <div
      class='container-fluid d-flex flex-column align-items-center position-relative'
      id='productpage'
      :style='searchingSwitch'>
      <div class='p-2 mt-4'>
        <h2 class='text-white text-center'>產品管理</h2>
        <h3 class='text-white text-center'>
          第{{ pagination.current_page }}頁
        </h3>
        <div
          v-if='isSearching'
          class='d-flex'>
          <h5 class='text-white m-0'>
            搜尋:{{ query }}
          </h5>
          <button
            @click='cancelSearching'
            class='btn-border-info ml-2'>
            取消搜尋
          </button>
        </div>
      </div>
      <div class='table-responsive-lg col-sm-12'>
        <table class='table list-table mb-4 mt-2 col-12'>
          <thead>
            <tr>
              <th
                class='text-center p-2 text-white'
                width='120'>
                <h5>商品圖</h5>
              </th>
              <th class='text-center p-2 text-white'>
                <h5>商品名稱</h5>
              </th>
              <th class='text-center p-2 text-white'>
                <h5>歌手/樂團</h5>
              </th>
              <th
                class='text-center p-2 text-white'
                width='120'>
                <h5>發行日期</h5>
              </th>
              <th
                class='text-center p-2 text-white'
                width='80'>
                <h5>原價</h5>
              </th>
              <th
                class='text-center p-2 text-white'
                width='80'>
                <h5>售價</h5>
              </th>
              <th
                class='text-center p-2 text-white'
                width='100'>
                <h5>分類</h5>
              </th>
              <th class='text-center p-2 text-white'>
                <h5>商品描述</h5>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for='(item) in products'
              :key='item.title'
              class='text-white'>
              <td class='text-center p-1'>
                <img
                  :src='item.imageUrl'
                  v-if='item.imageUrl'
                  class='product-img'>
                <span v-else>無圖片</span>
              </td>
              <td
                class='text-center p-1'>
                {{ item.title }}
                <p
                  class='text-info'
                  v-if='item.is_enabled'>
                  啟用中
                </p>
              </td>
              <td class='text-center p-1'>
                {{ item.unit }}
              </td>
              <td class='text-center p-1 '>
                {{ item.content }}
              </td>
              <td class='text-center p-1'>
                $ {{ item.origin_price }}
              </td>
              <td class='text-center p-1'>
                <span v-if='!item.price'>無</span>
                <span v-else>$ {{ item.price }}</span>
              </td>
              <td class='text-center p-1'>
                {{ item.category }}
              </td>
              <td class='text-center p-1'>
                <button
                  class='btn btn-border-white'
                  @click='openDescription(item)'>
                  查看商品描述
                </button>
              </td>
              <td class=' text-center p-2 align-middle'>
                <div class='d-flex flex-column'>
                  <button
                    class='btn btn-border-primary d-block mb-1' @click='openProductModal(false, item)'>
                    編輯
                  </button>
                  <button
                    class='btn btn-border-danger d-block mt-1'
                    @click.prevent='openDeleteModal(item)'>
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if='!isSearching'
        :pagination = pagination
        @turnTo='changePage'>
      </Pagination>
    </div>

              <!-- --------Modal -->
              <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false">
      <div
        class="modal-dialog  modal-lg"
        role="document">
        <div class="modal-content">
          <form @submit.prevent='updateProducts'>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">新增商品</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click='isAdding = false'>
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class='row'>
                <div class='col-sm-4'>
                  <div class='form-group'>
                    <label for='image'>圖片網址</label>
                    <input
                      type='text'
                      class='form-control'
                      id='image'
                      placeholder='請輸入圖片連結'
                      v-model='tempProduct.imageUrl'>
                  </div>
                  <div class='form-group'>
                    <label for='customFile'>上傳圖片</label>
                    <input
                      type='file'
                      id='customFile'
                      class='form-control'
                      ref='files'
                      name="file-to-upload"
                      @change='uploadImg'>
                  </div>
                  <img
                    class='img-fluid'
                    :src='tempProduct.imageUrl'>
                </div>
                <div class='col-sm-8'>
                  <div class='form-group'>
                    <label for='title'>商品名稱</label>
                    <input
                      type='text'
                      class='form-control'
                      id='title'
                      placeholder='請輸入名稱'
                      v-model='tempProduct.title'
                      required>
                  </div>
                  <div class='form-group'>
                    <label for='artist'>歌手/樂團名稱</label>
                    <input
                      type='text'
                      class='form-control'
                      id='artist'
                      placeholder='請輸入名稱'
                      v-model='tempProduct.unit'
                      required>
                  </div>
                  <div class='form-group'>
                    <label for='date'>發行日期</label>
                    <input
                      type='date'
                      class='form-control'
                      id='date'
                      v-model='tempProduct.content'>
                  </div>
                  <div class='form-group'>
                    <label for='category'>分類</label>
                    <select
                      id='category'
                      class='form-control'
                      v-model='tempProduct.category'>
                      <option
                        v-for='item in genres'
                        :value='item.title'
                        :key='item.title'>
                        {{ item.title }}
                      </option>
                    </select>
                  </div>
                  <div class='form-group'>
                    <label for='orgin-price'>原價</label>
                    <input
                      type='text'
                      class='form-control'
                      id='orgin-price'
                      placeholder='請輸入原價'
                      v-model='tempProduct.origin_price'>
                  </div>
                  <div class='form-group'>
                    <label for='sale-price'>售價</label>
                    <input
                      type='text'
                      class='form-control'
                      id='sale-price'
                      placeholder='請輸入售價'
                      v-model='tempProduct.price'>
                  </div>
                  <div class='col-sm-8 form-group'>
                    <div class='form-check' style='padding-left:0px'>
                      <input
                        type='radio'
                        class='d-inline-block ml-2'
                        name='enable_status'
                        v-model='tempProduct.is_enabled'
                        :value='1'
                        id='is_enabled'
                        required>
                      <label
                        class='form-check-label'
                        for='is_enabled'>
                        啟用
                      </label>
                      <input
                        type='radio'
                        name='enable_status'
                        v-model='tempProduct.is_enabled'
                        :value='0'
                        id='not_enabled'
                        class='d-inline-block ml-2'>
                      <label
                        class='form-check-label'
                        for='not_enabled'>
                        無
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class='form-group col-12'>
                <label for='description'>商品描述</label>
                <textarea
                  type='text'
                  id='description'
                  class=' form-control'
                  style='height:300px;'
                  placeholder='請輸入商品描述'
                  v-model='tempProduct.description'/>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click='isAdding=false'>
                取消
              </button>
              <button
                type="submit"
                class="btn btn-primary">
                確定
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
          <!-- --------Modal -->
          <!-- Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div
        class="modal-dialog"
        role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              刪除商品：{{ tempProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">
                &times;
              </span>
            </button>
          </div>
          <div class="modal-body">
            確定要刪除商品：{{ tempProduct.title }}嗎？
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click='deleteProduct'>
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
                      <!-- Modal -->
    <div
      class="modal fade"
      id="descriptionModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel">
              商品描述 - {{ tempProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style='white-space: pre-line'>
              {{ tempProduct.description }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
          <!-- modal ends -->
  </div>
</template>

<script>
import $ from 'jquery';
import Searchbar from '../Search.vue';
import Pagination from '../Pagination.vue';

export default {
  name: 'Product',
  components: {
    Pagination,
    Searchbar,
  },
  props: [
    'isMobile',
  ],
  data() {
    return {
      products: [],
      isNew: true,
      isAdding: false,
      tempProduct: {},
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
        { value: 'is_enabled', title: '啟用狀態' },
      ],
      pagination: {},
      query: '',
      isSearching: false,
      displayPage: true,
    };
  },
  methods: {
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
      vm.isSearching = true;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`;
      vm.$http.get(api).then((response) => {
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
                break;
              case q.sortMode === undefined && q.sortType === undefined:
                vm.products = filtered;
                vm.query = q.query;
                break;
              default:
                vm.$bus.$emit('message:push', '請設定排序模式或輸入搜索詞', 'warning');
                vm.cancelSearching();
                break;
            }
            break;
          case q.query.length === 0:
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
      vm.getProducts();
    },
    closePanel() {
      const vm = this;
      vm.$refs.child.closePanel();
    },
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openProductModal(status, item) {
      const vm = this;
      vm.isNew = status;
      if (!vm.isNew) {
        vm.tempProduct = { ...item };
      } else {
        vm.tempProduct = {};
        vm.isAdding = true;
      }
      $('#productModal').modal('show');
    },
    openDescription(item) {
      const vm = this;
      vm.isNew = false;
      vm.tempProduct = item;
      $('#descriptionModal').modal('show');
    },
    uploadImg() {
      const vm = this;
      const file = vm.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.$http
        .post(api, formData, {
          header: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          }
        });
    },
    updateProducts() {
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      const vm = this;
      vm.isAdding = false;
      let httpMethod = 'post';
      if (!vm.isNew) {
        httpMethod = 'put';
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        vm.$bus.$emit('message:push', response.data.message, 'info');
        vm.changePage(vm.pagination.current_page);
        $('#productModal').modal('hide');
        vm.tempProduct = {};
      });
    },
    openDeleteModal(item) {
      const vm = this;
      $('#deleteModal').modal('show');
      vm.tempProduct = item;
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api).then((response) => {
        vm.$bus.$emit('message:push', response.data.message, 'info');
        vm.changePage();
        $('#deleteModal').modal('hide');
      });
    },
    changePage(page = 1) {
      const vm = this;
      vm.pagination.current_page = page;
      vm.getProducts(page);
      $('html, body').animate(
        {
          scrollTop: 0,
        },
        500,
      );
    },
  },
  computed: {
    addBtnSwitch() {
      const vm = this;
      if (vm.isAdding) {
        return 'add-btn active';
      }
      return 'add-btn';
    },
    searchingSwitch() {
      const vm = this;
      if (!vm.displayPage) {
        return 'display:none !important';
      }
      return '';
    },
  },
  mounted() {
    const vm = this;
    vm.changePage();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/_Admin-product.scss";
th {
  letter-spacing: 0.3rem;
}
</style>
