
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
        <h2 class='text-white text-center'>
          優惠券管理
        </h2>
        <h3 class='text-white text-center'>
          第{{ pagination.current_page }}頁</h3>
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
        <table class='table list-table mb-4 mt-2'>
          <thead>
            <tr>
              <th
                class='text-center align-middle p-2 text-white'
                width='120'>
                <h5>名稱</h5>
              </th>
              <th class='text-center align-middle p-2 text-white'>
                <h5>代碼</h5>
              </th>
              <th
                class='text-center align-middle p-2 text-white'
                width='120'>
                <h5>過期日</h5>
              </th>
              <th
                class='text-center align-middle p-2 text-white'
                width='120'>
                <h5>啟用狀態</h5>
              </th>
              <th
                class='text-center align-middle p-2 text-white'
                width='80'>
                <h5>數量</h5>
              </th>
              <th
                class='text-center align-middle p-2 text-white'
                width='80'>
                <h5>百分比</h5>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for='(item) in coupons'
              :key='item.id'
              class='text-white'>
              <td class='text-center align-middle p-1'>
                {{ item.title }}
              </td>
              <td class='text-center align-middle p-1'>
                {{ item.code }}
              </td>
              <td class='text-center align-middle p-1'>
                <div v-if='item.is_enabled===1'>
                    <p class='m-0'>{{ item.due_date }}</p>
                </div>
                <div v-if='item.is_enabled===0'>
                  <p class='text-gray m-0'>未啟用</p>
                </div>
              </td>
              <td class='text-center p-1 align-middle '>
                <span
                  v-if='item.is_enabled===1'
                  class='text-success border border-success p-2 rounded enable-status'>
                  啟用中
                </span>
                <span
                  v-if='item.is_enabled===0'
                  class='text-gray enable-status'>
                  未啟用
                </span>
              </td>
              <td class='text-center p-1 align-middle'>
                {{item.num}}
              </td>
              <td class='text-center p-1 align-middle '>
                {{item.percent}}%
              </td>
              <td class=' text-center p-2 align-middle'>
                <div class='d-flex flex-column'>
                  <button
                    class='btn btn-border-primary d-block mb-1' @click='openCouponModal(false, item)'>
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
      <div
        :class='addBtnSwitch'
        @click='openCouponModal(true)'>
      </div>
      <Pagination
        v-if='!isSearching'
        :pagination = pagination
        @turnTo='changePage'>
      </Pagination>
        <!-- --------Modal -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="couponModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false">
        <div
          class="modal-dialog  modal-lg"
          role="document">
          <div class="modal-content">
            <form @submit.prevent='updateCoupons'>
              <div class="modal-header">
                <h5 class="modal-title">新增優惠券</h5>
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
                  <div class='col-sm-6'>
                    <div class='form-group'>
                      <label for='title'>名稱</label>
                      <input
                        type='text'
                        class='form-control'
                        id='title'
                        placeholder='請輸入名稱'
                        v-model='tempCoupon.title'
                        required>
                    </div>
                    <div class='form-group'>
                      <label for='num'>數量</label>
                      <input
                        type='number'
                        class='form-control'
                        id='num'
                        v-model='tempCoupon.num'
                        required>
                    </div>
                    <div class='col-sm-8 form-group'>
                      <div
                        class='form-check'
                        style='padding-left:0px'>
                        <input
                          type='radio'
                          name='enable_status'
                          v-model='tempCoupon.is_enabled'
                          :value='1'
                          id='is_enabled'
                          required>
                        <label
                          class='form-check-label'
                          for='is_enabled'>
                          啟用
                        </label>
                        <input
                          class='ml-2'
                          type='radio'
                          name='enable_status'
                          v-model='tempCoupon.is_enabled'
                          :value='0'
                          id='not_enabled'>
                        <label
                          class='form-check-label'
                          for='not_enabled'>
                          不啟用
                        </label>
                      </div>
                    </div>
                    <div
                      v-if='tempCoupon.is_enabled===1'
                      class='form-group'>
                      <label for='due_date'>到期日</label>
                      <input
                        type='date'
                        class='form-control'
                        id='due_date'
                        v-model='tempCoupon.due_date'
                        required>
                    </div>
                  </div>
                  <div class='col-sm-6'>
                    <div class='form-group'>
                      <label for='code'>代碼</label>
                      <input
                        type='text'
                        class='form-control'
                        id='code'
                        placeholder='請輸入代碼'
                        v-model='tempCoupon.code'
                        required>
                    </div>
                    <div class='form-group'>
                      <label for='percent'>折扣百分比</label>
                      <input
                        type='number'
                        class='form-control'
                        id='percent'
                        v-model='tempCoupon.percent'
                        required>
                    </div>
                  </div>
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
      <!-- Delete Modal -->
      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true">
        <div
          class="modal-dialog"
          role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                刪除優惠券：{{ tempCoupon.title }}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              確定要刪除優惠券：{{ tempCoupon.title }}嗎？
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
                @click='deleteCoupon'>
                確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Searchbar from '../Search.vue';
import Pagination from '../Pagination.vue';

export default {
  name: 'Coupon',
  components: {
    Pagination,
    Searchbar,
  },
  data() {
    return {
      coupons: [],
      isNew: true,
      tempCoupon: {},
      pagination: {},
      isAdding: false,
      sortModes: [
        { value: 'due_date', title: '到期日' },
        { value: 'num', title: '數量' },
        { value: 'percent', title: '百分比' },
      ],
      genres: [
        { value: '未啟用', title: '未啟用' },
        { value: '已啟用', title: '已啟用' },
      ],
      displayPage: true,
      isSearching: false,
      query: '',
      today: null,


    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.$http.get(api).then((response) => {
        const valueList = Object.values(response.data.coupons);
        vm.coupons = valueList;
        vm.pagination = response.data.pagination;

        $('html, body').animate({
          scrollTop: 0,
        }, 500);
      });
    },
    openCouponModal(status, item) {
      const vm = this;
      vm.isNew = status;
      if (!vm.isNew) {
        vm.tempCoupon = { ...item };
      } else {
        vm.tempCoupon = {};
        vm.isAdding = true;
      }

      $('#couponModal').modal('show');
    },

    updateCoupons() {
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      const vm = this;
      vm.isAdding = false;
      let httpMethod = 'post';
      if (!vm.isNew) {
        httpMethod = 'put';
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        vm.getCoupons();
        vm.$bus.$emit('message:push', response.data.message, 'info');
        $('#couponModal').modal('hide');
      });
    },
    openDeleteModal(item) {
      const vm = this;
      vm.tempCoupon = { ...item };
      $('#deleteModal').modal('show');
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.$http.delete(api).then((response) => {
        vm.$bus.$emit('message:push', response.data.message, 'info');
        vm.getCoupons();
        $('#deleteModal').modal('hide');
      });
    },
    changePage(page) {
      const vm = this;
      vm.pagination.current_page = page;
      vm.getCoupons(page);
    },
    cancelSearching() {
      const vm = this;
      vm.isSearching = false;
      vm.getCoupons();
    },
    closePanel() {
      const vm = this;
      vm.$refs.child.closePanel();
    },
    sortBy(arr, value, type) {
      if (value === 'due_date') {
        switch (type) {
          case 'ascend':
            return arr.sort((a, b) => {
              const aTime = new Date(a.due_date);
              const bTime = new Date(b.due_date);
              const aStr = aTime.getTime();
              const bStr = bTime.getTime();
              return aStr > bStr ? 1 : -1;
            });

          case 'descend':
            return arr.sort((a, b) => {
              const aTime = new Date(a.due_date);
              const bTime = new Date(b.due_date);
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
            return arr.sort((a, b) => (a[value] > b[value] ? 1 : -1));
          case 'descend':
            return arr.sort((a, b) => (a[value] < b[value] ? 1 : -1));
          default:
            return new Error('nothing found');
        }
      }
    },
    filterBy(arr, filterWord) {
      switch (filterWord) {
        case '已啟用':
          return arr.filter((item) => item.is_enabled === 1);
        case '未啟用':
          return arr.filter((item) => item.is_enabled === 0);
        default:
          return arr.filter((item) => {
            const title = item.title.toUpperCase();
            const code = item.code.toUpperCase();
            const filterKey = filterWord.toUpperCase();
            if (title.includes(filterKey) || code.includes(filterKey)) {
              return item;
            }
            return new Error('nothing found');
          });
      }
    },
    getQuery(q) {
      const vm = this;
      vm.isSearching = true;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${vm.pagination.current_page}`;
      vm.$http.get(api).then((response) => {
        const valueList = Object.values(response.data.coupons);
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
                vm.coupons = sorted;
                vm.query = `${q.query}/${mode}/${type}`;
                break;
              case q.sortMode.length === 0 && q.sortType.length === 0:
                vm.coupons = filtered;
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
                vm.coupons = sorted;
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
    addBtnSwitch() {
      const vm = this;
      if (vm.isAdding) {
        return 'add-btn active';
      }
      return 'add-btn';
    },
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
    vm.getCoupons();
    const date = new Date();
    const timestamp = date.getTime();
    vm.today = timestamp;
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/all.scss';
.add-btn{
  @include sizing(100px);
  @include mobile{
    transform: scale(0.7);
    right: 0;
    top: 85%;
  }
  background:white;
  position: fixed;
  z-index: 5;
  top:80%;
  right:3%;
  border-radius: 50%;
  transition:0.3s;
  &:hover{
    cursor: pointer;
    transition:0.1s;
    background-color: $primary;
    &::before, &::after{
      background-color: white;
    }
    &::before{
      transform:rotate(135deg);
    }
    &::after{
      top:45%;
      left:25%;
      transform:rotate(45deg);
    }
  }
  &::before, &::after{
    content:"";
    display: block;
    background: black;
    height:10px;
    width:50%;
    transform: translateX(-50%) translateY(-50%);
    position:absolute;
  }
  &::before{
    top:45%;
    left:25%;
    transform:rotate(90deg);
  }
  &::after{
    top:50%;
    left:50%;
  }
}

.add-btn.active{
  background-color: $primary;
  &::before, &::after{
    background-color: white;
  }
  &::before{
    transform:rotate(135deg);
  }
  &::after{
    top:45%;
    left:25%;
    transform:rotate(45deg);
  }
}


.list-table .enable-status{
  @include mobile{
    writing-mode: vertical-lr;
  }
}


th{
  letter-spacing: 0.3rem;
}
</style>
