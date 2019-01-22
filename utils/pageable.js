var Empty = require("../component/loading-container/emptyConstant.js");

/**
 * 分页
 */
export default class Pageable{
    /**
     * 分页收到数据的处理
     * @param {当前页面上下文} context 
     * @param {当前分页默认为1的时候是刷新} curPage 
     * @param {当前页面总数据} currentData 
     * @param {接收到的数据} receivedData 
     * @param {刷新页面是否采用追加模式} append 
     */
    received(context, curPage=-1, currentData, receivedData, append=false){
      if(curPage == -1){
          curPage = context.data.page.page;
      }
        // 有数据则追加
      if(receivedData && receivedData.length > 0){
        if(append){
            currentData = [...receivedData, ...currentData];
        }else{
            // 刷新且不是追加数据，直接替换原数据
            if(curPage == 1){
                context.setData({
                    'page.nomore': false
                });
                currentData = receivedData;
            }else{
                currentData = [...currentData, ...receivedData];
            }
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
      if(!append && (!receivedData || receivedData.length < context.data.page.size)){
        context.setData({
            'page.nomore': true
        });
      }
      if(!append && receivedData && receivedData.length > 0){
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