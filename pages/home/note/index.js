// pages/home/note/index.js
var Empty = require("../../../component/loading-container/emptyConstant.js");
var request = require("../../../utils/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 文章列表
    notes: [],
    emptyType: Empty.loading,
  },

  pageable: {
    // 发起分页请求
    loading: false,
    page: 1,
    size: 10,
    nomore: false
  },

  setPageable: function(pageable){
    if(pageable.loading != null){
      this.pageable.loading = pageable.loading;
    }
    if(pageable.page != null){
      this.pageable.page = pageable.page;
    }
    if(pageable.size != null){
      this.pageable.size = pageable.size;
    }
    if(pageable.nomore != null){
      this.pageable.nomore = pageable.nomore;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      emptyType: Empty.loading
    });
    this.fetchNoteItems();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.fetchNoteItems(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.fetchNoteItems();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  fetchNoteItems: function (curPage=this.pageable.page) {
    if(this.pageable.loading){
      return;
    }
    this.setPageable({
      loading: true
    });
    let that = this;
    request.post("/inread-api/note/list"
    , {page: curPage, size: this.pageable.size})
    .then(res => {
      if(curPage == 1){
        that.setData({
          emptyType: Empty.content
        });
        that.setData({
          notes: []
        });
      }
      if(res.data.data && res.data.data.records){
        that.setData({
          notes: that.data.notes.concat(res.data.data.records)
        });
      }
      that.setPageable({
        page: curPage + 1
      });
      console.log(res);
    }).catch(error => {
      if(curPage == 1){
        that.setData({
          emptyType: Empty.error
        });
      }else{

      }
      console.error(error);
    }).finally(() => {
      that.setPageable({
        loading: false
      });
      wx.stopPullDownRefresh()
    });
  }
})