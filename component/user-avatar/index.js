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

  },
  ready: function () {
    this.setData({
      date: util.getDateDiff(this.properties.date)
    });
  }
})
