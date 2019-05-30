//注册
export const regIster = (data) => {
  return axios.post(LongURL('/UserAccount/register'), Object.assign({}, data))
}
//发送验证码
export const registerSms = (data) => {
  return axios.post(LongURL('/UserAccount/registerSms'), Object.assign({}, data))
}
//登陆
export const loginByPwd = (data) => {
  return axios.post(LongURL('/UserAccount/loginByPwd'), Object.assign({}, data))
}
// ******落地页开始*******
// 验证码
export const loginSms = (mobile) => {
  return axios.post(LongURL('/UserAccount/loginSms'), Object.assign({}, { mobile }))
}
// 登陆注册同一接口
export const loginBySms = (data) => {
  return axios.post(LongURL('/UserAccount/loginBySms'), Object.assign({}, data))
}
// ******落地页结束*******
export const UserDetail = (id) => {
  return axios.get(LongURL('/Index/userDetail'),{
    params: {
      user_id: id
    }
  });
}

// 获取视频标签
export const categoryList = () => {
  return axios.get(LongURL('/Category/categoryList'))
}


// 获取分类视频
export const videoListByCategory = (params) => {
  return axios.get(LongURL('/Index/videoListByCategory'),{
    params
  })
}

// 获取热门视频
export const hotvideo = (last_id = '') => {
  return axios.post('https://api.actuive.com/v1///Index/hot'),{
    last_id
  })
}
//绑定手机号 发送验证码
export const bindMobileSms = (data) => {
  return axios.post(LongURL('/User/bindMobileSms'), Object.assign({}, data))
}
//绑定手机号
export const bindMobile = (data) => {
  return axios.post(LongURL('/User/bindMobile'), Object.assign({}, data))
}

// 获取视频详情
export const videoDetail = (data) => {
  return axios.post(LongURL('/Index/detail'), Object.assign({}, data))
}
// 评论列表
export const Indexcomments = (data) => {
  return axios.post(LongURL('/Index/comments'), Object.assign({}, data))
}
// 评论提交
export const VideoComment = (data) => {
  return axios.post(LongURL('/Video/comment'), Object.assign({}, data))
}

// 微信第三方登录
export const thirdLogin = (data) => {
  return axios.post(LongURL('/UserAccount/thirdLogin'), Object.assign({}, data))
}
// 金币主页
export const CoinIndex = () => {
  return axios.get(LongURL('/Coin/index'))
}

// 签到
export const signIn = () => {
  return axios.get(LongURL('/User/signIn'))
}

// 视频点赞
export const videoLike = (data) => {
  return axios.post(LongURL('/Video/like'), data)
}

// 获取邀请码
export const invitationIndex = () => {
  return axios.get(LongURL('/Coin/invitationIndex'))
}

// 获取用户视频列表
export const userVideoList = (data) => {
  return axios.post(LongURL('/Index/userVideoList'), Object.assign({}, data))
}

// 广告位信息
export const h5CoinIndexBanner = () => {
  return axios.get(LongURL('/Advertising/h5CoinIndexBanner'))
}

// 视频详情分享成功后
export const shareCallBack = (video_id) => {
  return axios.get(LongURL('/video/shareCallBack'),{
    params: {
      video_id
    }
  })
}

// 进入视频详情调用
export const viewCallBack = (params) => {
  return axios.get(LongURL('/video/viewCallBack'),{
    params
  })
}
