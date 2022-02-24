<template>
    <div>
        <div>
            <ConfirmDeleteDialog :deleteDialogStatus.sync="dialog" @confirm="onDelete()"></ConfirmDeleteDialog>
            <v-row>
                <v-col cols="12" xl="2" lg="2" md="2" sm="3" xs="12">
                    <v-select outlined dense v-model="targetTeam" :items="teamList" item-text="name" item-value="id"
                        label="工作空间" @change="changeTeam(targetTeam)"></v-select>
                    <v-list dense>
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item v-for="(item, i) in groupList" :key="i" @click="onChangeGroup(1,item)">
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>

                    <v-btn outlined color="primary" block @click="onChangeGroup(2,'')">
                        归档
                    </v-btn>
                    <v-btn block color="primary" @click="createApi" style="margin-top:15px;color:white;">
                        添加
                    </v-btn>
                </v-col>
                <v-col cols="12" xl="10" lg="10" md="10" sm="9" xs="12">
                    <v-data-table :headers="headers" :items="list" :options.sync="pagination"
                        :footer-props="footerProps" :server-items-length="pagination.itemsLength" :loading="isLoading"
                        @update:page="changePage()" disable-sort>
                        <template v-slot:[`item.status`]="{item}">
                            <div>
                                {{ item.status|filterDeviceStatus }}
                            </div>
                        </template>
                        <template v-if="groupType==1" v-slot:[`item.actions`]="{ item }">
                            <v-menu v-if="groupType==1">
                                <template v-slot:activator="{ on: menu, attrs }">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on: tooltip }">
                                            <v-btn color="primary" icon dark v-bind="attrs"
                                                v-on="{ ...tooltip, ...menu }">
                                                <v-icon>mdi-dots-horizontal</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>更多操作</span>
                                    </v-tooltip>
                                </template>
                                <v-list rounded>
                                    <v-list-item-group>
                                        <v-list-item v-if="item.status==1" @click="pauseItem(item)">
                                            <v-list-item-icon>
                                                <v-icon>mdi-pause-circle-outline</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>暂停监控</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item v-if="item.status==3" @click="startMonitor(item)">
                                            <v-list-item-icon>
                                                <v-icon>mdi-play-circle-outline</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>启用监控</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item @click="onTransferDeviceGroup(item)">
                                            <v-list-item-icon>
                                                <v-icon>mdi-swap-horizontal</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>转移设备</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item @click="file(item)">
                                            <v-list-item-icon>
                                                <v-icon>mdi-file-cloud-outline</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>归档设备</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item @click="onDeleteDialog(item)">
                                            <v-list-item-icon>
                                                <v-icon color="red">mdi-trash-can-outline</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title style="color:red;">删除设备</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-menu>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </div>
            <TransferDeviceGroup :deviceType.sync="deviceType" :transferDialogStatus.sync="transferDialogStatus"
                :deviceId.sync="targetDevice" @confirm="onTransferConfirm()">
            </TransferDeviceGroup>
    </div>
</template>

<script>
    import {
        deviceStatusData
    } from '../../utils/config';
    import TransferDeviceGroup from '../../components/dialog/TransferDeviceGroup.vue';
    import ConfirmDeleteDialog from '@/components/dialog/ConfirmDeleteDialog.vue';
    export default {
        components: {
            TransferDeviceGroup,
            ConfirmDeleteDialog
        },
        data: () => ({
            targetDevice: 0,
            deviceType: 3,
            transferDialogStatus: false,
            headers: [{
                    text: "名称",
                    value: "name",
                },
                {
                    text: "地址",
                    value: "path",
                },
                {
                    text: "监控状态",
                    value: "status",
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

            selectedItem: 0,
            path: "",
            list: [],
            dialog: false,
            onDeleteId: "",
            teamList: [],
            groupList: [],
            targetTeam: "",
            targetGroup: "",
            isLoading: true,
            isDisabled: true,
            groupType: 1,
        }),
        filters: {
            filterDeviceStatus: function (v) {
                const a = deviceStatusData.filter(item => {
                    if (item.value == v) {
                        return item;
                    }
                })
                return a[0].label;
            },
        },
        methods: {
            onTransferConfirm() {
                this.getWebList(this.targetGroup);
            },
            onTransferDeviceGroup(item) {
                this.targetDevice = item.id;
                this.transferDialogStatus = true;
            },
            pauseItem(item) {
                const formData = new FormData();
                formData.append("id", item.id)
                this.$service.api.pauseService(formData)
                    .then(() => {
                        this.getTeamList();
                    })
            },
            onChangeGroup(groupType, item) {
                this.groupType = groupType;
                this.pagination = {
                    page: 1,
                    itemsPerPage: 5,
                    itemsLength: 1
                };
                // 1普通 2归档
                if (groupType == 1) {
                    this.getApiList(item.id);
                } else {
                    this.getFiledList();
                }
            },
            changePage() {
                if (this.groupType == 1) {
                    this.getApiList(this.targetGroup);
                } else {
                    this.getFiledList()
                }
            },
            startMonitor(item) {
                const formData = new FormData();
                formData.append("id", item.id)
                this.$service.api.startMonitorService(formData)
                    .then(() => {
                        this.getApiList(this.targetGroup);
                    })
            },
            file(item) {
                const formData = new FormData();
                formData.append("id", item.id)
                this.$service.api.fileService(formData)
                    .then(() => {
                        this.getApiList(this.targetGroup);
                    })
            },
            getFiledList() {
                this.isLoading = true;
                this.isDisabled = true;
                this.$service.api.getFiledListService(this.pagination.page, this.pagination.itemsPerPage)
                    .then(res => {
                        this.list = res['data'].data != null ? res['data'].data : [];
                        this.pagination.itemsLength = res.data.total;
                        this.pagination.page = res.data.page_index;
                        this.pagination.itemsPerPage = res.data.page_size;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            createApi() {
                this.$router.push("create");
            },
            getApiList(groupId) {
                this.isLoading = true;
                this.isDisabled = true;
                this.targetGroup = groupId;
                this.$service.api.getApiListService(groupId, this.pagination.page, this.pagination.itemsPerPage)
                    .then(res => {
                        this.list = res['data'].data != null ? res['data'].data : [];
                        this.pagination.itemsLength = res.data.total;
                        this.pagination.page = res.data.page_index;
                        this.pagination.itemsPerPage = res.data.page_size;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            redirectToOverview(item) {
                localStorage.setItem("path", item.path);
                this.$router.push(`/user/api/create?i=${item.id}`)
            },
            deleteDevice(id) {
                this.$service.api.deleteService(id)
                    .then(() => {
                        this.getApiList(this.targetGroup);
                    })
            },
            onDeleteDialog(item) {
                this.dialog = !this.dialog;
                this.onDeleteId = item.id;
            },
            onDelete() {
                this.deleteDevice(this.onDeleteId);
                this.onDeleteId = "";
                this.dialog = false;
            },
            getTeamList() {
                this.$service.team.getListService()
                    .then(res => {
                        this.teamList = res.data;
                        this.targetTeam = this.teamList[0].id;
                        this.getGroupList(this.targetTeam);
                    })
            },
            getGroupList(teamId) {
                this.$service.group.getListByTypeService(teamId, 3)
                    .then(res => {
                        this.groupList = res.data;
                        this.targetGroup = this.groupList[0].id;
                        this.getApiList(this.targetGroup);
                    })
            },
            changeTeam(id) {
                this.getGroupList(id);
            },
        },
        mounted() {
            this.getTeamList();
        }
    }
</script>