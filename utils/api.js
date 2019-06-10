const request=require('./request')

const videoList = function (data,token) {  
    return request.postRequest('/Index/hot',data,token)
}
const userDetail= function(data,token){
	return  request.getRequest('/Index/userDetail',data,token)
}

const videoDetail =function(data,token){
	return  request.postRequest('/Index/detail',data,token)
}
const commentList =function(data,token){
	return  request.postRequest('/Index/comments',data,token)
}
const commentSubmit =function(data,token){
	return request.postRequest('/Video/comment',data,token)
}
//请求登录是获取token,不需要传token
const thirdLogin =function (data) {  
	return request.login('/UserAccount/thirdLogin',data)
}

const commentLike =function(data,token){
	return request.postRequest('/VideoComment/like',data,token)
}
const commentCancelLike=function(data,token){
	return request.postRequest('/VideoComment/cancelLike',data,token)
}
const videoLike =function(data,token){
	return request.postRequest('/Video/like',data,token)
}

// const videoLike =function(data,token){
// 	return request.request('/Video/like',data,'',token)
// }

module.exports = {
	videoList,
	userDetail,
	videoDetail,
	commentList,
	commentSubmit,
	thirdLogin,
	commentLike,
	commentCancelLike,
	videoLike
	
}