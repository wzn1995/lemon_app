<template>
	<div class="video_detail">
		<div class="video_title">{{details.title}}</div>
		<!-- :poster="details.cover_img" -->
		<video @play="onplay"  :id="details.video_id + ''" :poster="details.cover_img"  :src="details.public_video_down_url" controls></video>
		<!-- <image mode="aspectFit" @click="start" class="cover_img" :src="details.cover_img" v-if="!isShow"></image> -->
		<!-- v-bind:style="[{display:item.isPlay==true?'none':'block'}]" -->
		<!-- <image @click="show" src="/static/play.png" class="play" v-if="!isShow"></image> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				videoContext: null
			};
		},
		created() {
			console.log(777777)
			var o = this;
			o.videoContext = uni.createVideoContext(this.details.video_id + '', this);
			// console.log(o.videoContext,66666)
		},
		props: ["details"],
		methods: {
			// show() {
			// 	console.log(1111)
			// 	this.videoContext.play();
			// 	this.isShow = !this.isShow
			// },
			play() {
				console.log('开始')
			},
			onplay() {},
			// start(){
			// 	console.log(2222)
			// }
			// start(){
			// 	console.log(this)
			// 	// this.videoContext.play(); 
			// }
		}
	}
</script>

<style lang="scss">
	.video_detail {
		position: relative;

		// width:100%;
		// height: 225px;
		.video_title {
			padding: 10px;
		}

		video {
			width: 100%;
		}

		.cover_img {
			position: absolute;
			left: 0;
			bottom: 4px;
			width: 100%;
			height: 225px;
		}

		.play {
			width: 40px;
			height: 40px;
			position: absolute;
			left: 50%;
			bottom: 30%;
			transform: translate(-50%, -40%)
		}

	}
</style>
