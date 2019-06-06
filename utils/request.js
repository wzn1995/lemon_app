// commonUrl
// const commonUrl = "https://api.actuive.com/v1//"
const commonUrl = "http://api-test.yixiu08.com/v1"

// post请求封装
function postRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		// var that = this;
		// var postData = data;
		uni.request({
			url: commonUrl + url,
			data: data,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
		  	resolve(res)
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}

// get请求封装
function getRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		// var that = this;
		// var postData = data;

		uni.request({
			url: commonUrl + url,
			data: data,
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
					resolve(res);
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}

function login(url, data) {
	var promise = new Promise((resolve, reject) => {
		uni.request({
			url: commonUrl + url,
			data: data,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'From': 'APPLET_H5'
			},
			success: function(res) {
		  	resolve(res)
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}

module.exports = {
	postRequest,
	getRequest,
	login
}