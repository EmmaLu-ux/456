import { loginService } from '@/services/login'
import { Form, Input, Space, Checkbox, Button, message } from 'antd'
import { useState } from 'react'
import { sm2 } from 'sm-crypto'

const publicKey = '04d00e6cbb193dbe89063b3d10601829265e1b922fb30299bb44ef2927bc5c3af4f09e9aca8f064da66c95b43c6a638d4a6b2c2558195bf0295300748f144c22c2'
const cipherMode = 1

const AccountFormCom = (props) => {
    const { jse, captchaData, updateCaptchaSrc, setModalText, setShowModal, callback } = props || {}
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(false)
        let pwd = sm2.doEncrypt(values.password, publicKey, cipherMode)
        // console.log('pwd: ', pwd)
        const params = {
            ...values,
            password: pwd
        }
        const result = await loginService(params)
        console.log(result)
        if (result.status == 0) {
            callback(result.data)
        } else {
            message.error('登录失败！')
        }
        setLoading(false)
    }
    return (
        <div className='account-form'>
            <Form
                form={form}
                name='account_login'
                onFinish={onFinish}
            >
                <Form.Item
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: '请输入账号'
                        }
                    ]}
                >
                    {/* <Space>
                        <p className='password-text'>用户名</p>
                        <p className='forget-code'></p>
                    </Space> */}
                    <Input
                        size='large'
                        allowClear
                        key='username'
                        placeholder="请输入用户名"
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: '请输入密码'
                        }
                    ]}
                >
                    {/* <Space>
                        <p className='password-text'>密码</p>
                        <p className='forget-code'
                            onClick={() => {
                                setShowModal(true)
                                setModalText({
                                    title: '忘记密码',
                                    content: '请联系管理员重置密码！'
                                })
                            }}
                        >忘记密码？</p>
                    </Space> */}
                    <Input.Password
                        size='large'
                        allowClear
                        key='password'
                        placeholder='请输入密码'
                    />
                </Form.Item>
                <Form.Item
                    name='code'
                    style={{
                        marginBottom: 0,
                    }}
                    size="large"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码!',
                        },
                    ]}
                >
                    <Space>
                        <Input size='large' type='text'
                        // placeholder='请输入验证码'
                        />
                        <img
                            className='test-code'
                            // src={`http://localhost:5050/api/auth/code`}
                            src={captchaData}
                            onClick={updateCaptchaSrc}
                        />
                    </Space>
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox style={{ color: '#C0C4CC' }}>记住密码</Checkbox>
                    </Form.Item>
                </Form.Item> */}
                <Form.Item>
                    <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        size='large'
                        elevation={2}
                    >
                        登&nbsp;&nbsp;&nbsp;&nbsp;录
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default AccountFormCom