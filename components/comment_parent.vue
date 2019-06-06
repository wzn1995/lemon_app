<template>
	<view>
		<div class="comment_parent_top">
			<image class="head_img" :src="comment_parent.head_img" alt></image>
			<span class="nickname">{{comment_parent.nickname}}</span>
			<div class="comment_time">{{comment_parent.create_time}}</div>
		</div>
	<!-- 	<div class="comment_parent_content" @tap="changeSubmit(comment_parent.user_id)">
			{{comment_parent.comment}}
		</div> -->
	</view>
</template>

<script>
	import api from "../utils/api.js"
	export default {
		data() {
			return {

			};
		},
		props:['comment_parent']
	}
</script>

<style lang="scss">
	.comment_parent_top {

		display: flex;
		align-items: center;

		.head_img {
			width: 20px;
			height: 20px;
			border-radius: 50%;
		}

		.nickname {
			margin-left: 5px;
			margin-right: 5px;
			font-size: 12px;
		}

		.comment_time {
			font-size: 12px;
		}
	}

	.comment_parent_content {
		margin-left: 25px;
		font-size: 12px;
	}
</style>
