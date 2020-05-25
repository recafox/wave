<template lang="">
<!-- eslint-disable max-len -->
  <div>
    <Searchbar
      :genres='genres'
      :sortModes='sortModes'
      @sendQuery='getQuery'
      @startSearch='displayPage = false'
      @endSearch='displayPage = true'
      ref='child'>
      </Searchbar>
    <div
      class='container-fluid d-flex flex-column align-items-center' :style='displaySwitch'>
      <div class='col-sm-12 p-2 mt-4'>
        <h2 class='text-white text-center'>訂單管理</h2>
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
        <table class='table mb-4 mt-2 list-table'>
          <thead>
            <tr>
              <th
                class='text-center align-middle p-2 text-white'
                width='120'>
                <h5>日期</h5>
              </th>
              <th
                class='text-center align-middle p-2 text-white'
                width='120'>
                <h5>狀態</h5>
              </th>
              <th class='text-center align-middle p-2 text-white'>
                <h5>金額</h5>
              </th>
              <th
                class='text-left align-middle p-2 text-white'
                >
                <h5>顧客資訊</h5>
              </th>
              <th
                class='text-center align-middle p-2 text-white'
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for='(item) in orders'
              :key='item.id'
              class='text-white'>
              <td class='text-center align-middle p-1'>
                {{ item.create_at | converseTime }}
              </td>
              <td class='text-center align-middle p-1'>
                <div v-if='item.is_paid'>
                  <p class='text-success'>
                    <span>已付款</span><br>
                    <span>{{ item.paid_date | converseTime }}</span>
                  </p>
                </div>
                <div v-else>
                  <p class='text-gray'>尚未付款</p>
                </div>
              </td>
              <td class='text-center align-middle p-1'>
                $ {{ parseInt(item.total) }}
              </td>
              <td class='text-left p-1 align-middle'>
                <p v-if='item.user'>
                  {{ item.user.name }}
                </p>
                <p v-else>
                  無資料
                </p>
                <p v-if='item.user'>
                  {{ item.user.tel }}
                </p>
                <p v-else>
                  無資料
                </p>
                <p v-if='item.user'>
                  {{ item.user.email }}
                </p>
                <p v-else>無資料</p>
              </td>
              <td class='p-2 text-center'>
                <div>
                  <button
                    class='btn-border-white p-2 mr-sm-1' @click='openDetailModal(item)'>
                    詳細資訊
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

    <!-- --------Modal -->
      <!-- detail modal -->
      <div
        class="modal fade"
        id="detailModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="detailModal"
        aria-hidden="true"
        data-backdrop='static'>
        <div
          class="modal-dialog modal-lg"
          role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">訂單資訊</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click='closeDetailModal'>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class='container-fluid'>
                <div class='row d-flex flex-column'>
                  <div class='d-flex align-items-baseline'>
                    <p>
                      時間：{{ tempOrder.create_at | converseTime }}
                    </p>
                    <p class='ml-3'>付款狀態：
                      <span
                        v-if='tempOrder.is_paid'>
                        已付款{{ tempOrder.paid_date |converseTime }}
                      </span>
                      <span
                        v-else>
                        未付款
                      </span>
                    </p>
                  </div>
                  <div>
                    <h5 class='mb-1 font-weight-bold'>購買列表</h5>
                    <table class='table list-table'>
                      <thead>
                        <tr>
                          <th>商品名稱</th>
                          <th
                            class='text-center'
                            width='80'>
                            售價
                          </th>
                          <th
                            class='text-center'
                            width='80'>
                            數量
                          </th>
                          <th
                            class='text-center'
                            width='180'>
                            優惠券
                          </th>
                          <th
                            class='text-center'
                            width='80'>
                            總價
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for='item in tempOrder.products'
                          :key='item.id'>
                          <td>
                            <p>{{ item.product.title }}</p>
                          </td>
                          <td class='text-center'>
                            {{ item.product.price }}
                          </td>
                          <td class='text-center'>
                            <p>{{ item.qty }}</p>
                          </td>
                          <td class='text-center'>
                            <div v-if='item.coupon'>
                              <p>{{ item.coupon.title }}</p>
                              <p>{{ item.coupon.percent }}%</p>
                            </div>
                            <div v-else>
                                無
                            </div>
                          </td>
                          <td class='text-center'>
                            <p>{{ parseInt(item.final_total) }} 元</p>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td class='text-center font-weight-bold border-bottom'>總額
                          </td>
                          <td class='text-center border-bottom'>
                            <p v-if='!isEditing'>{{ tempOrder.total }} 元</p>
                            <p v-else></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-if='tempOrder.message'>
                      <h5 class='font-weight-bold'>留言</h5>
                      <div class='bg-gray-300 p-2 rounded-sm'>
                        {{ tempOrder.message }}
                      </div>
                    </div>
                    <div
                      v-if='tempOrder.user'
                      class='row mt-3'>
                      <h5 class='col-12 font-weight-bold'>顧客資訊</h5>
                      <div class='col-sm-6'>
                        <div>
                          姓名
                          <p
                            class='bg-gray-300 p-1'
                            v-if='!isEditing'>
                            {{ tempOrder.user.name }}
                          </p>
                          <input
                            class='p-1 d-block mt-1 mb-1 form-control'
                            v-else
                            type='text'
                            v-model='tempOrder.user.name'
                            required>
                        </div>
                        <div>
                          電話
                          <p
                            class='bg-gray-300 p-1'
                            v-if='!isEditing'>
                            {{ tempOrder.user.tel }}
                          </p>
                          <input
                            class='p-1 d-block mt-1 mb-1 form-control'
                            v-else
                            type='text'
                            v-model='tempOrder.user.tel'
                            required>
                        </div>
                      </div>
                      <div class='col-sm-6'>
                        <div>
                          信箱
                          <p
                            class='bg-gray-300 p-1'
                            v-if='!isEditing'>
                            {{ tempOrder.user.email }}
                          </p>
                          <input
                            class='p-1 d-block mt-1 mb-1 form-control'
                            v-else
                            type='text'
                            v-model='tempOrder.user.email'
                            required>
                        </div>
                        <div>
                          地址
                          <p
                            class='bg-gray-300 p-1'
                            v-if='!isEditing'>
                            {{ tempOrder.user.address }}
                          </p>
                          <input
                            class='p-1 d-block mt-1 mb-1 form-control'
                            v-else
                            type='text'
                            v-model='tempOrder.user.address'
                            required>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <p>無資料</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                v-if='!isEditing'
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal">
                關閉
              </button>
              <button
                v-if='!isEditing'
                type='button'
                class='btn btn-primary'
                @click='isEditing = true'>
                修改
              </button>
              <button
                v-if='isEditing'
                @click='editOrder'
                type='submit'
                class='btn btn-primary'>
                確認
              </button>
              <button
                v-if='isEditing'
                type='button'
                class='btn btn-secondary'
                @click='closeDetailModal'>
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
        <!-- detail modal end -->
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Searchbar from '../Search.vue';
import Pagination from '../Pagination.vue';

export default {
  name: 'Order',
  components: {
    Pagination,
    Searchbar,
  },
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isEditing: false,
      sortModes: [
        {
          value: 'create_at',
          title: '下單日期',
        },
        {
          value: 'total',
          title: '訂單金額',
        },
      ],
      genres: [
        {
          value: '已付款',
          title: '已付款',
        },
        {
          value: '尚未付款',
          title: '尚未付款',
        },
      ],
      displayPage: true,
      isSearching: false,
      query: '',
      today: null,
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
    editOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      vm.$http.put(api, { data: vm.tempOrder }).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'info');
          vm.changePage();
          vm.closeDetailModal();
        }
      });
    },
    openDetailModal(item) {
      const vm = this;
      vm.tempOrder = { ...item };
      $('#detailModal').modal('show');
    },
    closeDetailModal() {
      const vm = this;
      vm.isEditing = false;
      $('#detailModal').modal('hide');
    },
    updateCoupons() {
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      const vm = this;
      vm.isAdding = false;
      let httpMethod = 'post';
      if (!vm.isNew) {
        httpMethod = 'put';
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempOrder.id}`;
      }
      vm.$http[httpMethod](api, { data: vm.tempOrder }).then((response) => {
        vm.getCoupons();
        vm.$bus.$emit('message:push', response.data.message, 'info');
        $('#couponModal').modal('hide');
        vm.isEditing = false;
        vm.tempOrder = {};
      });
    },
    changePage(page = 1) {
      const vm = this;
      vm.pagination.current_page = page;
      vm.getOrders(page);
    },
    cancelSearching() {
      const vm = this;
      vm.isSearching = false;
      vm.changePage();
    },
    closePanel() {
      const vm = this;
      vm.$refs.child.closePanel();
    },
    sortBy(arr, mode, type) {
      switch (type) {
        case 'ascend':
          return arr.sort((a, b) => (a[mode] > b[mode] ? 1 : -1));
        case 'descend':
          return arr.sort((a, b) => (a[mode] < b[mode] ? 1 : -1));
        default:
          return new Error('nothing found');
      }
    },
    filterBy(arr, filterWord) {
      switch (filterWord) {
        case '已付款':
          return arr.filter((item) => item.is_paid === true);
        case '尚未付款':
          return arr.filter((item) => item.is_paid === false);
        default:
          return arr.filter((item) => {
            const name = item.user.name.toUpperCase();
            const tel = item.user.tel.toUpperCase();
            const filterKey = filterWord.toUpperCase();
            if (name.includes(filterKey || tel.includes(filterKey))) {
              return item;
            }
            return new Error('nothing found');
          });
      }
    },
    getQuery(q) {
      const vm = this;
      vm.isSearching = true;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${vm.pagination.current_page}`;
      vm.$http.get(api).then((response) => {
        const valueList = Object.values(response.data.orders);
        let filtered;
        let sorted;
        let type = '';
        let mode = '';
        switch (true) {
          case q.query.length > 0:
            filtered = vm.filterBy(valueList, q.query);
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
                    sorted = vm.sortBy(filtered, m.value, q.sortType);
                  }
                });
                vm.orders = sorted;
                vm.query = `${q.query}/${mode}/${type}`;
                break;
              case q.sortMode.length === 0 && q.sortType.length === 0:
                vm.orders = filtered;
                vm.query = `${q.query}`;
                break;
              default:
                vm.cancelSearching();
                break;
            }
            break;
          case q.query.length <= 0:
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
                vm.orders = sorted;
                vm.query = `${mode}/${type}`;
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
  },
  computed: {
    displaySwitch() {
      const vm = this;
      if (!vm.displayPage) {
        return 'display:none !important';
      }
      return '';
    },
  },
  mounted() {
    const vm = this;
    vm.getOrders();
  },
};
</script>
