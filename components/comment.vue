<template>
	<view>
		<div class="commentList">
			<!-- commentList -->
			<!-- commentList.full_parent_id_detail.parent_comment_list -->
			<div class="commentItem" v-for="(item,index) in newCommentList" :key="index">
				<!--一级评论区 comment_top -->
				<!-- <comtop :loginMsg="loginMsg" :comment="item" :videoDetail="videoDetail"></comtop> -->
				<div class="top">
					<image class="user_head" :src="item.head_img" alt=""></image>
					<div class="info">
						<div class="user_name">{{item.nickname}}</div>
						<div class="creat_time">{{item.create_time==null?'刚刚':item.create_time}}</div>
					</div>
					<div class="user_like">
						<image :src="item.user_comment_like==0?'/static/3.png':'/static/9.png'" alt="" @tap="commentLike(item)"></image>
						<span>{{item.like_total}}</span>
					</div>
				</div>
				<!-- 一级评论在外面 -->

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
			<div class="text"><input type="text" :value='inputVal'  :placeholder="placeholder"  @input="input"></div>
			<div :style="inputVal==''?'background: #979797':'background: #ffde50'"  class="btn" @tap="submit"><span>发表</span></div>
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
				placeholder: '想说点什么...',
				user_id: '' ,//当前视频的user_id
				comment_id:'',
				
				newCommentList:'',
				// isTapLike:false
			};
		},
		components: {
			// comtop,
			comparent
		},
		props: ['commentList', 'submitDetail', 'loginMsg', 'videoDetail'],
		watch:{
			commentList(newVal,oldVal){
				this.updata()
			}
		},
		mounted(){
			// console.log(this.commentList,'显示')
			//commentList可以控制评论的显示隐藏，需要每次显示的时候都将this.newCommentList赋值，不然打开后是没有数据的
			this.newCommentList=this.commentList
		},
		methods: {
			updata(){
				this.newCommentList=this.commentList
				console.log(this.videoDetail,'拿视频的详情')
				console.log(this.newCommentList,'有没有拿到？？')
			},
			commentLike(res) {
				//评论点赞
				if (!res.user_comment_like) {
					api.commentLike({
						comment_id: res.comment_id,
						op: 1
					}, this.loginMsg.access_token).then(res => {
						console.log(res, '评论点赞')
					})
				} else {
					api.commentCancelLike({
						comment_id: res.comment_id
					}, this.loginMsg.access_token).then(res => {
						console.log(res, '评论取消点赞')
					})
				}
				this.getNewCommentList()  //重新获取评论数据
			
			},
			//获取输入内容
			input(e) {
				// 获取video_id,parent_id
				//获取评论内容
				this.inputVal = e.detail.value
				console.log(this.inputVal,999999)
				this.submitDetail.video_comment = e.detail.value
				// #ffde50
				// console.log(this.submitDetail,1000000)
			},
		
			submit() {
				// console.log(this.videoDetail,'视频详情')
				if (this.inputVal != '') {
					uni.showLoading({
						title: '加载中'
					});
					let that = this;
					// 提交评论请求
					api.commentSubmit({
						video_id: this.submitDetail.video_id,
						// parent_id: this.submitDetail.parent_id,
						parent_id: this.comment_id,
						video_comment: this.submitDetail.video_comment
					}, this.loginMsg.access_token).then(res => {
						this.$emit('addComment',{})
						this.getNewCommentList()  //重新获取评论数据
						//值清空，重新显示   想说点什么...
						this.inputVal = ''
						this.placeholder='想说点什么...'
						console.log(this.val,this.inputVal,this.placeholder,'清空')
						uni.hideLoading();
					})

				}

			},
			//点赞或者提交评论后重新获取数据
			getNewCommentList(){
				api.commentList({
					video_id:this.videoDetail.video_id,
					user_id:this.videoDetail.user_id
				},this.loginMsg.access_token).then(res=>{
					console.log(res,'新的评论数据')
					this.newCommentList=res.data.data.comment_list
				})	
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
		
				this.placeholder='回复@' + this.submitDetail.nickname
				
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
					justify-content: space-between;

					.user_name {
						// margin-bottom: 10px;
						font-size: 10px;
						color: #ccc;
					}

					.creat_time {
						font-size: 10px;
						color: #ccc;
					}
				}

				.user_like {
					display: flex;

					image {
						width: 20px;
						height: 20px;
						margin-right: 3px;
					}

					span {
						font-size: 12px;
						color: #ccc;
					}
				}
			}

			.comment_parent {
				// margin-left: 40px;
				margin: 10px 0 10px 40px;
				padding: 5px 5px;
				background: #f8f8f8;

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
		background: #fff;
		padding: 10px;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 2px solid #f8f8f8;

		.text {
			flex: 5;
			align-items: center;
			background: #f8f8f8;
			border-radius: 15px;
			margin-right: 20px;
			box-sizing: border-box;

			// height: 30px;
			// line-height: 30px;
			input {
				margin-left: 10px;
				font-size: 12px;
				color: #c9c9c9;
				height: 30px;
				line-height: 30px;
			}
		}

		.btn {
			flex: 1;
			background: #979797;
			text-align: center;
			box-sizing: border-box;
			border-radius: 5px;
			height: 30px;
			line-height: 30px;

			// align-items: center;
			// margin: auto;
			span {
				font-size: 14px;
				color: #fff;
			}
		}
	}
</style>
