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
    // 没有更多了
    nomore: false
  },

  pageable: {
    // 发起分页请求
    loading: false,
    page: 1,
    size: 10
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
    this.fetchNoteItems(true);
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

  /**
   * 
   * @param {当前页} curPage 
   * @param {是否追加数据，true会忽略curPage} append 
   */
  fetchNoteItems: function (curPage=this.pageable.page, append = false) {
    if(this.pageable.loading){
      return;
    }
    this.setPageable({
      loading: true
    });
    let that = this;
    request.post("/inread-api/note/list"
    , { 
      page: curPage,
      size: this.pageable.size,
      append: append,
      timestamp: that.data.notes.length > 0 ? that.data.notes[0].timestamp : 0
    })
    .then(res => {
      // 有数据则追加
      if(res.data.data && res.data.data.records){
        that.setData({
          notes: that.data.notes.concat(res.data.data.records)
        });
      }
      // 初始化页面
      if(curPage == 1){
        if(that.data.notes.length == 0){
          that.setData({
            emptyType: Empty.empty
          });
        }else{
          that.setData({
            emptyType: Empty.content
          });
        }
      }
      if(res.data.data && res.data.data.pages == curPage){
        that.setData({
          nomore: true
        });
      }
      if(!append){
        that.setPageable({
          page: curPage + 1
        });
      }
      console.log(res);
    }).catch(error => {
      if(curPage == 1){
        that.setData({
          emptyType: Empty.error
        });
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