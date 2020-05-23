<template>
<!-- eslint-disable max-len -->
	<div style='margin-top:200px' class='row d-flex flex-md-row flex-sm-column'>
    <div class='col-sm-4 d-md-flex flex-column'>
      <h3 class='title-primary text-right mb-3'>最新發行</h3>
      <router-link
        :to='{name:"Product_detail", params:{ id:item.id }}'
        v-for='item in newest.slice(0,1)'
        :key='item.id'
        class='product-card main h-75 mt-4 position-relative d-flex flex-column align-items-center'
        >
        <h5
          class='text-white mb-4 font-weight-bold border-bottom pb-1'>
          本月主打
        </h5>
        <img
          :src='item.imageUrl'
          class='img-shadow'>
        <h4 class='text-white text-center mt-4 mb-2'>
          {{ item.title }}
        </h4>
        <p class='text-white text-center mb-2'>
          {{ item.unit }}
        </p>
        <p class='text-white text-center mb-4'>
          {{ item.content }}
        </p>
        <p class='text-white text-center font-m mb-4'>
          $ {{ item.price }}
        </p>
        <div class='d-flex'>
          <router-link
            :to='{name:"Product_detail", params:{ id:item.id }}'
            class='mr-2'>
            <button
              class='btn-border-primary btn d-flex pt-1 pb-1 pl-2 pr-2 align-items-center'>
              查看
              <font-awesome-icon class='ml-2' icon='arrow-right'/>
            </button>
          </router-link>
          <button
            class='btn-border-success btn ml-2 d-flex pt-1 pb-1 pl-2 pr-2 align-items-center'
            @click.prevent='buyItem(item)'>
            購買
            <font-awesome-icon icon='plus' class='ml-2'/>
          </button>
        </div>
        <router-link
          :to='{name:"Custom_products"}'
          class='btn-neon-info mt-4 btn mr-2 position-absolute bottom-0 mb-3 w-75'>
          看更多商品
        </router-link>
      </router-link>
    </div>
    <h4 class='title-primary font-m d-sm-none mr-5 mb-4 font-italic'>右滑看更多</h4>
		<div class='col-sm-8 d-flex flex-column outer-scroll'>
			<div class='inner-scroll'>
				<div class='row d-flex inner-item'>
					<router-link
						v-for='product in newest.slice(0,3)'
						:key='product.title'
						:to='{name:"Product_detail", params:{ id:product.id }}'
						class='product-card mb-4 col-3 position-relative'>
						<card
							:product='product'
							@buyProduct='buyItem'>
						</card>
					</router-link>
				</div>
				<div class='row d-flex inner-item'>
					<router-link
						:to='{name:"Product_detail", params:{ id:product.id }}'
						v-for='product in newest.slice(3,6)'
						:key='product.title'
						class='product-card mb-4 col-3 position-relative'>
						<card
							:product='product'
							@buyProduct='buyItem'>
						</card>
					</router-link>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import Card from './Product-card.vue';

export default {
  name: 'Home-Newest',
  components: {
    Card,
  },
  props: [
    'newest',
  ],
  data() {
    return {
    };
  },
  methods: {
    buyItem(item) {
      const vm = this;
      vm.$emit('buyItem', item);
    },
  },
};
</script>

<style lang='scss'>
@import '../../assets/all.scss';
.fade{
	display:none;
}
.product-card.main{
	@include mobile{
		height:650px !important;
		margin-bottom:2rem;
	}
}
.outer-scroll{
	overflow-y: hidden;
	overflow-x: scroll;
	height:600px;
	.inner-scroll{
		width:1500px;
		display:flex;
	}
	.inner-item{
		width:50%;
		justify-content: space-evenly;
	}
	@include pad{
		height:auto;
		overflow-x: initial;
		overflow-y: initial;
		.inner-scroll{
			width:unset;
			flex-direction: column;
			align-items: center;
			.inner-item{
				width:100%;
				margin:0.5rem 0;
			}
		}
	}
}

</style>
