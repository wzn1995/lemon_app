<template>
	<div class="top">
		<image class="user_head" :src="comment.head_img" alt="" @tap="getUserInfo(comment.user_id)"></image>
		<div class="info">
			<div class="user_name">{{comment.nickname}}</div>
			<div class="creat_time">{{comment.create_time}}</div>
		</div>
		<div class="user_like">
			<image :src="like==0?'/static/3.png':'/static/9.png'" alt="" @tap="commentLike(comment)"></image>
			<span>{{comment.like_total}}</span>
			<!-- <span>{{like}}</span> -->
		</div>
	</div>

</template>

<script>
	import api from "../utils/api.js"
	export default {
		data() {
			return {
				'like':''
			};
		},
		props:['comment','isLike'],
		mounted() {
			// console.log(this.isLike,44555666)
			this.like=this.isLike
		},
		methods:{
			commentLike(res){
				// console.log(res,8888)
				this.like=!this.like
				console.log(this.like,777)
				if(this.like){
					api.commentLike({comment_id:res.comment_id,op:1}).then(res=>{
						//点赞
						// this.comment.like_total++
						// console.log()
					})
				}else {
					api.commentCancelLike({comment_id:res.comment_id}).then(res=>{
						console.log(res)
						// this.comment.like_total--
						//取消点赞
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
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
</style>
