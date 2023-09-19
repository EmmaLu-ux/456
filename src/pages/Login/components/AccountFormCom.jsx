import { Form, Input, Space, Checkbox, Button } from 'antd'
import { useState } from 'react'

const AccountFormCom = (props) => {
    const { jse, captchaData, updateCaptchaSrc, setModalText, setShowModal, callback } = props || {}
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {

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
                    rule={[
                        {
                            required: true,
                            message: '请输入账号'
                        }
                    ]}
                >
                    <p className='username-text'>用户名</p>
                    <Input
                        size='large'
                        allowClear
                    // placeholder=""
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    rule={[
                        {
                            required: true,
                            message: '请输入密码'
                        }
                    ]}
                >
                    <p className='username-text'>密码</p>
                    <p className='forget-code' onClick={{
                        // () => {
                        // setShowModal(true)
                        // setModalText({
                        //     title: '忘记密码',
                        //     content: '请联系管理员重置密码！'
                        // })
                    }}>忘记密码？</p>
                    <Input
                        size='large'
                        type='password'
                        allowClear
                    />
                </Form.Item>
                {/* <Form.Item
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
                        <Input size='large' type='text' />
                        <img
                            className='test-code'
                            // src={captchaData.img}
                            // onClick={updateCaptchaSrc}
                        />
                    </Space>
                </Form.Item> */}
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox style={{ color: '#C0C4CC' }}>记住密码</Checkbox>
                    </Form.Item>
                </Form.Item> */}
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" size='large'>
                        登&nbsp;&nbsp;&nbsp;&nbsp;录
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default AccountFormCom