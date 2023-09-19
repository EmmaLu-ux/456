import { Button, Drawer, Space, message, Form, Tabs } from "antd"
import { CloseOutlined, CopyOutlined } from '@ant-design/icons'
import EditableForm from "@/pages/OrdersManagement/OrderDetails/EditableForm"
import { useState } from "react"

const { TabPane } = Tabs

const OrderDetails = (props) => {
    const { open, record, closeDrawer } = props || {}
    const [form] = Form.useForm()
    const [tabKey, setTabKey] = useState(0)

    const sendInvoice = () => {
        //发送接口请求
        closeDrawer()
    }
    // 复制订单ID
    const copyOrderID = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(record.orderNo).then(() => {
                message.success('复制订单ID成功')
            }).catch((error) => {
                message.error('复制失败' + error)
            })
        } else {
            // 如果浏览器不支持 Clipboard API
            message.error('您的浏览器不支持复制功能，请手动复制订单ID。')
        }
    }

    return (
        <Drawer
            title={<span style={{ fontSize: '15px', display: 'inline-block', width: '280px' }}>
                <span style={{ fontWeight: '300', color: '#9294a7' }}>OrderID: </span>
                <span>{record.orderNo}</span>
                <CopyOutlined onClick={copyOrderID} style={{ color: '#3f55cd', marginLeft: 3 }} />
            </span>}
            open={open}
            onClose={() => closeDrawer()}
            closable={false}
            extra={
                <Space>
                    <Button type="ghost" onClick={() => closeDrawer()}><CloseOutlined /></Button>
                </Space>
            }
            footer={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {tabKey == 1 && (<>
                        <Button onClick={() => closeDrawer()} style={{ width: 170 }} >驳回</Button>
                        <Button type='primary' onClick={sendInvoice} style={{ width: 170 }} >发送发票</Button>
                    </>)}
                    {tabKey == 2 && (<>
                        <Button onClick={() => closeDrawer()} style={{ width: 170 }} >取消</Button>
                        <Button type='primary' onClick={sendInvoice} style={{ width: 170 }} >下载</Button>
                    </>)}
                    {tabKey == 3 && (<>
                        <Button onClick={() => closeDrawer()} style={{ width: 170 }} >驳回</Button>
                        <Button type='primary' onClick={sendInvoice} style={{ width: 170 }} >发送发票</Button>
                    </>)}
                    {tabKey == 4 && (<>
                        <Button onClick={() => closeDrawer()} style={{ width: 170 }} >取消</Button>
                        <Button type='primary' onClick={sendInvoice} style={{ width: 170 }} >保存</Button>
                    </>)}
                </div>
            }
        >
            <Tabs defaultActiveKey="1" onChange={k => setTabKey(k)}>
                <TabPane tab='详情' key='1'>
                    <EditableForm form={form} record={record} itemName='主要详情' labelKey={1} />
                    <EditableForm form={form} record={record} itemName='发件人详情' labelKey={2} />
                    <EditableForm form={form} record={record} itemName='收件人详情' labelKey={3} />
                    <EditableForm form={form} record={record} itemName='运输详情' labelKey={4} />
                </TabPane>
                <TabPane tab='发票' key='2'>
                    发票
                </TabPane>
                <TabPane tab='文件' key='3'>
                    文件详情
                </TabPane>
                <TabPane tab='轨迹' key='4'>
                    轨迹详情
                </TabPane>
            </Tabs>

        </Drawer>
    )
}

export default OrderDetails