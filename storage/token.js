/**
 * token存储
 */
const setToken = token=> {
  let app = getApp();
  app.globalData.token = token;
  wx.setStorage({
    key: 'token',
    data: token
  });
  return token;
}

const getToken = ()=> {
  let app = getApp();
  let token = app.globalData.token;
  if(!token){
    try{
      token = wx.getStorageSync('token', null);
      let app = getApp();
      app.globalData.token = token;
    }catch(e){
    }
  }
  return token;
}

module.exports = {
  setToken: setToken,
  getToken: getToken
};