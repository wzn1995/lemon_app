<template>
	<!-- <div>评论页</div> -->
	<div class="page">
		<div class="video_detail">
			<div class="videoBox"><video :src="videoDetail.public_video_down_url" :poster="videoDetail.cover_img"></video></div>
			<div class="title">
				<div class="left">{{videoDetail.title}}</div>
				<div class="right">X</div>
			</div>
			<others :others="videoDetail"></others>
		</div>
		<comment :commentList="commentList" :videoDetail="videoDetail" :submitDetail="submitDetail"></comment>

	</div>
</template>

<script>
	import api from "../../utils/api.js";
	import myvideo from "../../components/myvideo.vue"
	import others from "../../components/others.vue"
	import comment from "../../components/comment.vue"
	export default {
		data() {
			return {
				videoDetail: {},
				commentList: {},
				submitDetail: {},
			}
		},
		components: {
			myvideo,
			others,
			comment
		},
		onLoad(option) {
			// console.log(option,54321)
			//先根据video_id获取到视频详情，下面再根据video_id和user_id获取评论内容
			api.videoDetail({
				video_id: option.video_id
			}).then(video_detail => {
				this.videoDetail = video_detail.data.data.video_detail
				console.log(this.videoDetail, 11111) //这里有一个user_id,默认是这个作为回复对象

				this.submitDetail.video_id = this.videoDetail.video_id //赋值video_id
				this.submitDetail.parent_id = this.videoDetail.user_id; //给默认parent_id赋值
				console.log(this.submitDetail, 88888)
				return api.commentList({
					video_id: option.video_id,
					user_id: option.user_id
				})
			}).then(comment_detail => {
				// console.log(comment_detail, 3333)
				this.commentList = comment_detail.data.data.comment_list
				console.log(this.commentList,2222)
				// document.querySelector('.noMore').style.display = 'block'
			})

		},
		onReachBottom() {
			console.log('加载更多')
			let index=this.commentList.length-1
			let last_id=this.commentList[index].comment_id
			// console.log(last_id,333)
			api.commentList({
				//这些数据在videoDetail中
				video_id: this.videoDetail.video_id,  //当前视频id
				user_id: this.videoDetail.user_id,		//视频的用户id
				last_id: last_id					//评论最后一条的id ,在commentList中comment_id
			}).then(res=>{
				console.log(res,444444)
				res.data.data.comment_list.map(item=>{
					this.commentList.push(item)
				})
				
				console.log(this.commentList)
			})
		},
		methods: {

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
		}
	}
</style>
