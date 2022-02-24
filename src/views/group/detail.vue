<template>
    <div>
        <v-btn block color="primary" @click="addDialogStatus=true">
            添加
        </v-btn>
        <v-dialog v-model="addDialogStatus" persistent max-width="300px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">提醒列表</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-select v-model="targetUser" :items="userList" item-text="username" item-value="id"
                                    label="提醒人员"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="targetNotificationType" :items="notificationTypeModel"
                                    item-text="label" item-value="value" label="提醒类型"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" text @click="addDialogStatus = false">
                        取消
                    </v-btn>
                    <v-btn color="primary darken-1" text @click="addNotificationListItem()" :loading="isLoading"
                        :disabled="isDisabled">
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
                            名称
                        </th>
                        <th class="text-left">
                            提醒类型
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
                    <tr v-for="item in list" :key="item.path">
                        <td>{{ item.username }}</td>
                        <td>{{ item.notification_type|filterNotificationType }}</td>
                        <td>{{ item.created_at }}</td>
                        <td>
                            <v-btn @click="onDeleteDialog(item)" text color="error">
                                删除
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <ConfirmDeleteDialog :deleteDialogStatus.sync="dialog" @confirm="onDelete()"></ConfirmDeleteDialog>
    </div>
</template>

<script>
    import ConfirmDeleteDialog from '@/components/dialog/ConfirmDeleteDialog.vue';
    import {
        notificationTypeData
    } from '../../utils/config';
    export default {
        components: {
            ConfirmDeleteDialog,
        },
        data() {
            return {
                dialog:false,
                addDialogStatus: false,
                targetNotificationType: 1,
                targetUser: "",
                id: "",
                list: [],
                userList: [],
                notificationTypeModel: notificationTypeData,
                isLoading: false,
                isDisabled: false,
                onDeleteId:"",
            }
        },
        filters: {
            filterNotificationType: function (v) {
                const a = notificationTypeData.filter(item => {
                    if (item.value == v) {
                        return item;
                    }
                })
                return a[0].label;
            },
        },
        methods: {
            getList(groupId) {
                this.$service.group.getNotificationListService(groupId)
                    .then(res => {
                        this.list = res['data'];
                    })
            },
            getUserList(groupId) {
                this.$service.group.getTeamMemberListByGroupIdService(groupId)
                    .then(res => {
                        this.userList = res['data'];
                        this.targetUser = this.userList[0].id;
                    })
            },
            addNotificationListItem() {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("user_id", this.targetUser);
                formData.append("group_id", this.id);
                formData.append("notification_type", this.targetNotificationType);
                formData.append("device_type", this.$route.query.t)
                this.$service.group.addNotificationListItemService(formData)
                    .then(() => {
                        this.getList(this.id);
                        this.isLoading = false;
                        this.isDisabled = false;
                        this.addDialogStatus = false;
                    })
            },
            onDeleteDialog(item) {
                this.dialog = !this.dialog;
                this.onDeleteId = item.id
            },
            onDelete(){
                this.deleteNotificationListItem(this.onDeleteId)
                this.onDeleteId = "";
                this.dialog = false;
            },
            deleteNotificationListItem(id) {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("id", id);
                this.$service.group.deleteNotificationListItemService(formData)
                    .then(() => {
                        this.getList(this.id);
                        this.isLoading = false;
                        this.isDisabled = false;
                        this.addDialogStatus = false;
                    })
            },
        },
        mounted() {
            if (this.$route.query.i) {
                this.id = this.$route.query.i;
                this.getList(this.id);
                this.getUserList(this.id);
            }
        }
    }
</script>