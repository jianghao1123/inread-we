var Empty = require("../component/loading-container/emptyConstant.js");

/**
 * 分页
 */
export default class Pageable{
    page = 1;
    size = 10;
    loading = false;
    /**
     * 分页收到数据的处理
     * @param {当前页面上下文} context 
     * @param {当前分页默认为1的时候是刷新} curPage 
     * @param {当前页面总数据} currentData 
     * @param {接收到的数据} receivedData 
     * @param {刷新页面是否采用追加模式} append 
     */
    received(context, curPage, currentData, receivedData, append=false){
        // 有数据则追加
      if(receivedData && currentData){
        if(append){
            currentData = [...receivedData, ...currentData];
        }else{
            currentData = [...currentData, ...receivedData];
        }
      }
      // 初始化页面
      if(curPage == 1){
        if((!currentData || currentData.length == 0)){
            if(context && context.data && context.data.emptyType){
                context.setData({
                    emptyType: Empty.empty
                });
            }
        }else{
            if(context && context.data && context.data.emptyType){
                context.setData({
                    emptyType: Empty.content
                });
            }
        }
      }
      if(!append && receivedData < this.size){
        if(context && context.data && context.data.nomore){
            context.setData({
                nomore: true
            });
        }
      }
      if(!append && receivedData){
        this.page++;
      }
      return currentData;
    }

    error(context, refresh){
        if(refresh && context && context.data && context.data.emptyType){
            context.setData({
                emptyType: Empty.error
            });
        }
    }

    complete(){
        this.loading = false;
        wx.stopPullDownRefresh()
    }
}