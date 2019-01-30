var Empty = require("../component/loading-container/emptyConstant.js");

/**
 * 分页，强制context的data种必须有一个page属性
 * @see page
 */
export default class Pageable{
    /**
     * 分页收到数据的处理
     * @param {当前页面上下文} context 
     * @param {当前分页默认为1的时候是刷新} curPage 
     * @param {当前页面总数据} currentData 
     * @param {接收到的数据} receivedData 
     */
    received(context, curPage, currentData, receivedData){
      // 有数据则追加
      if(receivedData && receivedData.length > 0){
        // 刷新直接替换原数据
        if(curPage == 1){
            context.setData({
                'page.nomore': false
            });
            currentData = receivedData;
        }else{
            currentData = [...currentData, ...receivedData];
        }
      }
      // 初始化页面
      if(curPage == 1){
        if((!currentData || currentData.length == 0)){
            context.setData({
                'page.emptyType': Empty.empty
            });
        }else{
            context.setData({
                'page.emptyType': Empty.content
            });
        }
      }
      if(!receivedData || receivedData.length < context.data.page.size){
        // 防止nomore先展示出来
        setTimeout(()=>{
            context.setData({
                'page.nomore': true
            });
        }, 200);
      }
      if(receivedData && receivedData.length > 0){
          if(curPage == 1){
            context.data.page.page = 1;
          }
          context.data.page.page = context.data.page.page + 1;
      }
      return currentData;
    }

    error(context, refresh){
        if(refresh){
            context.setData({
                'page.emptyType': Empty.error
            });
        }
    }

    complete(context){
        context.setData({
            'page.loading': false
        });
        wx.stopPullDownRefresh()
    }
}