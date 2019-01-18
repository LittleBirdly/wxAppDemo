//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    jtkjUserInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      this.getJtkjUserInfo()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        this.getJtkjUserInfo()
      }

    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      
      this.getJtkjUserInfo()
    }

   
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getJtkjUserInfo: function(){
    //通过微信名称获取后台用户信息
    var wxNickName = this.data.userInfo.nickName
    console.dir(wxNickName)
    if (wxNickName) {
      var that = this
      wx.request({
        url: 'http://192.168.5.19:8081/jtkj/manage/rest/basedata/employees',
        method: 'GET',
        data: {
          employeeName: wxNickName
        },
        header: { 'content-type': 'application/json' },
        success: function (res) {
          console.dir(res.data.rows.length);
          if (!res.data.rows || res.data.rows.length < 1) {
            //TODO 未获取到信息的处理逻辑
            console.dir('未获取到员工信息！');
          } else {
            //通过微信名称获取用户信息成功
            console.dir(res.data.rows[0]);
            that.setData({
              jtkjUserInfo: res.data.rows[0]
            })
          }
        }
      })
    }
  }
})
