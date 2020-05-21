<template>
  <div class='canvas-container'>
    <canvas id='mycanvas'></canvas>
  </div>
</template>

<style lang="scss" scoped>
.canvas-container{
  position: fixed;
  top:5%;
  left:0;
  width:100%;
  overflow: hidden;
}
</style>

<script>
export default {
  data() {
    return {
      ww: window.innerWidth,
      wh: 700,
    };
  },
  watch: {
    ww(newVal) {
      const vm = this;
      vm.ww = newVal;
    },
  },

  mounted() {
    const vm = this;
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = vm.ww;
    canvas.height = vm.wh;
    ctx.beginPath();


    let time = 0;

    function render() {
      time += 1;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, vm.ww, vm.wh);
      ctx.lineWidth = 3;
      const base = vm.wh * 0.4;
      const amp = vm.wh / 10;

      ctx.strokeStyle = 'rgba(213, 55, 225, 0.6)';
      ctx.beginPath();
      for (let i = 0; i < vm.ww; i += 1) {
        const deg = i * 0.005 + time / 25;
        const wave = amp * Math.cos(deg);
        ctx.lineTo(i, wave + base);
      }
      ctx.stroke();
      ctx.strokeStyle = 'rgba(50, 193, 139, 0.3)';
      ctx.beginPath();
      for (let i = 0; i < vm.ww; i += 1) {
        const deg = i * 0.005 + time / 70;
        const wave = amp * 0.8 * Math.cos(deg);
        ctx.lineTo(i, wave + base);
      }
      ctx.stroke();
      ctx.strokeStyle = 'rgba(58, 232, 166, 0.4)';
      ctx.beginPath();
      for (let i = 0; i < vm.ww; i += 1) {
        const deg = i * 0.005 + time / 45;
        const wave = amp * 0.4 * Math.cos(deg);
        ctx.lineTo(i, wave + base);
      }
      ctx.stroke();
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  },
};
</script>
