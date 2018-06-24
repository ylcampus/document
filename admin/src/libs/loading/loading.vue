<template>
  <div id="app">
    <div class="loading-home" v-show="loadingnum > 0">
      <div class="mask"></div>
      <div class="el-loading-mask is-fullscreen">
        <div class="el-loading-spinner">
          <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  data () {
    return {}
  },
  computed: {
    loadingnum: function () {
      return this.$store.state.loadingNum
    }
  }
}
</script>
<style lang="scss" scoped>
  .loading-home {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999
  }
  .loading-container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mask{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0);
  }
  .custom-loading{
    font-size: 40px;
    color:#4a94fe;
  }
</style>
