<template lang='pug'>
  .footer-tab
    .tab-item(@click="goHome")
      .iconfont.icon-share
      span 回收小程序
    .tab-item.active
      .iconfont.icon-zhongjiangtishi
      span 活动
</template>

<script>
export default {
  methods: {
    goHome () {
      wx.redirectTo({
        url: '/project/touch/home/home'
      })
    }
  }
}
</script>

<style lang='less'>
  .footer-tab{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 10rpx;
      .iconfont{
        font-size: 42rpx;
        line-height: 42rpx;
      }
    }
    .active{
      color: #f54646;
    }
  }
</style>
