// pages/comment/index.js
var Empty = require("../../component/loading-container/emptyConstant.js");
var request = require("../../utils/request")
import Pageable from '../../utils/pageable'

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
  },
  pageable: new Pageable(),
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
  }

})