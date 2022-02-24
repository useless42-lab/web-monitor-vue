import request from '../utils/request';

const dns={
    // 新增
    createService(data: any){
        return request({
            url:`v1/user/dns/create`,
            method:"post",
            data:data
        })
    },
    updateService(data: any){
        return request({
            url:`v1/user/dns/detail`,
            method:"post",
            data:data,
        })
    },
    // 获取列表
    getListService(groupId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/dns/list?group_id=${groupId}&page=${page}&page_size=${pageSize}`,
            method:"get"
        })
    },
    // 获取归档列表
    getFiledListService(page: any,pageSize: any){
        return request({
            url:`v1/user/dns/filed/list?page=${page}&page_size=${pageSize}`,
            method:"get",
        })
    },
    // 归档
    fileService(data: any){
        return request({
            url:`v1/user/dns/file`,
            method:"post",
            data:data,
        })
    },
    // 
    startMonitorService(data: any){
        return request({
            url:`v1/user/dns/monitor/start`,
            method:"post",
            data:data,
        })
    },
    pauseService(data: any){
        return request({
            url:`v1/user/dns/pause`,
            method:'post',
            data:data,
        })
    },
    deleteService(id: any){
        return request({
            url:`v1/user/dns/delete?dns_id=${id}`,
            method:'delete'
        })
    },
}
export default dns;