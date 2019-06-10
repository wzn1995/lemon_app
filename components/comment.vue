<template>
	<view>
		<div class="commentList">
			<!-- commentList -->
			<!-- commentList.full_parent_id_detail.parent_comment_list -->
			<div class="commentItem" v-for="(item,index) in commentList" :key="index">
				<!--一级评论区 comment_top -->
				<!-- <comtop :loginMsg="loginMsg" :comment="item" :videoDetail="videoDetail"></comtop> -->
				<div class="top">
					<image class="user_head" :src="item.head_img" alt="" @tap="getUserInfo(item.user_id)"></image>
					<div class="info">
						<div class="user_name">{{item.nickname}}</div>
						<div class="creat_time">{{item.create_time}}</div>
					</div>
					<div class="user_like">
						<image :src="item.user_comment_like==0?'/static/3.png':'/static/9.png'" alt="" @tap="commentLike(item)"></image>
						<span>{{item.like_total}}</span>
					</div>
				</div>
				<!-- 一级评论在外面，二级评论是评论一级评论的 -->

				<div class="comment_parent" v-for="(subItem,subIndex) in item.full_parent_id_detail.parent_comment_list" :key="subIndex">
					<!-- 二级评论区 comment_parent -->
					<comparent :comment_parent="subItem"></comparent>
					<!-- <div class="comment_parent_content" @tap="changeSubmit(subItem)"> -->
					<div class="comment_parent_content" @tap="changeSubmit(subItem)">
						{{subItem.comment}}
					</div>
				</div>
				<div class="comment" @tap="changeSubmit(item)">{{item.comment}}</div>
			</div>
			<div class="noMore">我也是有底线的</div>
		</div>

		<div class="submitComment">
			<div class="text"><input type="text" :placeholder="inputVal==''?'想说点什么...':placeholder" @input="input"></div>
			<div class="btn" @tap="submit"><span>发表</span></div>
		</div>
	</view>
</template>

<script>
	import api from "../utils/api.js";
	import comtop from './comment_top.vue';
	import comparent from './comment_parent.vue'
	export default {
		data() {
			return {
				inputVal: '',
				// submitDetail:{},
				// commentIsLike:false,
				nickname: '',
				placeholder: '',
				user_id: '' ,//当前视频的user_id
				comment_id:''
			};
		},
		components: {
			// comtop,
			comparent
		},
		props: ['commentList', 'submitDetail', 'loginMsg', 'videoDetail'],
		//组件生命周期没有mounted
		mounted() {
		
		},

		methods: {
			getUserInfo(user_id) {
				// console.log(user_id)
				uni.navigateTo({
					url: `../userInfo/userInfo?user_id=${user_id}`
				});
			},
			commentLike(res) {
				//评论点赞
				console.log(res, 8888)
				// this.like = !this.like
				// console.log(this.like, 777)
				// user_comment_like
				if (!res.user_comment_like) {
					api.commentLike({
						comment_id: res.comment_id,
						op: 1
					}, this.loginMsg.access_token).then(res => {
						//点赞
						// this.comment.like_total++
						console.log(res, '评论点赞')
					})
				} else {
					api.commentCancelLike({
						comment_id: res.comment_id
					}, this.loginMsg.access_token).then(res => {
						console.log(res, '评论取消点赞')
						// this.comment.like_total--
						//取消点赞
					})
				}
				//点赞完刷新这个页面
				uni.redirectTo({
					url: `../commentList/commentList?video_id=${this.videoDetail.video_id}&user_id=${this.videoDetail.user_id}`
				})
			},

			input(e) {
				// 获取video_id,parent_id
				//获取评论内容
				this.inputVal = e.detail.value
				this.submitDetail.video_comment = e.detail.value
				// console.log(this.submitDetail,1000000)
			},
			submit() {
				// console.log(this.videoDetail,'视频详情')
				if (this.inputVal != '') {
					let that = this;
					// 提交评论请求
					api.commentSubmit({
						video_id: this.submitDetail.video_id,
						// parent_id: this.submitDetail.parent_id,
						parent_id: this.comment_id,
						video_comment: this.submitDetail.video_comment
					}, this.loginMsg.access_token).then(res => {
						//评论成功之后，直接就刷新页面，不需要再请求了，因为commentList页面有请求
						// console.log(res, 7777777)
						uni.redirectTo({
							url: `../commentList/commentList?video_id=${this.videoDetail.video_id}&user_id=${this.videoDetail.user_id}`
						})
						//重新加载当前这个页面，看看回复信息有没有上去
						// api.commentList({
						// 	video_id: this.videoDetail.video_id,
						// 	user_id: this.videoDetail.user_id
						// },this.loginMsg.access_token)
					})
					// .then(res=>{
					// 	console.log(res,888888)
					// 	uni.redirectTo({
					// 		url: `../commentList/commentList?video_id=${this.videoDetail.video_id}&user_id=${this.videoDetail.user_id}`
					// 	})
					// })
				}

			},
			changeSubmit(res) {
				console.log(res,'什么')
				// console.log(this.submitDetail.parent_id,77788889999)
				//点击更改回复对象，需要出现 placeholder的值出现回复@ xxx
				//将点击之后的回复对象改变，并且把当前对象的名字存起来。
				// this.submitDetail.parent_id = res.user_id;
				//回复对应评论的id ,就是comment_id。不是回复user_id!!!
				this.comment_id=res.comment_id;
				this.submitDetail.parent_id = res.comment_id;
				this.submitDetail.nickname = res.nickname;
				console.log(this.submitDetail.parent_id, '有没有改变')
				// console.log(this.submitDetail.nickname,555555)
				this.placeholder = '回复@' + this.submitDetail.nickname
				//需要手动给inputVal赋值，能判断实现第二种情况
				this.inputVal = '假装有值'
				// console.log(this.placeholder,666666)
			},

		}
	}
</script>

<style lang="scss">
	.commentList {
		padding: 10px 20px;
		overflow: scroll;

		.commentItem {
			margin-bottom: 10px;

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

			.comment_parent {
				// margin-left: 40px;
				margin: 10px 0 10px 40px;
				background: #ccc;

				.comment_parent_content {
					margin-left: 25px;
					font-size: 12px;
				}
			}

			.comment {
				// background: pink;
				font-size: 14px;
				padding-left: 40px;
			}
		}

		.noMore {
			// display: flex;
			height: 80px;
			line-height: 40px;
			text-align: center;
			font-size: 14px;
			color: #ccc;
			margin-bottom: 50px;
		}
	}

	.submitComment {
		background: #f5f5f5;
		padding: 10px;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		.text {
			flex: 5;
			align-items: center;
			background: #ccc;
			border-radius: 5px;
			margin-right: 20px;
			box-sizing: border-box;

			// height: 30px;
			// line-height: 30px;
			input {
				margin-left: 10px;
				font-size: 12px;
				color: #333;
				height: 30px;
				line-height: 30px;
			}
		}

		.btn {
			flex: 1;
			background: #333;
			text-align: center;
			box-sizing: border-box;
			border-radius: 5px;
			height: 30px;
			line-height: 30px;

			// align-items: center;
			// margin: auto;
			span {
				font-size: 14px;
				color: #ccc;

			}
		}
	}
</style>
