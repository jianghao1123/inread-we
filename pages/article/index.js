// pages/article/index.js
var Empty = require("../../component/loading-container/emptyConstant.js");
var request = require("../../utils/request")
import login from "../../utils/login"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    emptyType: Empty.loading,
    showSharePanel: true,
    likeCount: 0,
    shareCount: '',
    commentCount: '',
    noteId: 0,
    title: '',
    picture: '',
    author: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    });
    if(options.noteId){
      this.setData({
        noteId: options.noteId
      });
      this.fetchArticle(options.noteId);
    }else{
      this.setData({
        emptyType: Empty.empty
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
    if(this.data.content){
      return;
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll() {
    // Do something when page scroll
    if(this.data.showSharePanel){
      this.setData({
        showSharePanel: !this.data.showSharePanel
      });
    }
  },

  fetchArticle(noteId){
    let that = this;
    request.get('/inread-api/article/detail', {
      noteId: noteId
    }, true).then(res=>{
      if(res && res.code == 0 && res.data && res.data.content){
        that.setData({
          content: res.data.content,
          emptyType: Empty.content,
          likeCount: res.data.note ? res.data.note.likeNum : 0,
          shareCount: res.data.note ? res.data.note.shareNum : 0,
          commentCount: res.data.note ? res.data.note.commentNum : 0,
          title: res.data.note.title,
          picture: res.data.note.picture,
          author: res.data.note.author
        });
      }else{
        this.setData({
          emptyType: Empty.empty
        });
      }
    }).catch(e=>{
      this.setData({
        emptyType: Empty.error
      });
    }).finally(()=>{

    });
  },

  onContainerClick(){
    this.setData({
      showSharePanel: !this.data.showSharePanel
    });
  },
  onShareClick(){
    request.post('/inread-api/note/share', {
      noteId: this.data.noteId
    }).then(res=>{
    }).catch(e=>{

    }).finally(()=>{

    });
  },
  onLikeClick(){
    if(!login.getInstance().checkLogin()){
      return;
    }
    var that = this;
    request.post("/inread-api/like/note"
    ,{ 
    noteId: this.data.noteId,
    }).then(res=>{
        if(res && res.code === 0){
            this.setData({
              likeCount: that.data.likeCount + 1
          });
          wx.showToast({
            title: "收到你的赞了",
            icon: "none",
            duration: 2000
          });
        }
    });
  },
  onCommentClick(){
    wx.navigateTo({
      url: "../comment/index?noteId=" + this.data.noteId
    });
  },
  // 网络异常点击
  onAbnorTap: function(){
    this.setData({
      "page.emptyType": Empty.loading
    });
    this.fetchArticle(this.data.noteId);
  }
})