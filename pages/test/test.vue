<template>
	<view class="body-view">
		<scroll-view class="tab_menu" scroll-x="true" :scroll-left="scrollLeft">
			<!-- <block v-for="(item,index) in tab" :key="index"> -->
			<view class="tab-view" v-bind:id="'tabNum'+index" @click="switchTab(index)" v-for="(item,index) in tab" :key="index">
				<view :class="(currentTab==index ? 'tab-act' : 'tab')">
					<view class="tab-txt">{{item}}</view>
					<view class="tab-bottom">
						<view class="tab-bottom-color"></view>
					</view>
				</view>
			</view>
			<!-- </block> -->
		</scroll-view>
		<swiper :current="currentTab" class="swiper-box-list" duration="300" @change="swiperChange">
			<swiper-item v-for="(item,index) in 3" :key="index">
				<scroll-view class="swiper-one-list" scroll-y="true" @scrolltolower="loadMore(index)">
					<!-- <block> -->
						<view class="swiper-list-entity">
							<img :src="swiperDateList.imglist[index]" alt="">
							<img :src="swiperDateList.imglist[index]" alt="">
							<img :src="swiperDateList.imglist[index]" alt="">
							<img :src="swiperDateList.imglist[index]" alt="">
							<!-- <p>{{swiperDateList.text[index]}}</p> -->
						</view>
					<!-- </block> -->
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {

		data() {
			return {
				scrollLeft: 0,
				currentTab: 1,
				tab: ['关注', '推荐', '发现'],
				swiperDateList: {
					imglist: ['http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg',
							'http://img4.imgtn.bdimg.com/it/u=2153937626,1074119156&fm=26&gp=0.jpg',
							'http://img2.imgtn.bdimg.com/it/u=234634259,4236876085&fm=26&gp=0.jpg'
						],
					text:[1,2,3]
					
				}
			}
		},

		onLoad() {
			//初始化数据
			// for (var i = 0; i < this.swiperDateList.length; i++) {
			// 	this.getDateList(i);
			// }
		},
		methods: {
			switchTab: async function(current) { //点击其中一个 tab
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
				}
			},
			swiperChange: async function(e) {
				let index = e.target.current;
				console.log(index)
				this.setScrollLeft(index);
				this.currentTab = index;
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			},
			getWidth: function(id) { //得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			loadMore: function(tabIndex) {
				console.log('正在加载更多数据。。。')
				// this.getDateList(tabIndex);
			},
			// getDateList: function(tabIndex) {
			// 	for (var i = 0; i < 3; i++) {
			// 		var entity = this.tab[tabIndex];
			// 	
			// 	}
			// 	console.log(entity)
			// }
		}
	};
</script>
<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		background: rgba(249, 249, 249, 1);
	}

	.body-view {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: 100%;
		align-items: flex-start;
		justify-content: center;

		.tab_menu {
			display: flex;
			// display: none;
			// justify-content: space-around;
			text-align: center;
			white-space: nowrap;
			width: 100%;
			background-color: #FFFFFF;

			// height: 112upx;
			/* 在这里设置导航条高度 */
			.tab-view {
				display: inline-block;
				white-space: nowrap;
				height: 100%;

				.tab {
					margin-left: 25upx;
					margin-right: 25upx;
					position: relative;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.tab-txt {
						height: 40upx;
						font-size: 28upx;
						font-weight: 400;
						color: rgba(154, 154, 154, 1);
						line-height: 40upx;
					}

					.tab-bottom {
						position: absolute;
						bottom: 0;
						width: 100%;

						.tab-bottom-color {
							width: 60%;
							height: 4upx;
						}
					}
				}

				.tab-act {
					/* 在这里写 单个按钮样式 */
					margin-left: 25upx;
					margin-right: 25upx;
					position: relative;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.tab-txt {
						height: 40upx;
						font-size: 28upx;
						font-weight: 400;
						color: rgba(0, 170, 255, 1);
						line-height: 40upx;
					}

					.tab-bottom {
						position: absolute;
						bottom: 0;
						width: 100%;
						display: flex;
						justify-content: center;

						.tab-bottom-color {
							width: 60%;
							height: 4upx;
							background: rgba(0, 170, 255, 1);
						}
					}
				}
			}
		}

		.swiper-box-list {
			flex: 1;
			width: 100%;
			height: auto;
			background-color: #FFFFFF;

			.swiper-one-list {
				height: 100%;
				width: 100%;

				.swiper-list-entity {
					width: 100%;
					height: 112upx;
					// text-align: center;
					display: flex;
					flex-wrap: wrap;
					// align-items: center;
					// justify-content: center;

				}
			}
		}
	}
</style>
