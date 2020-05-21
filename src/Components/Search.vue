<template lang="">
<!-- eslint-disable max-len -->
  <div
    class='content bg-black search'
    :class='searchSwitch'>
    <div
      class='search-btn d-flex justify-content-center btn-fixed-position-responsive'
      @click='startSearch'>
      <span
        class='d-flex align-items-center '>
        <font-awesome-icon class='icon-l' icon='search'/>
      </span>
    </div>
    <div class='container mt-3'>
      <div class='row'>
        <div class='content-head col-sm-12 d-flex align-items-center'>
          <h2 class='font-l'>
            搜尋
          </h2>
          <button
            @click='clear'
            class='btn-border-white clear-btn ml-2'>
            重設
          </button>
          <button
            class='ml-auto content-close'
            @click='closePanel'>
            &times;
          </button>
        </div>
        <div class='content-body col-sm-12 mt-3'>
          <div>
            <form
              class='d-flex'
              @submit='sendQuery'>
              <input
                type='text'
                class='form-control col-sm-8'
                placeholder='可以不輸入搜索詞直接排序'
                v-model='query'>
              <button
                type='submit'
                class='btn ml-2 search d-flex align-items-center justify-content-center btn-border-white'>
                <font-awesome-icon class='icon-m' icon='search'/>
              </button>
            </form>
          </div>
          <div
            v-if='genres'
            class='section'>
            <div class='section__header'>
              <h2 class='font-l'>分類</h2>
            </div>
            <div class='section-container'>
              <div
                v-for='genre in genres'
                :key='genre.title'
                class='section__box genre'
                @click='toggleCheck(genre,"query",".genre")'>
                {{ genre.title }}
              </div>
            </div>
          </div>
          <div class='section'>
            <div class='section__header'>
              <h2 class='font-l'>排序</h2>
            </div>
            <div class='section__container sort-mode'>
              <div>
                <input
                  v-model='sortType'
                  type='radio'
                  value='ascend'
                  id='ascend'
                  name='sortType'
                  class='d-inline-block ml-2'>
                <label for='ascend'>低至高</label>
                <input
                  v-model='sortType'
                  type='radio'
                  value='descend'
                  id='descend'
                  name='sortType'
                  class='d-inline-block ml-2'>
                <label for='descend'>高至低</label>
              </div>
              <div
                v-for='mode in sortModes'
                :key='mode.title'
                class='section__box mode'
                :data-sortMode='mode.mode'
                @click='toggleCheck(mode, "sortMode",".mode")'>
                {{ mode.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  props: [
    'genres',
    'sortModes',
  ],
  data() {
    return {
      query: '',
      sortType: '' || undefined,
      sortMode: '' || undefined,
      showSearch: false,
    };
  },
  methods: {
    sendQuery() {
      const vm = this;
      const query = {
        query: vm.query,
        sortType: vm.sortType,
        sortMode: vm.sortMode,
      };
      vm.$emit('sendQuery', query);
    },
    toggleCheck(mode, property, className) {
      const vm = this;
      const box = document.querySelectorAll(className);
      box.forEach((b) => {
        if (b.innerText === mode.title && !b.classList.contains('active')) {
          vm[property] = mode.value;
          b.classList.add('active');
        } else if (b.innerText === mode.title && b.classList.contains('active')) {
          vm[property] = '';
          b.classList.remove('active');
        } else if (b.innerText !== mode.title && b.classList.contains('active')) {
          b.classList.remove('active');
        }
      });
    },
    startSearch() {
      const vm = this;
      vm.$emit('startSearch');
      vm.showSearch = true;
    },
    clear() {
      const vm = this;
      vm.query = '';
      vm.sortType = '';
      vm.sortMode = '';
      const modes = document.querySelectorAll('.mode');
      const boxes = document.querySelectorAll('.section__box');
      function clearActive(nodeGroup) {
        nodeGroup.forEach((n) => {
          if (n.classList.contains('active')) {
            n.classList.remove('active');
          }
        });
      }
      clearActive(modes);
      clearActive(boxes);
    },
    closePanel() {
      const vm = this;
      vm.$emit('endSearch');
      vm.showSearch = false;
      vm.clear();
    },
  },
  computed: {
    searchSwitch() {
      const vm = this;
      if (vm.showSearch === true) {
        return 'show';
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/all.scss';
.search.show{
  transform: translateX(0%);
  overflow-x:hidden;
}
.content{
  width:100%;
  height:100%;
  color:$white;
  position:fixed;
  top:0;
  left:0;
  z-index:10;
  transform: translateX(-100%);
  transition:0.5s;

  .search-btn{
    @include sizing(100px);
    color:$black;
    background: $white;
    position: absolute;
    left:103%;
    top:80%;
    font-size: 30px;
    border-radius: 50%;
    &:hover{
      cursor: pointer;
      background: $primary;
      color:$white;
    }
  }

  input{
    background: #000 !important;
    caret-color: $white;
    color:$white;
    &:focus{
      color:$white !important;
    }

  }
  .clear-btn{
    height:24px;
    line-height: 16px;
  }
  .btn-border-info{
    border-radius: 0.25rem;
    @include borderBtn($info);
    background: #000;
  }
  .btn-border-warning{
    border-radius: 0.25rem;
    @include borderBtn($warning);
    background: #000;
  }
}
.section{
  margin-top:7%;
  .section__header{
    display: flex;
  }
  .section__box{
    padding:1rem 2rem;
    margin:1rem;
    display:inline-block;
    @include neonBtn($primary, $white);
    @include mobile{
      padding:0.5rem 0.7rem;
      margin:0.5rem;
    }
  }
  .section__box.active{
    background-color: $primary !important;
    box-shadow: 0 0 10px $primary;
  }

}
.content-close{
  @include size(44px);
  @include borderBtn($black, white);
  font-size: 26px;
  background: transparent;
  &:active, &:focus{
    outline: none;
  }

}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
  -webkit-box-shadow: 0 0 0 50px black inset !important;
  color:white;
}

input:-webkit-autofill {
  -webkit-text-fill-color: white !important;
}
</style>
