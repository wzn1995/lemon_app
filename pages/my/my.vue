<template>
	<div class="my">
		<div class="user">
			<img class="user_header" src="http://p5z1781je.bkt.clouddn.com/43d626ba7bfee62c85fd42aafffb5e98" alt="">
			<div class="user_name">用户123456</div>
		</div>
		<div class="userInfo">
			<div class="top">
				<div class="focus">
					<span class="num">1</span>
					<span class="text">关注</span>
				</div>
				<div class="fans">
					<span class="num">1</span>
					<span class="text">粉丝</span>
				</div>
				<div class="works">
					<span class="num">1</span>
					<span class="text">作品</span>
				</div>
			</div>
			<div class="mid">
				<div class="nickname">昵称:<span>小南</span></div>
				<div class="sex">性别:<span>男</span></div>
				<div class="birthday">生日:<span>1995-12-12</span></div>
				<div class="city">城市:<span>广州</span></div>
			</div>
			<div class="bottom">
				<div class="signature">个性签名:<span>当手指（或鼠标）触摸滑动Swiper时，Swiper在浏览器每一帧通过计算滑动的距离差对wrapper进</span></div>
			</div>
		</div>
		<div class="activity">
			<div class="title">活动列表</div>
			<a href="javascript:;" class="activity_item" v-for="(item,index) in 6" :key="index">
				<img src="http://p5z1781je.bkt.clouddn.com/43d626ba7bfee62c85fd42aafffb5e98" alt="">
				<div class="activity_info">
					<span class="activity_item_title">邀请好友</span>
					<span class="activity_item_text">邀请好友</span>
				</div>
				<span class="icon">></span>
			</a>
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

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.my {
		padding: 10px;
		
		.user {
			display: flex;
			align-items: center;
			.user_header {
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}

			.user_name {
				margin-left: 10px;
				font-size: 14px;
			}
		}
		.userInfo {	
			padding: 10px 0;
			.top {
				display: flex;
				.focus,
				.fans,
				.works {
					flex: 1;
					display: flex;
					justify-content: center;
					flex-direction: column;
					text-align: center;
					.num {
						font-size: 14px;
						font-weight: bold;
					}
					.text {
						font-size: 12px;
					}
				}
			}

			.mid {
				display: flex;
				flex-wrap: wrap;
				padding: 10px 0;
				.nickname,
				.sex,
				.birthday,
				.city {
					width: 50%;
					font-size: 14px;

					span {
						margin-left: 5px;
					}
				}
			}

			.bottom {
				padding: 10px 0;
				font-size: 14px;
				span {
					margin-left: 5px;
				}
			}
		}
		.activity {
			.title {
				font-size: 14px;
				margin-bottom: 10px;
				font-weight: bold;
			}
			.activity_item {
				margin-bottom: 10px;
				background: #ccc;
				padding: 10px;
				display: flex;
				align-items: center;
				img {
					width: 20px;
					height: 20px;
					border-radius: 50%;
					// flex: 1;
				}
				.activity_info {
					margin-left: 10px;
					flex: 5;
					display: flex;
					flex-direction: column;
					.activity_item_title {
						font-size: 14px;
					}
					.activity_item_text {
						font-size: 12px;
					}
				}
				.icon {
					flex: 1;
					font-size: 16px;
					color: #333;
				}
				
			}
			
		}
	}
</style>
