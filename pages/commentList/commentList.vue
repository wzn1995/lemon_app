<template>
	<scroll-view :style="{height:screenHeight+'px'}" scroll-y="true" class="page" >
		<div class="video_detail">
			<div class="videoBox"><video :animation="animationData" :style="{height:height+'px'}" :src="videoDetail.public_video_down_url" :poster="videoDetail.cover_img"></video></div>
			<div class="title" v-if="show">
				<div class="left">{{videoDetail.title}}</div>
				<div class="right">
					<icon type="cancel" size="14" color="#ccc"  @tap="handleCancel"/>
				</div>
			</div>
			<com-other  v-if="show" :others="videoDetail"></com-other>
		</div>
		<comment  v-if="show" :loginMsg="loginMsg" :videoDetail="videoDetail" :commentList="commentList" :submitDetail="submitDetail"></comment>
	</scroll-view>
</template>

<script>
	import api from "../../utils/api.js";
	import myvideo from "../../components/myvideo.vue"
	import comOther from "../../components/com_other.vue"
	import comment from "../../components/comment.vue"
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
				show:true,
				
				
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
					// console.log(that.loginMsg, 'option')
				}
			})
		},
		mounted() {
			// console.log('?????')
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					that.screenHeight = res.windowHeight//屏幕可用高度
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
				console.log(this.videoDetail, 11111) //这里有一个user_id,默认是这个作为回复对象
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
			if (!this.flag) {
				//如果有新的数据追加
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
		onShow(){
			var animation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})
			this.animation = animation
		},
		methods: {
			handleCancel(){
				this.show=false
				// console.log(this.animation)
				let rate=this.videoDetail.width/this.screenWidth
				this.height=this.screenHeight*rate
				// console.log(this.height,6666)
				if(this.height>this.screenHeight){
					this.height=this.screenHeight
				}
				
				this.animation.height(this.height).step()
				this.animationData = this.animation.export()
				console.log(this.animationData,8888)
				
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
	}
</style>
