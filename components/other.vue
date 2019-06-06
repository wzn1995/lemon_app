<template>
	<div class="video_other">
		<div class="video_like">
			<image :src="videoIsLike==0?'/static/3.png':'/static/9.png'" @tap="videoLike(other)"></image>
			<span class="like">{{other.user_like_total==undefined?0:other.user_like_total}}</span>
		</div>
		<div class="video_comment" @tap="getComment(other)">
			<image src="/static/1.png" alt=""></image>
			<span>{{other.user_comment_total==undefined?0:other.user_comment_total}}</span>
		</div>
		<button open-type="share" class="video_share" @tap="selectShare(other)">
			<image style="visibility: visible;" src="/static/2.png" alt=""></image>
			<span style="visibility: visible;">{{other.user_share_total==undefined?0:other.user_share_total}}</span>
		</button>
	</div>
</template>

<script>
	// import eventBus from '../main.js'
	export default {
		data() {
			return {
				loginMsg:'',
				videoIsLike:false
			};
		},
		props: ['other'],
		mounted() {
			
			// console.log(this.videoIsLike,1222333)
			let that=this;
			uni.getStorage({
				key: 'loginMsg',
				success: function(res) {
					that.loginMsg=res.data
					// console.log(that.loginMsg,445566)
				}
			})
		},
		methods: {
			//点击获取当前视频的评论内容,根据视频id,用户id
			
			getComment(res) {
				//跳转到评论页
				uni.navigateTo({
					url: `../commentList/commentList?video_id=${res.video_id}&user_id=${res.video_id}`
				});
			},
			videoLike(res) {
			
				console.log(res, 6666)
				// api.videoLike({
				// 	video_id: res.video_id,
				// 	op: !this.videoIsLike,
				// }, ).then(res => {
				// 	console.log(res, 7777)
				// })
				let that = this;
				uni.request({
					url: 'http://api-test.yixiu08.com/v1/Video/like',
					data: {
						video_id: res.video_id,
						op: !that.videoIsLike
					},
					method: 'POST',
					header: {
						'authorization': that.loginMsg.access_token
					},
					success: function(res) {
						//将图片换成红色的
						that.videoIsLike = !that.videoIsLike
						console.log(that.videoIsLike)
						// // console.log(res)
						// // console.log(that.loginMsg,'000000')
						// uni.setStorage({
						// 	key: 'videoIsLike',
						// 	data: that.videoIsLike
						// })
					}
				})
			},
			selectShare(res) {
				console.log(res, 444444)
				this.shareDetail = res
			},
			onShareAppMessage: function(res) {
				console.log(res, 555555)
				// var that = this
				if (res.from === 'button') {}
				return {
					title: this.shareDetail.title,
					imageUrl: this.shareDetail.cover_img,
					// path: '/pages/index/videoDetail',
					success: function(res) {
						console.log('成功', res)
					}
				}

			},
		}
	}
</script>

<style lang="scss">
	.video_other {
		display: flex;
		padding: 10px;

		.video_like,
		.video_comment,
		.video_share {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 20px;
				height: 20px;
				margin-right: 5px;
			}

			span {
				font-size: 14px;
			}
		}
	}

	button {
		visibility: hidden;
	}

	button::after {
		border: none;
		// background-color: transparent;
	}
</style>
