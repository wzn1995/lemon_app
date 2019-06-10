<template>
	<div class="video_other">
		<div class="video_like">
			<image :src="videoIsLike==0?'/static/3.png':'/static/9.png'" @tap="videoLike(other)"></image>
			<!-- <image :src="other.user_video_like==0?'/static/3.png':'/static/9.png'" @tap="videoLike(other)"></image> -->
			<span class="like">{{otherData.user_like_total==undefined?0:otherData.user_like_total}}</span>
		</div>
		<div class="video_comment" @tap="getComment(other)">
			<image src="/static/1.png" alt=""></image>
			<span>{{other.user_comment_total==undefined?0:other.user_comment_total}}</span>
		</div>
		<!-- 这里需要使用touchstart,这个执行时机早 -->
		<button open-type="share" class="video_share" @touchstart="selectShare(other)">
			<image style="visibility: visible;" src="/static/2.png" alt=""></image>
			<span style="visibility: visible;">{{other.user_share_total==undefined?0:other.user_share_total}}</span>
		</button>
	</div>
</template>

<script>
	// import eventBus from '../main.js'
	import api from '../utils/api.js'
	export default {
		data() {
			return {
				loginMsg: '',
				videoIsLike: false,
				shareDetail: {},
				otherData:''
			};
		},
		props: ['other'],
		mounted() {
			// console.log(this.videoIsLike,1222333)
			let that = this;
			uni.getStorage({
				key: 'loginMsg',
				success: function(res) {
					that.loginMsg = res.data
					that.otherData=that.other
					console.log(that.otherData,55555)
					// console.log(that.loginMsg,445566)
				}
			})
		},
		created() {
			// console.log('组件实现功能')
		},

		methods: {
			//点击获取当前视频的评论内容,根据视频id,用户id
			getComment(res) {
				//跳转到评论页
				uni.navigateTo({
					url: `../commentList/commentList?video_id=${res.video_id}&user_id=${res.user_id}`
				});
			},
			videoLike(res) {
				// console.log(res)
				console.log(this.other,'没改变之前')
				//这里需要增加一个videoIsLike,因为不需要点赞就刷新页面
				// op不能是true/false.只能是1 /0
				let that = this;
				that.videoIsLike = (!that.videoIsLike==true? 1: 0 )  //true false     1  0
				api.videoLike({
					video_id: res.video_id,
					op: that.videoIsLike,
				}, that.loginMsg.access_token).then(res => {
					console.log(res)
					that.other=that.other
					that.otherData.user_like_total++
					//如何在组件中实现不用刷新页面，也能刷新数据？
					//组件的数据通过props接受，把props的数据放在data中，页面的数据绑定data中的数据，
					//点赞后改变data中的数据，就可以实现动态地改变数据
				})
			},



			//在组件里面没有办法触发onShareAppMessage
			selectShare(res) {
				// console.log(res, 444444)
				this.$emit('shareMsg', {
					data: res
				})
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
