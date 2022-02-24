import request from '../utils/request';

const api={
    // 新增接口
    createService(data: any){
        return request({
            url:`v1/user/api/create`,
            method:"post",
            data:data,
        })
    },
    // 获取接口列表
    getApiListService(groupId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/api/list?group_id=${groupId}&page=${page}&page_size=${pageSize}`,
            method:"get"
        })
    },
    // 更新接口
    updateService(data: any){
        return request({
            url:`v1/user/api/update`,
            method:"post",
            data:data,
        })
    },
    // 获取详情
    detailService(id: any){
        return request({
            url:`v1/user/api/detail?id=${id}`,
            method:"get",
        })
    },
    // 模拟请求接口
    mockService(id: any){
        return request({
            url:`v1/user/api/mock?id=${id}`,
            method:"get",
        })
    },
    // 获取归档列表
    getFiledListService(page: any,pageSize: any){
        return request({
            url:`v1/user/api/filed/list?page=${page}&page_size=${pageSize}`,
            method:"get",
        })
    },
    // 归档
    fileService(data: any){
        return request({
            url:`v1/user/api/file`,
            method:"post",
            data:data,
        })
    },
    startMonitorService(data: any){
        return request({
            url:`v1/user/api/monitor/start`,
            method:"post",
            data:data,
        })
    },
    pauseService(data: any){
        return request({
            url:`v1/user/api/pause`,
            method:'post',
            data:data,
        })
    },
    deleteService(id: any){
        return request({
            url:`v1/user/api/delete?api_id=${id}`,
            method:'delete'
        })
    },
}

export default api;