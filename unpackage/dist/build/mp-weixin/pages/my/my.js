(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"4e5e":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return u})},"55c6":function(n,t,e){"use strict";e.r(t);var o=e("90da"),u=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,function(){return o[n]})}(a);t["default"]=u.a},"90da":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(e("156a"));function u(n){return n&&n.__esModule?n:{default:n}}var a={data:function(){return{loginMsg:"",userInfo:""}},onShow:function(){},onLoad:function(){var t=this;n.getStorage({key:"loginMsg",success:function(n){t.loginMsg=n.data,console.log(t.loginMsg,4444),o.default.userDetail({user_id:t.loginMsg.user.user_id}).then(function(n){console.log(n,22222),t.userInfo=n.data.data})}})},methods:{}};t.default=a}).call(this,e("543d")["default"])},"9d32":function(n,t,e){},db78:function(n,t,e){"use strict";var o=e("9d32"),u=e.n(o);u.a},f4b4:function(n,t,e){"use strict";e.r(t);var o=e("4e5e"),u=e("55c6");for(var a in u)"default"!==a&&function(n){e.d(t,n,function(){return u[n]})}(a);e("db78");var r=e("2877"),c=Object(r["a"])(u["default"],o["a"],o["b"],!1,null,"2b2c0d24",null);t["default"]=c.exports}},[["52d4","common/runtime","common/vendor"]]]);