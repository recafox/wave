<template>
  <div class='d-flex flex-column'>
    <h4 class='text-center align-self-center title-primary mb-3'>其他商品</h4>
    <div class='d-flex flex-wrap p-2 justify-content-around'>
      <router-link
        :to='{name:"Product_detail", params:{id:item.id}}'
        class='col-sm-2 col-5 d-flex flex-column align-items-center pt-3 mb-4 ml-1 mr-1 product-card'
        style='height:300px'
        v-for='item in allProducts.slice(10, 20)'
				:key='item.title'>
				<img
					class='w-75'
					:src='item.imageUrl'>
				<div class='text-white d-flex flex-column align-items-center mt-2'>
					<p class='font-weight-bold text-center'>{{ item.title }}</p>
					<p class='text-center'>{{ item.unit }}</p>
				</div>
      </router-link>
    </div>
		<router-link
			class='title-primary font-m align-self-end m-3'
			:to='{name:"Custom_products"}'>
			...查看更多
		</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home-NewItem',
  props: [
    'allProducts',
  ],
  data() {
    return {

    };
  },
};
</script>
