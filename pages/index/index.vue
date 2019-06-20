<template>
	<div class="videoList">
		<!-- <button open-type="share" style="visibility: visible;">分享</button> -->
		<div class="videoItem" v-for="(item,index) in videoList" :key="index">
			<div class="user">
				<div class="left">
					<img class="user_header" :src="item.head_img" alt="">
					<div class="user_name">{{item.nickname}}</div>
				</div>
				<div class="right" @tap="del(index)">
					×
					<!-- <icon type="cancel" size="14" style="color:#ccc"/> -->
				</div>
			</div>
			<myvideo :details="item"></myvideo>
			<other :other="item" @shareMsg='getShareDate'></other>

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
				videoList: {},
				// commentList: {},
				// videoIsLike: 0,
				shareDetail: {},
				loginMsg: '',
				// shareInfo: {}
				// 'token':
			}
		},
		components: {
			myvideo,
			other,
		},

		onShareAppMessage(res) {

			// 	//如果不是点击分享得到的数据就不让分享
			// if (res.from === 'menu') { // 来自页面内分享按钮
			// 	console.log('点击面板的分享')
			// 	// uni.showToast({
			// 	// 	title: '标题',
			// 	// 	duration: 2000
			// 	// });     //提示框无法显示
			// }
			if (res.from === 'button') { // 来自页面内分享按钮
				// console.log(res.target)
				console.log('点击按钮的分享')
				return {
					title: this.shareDetail.title,
					imageUrl: this.shareDetail.cover_img,
					path: `/pages/commentList/commentList?video_id=${this.shareDetail.video_id}&user_id=${this.shareDetail.user_id}`,
					success: function(res) {
						console.log('成功', res)
					},
					fail: function(res) {
						console.log(res, '失败')
					}
				}
			}else {
				return 
			}

		},
		created() {

			//第三方登录获取token以及user_id等,并把数据放进data中
			let that = this
			uni.login({
				provider: 'weixin',
				scopes: 'auth_base',
				success(res) {
					console.log(res.code, 333333)
					api.thirdLogin({
						type: 4,
						code: res.code
					}).then(res => {
						// console.log(res,1122321312)

						that.loginMsg = res.data
						console.log(that.loginMsg, 1111)

						//将获取到的登录信息放进storage
						uni.setStorage({
							key: 'loginMsg',
							data: res.data.data,
							success() {
								console.log('获取登录验证成功')
							}
						})
						// console.log(that.loginMsg.data.access_token,2222)
						return api.videoList({}, that.loginMsg.data.access_token)

					}).then(res => {
						that.videoList = res.data.data.video_list
						console.log(that.videoList, 444444)
					})
				}
			})
		},

		//下拉刷新
		onPullDownRefresh: function() {
			this.videoList = {};
			// console.log(this.videoList)
			api.videoList({}, this.loginMsg.data.access_token).then((res) => {
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
			let index = this.videoList.length - 1
			let last_id = this.videoList[index].video_id
			// console.log(last_id)
			this.getMoreVideo(last_id);
		},

		methods: {
			//点击删除当前这个视频
			del(index) {
				console.log(index)
				this.videoList.splice(index, 1)
			},

			getMoreVideo(last_id) {
				api.videoList({
					last_id
				}, this.loginMsg.data.access_token).then((res) => {
					res.data.data.video_list.map(item => {
						this.videoList.push(item)
					})
				})
			},
			//接受子组件传过来的值
			getShareDate(res) {
				this.shareDetail = res.data
			},

		}
	}
</script>

<style scoped lang="scss">
	.videoList {
		.videoItem {
			border-bottom: 2px solid #f8f8f8;

			.user {
				padding: 10px;
				display: flex;
				align-items: center;

				// justify-content: space-around;
				.left {
					flex: 1;
					justify-content: flex-start;
					display: flex;
					flex-wrap: nowrap;
					align-items: center;

					.user_header {
						width: 30px;
						height: 30px;
						border-radius: 50%;
					}

					.user_name {
						margin-left: 10px;
						font-size: 14px;
						font-weight: bold;
					}
				}

				.right {
					// flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					color: #ccc;
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
