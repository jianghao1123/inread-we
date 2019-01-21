// pages/home/note/index.js
var Empty = require("../../../component/loading-container/emptyConstant.js");
var request = require("../../../utils/request")
import Pageable from '../../../utils/pageable'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 文章列表
    notes: [],
    emptyType: Empty.loading,
    // 没有更多了
    nomore: false,
    releaseFocus: false,
    currentCommentClickIndex: 0,
    commentInputValue: ''
  },

  pageable: new Pageable(),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onPageScroll() {
    // Do something when page scroll
    if(this.data.releaseFocus){
      this.setData({
        releaseFocus: !this.data.releaseFocus
      });
    }
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
    if(this.data.notes.length > 0){
      return;
    }
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
    this.fetchNoteItems(this.pageable.page, true);
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
    this.pageable.loading = true;
    let that = this;
    request.post("/inread-api/note/list"
    ,{ 
      page: curPage,
      size: this.pageable.size,
      append: append,
      timestamp: that.data.notes.length > 0 ? that.data.notes[0].timestamp : 0
    })
    .then(res => {
      that.setData({
        notes: that.pageable.received(that, curPage, that.data.notes, res.data ? res.data.records : [], append)
      });
    }).catch(error => {
      that.pageable.error(that, curPage == 1);
    }).finally(() => {
      that.pageable.complete();
    });
  },
  // 网络异常点击
  onAbnorTap: function(){
    this.setData({
      emptyType: Empty.loading
    });
    this.fetchNoteItems();
  },
  // 点击评论
  onNoteCommentClick: function(opt){
    this.setData({
      releaseFocus: !this.data.releaseFocus
    });
    console.log(opt.detail);
    this.setData({
      currentCommentClickIndex: opt.detail
    });
  },
  // 提交评论
  onCommentSubmit: function(opt){
    wx.showLoading({
      title: '正在提交...',
    });
    var that = this;
    request.post(
      "/inread-api/comment/add",
      {
        noteId: that.data.notes[that.data.currentCommentClickIndex].noteId,
        content: opt.detail,
        toUid: 0
      }).then(res=>{
      if(res && res.code == 0){
        wx.showToast({
          title: "评论成功",
          icon: "none",
          duration: 2000
        });
        var item = this.data.notes[that.data.currentCommentClickIndex]
        item.commentNum = item.commentNum + 1
        var key = "notes["+ that.data.currentCommentClickIndex + "]"
        that.setData({
          commentInputValue: '',
          releaseFocus: false
        });
        this.setData({
          // 这里使用键值对方式赋值
          key: item
          }, function () {})
      }
    }).catch(e=>{
    }).finally(()=>{
      wx.hideLoading();
    });
  },
  onMoreCommentClick: function(opt){
    wx.navigateTo({
      url: "../../comment/index?noteId=" + this.data.notes[opt.detail].noteId
    });
  }
})