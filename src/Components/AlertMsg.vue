<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMsg',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const vm = this;
      const timeStamp = Math.floor(new Date() / 1000);
      vm.messages.push({
        message,
        status,
        timeStamp,
      });
      vm.removeMessageWithDelay(timeStamp);
    },
    removeMessage(num) {
      const vm = this;
      vm.messages.splice(num, 1);
    },
    removeMessageWithDelay(timeStamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timeStamp === timeStamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },

};
</script>

<style lang="scss"  scoped>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 10%;
  right: 20px;
  z-index: 1100;
}
</style>
