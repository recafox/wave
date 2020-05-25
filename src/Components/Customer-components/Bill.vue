<template>
<!-- eslint-disable max-len -->
  <div class='container-fluid d-flex flex-column align-items-center'>
    <div class='col-sm-8 cart'>
      <h3 class='title-primary align-self-start ml-3 m-top'>
        購物列表
      </h3>
        <table class='table table-borderless text-white mt-1'>
          <tbody>
            <tr v-for='item in cart' :key='item.id'>
              <td class='border-bottom'>
                <img
                  class='img-responsive'
                  :src='item.product.imageUrl'>
              </td>
              <td class='align-middle border-bottom'>
                <p>{{ item.product.title }}</p>
                <p>$ {{ item.product.price }}</p>
                <p>數量: {{ item.qty }} 個</p>
                <p>總價: $ {{ item.total }}</p>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class='align-middle font-m text-right'>
                <p v-if='total!==final_total' class='text-line-through text-gray'>
                  ${{ total }}
                </p>
                <p>$ {{ parseInt(final_total) }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <h5 class='text-white text-center'>有優惠碼？</h5>
        <div
          class='form-group row d-flex justify-content-center mt-2' v-if='total===final_total'>
          <input
            class='bg-transparent form-control col-8 mr-3 caret-white text-white'
            placeholder="輸入您的優惠碼"
            v-model='couponCode'>
          <button
            class='btn btn-border-primary'
            @click='sendCoupon'>
            使用
          </button>
        </div>
        <p
          v-else
          class='text-info font-m text-center'>
          已套用過優惠
        </p>
        <validation-observer
          ref='form'
          v-slot='{ invalid }'>
          <form
            class='text-white d-flex flex-column mt-4'
            @submit='sendBill'>
            <div class='row'>
              <div class='form-group col-sm-6'>
                <label for='name'>姓名 <span class='font-s'>必填</span></label>
                <validation-provider
                  rules="required"
                  v-slot="{ errors }">
                  <input
                    class='form-control caret-white text-white border-white' type='text'
                    v-model='user.name'
                    id='name'>
                  <span
                    v-if='errors'
                    class='text-danger'>
                    {{ errors[0] }}
                  </span>
                </validation-provider>
              </div>
              <div class='form-group col-sm-6'>
                  <label for='tel'>手機 <span class='font-s'>必填</span></label>
                  <validation-provider
                    rules="numeric|required"
                    v-slot="{ errors }">
                    <input
                      class='form-control caret-white text-white border-white' type='tel'
                      v-model='user.tel'
                      id='tel'>
                    <span
                      v-if='errors'
                      class='text-danger'>
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
              </div>
            </div>
            <div class='form-group'>
              <label for='address'>地址 <span class='font-s'>必填</span></label>
                  <validation-provider
                    rules="required"
                    class='col-sm-12 pl-0 pr-0'>
                    <select
                      v-model='addressInput.city'
                      class='form-control'
                    >
                      <option value='' selected>
                        請選擇縣市
                      </option>
                      <option
                        v-for='city in allCity'
                        :key='city.CityName'
                        :value='city.CityName'>
                        {{ city.CityName }}
                      </option>
                    </select>
                  </validation-provider>
                <div class='form-group'>
                  <validation-provider
                    rules="required"
                    class='col-sm-12 pr-0'>
                    <select
                      v-model='addressInput.area'
                      v-if='addressInput.city'
                      class='form-control'
                    >
                      <option value='' selected>
                        請選擇行政區
                      </option>
                      <option
                        v-for='area in allCity.find(city => city.CityName === addressInput.city).AreaList'
                        :key='area.AreaName'
                        :value='area.AreaName'>
                        {{ area.AreaName }}
                      </option>
                    </select>
                    <select
                      v-else
                      class='form-control'>
                      <option value='' selected>
                        請選擇行政區
                      </option>
                    </select>
                  </validation-provider>
                </div>
                <input
                  type='text'
                  v-model='addressInput.place'
                  class='form-control caret-white text-white mt-2'
                  required
                  placeholder="請輸入地址">
            </div>
            <div class='form-group'>
              <validation-provider
                rules="email|required"
                v-slot='{ errors }'>
                <label for='email'>
                  電子信箱
                  <span class='font-s'>必填</span>
                </label>
                <input
                  type='text'
                  v-model='user.email'
                  class='form-control caret-white text-white'
                  id='email'>
                <span
                  class='text-danger'>
                  {{ errors[0] }}
                </span>
              </validation-provider>
            </div>
            <div class='form-group'>
              <label for='msg'>留言</label>
              <textarea
                v-model='message'
                class='text-white bg-transparent border border-white rounded w-100'
                id='msg'
                style='height:100px'>
              </textarea>
            </div>
            <button
              type='submit'
              :disabled="invalid"
              class='btn btn-lg btn-primary align-self-end'
              style='cursor:not-allowed'>
              確認送出
            </button>
          </form>
        </validation-observer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Custom_bill',
  data() {
    return {
      cart: {},
      total: 0,
      final_total: 0,
      couponCode: '',
      couponUsed: false,
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      addressInput: {
        city: '',
        area: '',
        place: '',
      },
      message: '',
      allCity: [],

    };
  },
  methods: {
    sendBill() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const userObj = {
        name: vm.user.name,
        email: vm.user.email,
        tel: vm.user.tel,
        address: vm.addressInput.city + vm.addressInput.area + vm.addressInput.place,
      };
      vm.$http.post(api, { data: { user: userObj, message: vm.message } }).then((response) => {
        if (response.data.success) {
          vm.$router.push({ name: 'Customer_billConfirm', params: { id: response.data.orderId } });
        }
      });
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
    sendCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const obj = { code: vm.couponCode };
      vm.$http.post(api, { data: obj }).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'info');
          vm.couponCode = '';
          vm.getCart();
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
    getArea() {
      const vm = this;
      vm.$http.get('cityName.json').then((response) => {
        vm.allCity = response.data;
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    vm.$bus.$emit('home-navbarClose');
    next();
  },
  mounted() {
    const vm = this;
    vm.getCart();
    vm.getArea();
  },
};
</script>
