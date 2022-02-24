<template>
    <div>
        <v-card>
            <v-card-title>{{detail.name}}</v-card-title>
            <v-card-text>
                <div>
                    人员总数：{{detail.member_total}}
                </div>
                <div>
                    设备分组总数：{{detail.device_group_total}}
                </div>
                <div>
                    设备总数：{{detail.device_total}}
                </div>
                <div>
                    创建于：{{detail.created_at}}
                </div>
            </v-card-text>
            <v-card-actions style="flex-direction:row-reverse;">
                <v-btn v-if="detail.role==2||detail.role==3" color="success" style="margin-left:10px;"
                    @click="inviteDialogStatus=!inviteDialogStatus">
                    邀请
                </v-btn>
                <v-btn v-if="detail.role==2" color="orange" style="color:white;margin-left:10px;" @click="onTransfer()">
                    转让
                </v-btn>
                <v-btn v-if="detail.role==2" color="error" @click="dialog=!dialog">
                    删除
                </v-btn>
            </v-card-actions>
        </v-card>
        <ConfirmDeleteDialog :deleteDialogStatus.sync="dialog" @confirm="onDelete()"></ConfirmDeleteDialog>
        <v-dialog v-model="transferDialogStatus" persistent max-width="666px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">转让团队</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div>转让链接：</div>
                                <div>{{transferLink}}</div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" text @click="transferDialogStatus=!transferDialogStatus">
                        取消
                    </v-btn>
                    <v-btn color="primary darken-1" text :loading="isLoading" :disabled="isDisabled">
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="inviteDialogStatus" persistent max-width="666px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">邀请加入</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-radio-group v-model="inviteRole" row>
                                    <div v-for="(item,index) in roleTypeModel" :key="index">
                                        <v-radio :label="item.label" :value="item.value"></v-radio>
                                    </div>
                                </v-radio-group>
                            </v-col>
                            <v-btn color="primary" @click="onInvite()">生成</v-btn>
                            <v-col cols="12" sm="12">
                                <div>邀请链接：</div>
                                <div>{{inviteLink}}</div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" text :loading="isLoading" :disabled="isDisabled"
                        @click="inviteDialogStatus=!inviteDialogStatus">
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            成员
                        </th>
                        <th class="text-left">
                            权限
                        </th>
                        <th class="text-left">
                            创建时间
                        </th>
                        <th class="text-left">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list" :key="index">
                        <td>{{ item.username }}</td>
                        <td>{{ item.role|filterTeamRole }}</td>
                        <td>{{ item.created_at }}</td>
                        <td>
                            <div v-if="detail.role!=1">
                                <v-row>
                                    <div v-if="item.role!=2">
                                        <v-btn color="orange" text v-if="item.role!=detail.role">踢出</v-btn>
                                    </div>
                                    <div v-if="item.role!=2&&item.role!=3">
                                        <v-btn color="error" text v-if="detail.role==2" @click="addAdmin(item)">设为管理员
                                        </v-btn>
                                    </div>
                                    <div v-if="item.role!=2&&item.role==3">
                                        <v-btn color="error" text v-if="detail.role==2&&item.role==3"
                                            @click="removeAdmin(item)">移除管理员</v-btn>
                                    </div>
                                </v-row>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-pagination circle v-model="page" :length="length"></v-pagination>
        <v-snackbar v-model="snackbar" :timeout="timeout" top>
            {{ errText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
                    关闭
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    import {
        teamRoleData,
    } from '../../utils/config';
    import ConfirmDeleteDialog from '@/components/dialog/ConfirmDeleteDialog.vue';
    export default {
        components: {
            ConfirmDeleteDialog
        },
        data() {
            return {
                snackbar: false,
                errText: '',
                timeout: 2000,
                dialog: false,
                transferDialogStatus: false,
                inviteDialogStatus: false,
                detail: "",
                teamId: 0,
                page: 1,
                pageSize: 10,
                total: 0,
                list: [],
                length: 0,
                transferLink: "",
                inviteLink: "",
                inviteRole: 1,
                isLoading: false,
                isDisabled: false,
                roleTypeModel: [{
                        label: "普通成员",
                        value: 1
                    },
                    {
                        label: "管理员",
                        value: 3
                    },
                ]
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
            getTransferLink(teamId) {
                const formData = new FormData();
                formData.append("team_id", teamId);
                this.$service.team.getTransferLinkService(formData)
                    .then(res => {
                        this.transferLink = process.env.VUE_APP_WEB_URL + "team/transfer?token=" + res.data;
                    })
            },
            getInviteLink(teamId) {
                const formData = new FormData();
                formData.append("team_id", teamId);
                formData.append("role", this.inviteRole)
                this.$service.team.getInviteLinkService(formData)
                    .then(res => {
                        this.inviteLink = process.env.VUE_APP_WEB_URL + "team/invite?token=" + res.data;
                    })
            },
            getInfo(teamId) {
                this.$service.team.getInfoService(teamId)
                    .then(res => {
                        this.detail = res.data;
                        if (this.detail.role == 3) {
                            this.roleTypeModel.splice(1, 1);
                        }
                    })
            },
            getMemberList(teamId, page, pageSize) {
                this.$service.team.getMemberListService(teamId, page, pageSize)
                    .then(res => {
                        this.list = res.data.data;
                        this.total = res.data.total;
                        this.pageSize = res.data.pageSize;
                        this.page = res.data.page_index;
                        this.length = Math.ceil(res.data.total / res.data.page_size);
                    })
            },
            onTransfer() {
                this.getTransferLink(this.teamId);
                this.transferDialogStatus = true;
            },
            onInvite() {
                this.getInviteLink(this.teamId);
            },
            onDelete() {
                this.$service.team.deleteService(this.teamId)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.errText = "成功";
                            this.$router.push("/user/team/list")
                        } else {
                            this.errText = res['error'];
                        }
                        this.snackbar = true;
                    })
            },
            addAdmin(item) {
                const formData = new FormData();
                formData.append("team_id", item.team_id);
                formData.append("target_user_id", item.id)
                this.$service.team.addAdminService(formData)
                    .then(res => {
                        console.log(res);
                    })
            },
            removeAdmin(item) {
                const formData = new FormData();
                formData.append("team_id", item.team_id);
                formData.append("target_user_id", item.id)
                this.$service.team.removeAdminService(formData)
                    .then(res => {
                        console.log(res);
                    })
            },
            kickMember(item) {
                const formData = new FormData();
                formData.append("team_id", item.team_id);
                formData.append("target_user_id", item.id)
                this.$service.team.kickMemberService(formData)
                    .then(res => {
                        console.log(res);
                    })
            },
        },
        mounted() {
            this.teamId = this.$route.query.i;
            this.getInfo(this.teamId);
            this.getMemberList(this.teamId, this.page, this.pageSize)
        },
    }
</script>