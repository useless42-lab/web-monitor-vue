import request from '../utils/request';
const team = {
    // 获取工作空间列表
    getListService() {
        return request({
            url: `v1/user/team/list`,
            method: "get"
        })
    },
    // 新增工作空间
    createService(data: any) {
        return request({
            url: `v1/user/team/create`,
            method: 'post',
            data: data,
        })
    },
    // 删除工作空间
    deleteService(teamId: any){
        return request({
            url:`v1/user/team/delete?team_id=${teamId}`,
            method:"delete",
        })
    },
    // 获取工作空间信息
    getInfoService(teamId: any){
        return request({
            url:`v1/user/team/info?team_id=${teamId}`,
            method:'get',
        })
    },
    // 获取工作空间人员列表
    getMemberListService(teamId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/team/member/list?team_id=${teamId}&page=${page}&page_size=${pageSize}`,
            method:'get',
        })
    },
    // 获取转让团队链接
    getTransferLinkService(data: any){
        return request({
            url:`v1/user/team/member/generate/transfer`,
            method:"post",
            data:data,
        })
    },
    // 获取团队邀请链接
    getInviteLinkService(data: any){
        return request({
            url:`v1/user/team/member/generate/invite`,
            method:"post",
            data:data,
        })
    },
    // 获取转让信息
    getTransferInfoService(token: any){
        return request({
            url:`v1/team/transfer?token=${token}`,
            method:"get",
        })
    },
    // 获取邀请信息
    getInviteInfoService(token: any){
        return request({
            url:`v1/team/invite?token=${token}`,
            method:"get",
        })
    },
    // 接受邀请
    acceptInviteService(data: any){
        return request({
            url:`v1/user/team/invite`,
            method:"post",
            data:data,
        })
    },
    // 接受转让
    acceptTransferService(data: any){
        return request({
            url:`v1/user/team/transfer`,
            method:"post",
            data:data,
        })
    },
    // 设为管理员
    addAdminService(data: any){
        return request({
            url:`v1/user/team/member/admin/add`,
            method:"post",
            data:data,
        })
    },
    // 移除管理员
    removeAdminService(data: any){
        return request({
            url:`v1/user/team/member/admin/remove`,
            method:"post",
            data:data,
        })
    },
    // 踢出成员
    kickMemberService(data: any){
        return request({
            url:`v1/user/team/member/kick`,
            method:'post',
            data:data,
        })
    }
}
export default team;