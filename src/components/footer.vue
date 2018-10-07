<template lang='pug'>
.footer-wrapper
  img(class="footer-bg", mode="widthFix", src="https://m.shanhs.com/ued/mini/old-touch/footer-bg.png")
  .footer
    .index-tab(@click="goHome")
      img(mode="widthFix", src="https://m.shanhs.com/ued/mini/old-touch/index-black.png")
    .recovery-tab(@click="goCalssify")
      img(mode="widthFix", src="https://m.shanhs.com/ued/mini/old-touch/recovery-btn.png")
    .user-tab
      img(mode="widthFix", src="https://m.shanhs.com/ued/mini/old-touch/mine-green.png")
</template>

<script>
export default {
  methods: {
    goHome () {
      wx.redirectTo({
        url: '/project/touch/home/home'
      })
    },
    goCalssify () {
      wx.navigateTo({
        url: '/project/touch/classify/classify?fromTag=1&ctgId=10'
      })
    }
  }
}
</script>

<style lang='less'>
.footer-wrapper{
  width: 100%;
  height: 140rpx;
  position: fixed;
  bottom: 0;
}
.footer-bg{
  width: 100%;
  height: 140rpx;
  position: fixed;
  bottom:0;
  right: 0;
}
.footer{
  width: 100%;
  height: 140rpx;
  position: fixed;
  bottom:0;
  display: flex;
  justify-content: space-around;
  align-items:flex-end;
  .index-tab{
    img{
      width: 48rpx;
      height: 74rpx;
    }
  }
  .recovery-tab{
    img{
      width: 120rpx;
      height: 120rpx;
    }
  }
  .user-tab{
    img{
      width: 39rpx;
      height: 78rpx;
      margin-right: 9rpx;
    }
  }
}
</style>
