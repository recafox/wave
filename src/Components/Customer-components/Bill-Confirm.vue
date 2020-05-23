<template>
<!-- eslint-disable max-len -->
  <div class='container-fluid d-flex flex-column align-items-center mt-4 p-3' v-if='order'>
      <h3 class='title-primary mb-2'>訂單資訊</h3>
      <table class='col-sm-8 text-white table mb-4'>
        <tbody>
          <tr
            v-for='item in order.products'
            :key='item.id'>
            <td>
              <img
                :src='item.product.imageUrl'
                class='img-responsive'>
            </td>
            <td class='align-middle'>
              <p>
                {{ item.product.title }}
              </p>
              <p>
                單價: {{ item.product.price }}
              </p>
              <p>
                {{ item.qty }} 個
              </p>
              <p>
                總價: {{ parseInt(item.final_total) }} 元
              </p>
              <p>
                v-if='item.coupon'
                class='text-info font-s'>
                已套用優惠: {{ item.coupon.code }}
              </p>
            </td>
          </tr>
          <tr>
            <td>訂單總計</td>
            <td>$ {{ parseInt(order.total) }}</td>
          </tr>
        </tbody>
      </table>
      <h5 class='text-white text-center mb-2'>留言</h5>
      <div class='col-sm-8 rounded border border-white text-white p-2 mb-4'>
        <p>{{ order.message }}</p>
      </div>
      <h5 class='text-white text-center mb-2'>顧客資訊</h5>
      <table class='col-sm-8 text-white table mb-4'>
        <tr>
          <td>姓名</td>
          <td>{{ order.user.name }}</td>
        </tr>
        <tr>
          <td>電話</td>
          <td>{{ order.user.tel }}</td>
        </tr>
        <tr>
          <td>信箱</td>
          <td>{{ order.user.email }}</td>
        </tr>
        <tr>
          <td>地址</td>
          <td>{{order.user.address}}</td>
        </tr>
      </table>
      <h5 class='text-white text-center mb-2'>以上都確認無誤？</h5>
      <button
        class='btn btn-lg btn-danger'
        v-if='!billPaid'
        @click='payBill'>
        確認付款
      </button>
      <router-link to='/'>
        <button
          class='btn btn-lg btn-success'
          v-if='billPaid'>
          返回首頁
        </button>
      </router-link>

  </div>
</template>
<script>
export default {
  name: 'Bill-Confirm',
  data() {
    return {
      order: null,
      billPaid: false,
    };
  },
  methods: {
    getBill(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      vm.$http.get(api).then((response) => {
        vm.order = response.data.order;
      });
    },
    payBill() {
      const vm = this;
      const { id } = vm.order;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'info');
          vm.billPaid = true;
        }
      });
    },
  },
  mounted() {
    const vm = this;
    const { id } = vm.$route.params;
    vm.getBill(id);
  },
};
</script>
