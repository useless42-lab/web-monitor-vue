<template>
    <div>
        <v-dialog v-model="addDialogStatus" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark class="deep-purple">
                    <v-btn icon dark @click="onReset()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Minecraft服务器监控</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="createMinecraft()">
                            确认保存
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field v-model="name" label="网站名称" hide-details="auto"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field v-model="url" label="地址" hide-details="auto"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field v-model="port" label="端口" hide-details="auto" type="number">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="targetPolicy" :items="policyList" item-text="name" item-value="id"
                                    label="监控策略">
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="targetPlatformVersion" :items="platformVersion" item-text="label" item-value="value"
                                    label="游戏平台">
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-combobox v-model="selectMonitorRegion" :items="monitorRegion" item-text="label"
                                    label="监控区域" multiple chips>
                                    <template v-slot:selection="data">
                                        <v-chip>
                                            <v-avatar left>
                                                <v-icon>mdi-cloud</v-icon>
                                            </v-avatar>
                                            {{ data.item.label }}
                                        </v-chip>
                                    </template>
                                </v-combobox>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :timeout="timeout" top>
            {{ errText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
                    关闭
                </v-btn>
            </template>
        </v-snackbar>
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
                    <v-btn block color="primary" @click="addDialogStatus=true" :loading="isLoading"
                        :disabled="isDisabled" style="margin-top:15px;color:white;">
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
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" icon color="primary" @click="getDetail(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </template>
                                <span>编辑</span>
                            </v-tooltip>
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
            :deviceId.sync="targetDevice" @confirm="onTransferConfirm()" @cancel="onReset()">
        </TransferDeviceGroup>
    </div>
</template>

<script>
    import {
        deviceStatusData,
        monitorRegionData,
        platformVersionData
    } from '../../utils/config';
    import TransferDeviceGroup from '../../components/dialog/TransferDeviceGroup.vue';
    import ConfirmDeleteDialog from '@/components/dialog/ConfirmDeleteDialog.vue';
    export default {
        components: {
            TransferDeviceGroup,
            ConfirmDeleteDialog,
        },
        data: () => ({
            selectMonitorRegion: [{
                label: "默认1",
                value: 1
            }],
            monitorRegion: [],
            targetDevice: 0,
            deviceType: 8,
            transferDialogStatus: false,
            addDialogStatus: false,
            headers: [{
                    text: "名称",
                    value: "name",
                },
                {
                    text: "网站",
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

            url: "",
            port: "",
            name: "",
            list: [],
            isLoading: true,
            isDisabled: true,
            dialog: false,
            onDeleteId: "",
            snackbar: false,
            errText: '',
            timeout: 2000,

            teamList: [],
            groupList: [],
            policyList: [],
            platformVersion:platformVersionData,
            targetPlatformVersion:1,
            targetTeam: "",
            targetGroup: "",
            targetPolicy: "",
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
            getDetail(item) {
                this.$service.device.getDetailService(item.id, this.deviceType)
                    .then(res => {
                        this.targetDevice = res['data'].id;
                        this.name = res['data'].name;
                        this.url = res['data'].path.split(":")[0];
                        this.port = res['data'].path.split(":")[1];
                        this.targetPolicy = res['data'].policy_id;
                        this.addDialogStatus = true;
                        this.selectMonitorRegion = [];
                        monitorRegionData.filter(item => {
                            const arr = res.data['monitor_region'].split(",")
                            for (let index = 0; index < arr.length; index++) {
                                if (arr[index] == item.value) {
                                    this.selectMonitorRegion.push(item)
                                }
                            }
                        })
                    })
            },
            onTransferConfirm() {
                this.getWebList(this.targetGroup);
            },
            onTransferDeviceGroup(item) {
                this.targetDevice = item.id;
                this.transferDialogStatus = true;
            },
            onReset() {
                this.addDialogStatus = false;
                this.transferDialogStatus = false;
                this.targetDevice = 0;
            },
            pauseItem(item) {
                const formData = new FormData();
                formData.append("id", item.id)
                this.$service.minecraft.pauseService(formData)
                    .then(() => {
                        this.getList(this.targetGroup);
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
                    this.getList(item.id);
                } else {
                    this.getFiledList();
                }
            },
            changePage() {
                if (this.groupType == 1) {
                    this.getList(this.targetGroup);
                } else {
                    this.getFiledList()
                }
            },
            startMonitor(item) {
                const formData = new FormData();
                formData.append("id", item.id)
                this.$service.minecraft.startMonitorService(formData)
                    .then(() => {
                        this.getList(this.targetGroup);
                    })
            },
            file(item) {
                const formData = new FormData();
                formData.append("id", item.id)
                this.$service.minecraft.fileService(formData)
                    .then(() => {
                        this.getList(this.targetGroup);
                    })
            },
            getFiledList() {
                this.isLoading = true;
                this.isDisabled = true;
                this.groupType = 2;
                this.$service.minecraft.getFiledListService(this.pagination.page, this.pagination.itemsPerPage)
                    .then(res => {
                        this.list = res['data'].data != null ? res['data'].data : [];
                        this.pagination.itemsLength = res.data.total;
                        this.pagination.page = res.data.page_index;
                        this.pagination.itemsPerPage = res.data.page_size;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            createMinecraft() {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("name", this.name);
                formData.append("path", this.url + ":" + this.port);
                formData.append("team_id", this.targetTeam);
                formData.append("group_id", this.targetGroup);
                formData.append("policy_id", this.targetPolicy);
                formData.append("minecraft_id", this.targetDevice);
                formData.append("platform_version", this.targetPlatformVersion);
                const selectMonitorRegionArr = [];
                this.selectMonitorRegion.forEach(item => {
                    selectMonitorRegionArr.push(item.value);
                });
                selectMonitorRegionArr.join(",")
                formData.append("monitor_region", selectMonitorRegionArr.toString())
                if (this.targetDevice == 0) {
                    this.$service.minecraft.createService(formData)
                        .then(res => {
                            if (res["code"] == 200) {
                                this.getList(this.targetGroup);
                                this.errText = "添加成功";
                            } else {
                                this.errText = res['error'];
                            }
                            this.snackbar = true;
                            this.isLoading = false;
                            this.isDisabled = false;
                            this.addDialogStatus = false;
                            this.onReset();
                        })
                } else {
                    this.$service.minecraft.updateService(formData)
                        .then(res => {
                            if (res["code"] == 200) {
                                this.getList(this.targetGroup);
                                this.errText = "更新成功";
                            } else {
                                this.errText = res['error'];
                            }
                            this.snackbar = true;
                            this.isLoading = false;
                            this.isDisabled = false;
                            this.addDialogStatus = false;
                            this.onReset();
                        })
                }
            },
            getList(groupId) {
                this.isLoading = true;
                this.isDisabled = true;
                this.groupType = 1;
                this.targetGroup = groupId;
                this.$service.minecraft.getListService(groupId, this.pagination.page, this.pagination.itemsPerPage)
                    .then(res => {
                        this.list = res['data'].data != null ? res['data'].data : [];
                        this.pagination.itemsLength = res.data.total;
                        this.pagination.page = res.data.page_index;
                        this.pagination.itemsPerPage = res.data.page_size;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            getMonitorRegionList(teamId) {
                this.$service.plan.getConfigBaseService(teamId)
                    .then(res => {
                        monitorRegionData.filter(item => {
                            const arr = res.data['monitor_region'].split(",")
                            for (let index = 0; index < arr.length; index++) {
                                if (arr[index] == item.value) {
                                    this.monitorRegion.push(item)
                                }
                            }
                        })
                    })
            },
            getTeamList() {
                this.$service.team.getListService()
                    .then(res => {
                        this.teamList = res.data;
                        this.targetTeam = this.teamList[0].id;
                        this.getGroupList(this.targetTeam);
                        this.getPolicyList(this.targetTeam);
                        this.getMonitorRegionList(this.targetTeam);
                    })
            },
            getGroupList(teamId) {
                this.$service.group.getListByTypeService(teamId, 8)
                    .then(res => {
                        this.groupList = res.data;
                        this.targetGroup = this.groupList[0].id;
                        this.getList(this.targetGroup);
                    })
            },
            getPolicyList(teamId) {
                this.$service.policy.getListService(teamId)
                    .then(res => {
                        this.policyList = res.data;
                        this.targetPolicy = this.policyList[0].id;
                    })
            },
            changeTeam(id) {
                this.getGroupList(id);
            },
            redirectToOverview(item) {
                localStorage.setItem("path", item.path);
                this.$router.push(`/user/minecraft/${item.id}/overview`);
            },
            deleteDevice(id) {
                this.$service.minecraft.deleteService(id)
                    .then(() => {
                        this.getList(this.targetGroup);
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
            }
        },
        mounted() {
            this.getTeamList();
        }
    }
</script>