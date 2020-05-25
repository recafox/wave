<template>
	<div class='coupon-content d-flex flex-column justify-content-center align-items-center' :class='{"fadeIn":fadeIn}'>
      <h2 class='title-primary font-l mb-3'>慶祝開幕！</h2>
      <p class="text-white font-m">
        結帳時輸入<span class='title-primary'>WAVEBIRTHDAY</span>，可享九折優惠！
      </p>
      <button
       class='btn btn-neon-success mt-10 font-m pl-3 pr-3'
       @click='fadeIn = false'>
        我知道了！
      </button>
		<button
      class='notice-btn border-0 position-absolute'
      @click='fadeIn = true'>
			<font-awesome-icon class='icon-l' icon='bell'/>
      <div class='notice-badge'>
        ！
      </div>
		</button>
	</div>
</template>
<script>
export default {
  name: 'Coupon',
  data() {
    return {
      fadeIn: false,
    };
  },
};
</script>
<style lang='scss'>
@import '../assets/all.scss';
.coupon-content{
  background: rgba(0, 0, 0, 0.8);
  width:100vw;
  height:100vh;
  position: fixed;
  z-index: 10;
  top:0;
  left:0;
  transform:translateX(100%);
  transition: 0.5s;
  .notice-btn{
    position:absolute;
    top:15%;
    left:calc(-5% - 100px);
  }
}

.coupon-content.fadeIn{
  transform: translateX(0);
}
</style>
