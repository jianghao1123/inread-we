// component/user-avatar/index.js
import util from '../../utils/util'
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
    commentId: {
      type: Number,
      value: 0
    },
    likeNum: {
      type: Number,
      value: 0
    },
    uid: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickReply(){
      this.triggerEvent('clickReply'
      , {uid: this.properties.uid, commentId: this.properties.commentId}
      , {
        bubbles: true,
        composed: true
      });
    },
    onClickLike(){
      this.triggerEvent('clickLike', this.properties.commentId, {
        bubbles: true,
        composed: true
      });
    }
  },
  ready: function () {
    this.setData({
      date: util.getDateDiff(this.properties.date)
    });
  }
})
