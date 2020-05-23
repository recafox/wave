<template>
	<div>
		<div
			class='footer-section p-4 d-flex flex-column align-items-end justify-content-start'>
			<div
				class='glitch font-l'
				data-text='聲波'>
				聲波
			</div>
			<p class='text-white text-left'>
				成立於2020年4月，聲波再遠都能傳到你耳邊。
			</p>
		</div>
		<div class='footer-section p-4'>
			<ul class='text-white font-m'>
				<li><a href='#'>instagram</a></li>
				<li><a href='#'>Facebook</a></li>
				<li><a href='#'>twitter</a></li>
				<li><a href='#'>github</a></li>
			</ul>
		</div>
		<div class='footer-section p-4'>
			<ul class='text-white font-m'>
				<li><a href='#'>聯絡我們</a></li>
				<li><a href='#'>門市位置</a></li>
				<li><a href='#'>招募訊息</a></li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {

    };
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/all.scss';


.footer-section{
    width:33.33333%;
    display: flex;
    justify-content: flex-end;
    @include mobile{
        width:98%;
    }
}
</style>
