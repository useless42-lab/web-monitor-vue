import request from '../utils/request';

const steam={
    // 新增
    createService(data: any){
        return request({
            url:`v1/user/steam/create`,
            method:"post",
            data:data
        })
    },
    updateService(data: any){
        return request({
            url:`v1/user/steam/detail`,
            method:"post",
            data:data,
        })
    },
    // 获取列表
    getListService(groupId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/steam/list?group_id=${groupId}&page=${page}&page_size=${pageSize}`,
            method:"get"
        })
    },
    // 获取归档列表
    getFiledListService(page: any,pageSize: any){
        return request({
            url:`v1/user/steam/filed/list?page=${page}&page_size=${pageSize}`,
            method:"get",
        })
    },
    // 归档
    fileService(data: any){
        return request({
            url:`v1/user/steam/file`,
            method:"post",
            data:data,
        })
    },
    // 
    startMonitorService(data: any){
        return request({
            url:`v1/user/steam/monitor/start`,
            method:"post",
            data:data,
        })
    },
    pauseService(data: any){
        return request({
            url:`v1/user/steam/pause`,
            method:'post',
            data:data,
        })
    },
    deleteService(id: any){
        return request({
            url:`v1/user/steam/delete?steam_id=${id}`,
            method:'delete'
        })
    },
}
export default steam;