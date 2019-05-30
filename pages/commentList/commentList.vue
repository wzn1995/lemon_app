<template>
	<!-- <div>评论页</div> -->
	<div class="page">
		<div class="video_detail">
			<div class="videoBox"><video :src="videoDetail.public_video_down_url"></video></div>
			<div class="title">
				<div class="left">{{videoDetail.title}}</div>
				<div class="right">X</div>
			</div>
			<div class="video_other">
				<div class="video_like">
					<img src="/static/矢量智能对象3.png" alt="">
					<span>{{videoDetail.user_like_total==undefined?0:videoDetail.user_like_total}}</span>
				</div>
				<div class="video_comment" @tap="getComment(item)">
					<img src="/static/矢量智能对象1.png" alt="">
					<span>{{videoDetail.user_comment_total==undefined?0:videoDetail.user_comment_total}}</span>
				</div>
				<div class="video_share">
					<img src="/static/矢量智能对象2.png" alt="">
					<span>{{videoDetail.user_share_total==undefined?0:videoDetail.user_share_total}}</span>
				</div>
			</div>
		</div>
		<div class="commentList">
			<div class="commentItem" v-for="(item,index) in commentList" :key="index">
				<div class="top">
					<img class="user_head" :src="item.head_img" alt="" @tap="getUserInfo(item.user_id)">
					<div class="info">
						<div class="user_name">{{item.nickname}}</div>
						<div class="creat_time">{{item.create_time}}</div>

					</div>
					<div class="user_like">
						<img src="/static/矢量智能对象3.png" alt="">
						<span>{{item.like_total}}</span>
					</div>
				</div>
				<div class="comment">{{item.comment}}</div>
			</div>
			<div class="noMore">我也是有底线的</div>
		</div>
		<div class="submitComment">
			<div class="text"> <input type="text" placeholder="想说点什么..."></div>
			<div class="btn"><span>发表</span></div>
		</div>
	</div>
</template>

<script>
	import request from "../../utils/request.js";
	export default {
		data() {
			return {
				videoDetail: {},
				commentList: {}
			}
		},
		onLoad(option) {
			// console.log(option,54321)
			//先根据video_id获取到视频详情，下面再根据video_id和user_id获取评论内容
			request("https://api.actuive.com/v1///Index/detail", 'post', {
				video_id: option.video_id,
			}).then((video_detail) => {
				// console.log(video_detail, 1111111)
				this.videoDetail = video_detail.data.data.video_detail
				return request("https://api.actuive.com/v1///Index/comments", 'post', {
					video_id: option.video_id,
					user_id: option.user_id
				}).then((comment_detail) => {
					// console.log(comment_detail, 22222222)
					this.commentList = comment_detail.data.data.comment_list
					document.querySelector('.noMore').style.display = 'block'
				})
			})

		},
		methods: {
			getUserInfo(user_id) {
				// console.log(user_id)
				uni.navigateTo({
					url: `../userInfo/userInfo?user_id=${user_id}`
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		position: relative;

		// top: 0;
		// bottom: 0;
		.video_detail {
			.videoBox {
				video {
					width: 100%;
				}
			}

			.title {
				display: flex;
				justify-content: space-between;
				padding: 10px;

				.left {
					font-size: 14px;
				}

				.right {
					font-size: 14px
				}
			}

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

					img {
						width: 20px;
						height: 20px;
						margin-right: 5px;
					}

					span {
						font-size: 14px;
					}
				}

			}
		}

		.commentList {
			padding: 10px 20px;
			overflow: scroll;

			.commentItem {
				margin-bottom: 10px;

				.top {
					display: flex;
					align-items: center;
					height: 40px;
					background: #ccc;

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

						img {
							width: 20px;
							height: 20px;
						}

						span {
							font-size: 12px;
						}
					}
				}

				.comment {
					background: pink;
					padding-left: 40px;
				}
			}

			.noMore {
				display: none;
				height: 80px;
				line-height: 40px;
				text-align: center;
				font-size: 14px;
				color: #ccc;

			}
		}

		.submitComment {
			background: pink;
			padding: 10px;
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;

			.text {
				flex: 5;
				background: #ccc;
				border-radius: 5px;
				margin-right: 20px;
				box-sizing: border-box;
				height: 30px;

				// line-height: 30px;
				span {
					margin-left: 10px;
					font-size: 12px;
					color: #333;
				}
			}

			.btn {

				flex: 1;
				background: #333;
				text-align: center;
				box-sizing: border-box;
				border-radius: 5px;

				span {
					font-size: 14px;
					color: #ccc;
				}
			}
		}
	}
</style>
