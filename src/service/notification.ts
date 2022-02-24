import request from '../utils/request';

const notification={
     getService(){
         return request({
             url:`v1/user/notification/detail`,
             method:"get"
         })
     },
     updateService(data: any){
         return request({
            url:`v1/user/notification/update`,
            method:"post",
            data:data,
         })
     }
}

export default notification;