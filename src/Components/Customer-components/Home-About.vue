<template>
	<div class='about-container'>
		<div
			class='glitch font-l'
			data-text='關於聲波'>
			關於聲波
		</div>
		<p class='text-white'>
			成立於2020年4月，聲波再遠都能傳到你耳邊。
		</p>
	</div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
    };
  },
};
</script>
<style lang='scss' scoped>
.about-container{
	height:100vh;
	margin-top: 200px;
	h2{
		font-size: 3rem;
		border-bottom:1px solid white;
	}
	p{
		font-size: 1.5rem;
	}
}
</style>
