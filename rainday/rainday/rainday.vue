<template>
  <div id="RainDay">
    <img id="rainBg" alt="background" :src="bgSrc"/>
  </div>
</template>
<script>
import RainyDay from './core/rainday'
import imgArr from './loadImg'
export default {
  name: 'RainDay',
  data () {
    return {
      bgSrc: ''
    }
  },
  mounted () {
    this.pageInit() // 页面初始化
  },
  methods: {
    pageInit () { // 页面初始化
      var image = document.getElementById('rainBg')
      image.onload = function () {
        let engine = new RainyDay({
          image: this,
          blur: false
        })
        engine.rain([ [1, 2, 500] ])
        engine.rain([ [3, 3, 0.88], [5, 5, 0.9], [6, 2, 1] ], 100)
      }
      image.crossOrigin = 'anonymous'
      let idx = Math.floor((Math.random() * imgArr.length))
      this.bgSrc = imgArr[idx]
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
