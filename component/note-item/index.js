// component/note-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: String,
      value: '01-01'
    },
    title: {
      type: String,
      value: '你好这是是计算机时间胜多负少的'
    },
    content: {
      type: String,
      value: '这里是文字这里我设置了一个渐入的动画，删掉也没关系。注意最后一个.page-state-container~view这里是将class为page-state-container之后的view全部隐藏。如果模板之后想隐藏的不是view可以定义一个新class。我一般都用view作为container，所以这里就直接写了view。为了使内容竖直居中，我将所有页面都设置了最小高度为100%，暂时还没发现什么副作用，发现的朋友可以在评论中指出'
    },
    picture: {
      type: String,
      value: 'https://s11.mogucdn.com/p2/170413/upload_86dkh4e886991g9lji7a6g5c530ji_400x400.jpg'
    },
    author: {
      type: String,
      value: 'ss'
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
    isLiked: {
      type: Boolean,
      value: false
    },
    commentItems: {
      type: Array,
      value: []
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
