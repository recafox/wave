<template>
<!-- eslint-disable max-len -->
	<div style='margin-top:200px' class='row d-flex justify-content-center'>
    <div class='col-sm-4 d-md-flex flex-column'>
      <h3 class='title-neon text-right mb-3'>最新發行</h3>
      <router-link
        :to='{name:"Product_detail", params:{ id:item.id }}'
        v-for='item in newest.slice(0,1)'
        :key='item.id'
        class='product-card h-75 mt-4 position-relative d-none d-md-flex flex-column align-items-center'
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
    <div class='col-sm-8 d-flex flex-wrap justify-content-center'>
      <router-link
        :to='{name:"Product_detail", params:{ id:item.id }}'
        v-for='item in newest'
        :key='item.title'
        class='product-card ml-2 mr-2 mb-4 col-sm-3 position-relative'>
        <h5
          class='text-white mb-4 font-weight-bold border-bottom pb-1'>
          {{ item.category }}
        </h5>
        <img
          :src='item.imageUrl'
          class='img-shadow'>
        <h5 class='text-white text-center mt-4 mb-1'>
          {{ item.title }}
        </h5>
        <p class='text-white text-center mb-1'>
          {{ item.unit }}
        </p>
        <p class='text-white text-center mb-2'>
          {{ item.content }}
        </p>
        <p class='text-white text-center font-m mb-2'>
          $ {{ item.price }}
        </p>
        <div class='d-flex position-absolute bottom-0 mb-3'>
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
      </router-link>
    </div>
	</div>
</template>

<script>
export default {
  name: 'Home-Newest',
  props: [
    'newest',
  ],
  methods: {
    buyItem(item) {
      const vm = this;
      vm.$emit('buyItem', item);
    },
  },
};
</script>

<style lang='scss'>


</style>
