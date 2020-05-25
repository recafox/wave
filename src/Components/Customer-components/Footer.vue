<template>
	<div>
		<div
			class='footer-section p-4 d-flex flex-column align-items-start justify-content-start'>
			<div
				class='glitch font-l'
				data-text='聲波'>
				聲波
			</div>
			<p class='text-white text-left font-m'>
				成立於2020年4月，聲波再遠都能傳到你耳邊。
			</p>
		</div>
		<div class='footer-section d-flex align-items-center'>
			<ul class='d-flex justify-content-around align-items-center w-100'>
				<li>
					<a
						class='font-l footer-link'
						href='#'>
						<font-awesome-icon :icon='["fab", "instagram"]' />
					</a>
				</li>
				<li>
					<a
						class='font-l footer-link'
						href='#'>
						<font-awesome-icon :icon='["fab", "facebook-square"]' />
					</a>
				</li>
				<li>
					<a
						class='font-l footer-link'
						href='#'>
						<font-awesome-icon :icon='["fab", "twitter"]' />
					</a>
				</li>
				<li>
					<a
						class='font-l footer-link'
						href='#'>
						<font-awesome-icon :icon='["fab", "github"]' />
					</a>
				</li>
			</ul>
		</div>
		<div class='footer-section p-4'>
			<ul class='text-white font-m'>
				<li>
					<a
						href='#'
						class='footer-link'>
						聯絡我們
					</a>
				</li>
				<li>
					<a
						href='#'
						class='footer-link'>
						門市位置
					</a>
				</li>
				<li>
					<a
						href='#'
						class='footer-link'>
						招募訊息
					</a>
				</li>
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
	@include mobile{
		width:98%;
	}
	.footer-link{
		color:white;
		&:hover{
			color:$success;
		}
	}
}
</style>
