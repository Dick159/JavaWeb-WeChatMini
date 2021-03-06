var app = getApp()
var moment = require('../../../../utils/moment.min.js')
var util = require('../../../../utils/util.js');
Page({
  data: {
    navbar: ['课程管理', '教师管理', '学生管理', '修改用户密码'],
    currentTab: 2,
    pagenum: 1,
    hasMoreData: true,
    isFromSearch: true,   // 用于判断courselist数组是不是空数组，默认true，空的数组
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
    studentlist: []
  },
  navbarTap: function (e) {
    var that = this;
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    var currentTab = that.data.currentTab;
    if (currentTab == 0) {
      wx.navigateTo({
        url: '../../core/core',
      })
    } else if (currentTab == 1) {
      wx.navigateTo({
        url: '../../teacheradmin/showteacher/showteacher',
      })
    } else if (currentTab == 2) {
      wx.navigateTo({
        url: '../../studentadmin/showstudent/showstudent',
      })
    } else if (currentTab == 3) {
      wx.navigateTo({
        url: '../../passwordrset/passwordrset',
      })
    }
  },


  onShow: function () {
    var that = this;
    var pagenum = that.data.pagenum;
    var teacherlist2 = [];
    wx.request({
      url: "http://120.79.73.27:8080/Examination_System/wxadmin/wxshowStudent",
    //  data: { 'page': pagenum },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.studentlist != null) {
          for (var index1 in res.data.studentlist) {
            res.data.studentlist[index1].birthyear = util.toYear(res.data.studentlist[index1].birthyear);
            res.data.studentlist[index1].grade = util.toYear(res.data.studentlist[index1].grade);
          }
          that.setData({
            searchLoading: true,  //把"上拉加载"的变量设为true，显示  
            searchLoadingComplete: false, //把“没有数据”设为false，隐藏 
            studentlist: res.data.studentlist,
          })
        } else {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          })
        }
      }
    })
  },
  addStudent: function () {
    wx.navigateTo({
      url: '../addstudent/addstudent',
    })
  }
 
})  