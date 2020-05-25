<template>
  <div class='d-flex align-items-center justify-content-end'>
    <button
      class='btn btn-border-warning mr-1 h-100'
      @click='qty-=1'>
      <font-awesome-icon icon='minus'/>
    </button>
    <p
      class='border border-warning text-center h-100 rounded pt-2 pb-2 text-white'
      style='width:50px'
      >
      {{ qty }}
    </p>
    <button
      class='btn btn-border-warning ml-1 mr-3 h-100'
      @click='qty+=1'>
      <font-awesome-icon icon='plus'/>
    </button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'QTY-controller',
  props: [
    'product',
  ],
  data() {
    return {
      qty: 1,
    };
  },
  watch: {
    qty: {
      handler(newVal) {
        if (newVal) {
          const vm = this;
          vm.qty = newVal < 0 ? 0 : newVal;
          vm.$emit('updateQTY', vm.qty);
        }
      },
    },
  },
};
</script>

<style lang="scss">
.buy-btn{
  border-radius: 0.375rem;
  height:38px;
  letter-spacing: 0.3rem;
  text-indent: 0.3rem;
  font-size: 20px;
}
</style>
