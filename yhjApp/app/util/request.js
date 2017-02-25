/**
 * Created by lanou on 2017/2/10.
 */
import queryString from 'query-string';
import lodash from 'lodash';
import config from "./config";
import Mock from 'mockjs';

//定义一个对象，方便后面导出
var request={};
//get请求
request.get=function (url,params) {
    if(params){
        //把对象转化成字符串
        //queryString.stringify：obj,&,=,将对象转化成字符串
        url+="?"+queryString.stringify(params);
    }
    return fetch(url)
        .then((response)=>response.json())
        .then((response)=>{
            //Mock.mock():解析传过来的结果
            return Mock.mock(response);
    })
}

 //post请求
 request.post=function (url,body) {
     //lodash:是一个具有一致接口、模块化、高性能等特性的 JavaScript 工具库
     var options=lodash.extend(config.header,{
         body:JSON.stringify(body)
     })
     return fetch(url,options)
         .then((response)=>response.json())
         .then((response)=>{
                 return Mock.mock(response)
         })
 }
module.exports=request;

