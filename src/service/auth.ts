import request from "../utils/request";

const auth={
    // 登录
    loginService(data: any){
        return request({
            url:`v1/auth/login`,
            method:"post",
            data:data
        })
    },
    // 注册
    registerService(data: any){
        return request({
            url:`v1/auth/register`,
            method:'post',
            data:data
        })
    },
    // 验证码
    getCaptchaService(){
        return request({
            url:`v1/auth/captcha`,
            method:"get",
        })
    },
    // 修改密码
    changePasswordService(data: any){
        return request({
            url:`v1/user/auth/password/change`,
            method:"post",
            data:data,
        })
    },
    // 获取用户基础信息
    getBaseUserInfo(){
        return request({
            url:`v1/user/auth/base`,
            method:"get",
        })
    },
    // 生成注册链接
    generateResetPasswordService(data: any){
        return request({
            url:`v1/auth/reset/link`,
            method:"post",
            data:data,
        })
    },
    //
    resetPasswordService(data: any){
        return request({
            url:`v1/auth/reset`,
            method:"post",
            data:data,
        })
    },
    getThirdPartyInfoService(){
        return request({
            url:`v1/user/auth/third`,
            method:"get"
        })
    },
    updateThirdPartyInfoService(data: any){
        return request({
            url:`v1/user/auth/third`,
            method:"post",
            data:data
        })
    }
}

export default auth;