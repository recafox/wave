<template >
	<div class='banner_container'>
		<div
			class='glitch'
			data-text='WAVE'>
			WAVE
		</div>
		<h1 class='text-white'>聲波唱片行</h1>
	</div>
</template>

<script>

export default {
  name: 'Banner',
  data() {
    return {

    };
  },
};
</script>
<style lang="scss"  scoped>
@import '../../assets/all.scss';
.banner_container{
	position:absolute;
	top:6%;
	left:50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	.glitch{
		font-size: 7rem;
		@include mobile{
			font-size: 5rem;
		}
	}
	@include mobile{
		top:5%;
	}
	h2{
		font-size: 2.5rem;
		@include mobile{
			font-size: 2rem;
		}
	}
}
</style>
