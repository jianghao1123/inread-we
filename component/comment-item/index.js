// component/comment-item/index.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatar: {
      type: String,
      value: ''
    },
    username: {
      type: String,
      value: ''
    },
    date: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    replyItems: {
      type: Array,
      value: null
    },
    commentId: {
      type: Number,
      value: 0
    },
    replyItemCount: {
      type: Number,
      value: 0
    },
    likeNum: {
      type: Number,
      value: 0
    },
    replyTo: {
      type: String,
      value: ''
    },
    noteId: {
      type: Number,
      value: 0
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
    onClickReply(){
      this.triggerEvent('clickReply', this.properties.commentId);
    },
    onMoreCommentClick(){
      this.triggerEvent('clickMoreComment', this.properties.commentId);
    }
  }
})
