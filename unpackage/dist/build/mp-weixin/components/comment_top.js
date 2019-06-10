(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/comment_top"],{"0f2f":function(t,n,e){},"818c":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return c})},9555:function(t,n,e){"use strict";e.r(n);var o=e("818c"),c=e("9c8c");for(var i in c)"default"!==i&&function(t){e.d(n,t,function(){return c[t]})}(i);e("c49c");var u=e("2877"),l=Object(u["a"])(c["default"],o["a"],o["b"],!1,null,null,null);n["default"]=l.exports},"9c8c":function(t,n,e){"use strict";e.r(n);var o=e("c282"),c=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=c.a},c282:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(e("156a"));function c(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{like:!1}},props:["comment","loginMsg","videoDetail"],mounted:function(){},methods:{commentLike:function(t){var n=this;this.like=!this.like,this.like?o.default.commentLike({comment_id:t.comment_id,op:1},this.loginMsg.access_token).then(function(t){n.comment.like_total++,console.log(t,"评论点赞"),n.like=!0}):o.default.commentCancelLike({comment_id:t.comment_id},this.loginMsg.access_token).then(function(t){console.log(t,"评论取消点赞"),n.comment.like_total--,n.like=!1})}}};n.default=i},c49c:function(t,n,e){"use strict";var o=e("0f2f"),c=e.n(o);c.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/comment_top-create-component',
    {
        'components/comment_top-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9555"))
        })
    },
    [['components/comment_top-create-component']]
]);                
