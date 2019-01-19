/**
 * 当某个事件需要登录用户才能调用的时候，调用该类判断是否已注册
 */
var token = require('../storage/token.js')
var request = require("request")
const singleton = Symbol('singleton');



export default class Login{

    constructor() {
        if (Login.prototype.Instance === undefined) {
            Login.prototype.Instance = this;
        }
        return Login.prototype.Instance;
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new Login();
        }
        return this.instance;
    }

    /**
     * 验证登录状态
     * 如果已登录立即返回成功，未登录，会尝试去登录，尽量使用callback操作
     */
    checkLogin(successCallback, failCallback){
        if(token.getToken()){
            if(successCallback){
                successCallback();
            }
            return true;
        }else{
            this.login(successCallback, failCallback);
        }
        return false;
    }

    /**
     * 尝试登录
     */
    login(successCallback, failCallback){
        wx.showLoading({
            title: '正在登录...',
        });
        let that = this;
        wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    that.wxlogin(res, successCallback, failCallback);
                  }
                });
              }else{
                wx.hideLoading();
                wx.navigateTo({
                    url: '/pages/login/index'
                });
                if(failCallback){
                    failCallback();
                }
              }
            }
        });
    }

    wxlogin(userRes, successCallback, failCallback){
        if(!userRes){
            wx.hideLoading();
            wx.showToast({
                title: res && res.msg ? res.msg : "获取用户信息失败",
                icon: "none",
                duration: 2000
            });
            if(failCallback){
                failCallback();
            }
        }
        wx.login({
            success(res) {
              if (res.code) {
                // 发起网络请求
                request.post("/inread-api/oauth/login", {
                    code: res.code,
                    encryptedData: userRes.encryptedData,
                    iv: userRes.iv,
                    userInfo: userRes.userInfo
                }).then((resp)=>{
                    if(resp && resp.code === 0 && resp.data){
                        token.setToken(resp.data);
                        wx.showToast({
                            title: "登录成功",
                            icon: "none",
                            duration: 2000
                        });
                        if(successCallback){
                            successCallback();
                        }
                    }else{
                        if(failCallback){
                            failCallback();
                        }
                        wx.showToast({
                            title: "登录失败",
                            icon: "none",
                            duration: 2000
                        });
                    }
                }).catch(err=>{
                    if(failCallback){
                        failCallback();
                    }
                    wx.showToast({
                        title: "登录失败",
                        icon: "none",
                        duration: 2000
                    });
                }).finally(()=>{
                    wx.hideLoading();
                });
              } else {
                wx.hideLoading();
                wx.showToast({
                    title: res && res.msg ? res.msg : "登录失败",
                    icon: "none",
                    duration: 2000
                });
                if(failCallback){
                    failCallback();
                }
              }
            }
        });
    }
}