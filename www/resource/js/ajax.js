/* name: Ajax
/* @params: method, url, data, success, type
/* @return: json, script
/* @author: cdll
/*/
function Ajax(method, url, data, success, type){
  if(!!type){
    if(type== 'script'){
      loadJS(url, success);
    }
    return
  }
  //创建一个兼容的XMLHttpRequest对象
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    //向服务器发送请求
    //method：请求的类型；GET 或 POST
    //url：请求的URL
    //async：true(异步)或 false(同步)
  if(method.toUpperCase() == "GET" && data){
    url += "?" + data;
  }
  xhr.open(method, url, true);
  if(method.toUpperCase() == 'POST'){
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    //string：仅用于 POST 请求
    xhr.send(data);
    /*
    在以下情况中，请使用 POST 请求：
    无法使用缓存文件（更新服务器上的文件或数据库）
    向服务器发送大量数据（POST 没有数据量限制）
    发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
    */
  }
  else{
    xhr.send();
  }
  //存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数
  xhr.onreadystatechange = function(){
    /*
    0: 请求未初始化
    1: 服务器连接已建立
    2: 请求已接收
    3: 请求处理中
    4: 请求已完成，且响应已就绪
    */
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        success && success(xhr.responseText);
      }
      else{
        console.warn(xhr.status, JSON.parse(xhr.responseText))
//		    console.error("(T.T)//不好意思，服务器出了点小问题，请重新刷新一下" + xhr.status);
      }
    }
  }
  function loadJS(url, callback) {
    var doc = document, script = doc.createElement('script'), body = doc.getElementsByTagName('body')[0];
    script.type = 'text/javascript';
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback && callback();
        }
      }
    } else {
      script.onload = function() {
        callback && callback();
      }
    }
    script.src = url;
    body.appendChild(script);
  }
}
