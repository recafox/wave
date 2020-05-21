<template>
  <div class='nav-container d-flex align-content-center p-3 '>
    <button
      class='sign-out-btn ml-2 '
      @click='signout'>
      <font-awesome-icon icon='sign-out-alt'/>
    </button>
    <div class="link-group col-lg-8 d-flex justify-content-around align-items-center">
      <router-link to="/admin/products">
        <div class='navbar-link'>產品</div>
      </router-link>
      <router-link to="/admin/coupon">
        <div
          class='navbar-link'
          active-class="active">
          優惠券
        </div>
      </router-link>
      <router-link to="/admin/orderlist">
        <div
          class='navbar-link'
          active-class="active">
          訂單
        </div>
      </router-link>
    </div>
    <div class="drag">
      <div></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Navbar',
  data() {
    return {
      mobile: false,
    };
  },
  methods: {
    clickEvt() {
      const vm = this;
      vm.$emit('clickEvt');
    },
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}logout`;
      const vm = this;

      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },

  },
  mounted() {
    const vm = this;
    $(window).resize(() => {
      if (window.innerWidth < 414) {
        vm.mobile = true;
      }
    });
    $('.drag').click(() => {
      $('.drag').toggleClass('active');
      $('.nav-container').toggleClass('active');
    });
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/_Admin-navbar.scss';
</style>
