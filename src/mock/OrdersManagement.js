import mockjs from 'mockjs'

const generateOrderNo = () => {
    const timestamp = new Date().getTime()
    const random = Math.floor(Math.random() * 900) + 100 // 生成一个9位的随机数
    const orderNo = `${timestamp}${random}` // 将时间戳和随机数拼接
    return orderNo
}

const data = mockjs.mock({
    'list|1-100': [
        {
            'key|+1': 1,
            'orderNo': generateOrderNo(),
            'destinations': {
                'from': '@city',
                'to': '@city'
            },
            'goods': {
                'goodsName': '@cword(5, 10)',
                'weight|+1': 1,
                'volumn|+1': 1,
            },
            'orderAmount': '@float(0, 100, 2, 2)',
            'deliveryTime': '@datetime',
            'orderRemark': '@cword(5, 10)',
            'orderStatus|1': [0, 1, 2, 3, 4, 5, 6], // 0:已超时 1:已完成 2：已取消 3:待付款 4:待发货 5:待收货 6:退款中
            'receiverName': '@cname',
            'receiverAddress': '@city',
            'planedDeliveryTime': '@datetime',
            'senderName': '@cname',
            'senderAddress': '@city',
            'deliveryCompany': '@cword(5, 10)',
            'rate': '@float(0, 5, 1, 1)',
            'vehiclesNum': '@integer(1, 100)',
            'driver': '@cword(5, 10)',
        }
    ]
})

export default {
    'POST /web/ordersList': (req, res) => {
        console.log('req-POST /web/ordersList', req)
        res.send({
            code: 0,
            total: data.list.length,
            data
        })
    }
}