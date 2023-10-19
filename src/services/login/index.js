import { http } from '@/services/index'
// 获取验证码
export const getCodeService = () => {
    return http.get('/api/auth/code', false);
}

export const loginService = (data) => {
    return http.post('/api/login', data, false)
}