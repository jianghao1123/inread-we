const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDateDiff(dateStr) {
  if(dateStr.indexOf('-') == -1){
    return dateStr;
  }
  var publishTime = getDateTimeStamp(dateStr) / 1000,
  d_seconds,
  d_minutes,
  d_hours,
  d_days,
  timeNow = parseInt(new Date().getTime() / 1000),
  d,

  date = new Date(publishTime * 1000),
  Y = date.getFullYear(),
  M = date.getMonth() + 1,
  D = date.getDate(),
  H = date.getHours(),
  m = date.getMinutes(),
  s = date.getSeconds();
  //小于10的在前面补0
  if (M < 10) {
          M = '0' + M;
  }
  if (D < 10) {
          D = '0' + D;
  }
  if (H < 10) {
          H = '0' + H;
  }
  if (m < 10) {
          m = '0' + m;
  }
  if (s < 10) {
          s = '0' + s;
  }

  d = timeNow - publishTime;
  d_days = parseInt(d / 86400);
  d_hours = parseInt(d / 3600);
  d_minutes = parseInt(d / 60);
  d_seconds = parseInt(d);

  if (d_days > 0 && d_days < 3) {
          return d_days + '天前';
  } else if (d_days <= 0 && d_hours > 0) {
          return d_hours + '小时前';
  } else if (d_hours <= 0 && d_minutes > 0) {
          return d_minutes + '分钟前';
  } else if (d_seconds < 60) {
          if (d_seconds <= 0) {
                  return '刚刚';
          } else {
                  return d_seconds + '秒前';
          }
  } else if (d_days >= 3 && d_days < 30) {
          return M + '-' + D + ' ' + H + ':' + m;
  } else if (d_days >= 30) {
          return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
  }
}
function getDateTimeStamp(dateStr) {
  return Date.parse(dateStr);
}

function isNumber(value) {
  var patrn = /^(-)?\d+(\.\d+)?$/;
  if (patrn.exec(value) == null || value == "") {
    return false
  } else {
    return true
  }
}

/**
 *  格式化数字 小于0的将会返回空字符串
 * @param {当前数字} value 
 */
function formatCount(value){
   if(!isNumber(value)){
     return value;
   }
   value = Number(value);
   if(value <= 0){
     return '';
   }
   if(value < 1000){
     return value;
   }
   if(value < 10000){
     return (value / 1000.0).toFixed(1) + 'k';
   }
   if(value < 10000000){
     return (value / 10000).toFixed(1) + 'w';
   }
   if(value < 100000000){
     return (value / 10000000).toFixed(1) + 'kw';
   }
   return (value / 100000000).toFixed(1) + 'm';
}
    

module.exports = {
  formatTime: formatTime,
  getDateDiff: getDateDiff,
  isNumber: isNumber,
  formatCount: formatCount
}
