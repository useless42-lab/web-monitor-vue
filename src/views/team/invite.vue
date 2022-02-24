<template>
    <div style="display: flex;align-items: center;justify-content: center;height: 100vh;flex-direction: column;">
         <h2>
            柠檬监控
        </h2>
        <div v-if="info.username!=''" style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
            <img style="width:350px;" src="../../assets/images/invite.png" alt="">
            <div style="margin-bottom:5px;">
                <span style="font-weight: bolder;">{{info.username}}</span> 邀请您加入 <span
                    style="font-weight: bolder;">{{info.name}}</span>
            </div>
            <div style="margin-bottom:15px;">
                身份：{{info.role|filterTeamRole}}
            </div>
            <v-btn color="success" @click="onSubmit()">确认接受</v-btn>
        </div>
        <div v-if="info.username==''" style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
            <img style="width:350px;" src="../../assets/images/404.png" alt="">
            <div style="margin-bottom:15px;">
                <span style="font-weight: bolder;">链接已失效</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        teamRoleData,
    } from '../../utils/config';
    export default {
        data() {
            return {
                token: "",
                info:{},
                status:"",
            }
        },
        filters: {
            filterTeamRole: function (v) {
                const a = teamRoleData.filter(item => {
                    if (item.value == v) {
                        return item;
                    }
                })
                return a[0].label;
            }
        },
        methods: {
            getInfo(token) {
                this.$service.team.getInviteInfoService(token)
                    .then(res => {
                        this.info=res.data;
                        this.status=res.code;
                    })
            },
            onSubmit(){
                if(this.status!=200){
                    localStorage.setItem("redirect",this.$route.fullPath);
                    this.$router.push(`/auth/login`);
                }else{
                    const formData=new FormData();
                    formData.append("token",this.$route.query.token);
                    this.$service.team.acceptInviteService(formData)
                    .then(res=>{
                        if(res.code==200){
                            this.$router.push("/user/web/list");
                        }
                    })
                }
            }
        },
        mounted() {
            this.token = this.$route.query.token;
            this.getInfo(this.token);
        },
    }
</script>