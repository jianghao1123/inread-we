// component/note-item/index.js
import login from "../../utils/login"
import request from '../../utils/request'


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
      request.post("/inread-api/like/note"
    ,{ 
      noteId: this.properties.noteId,
    }).then(res=>{
      if(res && res.code === 0){
          this.setProperties({
            likeCount: likeCount + 1 
          });
      }
    });
    },
    onCommentClick(event){
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
