<template>
<!-- eslint-disable max-len -->
  <div class='outer-container'>
    <my-canvas></my-canvas>
    <router-link to='/'>
      <button class="btn homepage-btn">回到首頁</button>
    </router-link>
    <div class='login-container col-sm-6'>
      <form @submit='signin'>
          <input
            type="email"
            class='form-control mt-5'
            v-model='user.username'
            placeholder="請輸入帳號">
          <input
            type="password"
            class='form-control mt-5'
            v-model='user.password'
            placeholder="請輸入密碼"
            required>
          <div class="mt-5 d-flex justify-content-around">
            <button class="btn border border-white text-white login-btn">
              忘記密碼？
            </button>
            <button
              type='button'
              class="btn border border-white text-white login-btn"
              @click.prevent='signin'>
              登入
            </button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import MyCanvas from '../Components/Canvas.vue';

export default {
  components: {
    MyCanvas,

  },
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}admin/signin`;
      const vm = this;
      const container = document.querySelector('.outer-container');
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          container.classList.add('fade');
          setTimeout(() => {
            vm.$router.push('/welcome');
          }, 1000);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_Login.scss';

</style>
