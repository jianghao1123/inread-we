/**
 * token存储
 */
  const setToken = token=> {
    wx.setStorage({
      key: 'token',
      data: token
    })
  }

  const getToken = ()=> {
    try {
      let token = wx.setStorageSync('token', '')
      return token;
    } catch (e) {
    }
    return ''
  }

module.exports = {
  setToken: setToken,
  getToken: getToken
};