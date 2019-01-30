// pages/comment/index.js
var Empty = require("../../component/loading-container/emptyConstant.js");
var request = require("../../utils/request")
import Pageable from '../../utils/pageable'
import PageLoad from '../../utils/page'
import login from '../../utils/login'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteId: 0,
    comments: [],
    page: new PageLoad(),
    // 没有更多了
    releaseFocus: false,
    hidden: false,
    // 当前回复的评论id
    currentCommentId: 0,
    // 回复谁
    currentCommentReplyUid: 0,
    commentInputValue: '',
    // 评论详情 如果这个不为空，是所有的评论回复列表
    comment: null,
    placeholderText: '说点什么吧',
    submiting: false,
    submitAble: false
  },
  pageable: new Pageable(),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.comment){
      this.setData({
        comment: JSON.parse(options.comment)
      });
    }
    if(options.noteId){
      this.setData({
        noteId: options.noteId
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
    if(this.data.page.nomore){
      return;
    }
    this.fetchComments();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  fetchComments: function(curPage = this.data.page.page){
    if(this.data.page.loading){
      return;
    }
    this.data.page.loading = true;
    let that = this;
    request.post("/inread-api/comment/list", {
      page: curPage,
      size: this.data.page.size,
      noteId: this.data.noteId,
      commentId: this.data.comment ? this.data.comment.id : 0
    }).then(res=>{
      that.setData({
        comments: that.pageable.received(that, curPage, that.data.comments, res.data ? res.data.records : [], false)
      });
    }).catch(e=>{
      that.pageable.error(that, curPage == 1);
    }).finally(()=>{
      that.pageable.complete(that);
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
    if(!opt.detail || opt.detail.length <= 0){
      wx.showToast({
        title: "评论不能为空",
        icon: "none",
        duration: 2000
      });
    }
    this.data.submiting = true;
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
          commentPid:  that.data.comment
          ?  that.data.comment.id : that.data.currentCommentId,
        }).then(res=>{
        if(res && res.code == 0 && res.data){
          wx.showToast({
            title: "评论成功",
            icon: "none",
            duration: 2000
          });
          // 列表新增
          if(that.data.comment || res.data.toUid == 0){
            let items = [res.data];
            that.setData({
              comments: [...items ,...that.data.comments],
              'page.emptyType': Empty.content
            });
          }else{
            let index = that.indexOf(that.data.currentCommentId);
            if(index >= that.data.comments.length){
              return;
            }
            var item = that.data.comments[index];
            item.replyItems = [...item.replyItems, ...[res.data]];
            item.replyItemCount = item.replyItemCount + 1;
            var key = "comments["+ index + "]"
            this.setData({
              // 这里使用键值对方式赋值
              [key]: item
              });
          }
          that.clearInput();
        }
      }).catch(e=>{
        this.data.submiting = false;
      }).finally(()=>{
        wx.hideLoading();
        this.data.submiting = false;
      });
    },()=>{
      this.data.submiting = false;
    });
  },
  onReplyItemClick(event){
    this.setData({
      currentCommentReplyUid: event.detail.uid
    });
  },
  onClickReply(event){
    let comment = this.commentOf(event.detail.commentId);
    this.setData({
      releaseFocus: !this.data.releaseFocus,
      currentCommentId: event.detail.commentId,
      currentCommentReplyUid: event.detail.uid,
      placeholderText: comment && comment.fromUser ? '回复 ' + comment.fromUser.username : this.data.placeholderText
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
        let index = that.indexOf(event.detail);
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
          [key]: item
          }, function () {});
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
  },
  onClickMoreComment(event){
    let index = this.indexOf(event.detail);
    if(index >= this.data.comments.length){
      return;
    }
    let commentStr = JSON.stringify(this.data.comments[index]);
    wx.navigateTo({
      url: 'index?comment=' + commentStr + "&noteId=" + this.data.noteId
    });
  },
  indexOf(commentId){
    let index = 0;
    for(let pos in this.data.comments){
      if(this.data.comments[pos].id == commentId){
        break;
      }
      index++;
    }
    return index;
  },
  commentOf(commentId){
    if(this.data.comment && commentId == this.data.comment.id){
      return this.data.comment;
    }
    let index = 0;
    for(let pos in this.data.comments){
      if(this.data.comments[pos].id == commentId){
        break;
      }
      index++;
    }
    if(index < this.data.comments.length){
      return this.data.comments[index];
    }
    return null;
  },
  /**
   * 键盘失去焦点
   * @param {} e 
   */
  onBindblur(e){
    this.setData({
      releaseFocus: false
    });
    if(!this.data.submiting){
      this.clearInput();
    }
  },
  clearInput(){
    this.setData({
      submitAble: false,
      commentInputValue: '',
      currentCommentId: this.data.comment ? this.data.comment.id : 0,
      currentCommentReplyUid: this.data.comment ? this.data.comment.fromUser.id : 0,
      placeholderText: this.data.comment ? '回复 ' + this.data.comment.fromUser.username  : '说点什么吧'
    });
  }
})