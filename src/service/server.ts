import request from '../utils/request';

const web={
    // 新增服务器
    createService(data: any){
        return request({
            url:`v1/user/server/create`,
            method:"post",
            data:data
        })
    },
    updateService(data: any){
        return request({
            url:`v1/user/server/detail`,
            method:"post",
            data:data,
        })
    },
    // 获取服务器列表
    getServerListService(groupId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/server/list?group_id=${groupId}&page=${page}&page_size=${pageSize}`,
            method:"get"
        })
    },
    // 更新token
    refreshTokenService(data: any){
        return request({
            url:`v1/user/server/token/refresh`,
            method:'post',
            data:data
        })
    },
    // 获取服务器cpu信息
    getServerLogService(serverId: any){
        return request({
            url:`v1/user/server/log?server_id=${serverId}`,
            method:'get'
        })
    },
    // 删除设备
    deleteServerService(serverId: any){
        return request({
            url:`v1/user/server/delete?server_id=${serverId}`,
            method:'delete'
        })
    },
    // 获取归档列表
    getFiledListService(page: any,pageSize: any){
        return request({
            url:`v1/user/server/filed/list?page=${page}&page_size=${pageSize}`,
            method:"get",
        })
    },
    // 归档
    fileService(data: any){
        return request({
            url:`v1/user/server/file`,
            method:"post",
            data:data,
        })
    },
    startMonitorService(data: any){
        return request({
            url:`v1/user/server/monitor/start`,
            method:"post",
            data:data,
        })
    },
    pauseService(data: any){
        return request({
            url:`v1/user/server/pause`,
            method:'post',
            data:data,
        })
    }
}

export default web;