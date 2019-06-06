<template>
	<view>
		<div class="commentList">
			<div class="commentItem" v-for="(item,index) in commentList" :key="index">
				<comtop :comment="item" :isLike="commentIsLike"></comtop>		
				<div class="comment_parent" v-for="(subItem,subIndex) in item.parent_comment_list" :key="subIndex">
					<comparent :comment_parent="subItem"></comparent>
					<div class="comment_parent_content" @tap="changeSubmit(subItem)">
						{{subItem.comment}}
					</div>
				
				</div>
				<div class="comment" @tap="changeSubmit(item)">{{item.comment}}</div>
			</div>
			<div class="noMore">我也是有底线的</div>
		</div>
		
		<div class="submitComment" >
			<div class="text"><input type="text" :placeholder= "inputVal==''?'想说点什么...':placeholder" @input="input"></div>
			<div class="btn" @tap="submit"><span>发表</span></div>
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
				inputVal:'',
				// submitDetail:{},
				commentIsLike:false,
				nickname:'',
				placeholder:'',
				user_id:''  //当前视频的user_id
			};
		},
		components:{
			comtop,
			comparent
		},
		props:['commentList','videoDetail','submitDetail'],
		//组件生命周期没有mounted
		mounted(){
			//作为commentList的组件，会先被加载，所以直接输出不了值
			setTimeout(()=>{
				// console.log(this.submitDetail,445556666)
				this.user_id = this.submitDetail.parent_id
				// console.log(this.user_id,66778899)
			},300)
		},
	
		methods:{
			getUserInfo(user_id) {
				// console.log(user_id)
				uni.navigateTo({
					url: `../userInfo/userInfo?user_id=${user_id}`
				});
			},

			input(e){
				// 获取video_id,parent_id
				//获取评论内容
				this.inputVal=e.detail.value
				this.submitDetail.video_comment=e.detail.value
				// console.log(this.submitDetail,1000000)
			},
			submit(){
				let that=this;
				// 提交评论请求
				api.commentSubmit({
					video_id:this.submitDetail.video_id,
					parent_id:this.submitDetail.parent_id,
					video_comment:this.submitDetail.video_comment
				}).then(res=>{
					console.log(res,7777777)
					api.commentList({
						video_id: this.submitDetail.video_id,
						user_id: this.user_id
					})
				}).then(res=>{
					console.log(res,888888)
					uni.redirectTo({
						url: `../commentList/commentList?video_id=${this.submitDetail.video_id}&user_id=${this.submitDetail.video_id}`
					})
					
				})
			},
			changeSubmit(res){
				// console.log(this.submitDetail.parent_id,77788889999)
				//点击更改回复对象，需要出现 placeholder的值出现回复@ xxx
				//将点击之后的回复对象改变，并且把当前对象的名字存起来。
				this.submitDetail.parent_id=res.user_id;
				this.submitDetail.nickname=res.nickname;
				// console.log(this.submitDetail.nickname,555555)
				this.placeholder='回复@'+this.submitDetail.nickname
				//需要手动给inputVal赋值，能判断实现第二种情况
				this.inputVal='假装有值'
				// console.log(this.placeholder,666666)
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
				.comment_parent {
					// margin-left: 40px;
					margin: 10px 0 10px 40px;
					background: #ccc;

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
			background: #f5f5f5;
			padding: 10px;
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;

			.text {
				flex: 5;
				background: #ccc;
				border-radius: 5px;
				margin-right: 20px;
				box-sizing: border-box;
				height: 30px;
				line-height: 30px;
				input {
					margin-left: 10px;
					font-size: 12px;
					color: #333;
				}
			}

			.btn {
				flex: 1;
				background: #333;
				text-align: center;
				box-sizing: border-box;
				border-radius: 5px;
				height: 30px;
				line-height: 30px;
				// align-items: center;
				// margin: auto;
				span {
					font-size: 14px;
					color: #ccc;
					
				}
			}
		}
</style>
