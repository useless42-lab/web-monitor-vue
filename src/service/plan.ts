import request from '../utils/request';

const plan={
    getConfigBaseService(id: any){
        return request({
            url:`v1/user/plan/config?team_id=${id}`,
            method:"get",
        })
    },
    getListService(){
        return request({
            url:`v1/user/plan/list`,
            method:"get",
        })
    },
    getOrderListService(page: any,pageSize: any){
        return request({
            url:`v1/user/order/list?page=${page}&page_size=${pageSize}`,
            method:'get',
        })
    },
    payService(data: any){
        return request({
            url:`v1/user/pay/plan`,
            method:"post",
            data:data,
        })
    },
    checkOrderService(data: any){
        return request({
            url:`v1/user/order/add`,
            method:"post",
            data:data,
        })
    }
}
export default plan;