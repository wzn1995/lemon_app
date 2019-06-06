<template>
	<div>
		<button open-type="getUserInfo" @getuserinfo="getUser">登录</button>
	</div>

</template>

<script>
	import api from "../../utils/api.js";
	export default {
		data() {
			return {

			}
		},
		onLoad() {
		
		},
		methods: {
			//使用按钮登录
			getUser(e) {
				console.log(e, 666666) //用户信息
				//返回上一层
				uni.setStorage({
					key: 'isLogin',
					data: true,
					success: function() {
						console.log('success', 5555);
					}
				});
				uni.navigateBack()
			}
		}
	}
</script>

<style>
</style>
