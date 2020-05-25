<template>
<!-- eslint-disable max-len -->
  <div>
    <h3 class='title-primary text-center mb-5'>推薦給你</h3>
    <carousel
      :perPage='1'
      :autoplay='true'
      :autoplayTimeout='2000'
      paginationActiveColor="#D537E1"
      paginationColor="#6c757d">
      <slide
        v-for='item in randomPick'
        :key='item.title'>
        <div class='slide-container'>
          <img :src='item.imageUrl'>
          <div class='slide-text'>
            <h3
              class='slide-title'
              v-if='item.title.length<=25'>
              {{ item.title }}
            </h3>
            <h5
              v-else class='slide-title'>
              {{item.title}}
            </h5>
            <p class='mt-1'>
              {{ item.unit }}
            </p>
            <p class='mt-1'>
              $ {{ item.price }}
            </p>
            <div class='d-flex mt-2'>
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
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'RandomPick',
  props: [
    'randomPick',
  ],
  components: {
    Carousel,
    Slide,
  },
  methods: {
    buyItem(item) {
      const vm = this;
      vm.$emit('buyItem', item);
    },
  },

};
</script>
<style lang="scss">
@import '../../assets/all.scss';

.VueCarousel-slide{
  height:550px;
  display:flex;
  justify-content: center;
}
.slide-container{
  height:100%;
  width:90%;
  padding:1rem;
  color:$white;
  display:flex;
  justify-content: space-evenly;
  img{
    width:50%;
  }
  @include pad{
  align-items: center;
  }

  @include mobile{
    width:100%;
    display:block;
		img{
			width:100%;
			height:auto;
		}
  }

  .slide-text{
    width:40%;
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 1rem;
    padding-right:1rem;
    align-items: flex-start;
    margin-top:1rem;
		.slide-title{
			font-weight: bold;
		}
    @include mobile{
      width:100%;
      padding:0;
    }
  }
}

</style>
