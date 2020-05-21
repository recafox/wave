<template>
<!-- eslint-disable max-len -->
  <div>
    <nav>
      <ul class="pagination">
        <li
          class="page-item"
          @click.prevent='turnPrev'
          data-value='prev'>
          <a
            class="page-link"
            href="#">
          ＜</a>
        </li>
        <li
          v-for='page in pagination.total_pages'
          :key='page'
          @click.prevent ='turnTo(page)'
          class="page-item">
          <a
            class="page-link"
            href="#">
            {{ page }}
          </a>
        </li>
        <li
          class="page-item"
          @click.prevent='turnNext'
          data-value='next'>
          <a
            class="page-link"
            href="#">＞
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: [
    'pagination',
  ],
  data() {
    return {

    };
  },
  methods: {
    turnTo(page) {
      const vm = this;
      vm.$emit('turnTo', page);
    },
    turnPrev() {
      const vm = this;
      const prev = vm.pagination.current_page - 1;
      vm.turnTo(prev);
    },

    turnNext() {
      const vm = this;
      if (vm.pagination.has_next !== false) {
        const next = vm.pagination.current_page + 1;
        vm.turnTo(next);
      }
    },
  },
  updated() {
    const vm = this;
    const pages = document.querySelectorAll('.page-item');
    pages.forEach((p) => {
      if (parseInt(p.innerText, 10) === vm.pagination.current_page) {
        p.classList.add('active');
      } else if (p !== vm.pagination.current_page && p.classList.contains('active')) {
        p.classList.remove('active');
      }
    });
  },
};
</script>

<style lang='scss' scoped>
@import '../assets/all.scss';

.page-link{
  background-color:transparent;
  color:white;
    &:hover{
    border:1px solid $primary;
    background: transparent;
    color:lighten($primary, 30%);
  }
}

.page-item.active{
  background-color: black;
  .page-link{
    background-color: $black;
    color: lighten($primary, 30%);
  }

}
</style>
