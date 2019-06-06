<template>
	<div class="videoList">
		<div class="videoItem" v-for="(item,index) in videoList" :key="index">
			<div class="user">
				<div class="left">
					<img class="user_header" :src="item.head_img" @tap="getUserInfo(item.user_id)" alt="">
					<div class="user_name">{{item.nickname}}</div>
				</div>
				<div class="right" @tap="del(index)">X</div>
			</div>
			<myvideo :details="item"></myvideo>
			<other :other="item"></other>
		
		</div>

	</div>
</template>

<script>
	import api from "../../utils/api.js"
	import myvideo from "../../components/myvideo.vue"
	import other from "../../components/other.vue"

	export default {
		data() {
			return {
				videoList: {
					// title: "",
					// user_like_total: "",
					// user_comment_total: "",
					// user_share_total: "",
					// public_video_down_url: "",
					// user_id: "",
					// video_id: ""
				},
				// commentList: {},
				// videoIsLike: 0,
				shareDetail: {},
				loginMsg:''
				// 'token':
			}
		},
		components: {
			myvideo,
			other,
		},
		created() {
			//第三方登录获取token以及user_id等
			uni.login({
				provider: 'weixin',
				scopes: 'auth_base',
				success(res) {
					console.log(res.code, 333333)
					api.thirdLogin({
						type: 4,
						code: res.code
					}).then(res => {
						//将获取到的登录信息放进storage
						uni.setStorage({
							key: 'loginMsg',
							data: res.data.data,
							success() {
								console.log('获取登录验证成功')
							}
						})
					})
				}
			})
		},

		mounted() {
			
			//获取到storage的数据，放进data中
			let that=this;
			uni.getStorage({
				key: 'loginMsg',
				success: function(res) {
					that.loginMsg=res.data
					console.log(that.loginMsg,445566)
				}
			})

			//请求视频列表
			//第一次请求不发送last_id
			api.videoList().then((res) => {	
				this.videoList = res.data.data.video_list
				console.log(this.videoList, 444444)
			})
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.videoList = {};
			// console.log(this.videoList)
			api.videoList().then((res) => {
				// console.log(res, 999999)
				this.videoList = res.data.data.video_list
			})
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//触底,上拉加载更多
		onReachBottom() {
			console.log('触底了')
			// console.log(this.videoList)
			let index=this.videoList.length-1
			let last_id=this.videoList[index].video_id
			// console.log(last_id)
			this.getMoreVideo(last_id);
		},

		methods: {
			//点击用户头像的时候，显示用户的详情，根据user_id获取用户资料
			getUserInfo(user_Id) {
				// console.log(userId, 66666)
				uni.navigateTo({
					url: `../userInfo/userInfo?user_id=${user_Id}`
				});
			},
			//点击删除当前这个视频
			del(index) {
				console.log(index)
				this.videoList.splice(index, 1)
			},
		
			getMoreVideo(last_id) {
				api.videoList({
					last_id
				}).then((res) => {
					res.data.data.video_list.map(item => {
						this.videoList.push(item)
					})
				})
			},

		}
	}
</script>

<style scoped lang="scss">

	.videoList {
		.videoItem {
			border-bottom: 2px solid #ccc;

			.user {
				padding: 10px;
				display: flex;

				// justify-content: space-around;
				.left {
					flex: 1;
					justify-content: flex-start;
					display: flex;
					flex-wrap: nowrap;
					align-items: center;

					.user_header {
						width: 20px;
						height: 20px;
						border-radius: 50%;
					}

					.user_name {
						margin-left: 10px;
					}
				}

				.right {
					// flex: 1;
					justify-content: center;
					font-size: 12px;
					color: #333;
				}

			}

			.video_detail {
				position: relative;

				// width:100%;
				// height: 225px;
				.video_title {
					padding: 10px;
				}

				video {
					width: 100%;
				}

				.cover_img {
					position: absolute;
					left: 0;
					bottom: 4px;
					width: 100%;
					height: 225px;
				}

				.play {
					width: 40px;
					height: 40px;
					position: absolute;
					left: 50%;
					bottom: 30%;
					transform: translate(-50%, -40%)
				}

			}
		}
	}
</style>
