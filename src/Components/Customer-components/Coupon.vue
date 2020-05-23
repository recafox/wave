<template>
	<div class='border border-warning p-3 text-white rounded'>
		<h2 class='text-warning font-l mb-3 font-italic'>優惠！</h2>
		<div class='bg-warning p-3 font-m rounded'>
			<p>現在輸入WAVEBIRTHDAY，全館享九折優惠！</p>
		</div>
	</div>
</template>
<script>
export default {
  name: 'Coupon',
  data() {
    return {

    };
  },
};
</script>
<style lang='scss'>
@import '../../assets/all.scss';
.coupon-btn{
	@include sizing(50px);

}

</style>
