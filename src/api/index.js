import Vue from 'vue'
import axios from 'axios'
import storage, { TOKEN_KEY,USERNAME_KEY } from './../public/js/storage';
import { message } from 'ant-design-vue'
Vue.prototype.$message = message;
const proEnv = 'https://itools.yangguangqicai.com'
const testEnv = 'http://192.168.1.50:8050/qs'
const devEnv = 'http://172.16.0.16:8050/qs'
const env = process.env.NODE_ENV;
let apiDomain = '';
let baseURL = '';
// 默认是本地环境
if (env === 'production') {  // 生产环境
  apiDomain = proEnv
  baseURL = `${apiDomain}/apin/api/v1`
} else {  // 本地环境
  apiDomain = devEnv;
  baseURL = `${apiDomain}/api/v1`
}
export { apiDomain,baseURL }
// const baseURL = `${apiDomain}`

axios.defaults.baseURL = baseURL

// mock数据
// const baseURL = '/api/v1'
// const isMock = true


//相应拦截器
// axios.interceptors.response.use((res) => {
//   return res
// }, (error) => {

//   return Promise.reject(error)
// })


// 管理员登录成功后的请求需要带上token
const adminHttp = function () {
  let token = storage.get(TOKEN_KEY);
  let username = storage.get(USERNAME_KEY);
  if (token && username) {
    return axios.create({
      baseURL: `${baseURL}/admin`,
      headers: { 'token': token }
    })
    // return axios.create({
    //   baseURL: `${baseURL}`,
    //   headers: { 'token': token }
    // })
  } else {
    message.info("登录用户失效，请重新登录页！");
    setTimeout(() => {
      window.open("https://yangguangqicai.com/", "_self");
    }, 2000);

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
// 登录右侧导航接口
export function login_nav(data) {
  const url = '/GetApplicationListByUserID'
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
  return adminHttp().post(url).then(res => Promise.resolve(res.data))
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
  return axios.get(url, { params }).then(res => Promise.resolve(res.data))
}

// 答题用户提交问卷答案
export function commitPaper(data) {
  const url = '/user/commit-paper'
  return axios.post(url, data).then(res => Promise.resolve(res.data))
}