import request from '../utils/request';
const policy = {
    // 获取策略列表
    getListService(teamId: any) {
        return request({
            url: `v1/user/policy/list?team_id=${teamId}`,
            method: "get"
        })
    },
    getListPaginationService(teamId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/policy/list/pagination?team_id=${teamId}&page=${page}&page_size=${pageSize}`,
            method:"get",
        })
    },
    addService(data: any){
        return request({
            url:`v1/user/policy/create`,
            method:"post",
            data:data,
        })
    },
    deleteService(teamId: any,id: any){
        return request({
            url:`v1/user/policy/delete?team_id=${teamId}&policy_id=${id}`,
            method:"delete",
        })
    },
    updateService(data: any){
        return request({
            url:`v1/user/policy/update`,
            method:"patch",
            data:data,
        })
    },
    getDetailService(teamId: any,id: any){
        return request({
            url:`v1/user/policy/detail?team_id=${teamId}&policy_id=${id}`,
            method:"get",
        })
    },
    getPlanFrequencyByUserIdService(){
        return request({
            url:`v1/user/policy/frequency`,
            method:"get",
        })
    }
}
export default policy;