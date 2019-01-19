// component/comment-input/index.js
import request from '../../utils/request'

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
    },
    inputValue: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    submitAble: false,
    inputValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 输入框文字变动
     */
    valueChange(e){
      this.data.inputValue = e.detail.value;
      if(e.detail.value.length >= 1){
        this.setData({
          submitAble:true
        });
      }else{
        this.setData({
          submitAble:false
      });
      }
    },
    submit(){
      if(!this.data.inputValue){
        return;
      }
      this.triggerEvent('commentSubmit', this.data.inputValue);
    }
  }
})
