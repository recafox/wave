<template>
  <div>
    <my-canvas></my-canvas>
    <navbar
        @navOpen="displayPage=false"
        @navClose="displayPage=true"></navbar>
    <coupon></coupon>
    <alert-msg></alert-msg>
	<router-view class='content-container' :class="containerSwitch"></router-view>
    <Footer class="mt-10 footer" :class="footerSwitch"></Footer>
  </div>
</template>

<script>
import MyCanvas from '../Components/Canvas3.vue';
import Coupon from '../Components/Coupon.vue';
import Navbar from '../Components/Customer-components/Navbar.vue';
import Footer from '../Components/Customer-components/Footer.vue';
import AlertMsg from '../Components/AlertMsg.vue';

export default {
  name: 'Home',
  components: {
    AlertMsg,
    Coupon,
    MyCanvas,
    Navbar,
    Footer,
  },
  data() {
    return {
      displayPage: true,
    };
  },
  computed: {
    containerSwitch() {
      const vm = this;
      if (vm.displayPage === true) {
        return '';
      }
      return '_stop-scrolling';
    },
    footerSwitch() {
      const vm = this;
      if (vm.displayPage === true) {
        return '';
      }
      return 'fade';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/all.scss";

.content-container._stop-scrolling {
  display: none;
}

.content-container {
  width: 100%;
  position: relative;
  height: auto;
}

.footer {
  display: flex;
  position: absolute;
  width: 100%;
  height: 200px;
  left: 0;
  right: 0;
  margin-top: 100px;
  @include mobile {
    display: block;
  }
}
.footer.fade {
  display: none;
}
</style>
