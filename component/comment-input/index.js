// component/comment-input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    releaseFocus: {
      type: Boolean,
      value: false
    },
    placeholderText: {
      type: String,
      value: '说点什么吧.'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    submitAble: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击回复
     */
    valueChange(e){
      if(e.detail.value.length >= 1){
        this.setData({
          submitAble:true
        });
      }else{
        this.setData({
          submitAble:false
      });
      }
    }
  }
})
