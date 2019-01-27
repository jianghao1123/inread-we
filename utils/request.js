import {request} from 'wx-request';
import cache from 'cache';
import { requestFunc } from './wx-request.js';

var token = require('../storage/token.js')
const API_BASE_URL = 'https://inread.matrix22.com'


function get(url, data, cacheEnable=false){
    return requestAll(url, data, 'GET',cacheEnable)
}

function post(url, data, cacheEnable=false){
    return requestAll(url, data, 'POST',cacheEnable)
}

function requestAll(url, data, method, cacheEnable){
    let object = {
      url: API_BASE_URL + url,
      data: data,
      method: method,
      header: {
          'content-type': 'application/json',
          "Inread-Auth-Token": token.getToken()
      }
    };
    if(cacheEnable){
      return new Promise(cache.get(url, data, requestFunc(object)))
      .then(res=>{
        if(cache.isCache(res)){ 
        // 从缓存中取的数据
        }else{
          console.log(res);
          putCache(url, data, res);
        }
        return res.data;
      });
    }else{
      return request(object).then(res=>{
        console.log(res);
        if(!res || !res.data || res.data.code != 0){
          // 需要登录
          if(res && res.data && res.data.code == 30000){
            wx.navigateTo({
              url: 'pages/login/index'
            });
          }else{
            wx.showToast({
              title: res && res.data && res.data.msg ? res.data.msg : "系统繁忙，请稍后重试",
              icon: "none",
              duration: 2000
            });
          }
        }
        if(cacheEnable){
          putCache(url, data, res);
        }
        return res.data;
      });
    }
}

function putCache(url, data, res){
  if(res 
    && res.data 
    && res.data.code == 0 
    && res.data.data 
    && res.data.expireTime
    && res.data.expireTime > 0){
    if(res.data.data.hasOwnProperty('records')){
      if(res.data.data.records && res.data.data.records.length > 0){
        cache.put(url, data, res, res.data.expireTime);
      }
    }else{
      cache.put(url, data, res, res.data.expireTime);
    }
  }
}


/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
    var Promise = this.constructor;
    return this.then(
      function (value) {
        Promise.resolve(callback()).then(
          function () {
            return value;
          }
        );
      },
      function (reason) {
        Promise.resolve(callback()).then(
          function () {
            throw reason;
          }
        );
      }
    );
}

module.exports = {
  get: get,
  post: post
};