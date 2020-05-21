<template>
<!-- eslint-disable max-len -->
<div class='outer-container' :class='fade'>
  <my-canvas></my-canvas>
  <div class='container-fluid d-flex justify-content-center'>
    <div class='d-flex flex-column welcome-container align-items-center'>
      <div class="d-flex align-items-baseline welcome-header">
        <h1 class='text-white'>歡迎</h1>
        <h3 class='text-white'>想先做什麼？</h3>
      </div>
      <router-link
        class='welcome-link'
        to='/admin/products'
        @click='show=false'>
        產品
      </router-link>
      <router-link
        class='welcome-link'
        to="/admin/coupon">
        優惠券
      </router-link>
      <router-link
        class='welcome-link'
        to="/admin/orderlist">
        訂單
      </router-link>
      <a
        class='welcome-link'
        @click='signout'>
        登出
      </a>
    </div>
  </div>
</div>
</template>

<script>
import MyCanvas from '../Components/Canvas2.vue';

export default {
  name: 'Welcome',
  data() {
    return {
      show: true,
    };
  },
  components: {
    MyCanvas,
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.show = false;
          setTimeout(() => {
            vm.$router.push('/login');
          }, 3000);
        }
      });
    },
  },
  computed: {
    fade() {
      const vm = this;
      if (vm.show === false) {
        return 'fade';
      }
      return '';
    },
  },


};
</script>

<style lang="scss" scoped>
@import '../assets/all.scss';

.outer-container{
  transition:0.7s;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.outer-container.fade{
  opacity: 0;
}

.welcome-container{
  margin-top: 8%;
  position:absolute;
  z-index: 5;
  @include mobile{
    margin-top: 20%;
  }
  .welcome-header{
    letter-spacing: 0.3rem;
    h1{
        font-size: 72px;
    }
    @include mobile{
      h1{
        font-size: 2.5rem;
      }
      h3{
        font-size: 20px;
      }
    }
  }
  .welcome-link{
    font-size: 44px;
    width:90%;
    padding:0.5rem;
    text-align: center;
    margin-top: 2rem;
    border-radius: 10rem;
    @include neonBtn($primary);
    @include mobile{
        font-size: 32px;
    }
  }
}
</style>
