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
    nomore: false
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
      pageable.received(that, curPage, that.data.notes, res.data && res.data.data ? res.data.data.records : [], append)
      console.log(res);
    }).catch(error => {
      that.pageable.error(that, curPage == 1);
    }).finally(() => {
      that.pageable.complete();
    });
  },

  onAbnorTap: function(){
    this.setData({
      emptyType: Empty.loading
    });
    this.fetchNoteItems();
  }
})