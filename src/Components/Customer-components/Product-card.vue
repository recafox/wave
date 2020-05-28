<template>
	<div class='d-flex flex-column align-items-center product-card'>
		<h5
			class='text-white mb-4 font-weight-bold font-r border-bottom pb-1'>
			{{ product.category }}
		</h5>
		<img
			:src='product.imageUrl'
			class='img-shadow'>
			<h5 class='text-white text-center mt-4 mb-1'>
			{{ product.title }}
		</h5>
			<p class='text-white text-center mb-1'>
			{{ product.unit }}
		</p>
		<p
			class='text-white text-center mb-2'>
			{{ product.content }}
		</p>
		<p
			class='text-white text-center font-m mb-2'>
			$ {{ product.price }}
		</p>
		<div class='product__linkgroup'>
			<router-link
				:to='{name:"Product_detail", params:{ id:product.id }}'
				>
				<button
					class='product__linkgroup__link btn btn-border-primary'>
					查看
				<font-awesome-icon class='ml-2' icon='arrow-right'/>
				</button>
			</router-link>
			<button
				class='product__linkgroup__link btn btn-border-success'
				@click.prevent='buyProduct(product)'>
				購買
				<font-awesome-icon icon='plus' class='ml-2'/>
			</button>
		</div>
	</div>
</template>
<script>
export default {
  name: 'Product-card',
  props: [
    'product',
  ],
  methods: {
    buyProduct(product) {
      const vm = this;
      vm.$emit('buyProduct', product);
    },
  },
};
</script>

<style lang='scss'>
</style>
