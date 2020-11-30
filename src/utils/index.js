// 日期格式化工具
export function format (date, fmt) { // author: meizz
    // console.log(date)
    if (!date) return false
    var o = {
        'Y+': date.getFullYear(), // 月份
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S+': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((Array(RegExp.$1.length + 1).join('0') + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}
export function dateStr (date) {
    // 获取js 时间戳
    var time = new Date().getTime()
    // 去掉 js 时间戳后三位，与php 时间戳保持一致
    time = parseInt((time - date * 1000) / 1000)
    // 存储转换值
    var s
    if (time < 60 * 10) { // 十分钟内
        return '刚刚'
    } else if ((time < 60 * 60) && (time >= 60 * 10)) {
        // 超过十分钟少于1小时
        s = Math.floor(time / 60)
        return s + '分钟前'
    } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
        // 超过1小时少于24小时
        s = Math.floor(time / 60 / 60)
        return s + '小时前'
    } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
        // 超过1天少于3天内
        s = Math.floor(time / 60 / 60 / 24)
        return s + '天前'
    } else {
        // 超过3天
        var data = new Date(parseInt(date) * 1000)
        return data.getFullYear() + '/' + (data.getMonth() + 1) + '/' + data.getDate()
    }
}
// 判断是否为JSON格式
export function isJSON (str) {
    try {
        const obj = JSON.parse(str)
        return !!obj && typeof obj === 'object'
    } catch (e) { }
    return false
}

// 防抖 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
export function debounce (fn, delay, scope) {
    let timer = null
    // 返回函数对debounce作用域形成闭包
    return function () {
        // setTimeout()中用到函数环境总是window,故需要当前环境的副本；
        const context = scope || this; const args = arguments
        // 如果事件被触发，清除timer并重新开始计时
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

// 节流 每隔一段时间，只执行一次函数。
export function throttle (fn, threshold, scope) {
    let timer
    return function () {
        const context = scope || this
        const args = arguments
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context, args)
                timer = null
            }, threshold)
        }
    }
}
// 特殊字符及sql判断
export function stringTset (test) {
    const regEn = /[`~!@#$%^&*()_+<>?:"{},/;'[\]]/im
    const regCn = /[！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
    const regSql = /select|update|delete|exec|count|’|"|=|;|>|<|%/i
    return regEn.test(test) || regCn.test(test) || regSql.test(test)
}

// 判断是否是pc端
export function isPC () {
    const userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break }
    }
    return flag
}
