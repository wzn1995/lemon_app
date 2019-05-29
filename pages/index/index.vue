<template>
	<div class="videoList">
		<div class="videoItem" v-for="(item,index) in 4" :key="index">
			<div class="user">
				<div class="left">
					<img class="user_header" src="http://p5z1781je.bkt.clouddn.com/43d626ba7bfee62c85fd42aafffb5e98" alt="">
					<div class="user_name">你有点虎</div>
				</div>
				<div class="right" @tap="del(index)">
					<span>X</span>
				</div>

			</div>
			<div class="video_detail">
				<div class="video_title">测试</div>
				<video src="http://videopub.actuive.com/3fc59ab8aeb70769875638d06a02cc0f.mp4"></video>
			</div>
			<div class="video_other">
				<div class="video_like">
					<img src="/static/矢量智能对象3.png" alt="">
					<span>111</span>
				</div>
				<div class="video_comment">
					<img src="/static/矢量智能对象1.png" alt="">
					<span>222</span>
				</div>
				<div class="video_share">
					<img src="/static/矢量智能对象2.png" alt="">
					<span>333</span>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			uni.request({
				url: "http://api-test.yixiu08.com/v1///Index/detail", //仅为示例，并非真实接口地址。
				success: (res) => {
					console.log(res.data);
					this.text = 'request success';
				}
			});
		},
		methods: {
			onPullDownRefresh() {
				//刷新
				console.log('refresh');
			},
			del(index){
				console.log(index)
			},
			onReachBottom(){
				//触底加载更多
				console.log(111111)
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
					display: flex;
					justify-content: center;
					font-size: 12px;
					color: #333;
					align-items: center;
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
