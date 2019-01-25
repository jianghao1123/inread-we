// pages/article/index.js
var Empty = require("../../component/loading-container/emptyConstant.js");
var request = require("../../utils/request")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    emptyType: Empty.loading,
    showSharePanel: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.articleId){
      this.fetchArticle(options.articleId);
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

  fetchArticle(articleId){
    let that = this;
    request.get('/inread-api/article/detail', {
      articleId: articleId
    }).then(res=>{
      if(res && res.code == 0 && res.data.content){
        that.setData({
          content: res.data.content,
          emptyType: Empty.content
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
  }


})