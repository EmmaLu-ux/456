// import { request } from 'umi-request'
import { http } from '@/services/index'


export const getOrdersTableData = (data) => {
    return http.post('/web/ordersList', data)
}