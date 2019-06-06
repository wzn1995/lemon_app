(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/myvideo"],{"3b8b":function(t,n,e){},4367:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},"6e9a":function(t,n,e){"use strict";e.r(n);var o=e("8f67"),i=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);n["default"]=i.a},"8c3c":function(t,n,e){"use strict";var o=e("3b8b"),i=e.n(o);i.a},"8f67":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{isShow:!1,videoContext:null}},created:function(){console.log(777777);var n=this;n.videoContext=t.createVideoContext(this.details.video_id+"",this)},props:["details"],methods:{show:function(){console.log(1111),this.videoContext.play(),this.isShow=!this.isShow},play:function(){console.log("开始")},onplay:function(){}}};n.default=e}).call(this,e("543d")["default"])},f1a6:function(t,n,e){"use strict";e.r(n);var o=e("4367"),i=e("6e9a");for(var u in i)"default"!==u&&function(t){e.d(n,t,function(){return i[t]})}(u);e("8c3c");var a=e("2877"),c=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/myvideo-create-component',
    {
        'components/myvideo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f1a6"))
        })
    },
    [['components/myvideo-create-component']]
]);                
