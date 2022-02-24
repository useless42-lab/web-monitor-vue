<template>
    <div>
        <v-dialog v-model="addDialogStatus" persistent max-width="300px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">设备分组</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field label="名称" required v-model="deviceGroupItem.name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="deviceGroupItem.targetPolicy" :items="policyList" item-text="name"
                                    item-value="id" label="监控策略"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="deviceGroupItem.deviceType" :items="deviceTypeList" item-text="label"
                                    item-value="value" label="类型"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" text @click="addDialogStatus = false">
                        取消
                    </v-btn>
                    <v-btn color="primary darken-1" text @click="createDeviceGroup()" :loading="isLoading"
                        :disabled="isDisabled">
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div>
            <ConfirmDeleteDialog :deleteDialogStatus.sync="dialog" @confirm="onDelete()"></ConfirmDeleteDialog>
            <v-row>

                <v-col cols="12" sm="2">
                    <v-select outlined dense v-model="targetTeam" :items="teamList" item-text="name" item-value="id"
                        label="工作空间" @change="changeTeam(targetTeam)"></v-select>

                    <v-btn block color="primary" @click="addDialogStatus=true">
                        添加
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="10">
                    <v-data-table :headers="headers" :items="list" :options.sync="pagination"
                        :footer-props="footerProps" :server-items-length="pagination.itemsLength" :loading="isLoading"
                        @update:page="changePage()" disable-sort>
                        <template v-slot:[`item.device_type`]="{item}">
                            <div>
                                {{ item.device_type|filterDeviceType }}
                            </div>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn @click="redirectToDetail(item)" text color="primary">
                                查看推送列表
                            </v-btn>

                            <v-btn @click="onDeleteDialog(item)" text color="error">
                                删除
                            </v-btn>
                        </template>
                    </v-data-table>

                </v-col>
            </v-row>

        </div>
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
        deviceTypeData
    } from '../../utils/config'
    
    import ConfirmDeleteDialog from '@/components/dialog/ConfirmDeleteDialog.vue';
    export default {
        components:{
            ConfirmDeleteDialog
        },
        data: () => ({
            addDialogStatus: false,
            path: "",
            list: [],
            dialog: false,
            isLoading: false,
            isDisabled: false,
            snackbar: false,
            errText: '',
            timeout: 2000,
            onDeleteId: "",
            onDeleteDeviceType: "",
            targetTeam: "",
            teamList: [],
            deviceGroupItem: {
                name: "",
                targetPolicy: "",
                deviceType: 1,
            },
            policyList: [],
            deviceTypeList: deviceTypeData,

            headers: [{
                    text: "名称",
                    value: "name",
                },
                {
                    text: "类型",
                    value: "device_type",
                },
                {
                    text: "创建时间",
                    value: "created_at"
                },
                {
                    text: "操作",
                    value: "actions",
                    sortable: false,
                }
            ],
            pagination: {
                page: 1,
                itemsPerPage: 5,
                itemsLength: 1
            },
            footerProps: {
                itemsPerPageOptions: [5]
            },
        }),
        filters: {
            filterDeviceType: function (v) {
                const a = deviceTypeData.filter(item => {
                    if (item.value == v) {
                        return item;
                    }
                })
                return a[0].label;
            }
        },
        methods: {
            redirectToDetail(item) {
                this.$router.push({
                    path: "/user/group/detail",
                    query: {
                        "i": item.id,
                        "t": item.device_type,
                    }
                })
            },
            getList(teamId) {
                this.isLoading = true;
                this.isDisabled = true;
                this.$service.group.getListPaginationService(teamId, this.pagination.page, this.pagination.itemsPerPage)
                    .then(res => {
                        this.list = res['data'].data != null ? res['data'].data : [];
                        this.pagination.itemsLength = res.data.total;
                        this.pagination.page = res.data.page_index;
                        this.pagination.itemsPerPage = res.data.page_size;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            changeTeam() {
                this.getList(this.targetTeam);
            },
            changePage() {
                this.getList(this.targetTeam);
            },
            getTeamList() {
                this.$service.team.getListService()
                    .then(res => {
                        this.teamList = res['data'];
                        this.targetTeam = this.teamList[0].id;
                        this.getList(this.targetTeam);
                    })
            },
            deleteGroup(teamId, groupId, deviceType) {
                this.$service.group.deleteService(teamId, groupId, deviceType)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.getList(this.targetTeam);
                        } else {
                            this.errText = res['error'];
                            this.snackbar = true;
                        }
                        this.isLoading = false;
                        this.isDisabled = false;
                        this.addDialogStatus = false;
                    })
            },
            onDeleteDialog(item) {
                this.dialog = !this.dialog;
                this.onDeleteId = item.id;
                this.onDeleteDeviceType = item.device_type
            },
            onDelete() {
                this.deleteGroup(this.targetTeam, this.onDeleteId, this.onDeleteDeviceType);
                this.onDeleteId = "";
                this.dialog = false;
            },
            getPolicyList() {
                this.$service.policy.getListService()
                    .then(res => {
                        this.policyList = res.data;
                        this.deviceGroupItem.targetPolicy = this.policyList[0].id;
                    })
            },
            createDeviceGroup() {
                const formData = new FormData();
                formData.append("team_id", this.targetTeam);
                formData.append("name", this.deviceGroupItem.name);
                formData.append("policy_id", this.deviceGroupItem.targetPolicy);
                formData.append("device_type", this.deviceGroupItem.deviceType);
                this.$service.group.createService(formData)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.getList(this.targetTeam);
                        } else {
                            this.errText = res['error'];
                            this.snackbar = true;
                        }
                        this.isLoading = false;
                        this.isDisabled = false;
                        this.addDialogStatus = false;
                    })
            }
        },
        mounted() {
            this.getTeamList();
            this.getPolicyList();
        }
    }
</script>