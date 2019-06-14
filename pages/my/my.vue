<template>
	<div class="my">
		<div class="user">
			<img class="user_header" :src="userInfo.detail.head_img" alt="">
			<!-- <div class="user_name">{{userInfo.detail.nickname}}</div> -->
		</div>
		<div class="userInfo">
			<div class="top">
				<div class="focus">
					<span class="num">{{userInfo.detail.follow_total}}</span>
					<span class="text">关注</span>
				</div>
				<div class="fans">
					<span class="num">{{userInfo.detail.fans_total}}</span>
					<span class="text">粉丝</span>
				</div>
				<div class="works">
					<span class="num">{{userInfo.video_list.length}}</span>
					<span class="text">作品</span>
				</div>
			</div>
			<div class="mid">
				<div class="nickname">昵称:<span>{{userInfo.detail.nickname}}</span></div>
				<div class="sex">性别:<span>{{userInfo.detail.sex==0?'男':'女'}}</span></div>
				<div class="birthday">生日:<span>{{userInfo.detail.birthday==''?'未设置':userInfo.detail.birthday}}</span></div>
				<div class="city">城市:<span>{{userInfo.detail.city}}</span></div>
			</div>
			<div class="bottom">
				<div class="signature">个性签名:</div>
				<div class="content">{{userInfo.detail.signature}}</div>
			</div> 
		</div>
	</div>
</template>

<script>
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				loginMsg: '',
				userInfo:''
			}
		},
		onShow() {

		},
		onLoad() {
			let that = this
			uni.getStorage({
				key: 'loginMsg',
				success: function(res) {

					that.loginMsg = res.data
					console.log(that.loginMsg,4444)
					api.userDetail({
						user_id:that.loginMsg.user.user_id
					}).then(res => {
						console.log(res, 22222)
						that.userInfo=res.data.data
						// console.log(that.userInfo)
					})
				},
			});
	
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.my {
		padding: 30px 10px;

		.user {
			display: flex;
			justify-content: center;
			align-items: center;

			.user_header {
				width: 60px;
				height: 60px;
				border-radius: 50%;
			}

			.user_name {
				margin-left: 10px;
				font-size: 14px;
			}
		}

		.userInfo {
			padding: 10px 45px 0 45px;
			.top {
				display: flex;

				.focus,
				.fans,
				.works {
					flex: 1;
					display: flex;
					justify-content: center;
					flex-direction: column;
					text-align: center;
					padding: 10px 0;
					
					.num {
						font-size: 14px;
						font-weight: bold;
						color: #ccc;
					}

					.text {
						font-size: 12px;
						font-weight: bold;
						color: #333;
					}
				}
			}

			.mid {
				margin-top: 40px;
				.nickname,
				.sex,
				.birthday,
				.city {
					// flex: 1;
					// width: 50%;
					font-size: 14px;
					margin-bottom: 20px;
					color: #666;
					span {
						margin-left: 5px;
					}
				}
			}

			.bottom {
				padding: 10px 0;
				font-size: 14px;
				.signature {
					padding: 20px 0;
					color: #ccc;
					font-size: 16px;
				}
				.content {
					font-size: 14px;
					
				}
			}
		}
	}
</style>
