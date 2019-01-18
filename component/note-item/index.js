// component/note-item/index.js
import login from "../../utils/login"


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
      type: Number,
      value: 0
    },
    commentCount: {
      type: Number,
      value: 0
    },
    shareCount: {
      type: Number,
      value: 0
    },
    commentItems: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShareClick(event){
      if(!login.getInstance().checkLogin()){
        return;
      }
      console.log('click');
    },
    onLikeClick(event){
      if(!login.getInstance().checkLogin()){
        return;
      }
      console.log('click');
    },
    onCommentClick(event){
      if(!login.getInstance().checkLogin()){
        return;
      }
      console.log('click');
    }
  }
})
