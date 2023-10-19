/* 登录组件 */
import { useState } from 'react'
import { Divider, Tabs } from 'antd'

import LoginLogo from '@/assets/login_logo@2x.png'
import Login from '@/assets/login_bg.png'
import { LOGIN_TYPE, FORM_TYPE } from '@/utils/constants'
import { getCodeService } from '@/services/login'
import AccountFormCom from '@/pages/Login/components/AccountFormCom'
import './index.less'
import { setToken } from '@/utils/auth'
import { useNavigate } from 'umi'

let TIME = null
const items = [
    {
        key: FORM_TYPE.ACCOUNT,
        label: `账号登录`,
    },
    {
        key: FORM_TYPE.PHONE,
        label: `手机登录`,
    },
];

const LoginLayout = () => {
    const [loginType, setLoginType] = useState(LOGIN_TYPE.ACCOUNT)
    const [captchaData, setCaptchaData] = useState({})
    const [activeKey, setActiveKey] = useState(FORM_TYPE.ACCOUNT)
    const navigate = useNavigate()

    const onChange = (key) => {
        setActiveKey(key);
    };

    const updateCaptchaSrc = async () => {
        clearInterval(TIME)
        TIME = setInterval(() => {
            updateCaptchaSrc()
        }, 60 * 2 * 1000)
        const data = await getCodeService()
        setCaptchaData(data)
    }

    const afterLogin = (data) => {
        setToken(data.authorization)
        localStorage.setItem('userData_my', JSON.stringify(data.user))
        // 获取user中的角色，根据角色匹配路由，显示不同的页面
        // const { roleName } = data.user?.role
        // switch (roleName) {
        //     case '管理员':
        //         navigate('/dashboard')
        //         break
        //     case '操作员':
        //         navigate('/dashboard')
        //         break
        //     case '审计员':
        //         navigate('/dashboard')
        //         break
        //     default:
        //         navigate('/dashboard')
        // }
        navigate('/dashboard')
    }

    return (
        <div className="login-main">
            <img src={Login} alt="" className='bg-image' />
            {/* <div className='logo'>
                <img src={LoginLogo} alt="登录Logo" />
            </div> */}
            <div className='login'>
                <div className='logo'>
                    <img src={LoginLogo} alt="登录Logo" />
                </div>
                <p className='title'>密钥管理系统</p>
                <div className='login-form'>
                    {loginType === LOGIN_TYPE.ACCOUNT && <AccountFormCom
                        captchaData={captchaData}
                        updateCaptchaSrc={updateCaptchaSrc}
                        callback={afterLogin}
                    // setModalText={setModalText} 
                    // setShowModal={setShowModal} 
                    />}
                    {loginType === LOGIN_TYPE.PHONE && <PhoneFormCom
                    // captchaData={captchaData}
                    // updateCaptchaSrc={updateCaptchaSrc}
                    // callback={afterLogin} 
                    />}
                    {loginType === LOGIN_TYPE.ACCOUNT_AND_PHONE &&
                        <>
                            <Tabs activeKey={activeKey} items={items} onChange={onChange} />
                            {activeKey === FORM_TYPE.ACCOUNT && <AccountFormCom
                                captchaData={captchaData}
                                updateCaptchaSrc={updateCaptchaSrc}
                                callback={afterLogin}
                            // setModalText={setModalText} 
                            // setShowModal={setShowModal} 
                            />}
                            {activeKey === FORM_TYPE.PHONE && <PhoneFormCom
                            // captchaData={captchaData}
                            // updateCaptchaSrc={updateCaptchaSrc}
                            // callback={afterLogin} 
                            />}
                        </>
                    }
                </div>
                <div className='detail'>
                    <Divider plain>杭州后量子密码科技有限公司</Divider>
                </div>
            </div>
        </div>
    )
}

export default LoginLayout