import { useAntdTable, useBoolean } from 'ahooks'
import { Button, Form, Table } from 'antd'

import SearchForm from './SearchForm'
import { getOrdersTableData } from '@/services/OrdersManagement'
import OrderDetails from '@/pages/OrdersManagement/OrderDetails'
import './index.less'
import { ORDER_STATUS } from '@/utils/constants'
import { useState } from 'react'

const OrdersManagement = () => {
    const [form] = Form.useForm()
    const [visible, { setTrue, setFalse }] = useBoolean(false)
    const [record, setRecord] = useState({})
    const getTableData = ({ current: pageNum, pageSize }, formData) => {
        return getOrdersTableData({ ...formData, pageNum, pageSize }).then(res => {
            console.log(123456789)
            return {
                total: res.total,
                list: res.data?.list
            }
        })
    }
    const { tableProps, search } = useAntdTable(getTableData, { defaultPageSize: 10, form })
    const { submit, reset } = search

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 250,
            fixed: 'left',
        },
        {
            title: '目的地',
            dataIndex: 'destinations',
            key: 'destinations',
            render: (destinations) => {
                return <><div>
                    <span style={{ color: 'rgb(171, 173, 187)', display: 'inline-block', width: 45 }}>From:</span>
                    <span>{destinations.from}</span>
                </div>
                    <div>
                        <span style={{ color: 'rgb(171, 173, 187)', display: 'inline-block', width: 45 }}>To:</span>
                        <span>{destinations.to}</span>
                    </div></>

            }
        },
        {
            title: '商品',
            dataIndex: 'goods',
            key: 'goods',
            render: goods => {
                return <>
                    <div style={{ fontWeight: 'bold' }}>{goods.goodsName}</div>
                    <div style={{ color: 'rgb(171, 173, 187)' }}>{goods.weight} kg, {goods.volumn} m<sup>3</sup></div>
                </>
            }
        },
        {
            title: '订单金额',
            dataIndex: 'orderAmount',
            key: 'orderAmount',
            render: orderAmount => {
                return <span>¥{orderAmount}</span>
            }
        },
        {
            title: '交货时间',
            dataIndex: 'deliveryTime',
            key: 'deliveryTime',
            width: 200
        },
        {
            title: '订单备注',
            dataIndex: 'orderRemark',
            key: 'orderRemark'
        },
        {
            title: '订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: orderStatus => {
                return <span>{ORDER_STATUS[orderStatus]()}</span>
            }
        },
        {
            title: '',
            key: 'action',
            render: (record) => {
                return <Button type='link' onClick={() => {
                    setTrue()
                    setRecord(record)
                }}>...</Button>
            }
        }
    ]
    return (
        <div className='orders-management'>
            <SearchForm form={form} />
            <Table
                {...tableProps}
                columns={columns}
                scroll={{ x: 'max-content' }}
            />
            <OrderDetails
                open={visible}
                record={record}
                closeDrawer={setFalse}
            />
        </div>
    )
}

export default OrdersManagement