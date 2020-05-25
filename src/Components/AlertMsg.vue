<template>
  <div class="message-alert" :class='showSwitch'>
    <div
      class="alert alert-dismissible border-0"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      <p class='text-white mt-1'>
        {{ item.message }}
      </p>
      <button
        type="button"
        class='close text-white'
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
      show: false,
    };
  },
  computed: {
    showSwitch() {
      const vm = this;
      if (vm.show === false) {
        return 'fadeOut';
      }
      return 'fadeIn';
    },
  },
  methods: {
    updateMessage(message, status) {
      const vm = this;
      vm.show = true;
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
      vm.show = false;
      setTimeout(() => {
        vm.messages.splice(num, 1);
      }, 300);
    },
    removeMessageWithDelay(timeStamp) {
      const vm = this;
      let fadeOut = () => new Promise((resolve) => {
        setTimeout(() => {
          vm.show = false;
          resolve();
        }, 3000);
      });
      fadeOut().then(() => {
        setTimeout(() => {
          vm.messages.forEach((item, i) => {
            if (item.timeStamp === timeStamp) {
              vm.messages.splice(i, 1);
            }
          });
          console.log('msg deleted');
        }, 500);
      });
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
@import '../assets/all.scss';

.message-alert {
  position: fixed;
  max-width: 70%;
  top: 13%;
  left: 0%;
  transform: translateX(-100%);
  transition: 0.5s;
  z-index: 1100;
  color:white !important;
}
.message-alert.fadeIn {
  transform: translateX(0);
}
.message-alert.fadeOut {
  transform: translateX(-100%);
}
.alert-info{
  background: $success;
}
.alert-danger{
  background: rgba(255, 45, 45, 0.6);
}
.alert-warning{
  background: rgba(255, 192, 0, 0.6);
}
</style>
