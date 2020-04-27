import axios from 'axios'
import storage, { TOKEN_KEY } from './../public/js/storage';
const proEnv = 'http://39.107.60.206:8050/qs'
const devEnv = 'http://172.16.0.16:8050/qs'
const env = process.env.NODE_ENV;
let apiDomain='';
// 默认是本地环境
if(env==='production'){  // 生产环境
  apiDomain=proEnv
}else{  // 本地环境
  apiDomain = devEnv;
}
export  {apiDomain}
const baseURL = `${apiDomain}/api/v1`

axios.defaults.baseURL = baseURL

// mock数据
// const baseURL = '/api/v1'
// const isMock = true

// 管理员登录成功后的请求需要带上token
const adminHttp = function() {
  let token=storage.get(TOKEN_KEY);
  if(!token){
    login().then(res => {
      if (res.code === 0) {
        if (res.data.result === 0) {
          token=res.data.token;
          return axios.create({
            baseURL: `${baseURL}/admin`,
            headers: {'token': token}
          })
        } else {
          this.$message.info("邮箱或密码错误");
        }
      }else{
        this.$message.info(res.msg);
      }
    });
  }else{
    return axios.create({
      baseURL: `${baseURL}/admin`,
      headers: {'token': token}
    })
  }
 
}

/*---------------------------------管理员请求的接口------------------------------------*/

// 注册接口
export function register(data) {
  const url = '/register'
  return axios.post(url, data).then(res => Promise.resolve(res.data))
}

// 登录接口
export function login(data) {
  const url = '/login'
  return axios.post(url, data).then(res => Promise.resolve(res.data))
}

// 登出接口
export function logout() {
  const url = '/logout'
  return adminHttp().get(url).then(res => Promise.resolve(res.data))
}

// 获取问卷列表
export function getPaperList() {
  const url = '/paper-lists'
  // if (isMock) {
  //   return axios.get(url).then(res => Promise.resolve(res.data))
  // }
  return adminHttp().get(url).then(res => Promise.resolve(res.data))
}

// 删除问卷
export function deletePaper(data) {
  const url = '/delete-paper'
  // if (isMock) {
  //   return axios.post(url, data).then(res => Promise.resolve(res.data))
  // }
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}

// 管理员获取问卷内容
export function getPaper(data) {
  const url = '/view-paper'
  // if (isMock) {
  //   return axios.post(url, data).then(res => Promise.resolve(res.data))
  // }
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}

// 修改问卷
export function updatePaper(data) {
  const url = '/update-paper'
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}

// 上传问卷表格
export function uploadPaper(data) {
  const url = '/upload'
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return adminHttp().post(url, data, config).then(res => Promise.resolve(res.data))
}

// 获取问卷答题数据
export function getPaperData(data) {
  const url = '/paper-data'
  // if (isMock) {
  //   return axios.post(url, data).then(res => Promise.resolve(res.data))
  // }
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}


/*---------------------------------答题用户请求的接口------------------------------------*/

// 答题用户获取问卷内容
export function viewPaper(params) {
  const url = '/user/view-paper'
  return axios.get(url, {params}).then(res => Promise.resolve(res.data))
}

// 答题用户提交问卷答案
export function commitPaper(data) {
  const url = '/user/commit-paper'
  return axios.post(url, data).then(res => Promise.resolve(res.data))
}