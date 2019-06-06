<template>
	<div class="my">
		<div class="user">
			<img class="user_header" :src="userInfo.detail.head_img" alt="">
			<div class="user_name">{{userInfo.detail.nickname}}</div>
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
				<div class="signature">个性签名:<span>{{userInfo.detail.signature}}</span></div>
			</div>
		</div>
		<div class="activity">
			<div class="title">活动列表</div>
			<a href="javascript:;" class="activity_item" v-for="(item,index) in 6" :key="index">
				<img src="http://p5z1781je.bkt.clouddn.com/43d626ba7bfee62c85fd42aafffb5e98" alt="">
				<div class="activity_info">
					<span class="activity_item_title">邀请好友</span>
					<span class="activity_item_text">邀请好友</span>
				</div>
				<span class="icon">></span>
			</a>
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
						// console.log(res, 22222)
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
		padding: 10px;

		.user {
			display: flex;
			align-items: center;

			.user_header {
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}

			.user_name {
				margin-left: 10px;
				font-size: 14px;
			}
		}

		.userInfo {
			padding: 10px 0;

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

					.num {
						font-size: 14px;
						font-weight: bold;
					}

					.text {
						font-size: 12px;
					}
				}
			}

			.mid {
				display: flex;
				flex-wrap: wrap;
				padding: 10px 0;

				.nickname,
				.sex,
				.birthday,
				.city {
					width: 50%;
					font-size: 14px;

					span {
						margin-left: 5px;
					}
				}
			}

			.bottom {
				padding: 10px 0;
				font-size: 14px;

				span {
					margin-left: 5px;
				}
			}
		}

		.activity {
			.title {
				font-size: 14px;
				margin-bottom: 10px;
				font-weight: bold;
			}

			.activity_item {
				margin-bottom: 10px;
				background: #ccc;
				padding: 10px;
				display: flex;
				align-items: center;

				img {
					width: 20px;
					height: 20px;
					border-radius: 50%;
					// flex: 1;
				}

				.activity_info {
					margin-left: 10px;
					flex: 5;
					display: flex;
					flex-direction: column;

					.activity_item_title {
						font-size: 14px;
					}

					.activity_item_text {
						font-size: 12px;
					}
				}

				.icon {
					flex: 1;
					font-size: 16px;
					color: #333;
				}

			}

		}
	}
</style>
