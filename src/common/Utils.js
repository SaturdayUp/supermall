//防抖函数
export function debounce(func,delay){
  //定义一个定时器，并初始化为null
  let timer=null
  //返回一个函数，可以传入多个参数
  return function (...args){
    //如果当前定时器不为空，那么清空当前定时器
    if (timer) clearTimeout(timer)
    //重新设置定时器，重新开始计时
    timer=setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
//封装的日期格式化函数
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


