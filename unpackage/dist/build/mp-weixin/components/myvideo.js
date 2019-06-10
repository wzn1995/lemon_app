(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/myvideo"],{3054:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return u})},6281:function(t,n,e){},"85dc":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{isShow:!1,videoContext:null}},created:function(){console.log(777777);var n=this;n.videoContext=t.createVideoContext(this.details.video_id+"",this)},props:["details"],methods:{play:function(){console.log("开始")},onplay:function(){}}};n.default=e}).call(this,e("543d")["default"])},be27:function(t,n,e){"use strict";var o=e("6281"),u=e.n(o);u.a},cfdd:function(t,n,e){"use strict";e.r(n);var o=e("85dc"),u=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=u.a},e591:function(t,n,e){"use strict";e.r(n);var o=e("3054"),u=e("cfdd");for(var i in u)"default"!==i&&function(t){e.d(n,t,function(){return u[t]})}(i);e("be27");var c=e("2877"),a=Object(c["a"])(u["default"],o["a"],o["b"],!1,null,null,null);n["default"]=a.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/myvideo-create-component',
    {
        'components/myvideo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e591"))
        })
    },
    [['components/myvideo-create-component']]
]);                
