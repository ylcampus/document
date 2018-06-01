<template>
  <div id="Spark">
    <canvas id="bgCanvas"></canvas>
  </div>
</template>
<script>
import Spark from './core/spark'
export default {
  name: 'Spark',
  data () {
    return {}
  },
  mounted () {
    this.pageInit()
  },
  methods: {
    pageInit () { // 页面初始化
      let engine = new Spark({
        canvas: document.getElementById('bgCanvas')
      })
      engine.start()
    }
  }
}
</script>
<style scoped lang="scss">
  #Spark{
    height: 100%;
    canvas {
      width: 100%;
      height: 100%;
      position: absolute;
      /*background-color: rgb(34, 37, 42)*/
      background: #000;
    }
  }
</style>
