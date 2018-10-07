<template lang="pug">
  .login-mask(v-if='showLogin')
    .login-content
      .iconfont.icon-close-round(@click="close")
      .title 领取奖励
      .item
        .iconfont.icon-shouji
        input(placeholder='输入您的手机号码' v-model='mobile' maxlength='11' type='number')
      .item
        .iconfont.icon-yanzhengma
        input(placeholder='输入验证码' v-model='phoneCode' maxlength='6' type='number')
        .get-phone-code(@click="sendVerifyCode") {{msg}}
      .confirm-btn(@click="confirmHandler") 确定
</template>
<script>
  import apiPhone from '@/service/phoneService.js'
  const validate = require('@/utils/globalValidate.js').validate
  export default {
    props: ['showLogin'],
    data () {
      return {
        mobile: '',
        phoneCode: '',
        time: 0,
        msg: '获取验证码'
      }
    },
    methods: {
      goHome () {
        wx.navigateTo({
          url: '/project/touch/home/home'
        })
      },
      close () {
        this.showLogin = false
      },
      confirmHandler () {
        let self = this
        wx.login({
          success: async function (res) {
            if (res.code) {
              try {
                let { xchxOpenId } = await apiPhone.getOpenIdAndUserToken(res.code)
                wx.setStorageSync('openId', xchxOpenId)
                let params = {
                  phoneNo: self.mobile,
                  phoneCode: self.phoneCode,
                  openId: xchxOpenId
                }
                let { userToken } = await apiPhone.saveOpenIdAndUserInfo(params)
                wx.setStorageSync('userToken', userToken)
                self.close()
                self.$emit('loginSuccess', userToken)
              } catch (e) {
                console.log(e)
                wx.showModal({
                  content: e.msg,
                  showCancel: false
                })
              }
            } else {
              console.log(res, 'res')
            }
          }
        })
      },
      sendVerifyCode () {
        if (!validate('mobile', this.mobile)) {
          wx.showModal({
            content: '手机格式错误',
            showCancel: false
          })
          return
        }
        if (this.time === 0) {
          this.time = 60
          apiPhone.getPhoneCode(this.mobile).then(() => {
            wx.showModal({
              content: '短信发送成功',
              showCancel: false
            })
          }).catch(e => {
            wx.showModal({
              content: e.msg,
              showCancel: false
            }) // 短信失败提示
          })
          let i = setInterval(() => {
            this.msg = this.time + 's后可重发'
            this.time --
            if (this.time === 0) {
              this.msg = '获取验证码'
              clearInterval(i)
            }
          }, 1000)
        }
      }
    }
  }
</script>
<style lang="less">
  .login-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-content{
      width: 580rpx;
      height: 434rpx;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .icon-close-round{
        position: absolute;
        width: 50rpx;
        height: 50rpx;
        border-radius: 50rpx;
        background: #c7c7c7;
        color: white;
        font-size: 66rpx;
        top: 10rpx;
        right: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .title{
        font-size: 42rpx;
        color: #f54646;
        font-weight: bold;
        margin-bottom: 30rpx;
      }
      .item{
        width: 500rpx;
        height: 80rpx;
        border-bottom: 1px solid #bfbfbf;
        display: flex;
        align-items: center;
        .iconfont{
          margin-right: 10rpx;
          font-size: 32rpx;
        }
        .get-phone-code{
          border-left: 1px solid #999999;
          padding-left: 10rpx;
          color:#f54646;
          font-size: 24rpx;
        }
      }
      .confirm-btn{
        margin-top: 30rpx;
        width: 426rpx;
        height: 70rpx;
        border-radius: 12rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36rpx;
        color: #fffe00;
        font-weight: bold;
        background: #f54646;
      }
    }
  }
</style>
