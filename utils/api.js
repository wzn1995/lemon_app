const request=require('./request')

const videoList = function (data) {  
    return request.postRequest('/Index/hot',data)
}
const userDetail= function(data){
	return  request.getRequest('/Index/userDetail',data)
}

const videoDetail =function(data){
	return  request.postRequest('/Index/detail',data)
}
const commentList =function(data){
	return  request.postRequest('/Index/comments',data)
}
const commentSubmit =function(data){
	return request.postRequest('/Video/comment',data)
}
const thirdLogin =function (data) {  
	return request.login('/UserAccount/thirdLogin',data)
}

const commentLike =function(data){
	return request.postRequest('/VideoComment/like',data)
}
const commentCancelLike=function(data){
	return request.postRequest('/VideoComment/cancelLike',data)
}
// const videoLike =function(data){
// 	return request.postRequest('/Video/like',data)
// }

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
	// videoLike
	
}