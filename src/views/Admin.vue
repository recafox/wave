<template>
<!-- eslint-disable max-len -->
  <div class='outer-container'>
    <Navbar/>
    <AlertMsg></AlertMsg>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../Components/Admin-components/Admin-navbar.vue';
import AlertMsg from '../Components/AlertMsg.vue';

export default {
  name: 'Admin',
  components: {
    Navbar,
    AlertMsg,
  },
};
</script>


<style lang="scss" scoped>
@import '../assets/_Admin.scss';
.loader{
  min-width: 100vw;
  min-height: 100vh;
  background: black;
  transition: 0.7s;
  position:absolute;
  z-index: 50;
  top:0;
  left:0;
}

.loader.fade-out{
  opacity:0;
}

</style>
