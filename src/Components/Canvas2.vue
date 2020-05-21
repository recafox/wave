<template>
  <div class='canvas-container'>
    <canvas id='mycanvas'></canvas>
  </div>
</template>

<style lang="scss" scoped>
.canvas-container{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

<script>
export default {
  data() {
    return {
      ww: window.innerWidth,
      wh: window.innerHeight,
    };
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
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 3;
      const amp = vm.wh / 2;

      ctx.beginPath();
      for (let i = 0; i < vm.ww; i += 1) {
        const deg = time / 40;
        const wave = amp * Math.cos(deg);
        ctx.lineTo(i, wave + vm.wh / 2);
      }
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i < vm.ww; i += 1) {
        const deg = time / 50;
        const wave = amp * Math.sin(deg);
        ctx.lineTo(i, wave + vm.wh / 2);
      }
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < vm.ww; i += 1) {
        const deg = time / 30;
        const wave = amp * Math.sin(deg);
        ctx.lineTo(i, wave + vm.wh / 2);
      }
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i < vm.ww; i += 1) {
        const deg = time / 25;
        const wave = amp * Math.sin(deg);
        ctx.lineTo(i, wave + vm.wh / 2);
      }
      ctx.stroke();
    }

    setInterval(render, 70);
  },
};
</script>
