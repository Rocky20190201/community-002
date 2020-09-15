import axios from 'axios'
import { Toast } from 'vant'
const qs = require('qs')
const instance = axios.create({
    baseURL: 'http://47.106.209.243:18081'
})
const api = {
    async get (url, data, isHideToast = false) {
        try {
            let res = await instance.get(url, { params: data })
            res = res.data
            return new Promise((resolve) => {
                if (res.status === 'SUCCESS') {
                    resolve(res.data)
                } else {
                    if (!isHideToast) Toast(res.message || res.data)
                    throw res.message || res.data
                }
            })
        } catch (err) {
            Toast('服务器异常，请稍后再试')
        }
    },
    async post (url, data, isHideToast = false) {
        try {
            let res = await instance.post(url, qs.stringify(data))
            res = res.data
            return new Promise((resolve, reject) => {
                if (res.status === 'SUCCESS') {
                    resolve(res.data)
                } else {
                    if (!isHideToast) Toast(res.message || res.data)
                    throw res.message || res.data
                }
            })
        } catch (err) {
            Toast('服务器异常，请稍后再试')
        }
    }
}
export { api }
