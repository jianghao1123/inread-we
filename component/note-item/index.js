// component/note-item/index.js
import login from "../../utils/login"
import request from '../../utils/request'
import util from '../../utils/util'



Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    picture: {
      type: String,
      value: ''
    },
    author: {
      type: String,
      value: ''
    },
    avatar: {
      type: String,
      value: ''
    },
    follow: {
      type: Boolean,
      value: false
    },
    likeCount: {
      type: String,
      value: ''
    },
    commentCount: {
      type: String,
      value: ''
    },
    shareCount: {
      type: String,
      value: ''
    },
    commentItems: {
      type: Array,
      value: []
    },
    noteId: {
      type: Number,
      value: 0
    },
    index: {
      type: Number,
      value: 0
    },
    more: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShareClick(event){
    },
    onLikeClick(event){
      if(!login.getInstance().checkLogin()){
        return;
      }
      const animation = wx.createAnimation({
        duration: 420,
        timingFunction: 'ease',
      });
      animation.scale(1.15, 1.15).step();
      animation.scale(1, 1).step();
      this.setData({
        animationData: animation.export()
      });
      this.triggerEvent('likeClick'
      , {noteId: this.properties.noteId, index: this.properties.index});
    },
    onCommentClick(event){
      if(!login.getInstance().checkLogin()){
        return;
      }
      this.triggerEvent('commentClick'
      , {noteId: this.properties.noteId, index: this.properties.index});
    },
    onMoreCommentClick(e){
      this.triggerEvent('moreCommentClick'
      , {noteId: this.properties.noteId, index: this.properties.index});
    },
    onContentClick(e){
      this.triggerEvent('contentClick'
      , {noteId: this.properties.noteId, index: this.properties.index});
    }
  }
})
