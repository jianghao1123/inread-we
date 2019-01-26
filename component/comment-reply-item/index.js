// component/comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user: {
      type: String,
      value: ""
    },
    // 当前回复者id
    uid: {
      type: Number,
      value: ""
    },
    comment: {
      type: String,
      value: ""
    },
    // 回复谁
    replyUser: {
      type: String,
      value: ''
    },
    noteId: {
      type: String,
      value: ''
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
    onReplyItemClick(){
      this.triggerEvent('replyItemClick'
      , {uid: this.properties.uid
        , noteId: this.properties.noteId},{
        composed: true,
        bubbles: true
      });
    }
  }
})
