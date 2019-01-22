// pages/comment/index.js
var Empty = require("../../component/loading-container/emptyConstant.js");
var request = require("../../utils/request")
import Pageable from '../../utils/pageable'
import login from '../../utils/login'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteId: 2,
    comments: [],
    emptyType: Empty.loading,
    // 没有更多了
    nomore: false,
    releaseFocus: false,
    // 点击了哪条评论
    currentCommentClickIndex: 0,
    currentCommentId: 0,
    // 回复谁
    currentCommentReplyUid: 0,
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
    if(this.data.comments.length > 0){
      return;
    }
    this.setData({
      emptyType: Empty.loading
    });
    this.fetchComments();
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
    this.fetchComments(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.fetchComments();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  fetchComments: function(curPage = this.pageable.page){
    if(this.pageable.loading){
      return;
    }
    this.pageable.loading = true;
    let that = this;
    request.post("/inread-api/comment/list",{
      "page": curPage,
      "size": this.pageable.size,
      "noteId": this.data.noteId
    }).then(res=>{
      that.setData({
        comments: that.pageable.received(that, curPage, that.data.comments, res.data ? res.data.records : [], false)
      });
    }).catch(e=>{
      that.pageable.error(that, curPage == 1);
    }).finally(()=>{
      that.pageable.complete();
    });
  },
  // 网络异常点击
  onAbnorTap: function(){
    this.setData({
      emptyType: Empty.loading
    });
    this.fetchComments();
  },
  submitReply(opt){
    let that = this;
    login.getInstance().checkLogin(()=>{
      wx.showLoading({
        title: '正在提交...',
      });
      var that = this;
      request.post(
        "/inread-api/comment/add",
        {
          noteId: that.data.noteId,
          content: opt.detail,
          toUid: that.data.currentCommentReplyUid,
          commentPid: that.data.currentCommentId,
        }).then(res=>{
        // 成功
        if(res && res.code == 0){
        }
      }).catch(e=>{
      }).finally(()=>{
        wx.hideLoading();
      });
    });
  },
  onReplyItemClick(event){
    this.setData({
      currentCommentReplyUid: event.detail
    });
  },
  onClickReply(event){
    this.setData({
      releaseFocus: !this.data.releaseFocus
    });
    this.setData({
      currentCommentId: event.detail
    });
  },
  onClickLike(event){
    let that = this;
    login.getInstance().checkLogin(()=>{
      request.post("/inread-api/like/comment",{
        commentId: event.detail
      }).then(res=>{
        if(res.code !== 0){
          return;
        }
        let index = 0;
        for(let comment in that.data.comments){
          if(comment.id === event.detail){
            break;
          }
          index++;
        }
        if(index >= that.data.comments.length){
          return;
        }
        wx.showToast({
          title: "收到您的赞了",
          icon: "none",
          duration: 2000
        });
        var item = that.data.comments[index];
        item.likeNum += 1;
        var key = "comments["+ index + "]"
        this.setData({
          // 这里使用键值对方式赋值
          key: item
          }, function () {})
      }).catch(e=>{
        console.log(e);
        wx.showToast({
          title: "网络出错请重试",
          icon: "none",
          duration: 2000
        });
      }).finally(()=>{
  
      });
    });
  }
})