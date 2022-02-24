import request from '../utils/request'

const statusPage={
    addService(data: any){
        return request({
            url:`v1/user/status_page/add`,
            method:"post",
            data:data,
        })
    },
    getListService(teamId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/status_page/list?team_id=${teamId}&page=${page}&page_size=${pageSize}`,
            method:"get",
        })
    },
    getUserDetailDevice(teamId: any,statusPageId: any){
        return request({
            url:`v1/user/status_page/detail?team_id=${teamId}&status_page_id=${statusPageId}`,
            method:"get",
        })
    },
    getDetailService(statusPageId: any,password: any){
        return request({
            url:`v1/view_status_page?token=${statusPageId}&password=${password}`,
            method:"get",
        })
    },
    updateStatusPageService(data: any){
        return request({
            url:`v1/user/status_page/update`,
            method:"post",
            data:data,
        })
    },
    deleteStatusPageService(data: any){
        return request({
            url:`v1/user/status_page/delete`,
            method:"post",
            data:data,
        })
    }
}

export default statusPage;