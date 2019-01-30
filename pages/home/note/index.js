// pages/home/note/index.js
var Empty = require("../../../component/loading-container/emptyConstant.js");
var request = require("../../../utils/request")
import Pageable from '../../../utils/pageable'
import PageLoad from '../../../utils/page'
import util from '../../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 文章列表
    notes: [],
    // 没有更多了
    page: new PageLoad(),
    releaseFocus: false,
    currentCommentClickIndex: 0,
    commentInputValue: '',
    submitAble: false
  },

  pageable: new Pageable(),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    });
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
    this.fetchNoteItems(1);
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
    if(this.data.page.nomore){
      return;
    }
    this.fetchNoteItems();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    console.log(e);
    if(e && e.from == 'button' && e.target.dataset && e.target.dataset.index){
      let index = e.target.dataset.index;
      return {
        title: this.data.notes[index].title,
        imageUrl: this.data.notes[index].picture
      }
    }
  },

  /**
   * 
   * @param {当前页} curPage 
   */
  fetchNoteItems: function (curPage=this.data.page.page) {
    if(this.data.page.loading){
      return;
    }
    this.data.page.loading = true;
    let that = this;
    request.post("/inread-api/note/list"
    ,{ 
      page: curPage,
      size: this.data.page.size
    })
    .then(res => {
      that.setData({
        notes: that.pageable.received(that, curPage, that.data.notes, res.data ? res.data.records : [])
      });
    }).catch(error => {
      console.log(error)
      that.pageable.error(that, curPage == 1);
    }).finally(() => {
      that.pageable.complete(that);
    });
  },
  // 网络异常点击
  onAbnorTap: function(){
    this.setData({
      "page.emptyType": Empty.loading
    });
    this.fetchNoteItems(1);
  },
  // 点击评论
  onNoteCommentClick: function(opt){
    this.setData({
      releaseFocus: !this.data.releaseFocus,
      currentCommentClickIndex: opt.detail.index
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
        var item = this.data.notes[that.data.currentCommentClickIndex];
        item.commentNum = item.commentNum + 1;
        item.comments = [...item.comments, res.data];
        that.setData({
          commentInputValue: '',
          submitAble: false,
          releaseFocus: false
        });
        var key = "notes["+ that.data.currentCommentClickIndex + "]"
        this.setData({
          // 这里使用键值对方式赋值
          [key]: item
          }, function () {});
      }
    }).catch(e=>{
    }).finally(()=>{
      wx.hideLoading();
    });
  },
  onMoreCommentClick: function(e){
    wx.navigateTo({
      url: "../../comment/index?noteId=" + e.detail.noteId
    });
  },
  onContentClick: function(e){
    if(!this.data.notes[e.detail.index].articleId){
      return;
    }
    wx.navigateTo({
      url: "../../article/index?noteId=" + this.data.notes[e.detail.index].noteId
    });
  },
  onReplyItemClick: function(e){
    wx.navigateTo({
      url: "../../comment/index?noteId=" + e.detail.noteId
    });
  },
  /**
   * 键盘失去焦点
   * @param {} e 
   */
  onBindblur(e){
    this.setData({
      releaseFocus: false
    });
  },
  onLikeClick(e){
    var that = this;
    request.post("/inread-api/like/note"
    ,{ 
      noteId: e.detail.noteId,
    }).then(res=>{
      if(res && res.code != 0){
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 2000
        });
        return;
      }
      wx.showToast({
        title: "收到你的赞了",
        icon: "none",
        duration: 2000
      });
      var key = "notes["+ e.detail.index + "]";
      var item = that.data.notes[e.detail.index];
      item.likeNum = item.likeNum + 1;
      this.setData({
        // 这里使用键值对方式赋值
        [key]: item
      }, function () {});
    }).catch((e)=>{
      wx.showToast({
        title: "出错了再赞一个试试",
        icon: "none",
        duration: 2000
      });
    });
  },
  onShareClick(e){
    request.post('/inread-api/note/share', {
      noteId: e.detail.noteId
    }).then(res=>{
    }).catch(e=>{

    }).finally(()=>{

    });
  }
})