import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router'
// 自动根据接口打开全局遮罩，遮罩的配置项如下
let autoLoading = {
    // 是否开启请求接口自动遮罩
    isShow: true,
    // api 的数量
    apiStart: 0,
    // 遮罩loading
    loadingOpen: '',
    // 加载时的文字
    text: '数据加载中...',
    // 加载时的前面的icon
    icon: 'el-icon-loading',
    // 背景色
    background: 'rgba(254, 254, 254, 0.7)'
}

// 防重请求
let cancelToken = axios.CancelToken
let repetitionAPI = {
    // 是否开启
    isOpen: true,
    // 特殊的URL不需要防重判断,URL体只需要带URL即可
    specialUrlList: ['/api/abc'],
    // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
    pending: [],
    // 以下URL将不进行防重取消判断
    removeRepeatUrl: ever => {
        for (let p in repetitionAPI.pending) {
            let data
            if (ever.method !== 'get') {
                data = JSON.stringify(ever.data)
            } else {
                data = JSON.stringify(ever.params)
            }
            if (
                repetitionAPI.pending[p].u ===
                ever.url + '&' + ever.method + '&' + data
            ) {
                // 当前请求在数组中存在时执行函数体
                repetitionAPI.pending[p].f() // 执行取消操作
                repetitionAPI.pending.splice(p, 1) // 把这条记录从数组中移除
            }
        }
    }
}

let ins = axios.create({
    // timeout: 10000,
    responseType: 'json', // 响应的数据类型,有arraybuffer、blob、document、json、text、stream这6个类型
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        // 配置请求头
        // 以下是接入通用项目必备的请求头
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // 'x-app-code': 'SGM_MOD',
    }
})

// 请求拦截器
ins.interceptors.request.use(
    config => {
        // 遮罩逻辑层
        loadingShow()
        // 重复请求判断
        repeatUrl(config)

        // IE11清除缓存 mock时应注释
        /* const params = config.params
if (!params) {
config.params = {}
}
config.params.t = Date.now() */

        return config
    },
    err => {
        // Do something with request error
        return Promise.reject(err)
    }
)

// 响应拦截器
ins.interceptors.response.use(
    res => {
        const data = res.data

        // 全局loading展示
        if (autoLoading.isShow) {
            autoLoading.apiStart--
            if (autoLoading.apiStart === 0) {
                autoLoading.loadingToken.close()
                autoLoading.loadingOpen = ''
            }
        }
        // 防重提交
        if (repetitionAPI.isOpen) {
            repetitionAPI.removeRepeatUrl(res.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
        }

        if (data.code === 200) {
            return data
        } else {
            Message({
                type: 'error',
                message: data.message
            })
            if (data.code === 403 || data.code === 402) {
                window.localStorage.removeItem('userInfo')
                router.push('/')
            }
            return false
        }
    },
    err => {
        if (autoLoading.isShow) {
            autoLoading.apiStart--
            if (autoLoading.apiStart === 0) {
                autoLoading.loadingToken.close()
                autoLoading.loadingOpen = ''
            }
        }
        if (Object.keys(err)[0] !== 'message') {
            Message({
                type: 'error',
                message: '系统错误请联系管理员'
            })
        }

        return Promise.reject(err)
    }
)

// 防重判断
function repeatUrl (config) {
    if (repetitionAPI.isOpen) {
        repetitionAPI.removeRepeatUrl(config) // 在一个ajax发送前执行一下取消操作
        config.cancelToken = new cancelToken(c => {
            if (repetitionAPI.specialUrlList.indexOf(config.url) < 0) {
                // 自定义标识
                if (config.method !== 'get') {
                    repetitionAPI.pending.push({
                        u:
                            config.url +
                            '&' +
                            config.method +
                            '&' +
                            JSON.stringify(config.data),
                        f: c
                    })
                } else {
                    repetitionAPI.pending.push({
                        u:
                            config.url +
                            '&' +
                            config.method +
                            '&' +
                            JSON.stringify(config.params),
                        f: c
                    })
                }
            }
        })
    }
}

// loading 展示
function loadingShow () {
    if (autoLoading.isShow) {
        autoLoading.apiStart++
        if (autoLoading.loadingOpen === '') {
            autoLoading.loadingToken = Loading.service({
                lock: true,
                text: autoLoading.text,
                spinner: autoLoading.icon,
                background: autoLoading.background
            })
        }
    }
}

export default ins
