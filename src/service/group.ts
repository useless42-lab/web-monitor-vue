import request from '../utils/request';

const group={
    getListService(teamId: any){
        return request({
            url:`v1/user/group/list?team_id=${teamId}`,
            method:"get"
        })
    },
    getListPaginationService(teamId: any,page: any,pageSize: any){
        return request({
            url:`v1/user/group/list/pagination?team_id=${teamId}&page=${page}&page_size=${pageSize}`,
            method:"get",
        })
    },
    getListByTypeService(teamId: any,type: any){
        return request({
            url:`v1/user/group/list/type?team_id=${teamId}&type=${type}`,
            method:"get"
        })
    },
    createService(data: any){
        return request({
            url:`v1/user/group/create`,
            method:"post",
            data:data,
        })
    },
    deleteService(teamId: any,groupId: any,deviceType: any){
        return request({
            url:`v1/user/group/delete?team_id=${teamId}&group_id=${groupId}&device_type=${deviceType}`,
            method:"delete",
        })
    },
    getNotificationListService(groupId: any){
        return request({
            url:`v1/user/group/notification/list?group_id=${groupId}`,
            method:'get',
        })
    },
    // 根据groupId获取成员基本信息
    getTeamMemberListByGroupIdService(groupId: any){
        return request({
            url:`v1/user/group/team/member/base/list?group_id=${groupId}`,
            method:'get',
        })
    },
    // 添加提醒人员
    addNotificationListItemService(data: any){
        return request({
            url:`v1/user/group/notification/list/add`,
            method:"post",
            data:data,
        })
    },
    deleteNotificationListItemService(data: any){
        return request({
            url:`v1/user/group/notification/list/delete`,
            method:"post",
            data:data,
        })
    }
}

export default group;