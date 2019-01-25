// component/share-panel/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toggle: {
      type: Boolean,
      value: true,
      observer(toggle) {
        this.animate(toggle);
      }
    },
    shareCount: {
      type: String,
      value: '0'
    },
    likeCount: {
      type: String,
      value: '0'
    },
    commentCount: {
      type: String,
      value: '0'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    animate: function(toggle){
      let animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      });
      animation.translate(0, toggle ? 0 : 118).step();
      this.setData({
        animationData: animation.export()
      });
    },
    onShareClick(event){
      this.triggerEvent('shareClick');
    },
    onLikeClick(event){
      this.triggerEvent('likeClick');
    },
    onCommentClick(event){
      this.triggerEvent('commentClick');
    }
  }
})
