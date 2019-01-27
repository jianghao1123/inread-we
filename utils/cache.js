class Cache{
    
    put(url, data, value, cacheTime){
        if(!cacheTime || cacheTime <= 0){
            return;
        }
        let expireTime = new Date().getTime() + cacheTime;
        let key = this.getCacheKey(url, data);
        value.inreadCacheExpireTime = expireTime;
        wx.setStorage({
            key: key,
            data: value
        });
    }

    /**
     * 获取存储数据
     * @param {*} key 
     * @param {*} resolve 
     * @param {*} reject 
     */
    get(url, data, failCallback){
        let that = this;
        let key = this.getCacheKey(url, data)
        return (resolve, reject)=>{
            wx.getStorage({
                key: key,
                success: that.getSuccess(key, failCallback, resolve, reject),
                fail: ()=>failCallback(resolve, reject)
            });
        }
    }

    /**
     * 成功
     * @param {*} store 
     */
    getSuccess(key, fail, resolve, reject){
        var that = this;
        return store=>{
            // 如果过期了移除缓存
            if (that.checkExpire(store.data)) {
                wx.removeStorage({
                    key: key
                });
                fail(resolve, reject);
            } else {
                resolve(store.data);
            }
        }
    }

    getFail(fail, resolve, reject){
        fail(resolve, reject);
    }

    checkExpire(data){
        return data.inreadCacheExpireTime < new Date().getTime();
    }

    isCache(data){
        return data.inreadCacheExpireTime;
    }

    getCacheKey(url, data){
        return url + JSON.stringify(data);
    }
    
}

module.exports = new Cache();