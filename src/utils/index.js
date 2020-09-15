// 日期格式化工具
export function format (date, fmt) { // author: meizz
    // console.log(date)
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

// 判断是否为JSON格式
export function isJSON (str) {
    try {
        const obj = JSON.parse(str)
        return !!obj && typeof obj === 'object'
    } catch (e) {}
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
