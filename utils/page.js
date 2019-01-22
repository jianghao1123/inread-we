var Empty = require("../component/loading-container/emptyConstant.js");

export default class PageLoad{
    nomore = true;
    page = 1;
    size = 10;
    loading = false;
    emptyType = Empty.loading;
}