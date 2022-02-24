import request from '../utils/request';

const device={
    // 
    getSimpleListService(teamId: any){
        return request({
            url:`v1/user/device/simple/list?team_id=${teamId}`,
            method:'get'
        })
    },
    // 转移设备分组
    transferDeviceGroup(data: any){
        return request({
            url:`v1/user/device/group/transfer`,
            method:"post",
            data:data,
        })
    },
    // 获取设备详情
    getDetailService(deviceId: any,deviceType: any){
        return request({
            url:`v1/user/device/detail?device_id=${deviceId}&device_type=${deviceType}`,
            method:"get",
        })
    }
}
export default device;