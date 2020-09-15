import AV from 'leancloud-storage'
const PHONE_EXP = /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))+\d{8})$/

/**
 * 获取短信验证码
 * @param phoneNumber required
 * @returns {Promise<void>}
 */
export async function requestSmsCode (phoneNumber) {
    await AV.Cloud.requestSmsCode({
        mobilePhoneNumber: phoneNumber,
        template: 'login',
        sign: '天天悬赏'
    })
}

/**
 * 通过验证码登录或者注册
 * @param phoneNumber required
 * @param smsCode required
 * @returns {Promise<User>}
 */
export async function signUpOrlogInWithMobilePhone (phoneNumber, smsCode) {
    await AV.User.signUpOrlogInWithMobilePhone(phoneNumber, smsCode)
}
