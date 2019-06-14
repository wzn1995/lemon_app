<template>
	<div class="video_other">
		<div class="video_like">
			<!-- <image :src="videoIsLike==0?'/static/3.png':'/static/9.png'" @tap="videoLike(others)"></image> -->
			<!-- <image :src="videoIsLike==0?'/static/3.png':'/static/9.png'"></image> -->
			<image :src="others.user_video_like==0?'/static/3.png':'/static/9.png'"></image>
			<span class="like">{{others.user_like_total==undefined?0:others.user_like_total}}</span>
		</div>
		<div class="video_comment">
			<image src="/static/1.png" alt=""></image>
			<span>{{others.user_comment_total==undefined?0:others.user_comment_total}}</span>
		</div>
	<!-- 	<button open-type="share" class="video_share" @tap="selectShare(others)">
			<image style="visibility: visible;" src="/static/2.png" alt=""></image>
			<span style="visibility: visible;">{{others.user_share_total==undefined?0:others.user_share_total}}</span>
		</button> -->
		<button class="video_share">
			<image style="visibility: visible;" src="/static/2.png" alt=""></image>
			<span style="visibility: visible;">{{others.user_share_total==undefined?0:others.user_share_total}}</span>
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginMsg: '',
				// videoIsLike:false
			};
		},
		props: ['others'],

		mounted() {
			let that = this;
			uni.getStorage({
				key: 'loginMsg',
				success: function(res) {
					that.loginMsg = res.data
					// console.log(that.loginMsg,445566)
				}
			})
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.video_other {
		display: flex;
		padding: 10px;
		width: 50%;
		.video_like,
		.video_comment,
		.video_share {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			
			image {
				width: 20px;
				height: 20px;
				margin-right: 5px;
			}

			span {
				font-size: 10px;
				color: #ccc;
			}
		}
	}

	button {
		visibility: hidden;
		padding: 0;
	}

	button::after {
		border: none;
		// background-color: transparent;
	}
</style>
