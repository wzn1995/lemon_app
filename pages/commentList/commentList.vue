<template>
	<scroll-view :style="{height:screenHeight+'px'}" scroll-y="true" class="page">
		<div class="video_detail">
			<div class="videoBox"><video :animation="animationData" :style="{height:height+'px'}" :src="videoDetail.public_video_down_url"
				 :poster="videoDetail.cover_img"></video></div>
			<div class="title" v-if="isShow">
				<div class="left">{{videoDetail.title}}</div>
				<div class="right">
					<icon type="cancel" size="14" color="#ccc" @tap="handleCancel" />
				</div>
			</div>
			<com-other v-if="isShow" :others="videoDetail"></com-other>
		</div>
		<comment @addComment="handleAddComment" v-if="isShow" :loginMsg="loginMsg" :videoDetail="videoDetail" :commentList="commentList" :submitDetail="submitDetail"></comment>
		<div class="btnBox" v-if="!isShow">
			<div class="like">
				<div class="iconfont icon-aixin_shixin" @tap="videoLike(videoDetail)" :style="videoIsLike==0?'color: #f5f5f5':'color: #ff176b'"></div>
				<div class="number likeTotal">{{videoDetail.user_like_total}}</div>
			</div>
			<div class="comment">
				<div class="iconfont icon-pinglun" @tap="backToComment"></div>
				<div class="number commentIcon">{{videoDetail.user_comment_total}}</div>
			</div>

			<button open-type="share" class="shareBtn">
				<div style="visibility: visible;" class="iconfont icon-zhuanfa"></div>
			</button>
			<div class="number share">{{videoDetail.user_share_total}}</div>

		</div>
		<div v-if="!isShow" class="coverNickName">{{videoDetail.nickname}}</div>
	</scroll-view>
</template>

<script>
	import api from "../../utils/api.js";
	import myvideo from "../../components/myvideo.vue"
	import comOther from "../../components/com_other.vue"
	import comment from "../../components/comment.vue"
	import "../../iconfont/iconfont.css"
	export default {
		data() {
			return {
				videoDetail: {},
				commentList: {},
				submitDetail: {},
				loginMsg: '',
				video_id: "",
				user_id: "",
				commentLength: '',
				flag: false,
				isShow: true,
				isLarge:false,
				
				videoIsLike: '',
				animationData: {},

			}
		},
		components: {
			myvideo,
			comOther,
			comment
		},
		onLoad(option) {
			//将路由的两个参数保存
			this.video_id = option.video_id
			this.user_id = option.user_id;
			// console.log(this.user_id,this.video_id)
			// console.log(option)
			//获取storage中的登录信息
			let that = this;
			uni.getStorage({
				key: 'loginMsg',
				success(res) {
					that.loginMsg = res.data
					console.log(that.loginMsg, '登录信息')
					// console.log(that.loginMsg, 'option')
				}
			})
		},
		mounted() {
			// console.log('?????')
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					that.screenHeight = res.windowHeight //屏幕可用高度
					that.screenWidth = res.windowWidth
					// console.log(that.screenHeight,that.screenWidth)
				}
			});
			// console.log(2222222,'what')
			//先根据video_id获取到视频详情，下面再根据video_id和user_id获取评论内容
			// console.log(this.loginMsg.access_token,5555555)
			api.videoDetail({
				video_id: this.video_id
			}, this.loginMsg.access_token).then(video_detail => {
				console.log(video_detail)
				this.videoDetail = video_detail.data.data.video_detail
				//如果我点赞了，进入comment页面，请求数据，这个视频详情有一个user_video_like字段，通过这个字段去判断是不是有点赞
				//存储点赞状态
				this.videoIsLike = this.videoDetail.user_video_like
				console.log(this.videoIsLike,this.videoDetail, 11111) //这里有一个user_id,默认是这个作为回复对象
				// this.videoDetail.user_video_like  0 没点赞，  1 点赞了

				/*submitDetail*/
				this.submitDetail.video_id = this.video_id //赋值video_id
				this.submitDetail.parent_id = this.user_id; //给默认parent_id赋值
				console.log(this.submitDetail, 88888)

				//获取评论列表，根据video_id,user_id 
				return api.commentList({
					video_id: this.video_id,
					user_id: this.user_id
				}, this.loginMsg.access_token)
			}).then(comment_detail => {
				// console.log(comment_detail, 3333)
				this.commentList = comment_detail.data.data.comment_list
				this.commentLength = this.commentList.length

				// console.log(this.commentLength)
				console.log(this.commentList, 2222)
				//评论数多，只会显示10条，剩下的需要上拉加载更多

			})
		},

		onReachBottom() {
			// console.log('加载更多')
			//如果没有更多数据了，就不需要重复发请求。通过数据的长度来判断是不是有新的数据追加了
			if (!this.flag&&!this.isLarge) {
				//如果有新的数据追加，并且是视频缩小情况下
				let index = this.commentList.length - 1
				let last_id = this.commentList[index].comment_id
				// console.log(last_id,333)
				api.commentList({
					video_id: this.video_id, //当前视频id
					user_id: this.user_id, //视频的用户id
					last_id: last_id //评论最后一条的id ,在commentList中comment_id
				}, this.loginMsg.access_token).then(res => {
					// console.log(res, 444444)
					res.data.data.comment_list.map(item => {
						this.commentList.push(item)
					})
					//如果有新的数据追加进来，就是false,没有就是true

					this.commentList.length > this.commentLength ? this.flag = false : this.flag = true
					this.commentLength = this.commentList.length
					// console.log(this.commentLength)
					// console.log(this.commentList)
					// console.log(this.flag)
				})
			}
		},
		onShow() {
			var animation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})
			this.animation = animation
		},
		onShareAppMessage(res) {
			console.log(res)
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.videoDetail.title,
				imageUrl: this.videoDetail.cover_img,
				path: `/pages/commentList/commentList?video_id=${this.videoDetail.video_id}&user_id=${this.videoDetail.user_id}`,
				success: function(res) {
					console.log('成功', res)
					//分享数+1
					this.videoDetail.user_share_total++				
				},
				fail: function(res) {
					console.log(res,'失败')
				}
			}
		},

		methods: {
			handleCancel() {
				if(this.videoDetail.duration==0){
					return 
				}
				//放大
				this.isLarge=true;
				// console.log(this.commentList,'放大')
				this.isShow = false
				// console.log(this.animation)
				let rate = this.videoDetail.width / this.screenWidth
				this.height = this.screenHeight * rate
				// console.log(this.height,6666)
				if (this.height > this.screenHeight) {
					this.height = this.screenHeight
				}

				this.animation.height(this.height).step()
				this.animationData = this.animation.export()
				
				// this.commentList=this.commentList
				// console.log(this.animationData, 8888)

			},
			videoLike(data) {
				console.log(data, 999999, this.loginMsg.access_token)
				this.videoIsLike = !this.videoIsLike == true ? 1 : 0
				api.videoLike({
					video_id: data.video_id,
					op: this.videoIsLike
				}, this.loginMsg.access_token).then(res => {
					this.videoIsLike == 1 ? this.videoDetail.user_like_total++ : this.videoDetail.user_like_total--
					this.videoDetail.user_video_like = this.videoIsLike
					// console.log(res,'点赞了777777')
					//变色 #ff176b，数量加一，返回主页的时候，那边的数据也要加1


				})
			},
			backToComment() {
				//缩小
				// console.log(this.commentList,'缩小')
				// console.log(1233333)
				this.isShow = true
				this.animation.height(225).step()
				this.animationData = this.animation.export()
				this.isLarge=false;
				// this.commentList=this.commentList
			},
			handleAddComment(){
				this.videoDetail.user_comment_total++
				console.log(this.videoDetail.user_comment_total,'数量加1')
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
					// display: none;
					width: 100%;
				}
			}

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;

				.left {
					flex: 5;
					font-size: 14px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.right {
					flex: 1;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					font-size: 14px;
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

		.btnBox {
			position: absolute;
			right: 30upx;
			bottom: 120upx;
			display: flex;
			flex-direction: column;

			align-items: center;

			.like,
			.comment,
			.shareBtn {
				text-align: center;

				.iconfont {
					color: #f5f5f5;
					font-size: 30px;
					margin-bottom: 5px;
				}

				.number {
					font-size: 12px;
					color: #fff;
				}
			}

			.share {
				font-size: 12px;
				color: #fff;
			}

			.comment {
				margin: 20px 0;
			}

			button {
				// height: auto;
				line-height: 32.67px;
				// line-height:auto;
			}

			.shareBtn {
				visibility: hidden;
			}

			.shareBtn::after {
				border: none
			}


		}

		.coverNickName {
			font-size: 12px;
			position: absolute;
			bottom: 80upx;
			left: 20upx;
			color: #fff;
		}
	}
</style>
