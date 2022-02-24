import request from '../utils/request';

const tcp={
    // 新增
    createService(data: any){
        return request({
            url:`v1/user/tcp/create`,
            method:"post",
            data:data
        })
    },
    updateService(data: any){
        return request({
            url:`v1/user/tcp/detail`,
            method:"post",
            data:data,
        })
    },
    // 获取列表
    getTcpListService(groupId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/tcp/list?group_id=${groupId}&page=${page}&page_size=${pageSize}`,
            method:"get"
        })
    },
    // 获取归档列表
    getFiledListService(page: any,pageSize: any){
        return request({
            url:`v1/user/tcp/filed/list?page=${page}&page_size=${pageSize}`,
            method:"get",
        })
    },
    // 归档
    fileService(data: any){
        return request({
            url:`v1/user/tcp/file`,
            method:"post",
            data:data,
        })
    },
    // 
    startMonitorService(data: any){
        return request({
            url:`v1/user/tcp/monitor/start`,
            method:"post",
            data:data,
        })
    },
    pauseService(data: any){
        return request({
            url:`v1/user/tcp/pause`,
            method:'post',
            data:data,
        })
    },
    deleteService(id: any){
        return request({
            url:`v1/user/tcp/delete?tcp_id=${id}`,
            method:'delete'
        })
    },
}
export default tcp;