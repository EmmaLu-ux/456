import { Form, Input, Select, Button, Space } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

const SearchForm = (props) => {
    const { form } = props || {}
    return (
        <div className='search-form'>
            <Form
                name='basic'
                form={form}
                layout='inline'
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Form.Item name='searchOrders'>
                    <Input placeholder='搜索订单' prefix={<SearchOutlined />} size='large' width={220} />
                </Form.Item>
                <Form.Item name='allOrders'>
                    <Space size='large'>
                        <Select
                            showSearch
                            allowClear
                            size='large'
                            placeholder='所有订单'
                            style={{ width: '220px' }}
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                {
                                    value: 1,
                                    label: 'First'
                                },
                                {
                                    value: 2,
                                    label: 'Second'
                                },
                                {
                                    value: 3,
                                    label: 'Third'
                                }
                            ]}
                        />
                        <Button
                            type='primary'
                            size='large'
                        // icon={<PlusOutlined />}
                        >创建新订单<PlusOutlined /></Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SearchForm