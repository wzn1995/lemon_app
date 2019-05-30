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
			<div class="video_detail">
				<div class="video_title">{{item.title}}</div>
				<video :src="item.public_video_down_url"></video>
			</div>
			<div class="video_other">
				<div class="video_like">
					<img src="/static/矢量智能对象3.png" alt="">
					<span>{{item.user_like_total==undefined?0:item.user_like_total}}</span>
				</div>
				<div class="video_comment" @tap="getComment(item)">
					<img src="/static/矢量智能对象1.png" alt="">
					<span>{{item.user_comment_total==undefined?0:item.user_comment_total}}</span>
				</div>
				<div class="video_share">
					<img src="/static/矢量智能对象2.png" alt="">
					<span>{{item.user_share_total==undefined?0:item.user_share_total}}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	// import api from "../../api/config.js";
	// import {api} from "../../api/config.js"
	import request from "../../utils/request.js";
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
				commentList: {},
			}
		},
		onLoad() {
			//请求视频列表
			//第一次请求不发送last_id
			request("https://api.actuive.com/v1///Index/hot", 'post').then((res) => {
				console.log(res, 999999)
				this.videoList = res.data.data.video_list
				// console.log(this.videoList,333333)
			})
		},
		//下拉刷新
		onPullDownRefresh:function(){
			this.videoList={};
			// console.log(this.videoList)
			request("https://api.actuive.com/v1///Index/hot", 'post').then((res) => {
				this.videoList = res.data.data.video_list
				console.log(this.videoList,111111)
			})
			// console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//触底,上拉加载更多
		onReachBottom() {
			this.getMoreVideo();
		},
		// onReachBottom:(function () {
		// 	
		// }),

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
			},
			//点击获取当前视频的评论内容,根据视频id,用户id
			getComment(res) {
				//跳转到评论页
				uni.navigateTo({
					url: `../commentList/commentList?video_id=${res.video_id}&user_id=${res.video_id}`
				});
			},
			getMoreVideo() {
				request("https://api.actuive.com/v1///Index/hot", 'post').then((res) => {
					// console.log(res.data.data.video_list, 555555)
					res.data.data.video_list.map(item => {
						//将获取到的数据追加到数组后面
						this.videoList.push(item)
					})
					console.log(this.videoList, 666666)
				})
			}

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
				.video_title {
					padding: 10px;
				}

				video {
					width: 100%;
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
					}

					span {
						font-size: 14px;
					}
				}

			}
		}
	}
</style>
