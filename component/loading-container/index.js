// component/loading-abnor/index.js
var EmptyConstant = require("emptyConstant.js");
var ErrorConstabt

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    emptyType: {
      type: Number,
      value: EmptyConstant.content
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    error: EmptyConstant.error,
    empty: EmptyConstant.empty,
    loading: EmptyConstant.loading,
    content: EmptyConstant.content
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
