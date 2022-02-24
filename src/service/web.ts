import request from '../utils/request';

const web={
    // 新增网站
    createService(data: any){
        return request({
            url:`v1/user/web/create`,
            method:"post",
            data:data
        })
    },
    // 获取网站列表
    getWebListService(groupId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/web/list?group_id=${groupId}&page=${page}&page_size=${pageSize}`,
            method:"get"
        })
    },
    // 获取网站ssl配置
    getWebSSLConfigService(webId: any){
        return request({
            url:`v1/user/web/ssl?web_id=${webId}`,
            method:"get"
        })
    },
    getWhoisService(webId: any){
        return request({
            url:`v1/user/web/whois?web_id=${webId}`,
            method:"get"
        })
    },
    // 获取网站概览
    getWebOverviewService(webId: any){
        return request({
            url:`v1/user/web/overview?web_id=${webId}`,
            method:"get"
        })
    },
    // 删除网站
    deleteWebService(webId: any){
        return request({
            url:`v1/user/web/delete?web_id=${webId}`,
            method:"delete"
        })
    },
    // 获取归档列表
    getFiledListService(page: any,pageSize: any){
        return request({
            url:`v1/user/web/filed/list?page=${page}&page_size=${pageSize}`,
            method:"get",
        })
    },
    // 归档
    fileService(data: any){
        return request({
            url:`v1/user/web/file`,
            method:"post",
            data:data,
        })
    },
    // 
    startMonitorService(data: any){
        return request({
            url:`v1/user/web/monitor/start`,
            method:"post",
            data:data,
        })
    },
    checkSSLService(data: any){
        return request({
            url:`v1/user/web/ssl/check`,
            method:"post",
            data:data,
        })
    },
    checkWhoisService(data: any){
        return request({
            url:`v1/user/web/whois/check`,
            method:"post",
            data:data,
        })
    },
    pauseService(data: any){
        return request({
            url:`v1/user/web/pause`,
            method:'post',
            data:data,
        })
    },
    updateService(data: any){
        return request({
            url:`v1/user/web/detail`,
            method:"post",
            data:data,
        })
    }
}

export default web;