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
      value: '',
      observer(date) {
        let d = util.getDateDiff(date);
        this.setData({
          date: d
        });
      }
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

  }
})
