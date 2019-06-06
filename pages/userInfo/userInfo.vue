<template>
	<div class="userInfo">
		<div class="baseInfo">
			<img class="user_head" :src="userDetail.head_img" alt="">
			<div class="user_name">
				{{userDetail.nickname}}
				<span class="sex">{{userDetail.sex==0?'男':'女'}}</span>
			</div>
		</div>
		<div class="signature">{{userDetail.signature}}</div>
		<div class="other">
			<div class="focus">
				<span class="text">关注</span><span class="num">{{userDetail.follow_total}}</span>
			</div>
			<div class="fans">
				<span class="text">粉丝</span><span class="num">{{userDetail.fans_total}}</span>
			</div>
			<div class="btn">+关注</div>
		</div>
		<div class="works">
			<h4>他的作品</h4>
			<div class="hisWorks">
				<div v-for="(item,index) in videoList" :key="index" :class="index%3==1?'work_item special':'work_item'">
					<img :src="item.cover_img" alt="">
					<div class="other">
						<img src="/static/矢量智能对象3.png" alt="">
						<span>{{item.user_like_total}}</span>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				userDetail:{},
				videoList:[]
			};
		},
		onLoad(option) {
			// console.log(option, 555555)
			//获取用户详情
			// request("https://api.actuive.com/v1///Index/userDetail", 'get', {
			// 	user_id: option.user_id
			// }).then((res) => {
			// 	console.log(res, 111111)
			// 	this.userDetail=res.data.data.detail
			// 	this.videoList=res.data.data.video_list
			// })
			api.userDetail({user_id: option.user_id}).then((res)=>{
				// console.log(res,99999)
				this.userDetail=res.data.data.detail
				this.videoList=res.data.data.video_list
				console.log(this.userDetail,44444)
				console.log(this.videoList,55555)
			})
			
		}
		//上拉加载，请求/User/VideoList，传入last_id,page_size
	}
</script>

<style lang="scss">
	.userInfo {
		.baseInfo {
			padding: 10px;
			display: flex;
			align-items: center;

			.user_head {
				width: 30px;
				height: 30px;
				border-radius: 50%;
			}

			.user_name {
				margin-left: 10px;
				font-size: 14px;
				font-weight: bold;

				.sex {
					margin-left: 5px;
				}
			}
		}

		.signature {
			padding: 10px;
			font-size: 12px;
			color: #ccc;
		}

		.other {
			padding: 10px;
			display: flex;
			font-size: 14px;
			align-items: center;

			// flex-direction: flex-start;
			.focus,
			.fans {
				flex: 1;
				display: flex;
				align-items: center;
			}

			.num {
				margin-left: 5px;
				font-weight: bold;
			}

			.text {
				margin-top: -1px;
			}

			.fans {
				flex: 4;
			}

			.btn {
				flex: 1;
				border-radius: 5px;
				// width: 40px;
				text-align: center;
				height: 30px;
				line-height: 30px;
				background: hotpink;
				color: #fff;
				font-size: 12px;
			}
		}

		.works {
			h4 {
				font-size: 14px;
				padding: 10px;
			}

			.hisWorks {
				padding: 5px;
				display: flex;
				flex-wrap: wrap;
				.work_item {
					width: 32.3%;
					height: 180px;
					position: relative;
					margin-bottom: 5px;
					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						
					}
					.other {
						position: absolute;
						left: 3px;
						bottom: 3px;
						color: #fff;
						img {
							width: 15px;
							height: 15px;
							margin-right: 5px;
						}
					}
				}
				.special {
					margin-left: 5px;
					margin-right: 5px;
				}

			}
		}

	}
</style>
