<template>
	<div class="top">
		<image class="user_head" :src="comment.head_img" alt="" @tap="getUserInfo(comment.user_id)"></image>
		<div class="info">
			<div class="user_name">{{comment.nickname}}</div>
			<div class="creat_time">{{comment.create_time}}</div>
		</div>
		<div class="user_like">
			<image :src="comment.user_comment_like==0?'/static/3.png':'/static/9.png'" alt="" @tap="commentLike(comment)"></image>
			<span>{{comment.like_total}}</span>
			<!-- <span>{{like}}</span> -->
			
		</div>
	</div>

</template>

<script>
	import api from "../utils/api.js"
	export default {
		data() {
			return {
				'like': false
			};
		},
		props: ['comment', 'loginMsg','videoDetail'],
		mounted() {
			// console.log(this.comment,44555666)
			// this.like=this.isLike
			// console.log(this.videoDetail, 11111)
		},
		methods: {
			commentLike(res) {
				// console.log(res,8888)
				this.like = !this.like
				// console.log(this.like, 777)
				if (this.like) {
					api.commentLike({
						comment_id: res.comment_id,
						op: 1
					}, this.loginMsg.access_token).then(res => {
						//点赞
						this.comment.like_total++
						console.log(res, '评论点赞')
						this.like=true
					})
				} else {
					api.commentCancelLike({
						comment_id: res.comment_id
					}, this.loginMsg.access_token).then(res => {
						console.log(res, '评论取消点赞')
						this.comment.like_total--
						this.like=false
						//取消点赞
					})
				}
				// uni.redirectTo({
				// 	url: `../commentList/commentList?video_id=${this.videoDetail.video_id}&user_id=${this.videoDetail.user_id}`
				// })

			}
		}
	}
</script>

<style lang="scss">
	.top {
		display: flex;
		align-items: center;
		height: 40px;
		// background: #ccc;

		.user_head {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			margin-right: 10px;
			// flex: 1;
		}

		.info {
			flex: 5;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.user_name {
				// margin-bottom: 10px;
				font-size: 12px;
			}

			.creat_time {
				font-size: 12px;
			}
		}

		.user_like {
			display: flex;

			image {
				width: 20px;
				height: 20px;
			}

			span {
				font-size: 12px;
			}
		}
	}
</style>
