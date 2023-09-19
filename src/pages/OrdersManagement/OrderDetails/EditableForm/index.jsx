import { Form } from 'antd'
import { useBoolean } from "ahooks"
import { EditOutlined } from '@ant-design/icons'

import EditableFormItem from '@/pages/OrdersManagement/OrderDetails/EditableForm/EditableFormItem'

const EditableForm = (props) => {
    const { form, record, itemName, labelKey } = props || {}
    const { orderNo, goods, destinations, orderAmount, orderRemark, orderStatus, deliveryTime, senderName, senderAddress, planedDeliveryTime, deliveryCompany, rate, vehiclesNum, driver, receiverName, receiverAddress } = record || {}
    const [state, { setTrue, setFalse }] = useBoolean(false)

    const goodsParameters = `${goods?.weight} kg, ${goods?.volumn} m^3`
    const goodsPrice = `¥${orderAmount}`

    const afterChange = (goodsName, inputValue) => {
        // updateOrder({
        //     [goodsName]: inputValue,
        //     orderNo: record.orderNo
        // });
    };

    const onFormOK = () => { }

    return (
        <Form form={form} autoComplete='off' name='drawerForm' onFinish={onFormOK}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{itemName}</span>
                <EditOutlined onClick={setTrue} style={{ color: 'rgb(171, 173, 187)' }} />
            </div>
            {labelKey == 1 && (<>
                <EditableFormItem label='商品名称' fieldName={goods?.goodsName} form={form} afterChange={afterChange} state={state} />
                <EditableFormItem label='商品参数' fieldName={goodsParameters} form={form} afterChange={afterChange} state={state} />
                <EditableFormItem label='订单金额' fieldName={goodsPrice} form={form} afterChange={afterChange} state={state} />
                <EditableFormItem label='订单状态' fieldName={orderStatus} form={form} afterChange={afterChange} state={state} />
            </>)}
            {labelKey == 2 && (<>
                <EditableFormItem label='发件人姓名' fieldName={senderName} form={form} afterChange={afterChange} state={state} />
                <EditableFormItem label='地址' fieldName={senderAddress} form={form} afterChange={afterChange} state={state} />
            </>)}
            {labelKey == 3 && (<>
                <EditableFormItem label='收件人姓名' fieldName={receiverName} form={form} afterChange={afterChange} state={state} />
                <EditableFormItem label='地址' fieldName={receiverAddress} form={form} afterChange={afterChange} state={state} />
                <EditableFormItem label='预期送达时间' fieldName={planedDeliveryTime} form={form} afterChange={afterChange} state={state} />
            </>)}
            {labelKey == 4 && (<>
                <EditableFormItem label='运输公司' fieldName={deliveryCompany} form={form} afterChange={afterChange} state={state} />
                <EditableFormItem label='评分' fieldName={rate} form={form} afterChange={afterChange} state={state} />
                <EditableFormItem label='车辆数量' fieldName={vehiclesNum} form={form} afterChange={afterChange} state={state} />
                <EditableFormItem label='司机' fieldName={driver} form={form} afterChange={afterChange} state={state} />
            </>)}

        </Form>
    )
}

export default EditableForm