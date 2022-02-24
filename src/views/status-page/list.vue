<template>
    <div>
        <v-dialog v-model="addDialogStatus" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark class="deep-purple">
                    <v-btn icon dark @click="onReset()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>状态页</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="saveStatusPage()">
                            确认保存
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-stepper non-linear>
                            <v-stepper-header>
                                <v-stepper-step editable step="1">
                                    编辑基础信息
                                </v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step editable step="2">
                                    添加设备
                                </v-stepper-step>

                            </v-stepper-header>
                            <v-stepper-content step="1">
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" sm="12">
                                            <v-text-field v-model="statusPageItem.name" label="名称" hide-details="auto">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" v-if="planConfig.status_page_custom_style==1">
                                            <v-text-field v-model="statusPageItem.logo" label="logo"
                                                hide-details="auto">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12">
                                            <v-text-field v-model="statusPageItem.description" label="简介"
                                                hide-details="auto">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" v-if="planConfig.status_page_password==1">
                                            <v-switch v-model="statusPageItem.hasPassword" label="是否启用密码"
                                                color="primary" :value="statusPageItem.hasPassword" hide-details>
                                            </v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="12" v-if="statusPageItem.hasPassword==1">
                                            <v-text-field v-model="statusPageItem.password" label="密码"
                                                hide-details="auto">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12">
                                            <v-switch v-model="statusPageItem.hasPin" label="是否含有置顶信息"
                                                color="primary" :value="statusPageItem.hasPin" hide-details>
                                            </v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="12" v-if="statusPageItem.hasPin==1">
                                            <v-text-field v-model="statusPageItem.pinTitle" label="置顶信息标题"
                                                hide-details="auto">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" v-if="statusPageItem.hasPin==1">
                                            <v-textarea name="input-7-1" label="置顶信息内容"
                                                v-model="statusPageItem.pinMessage"></v-textarea>
                                        </v-col>
                                        <v-col cols="12" sm="12"
                                            v-if="statusPageItem.hasPin==1&&planConfig.status_page_custom_style==1">
                                            <v-text-field v-model="statusPageItem.pinColor" label="置顶信息背景色"
                                                hide-details="auto">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" v-if="planConfig.status_page_copyright==1">
                                            <v-switch v-model="statusPageItem.hasCopyright" label="是否去除版权信息"
                                                color="primary" :value="statusPageItem.hasCopyright" hide-details>
                                            </v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="12"
                                            v-if="statusPageItem.hasCopyright==1&&planConfig.status_page_copyright==1">
                                            <v-text-field v-model="statusPageItem.copyright" label="自定义版权信息"
                                                hide-details="auto">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" v-if="planConfig.status_page_domain==1">
                                            <v-switch v-model="statusPageItem.hasDomain" label="自定义域名"
                                                color="primary" :value="statusPageItem.hasDomain" hide-details>
                                            </v-switch>
                                        </v-col>
                                        <v-col cols="12" sm="12"
                                            v-if="statusPageItem.hasDomain==1&&planConfig.status_page_domain==1">
                                            <v-text-field v-model="statusPageItem.domain" label="域名"
                                                hide-details="auto">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-stepper-content>
                            <v-stepper-content step="2">
                                <v-card-text>
                                    <v-row>
                                        <div v-for="(item,index) in statusPageItem.deviceGroup" :key="index">
                                            <v-row>
                                                <v-col cols="12" xl="8" lg="8" md="8" sm="12">
                                                    <v-text-field v-model="item.name" label="分组名称" hide-details="auto">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" xl="4" lg="4" md="4" sm="12">
                                                    <v-btn icon color="success" @click="addStatusPageGroup()">
                                                        <v-icon>
                                                            mdi-plus
                                                        </v-icon>
                                                    </v-btn>
                                                    <v-btn icon color="red" @click="deleteStatusPageGroup(index)">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-row v-for="(item2,index1) in item.devices" :key="index1">
                                                <v-col cols="12" xl="8" lg="8" md="8" sm="12">
                                                    <v-select v-model="item2.device" :items="simpleDeviceData"
                                                        item-text="name" item-value="id" return-object label="设备列表">
                                                    </v-select>
                                                </v-col>
                                                <v-col cols="12" xl="4" lg="4" md="4" sm="12">
                                                    <v-btn icon color="success" @click="addStatusPageDevice(item)">
                                                        <v-icon>
                                                            mdi-plus
                                                        </v-icon>
                                                    </v-btn>
                                                    <v-btn icon color="red"
                                                        @click="deleteStatusPageDevice(item,index1)">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-row>
                                </v-card-text>
                            </v-stepper-content>
                        </v-stepper>

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
            <v-row>

                <v-col cols="12" sm="2">
                    <v-select outlined dense v-model="statusPageItem.teamId" :items="teamList" item-text="name"
                        item-value="id" label="工作空间" @change="changeTeam(statusPageItem.teamId)"></v-select>

                    <v-btn block color="primary" @click="addDialogStatus=true">
                        添加
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="10">
                    <v-data-table :headers="headers" :items="list" :options.sync="pagination"
                        :footer-props="footerProps" :server-items-length="pagination.itemsLength" :loading="isLoading"
                        @update:page="changePage()" disable-sort>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" icon color="primary" @click="onEdit(item)">
                                        <v-icon>mdi-pencil-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>编辑</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" icon color="primary" @click="onView(item)">
                                        <v-icon>mdi-eye-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>查看</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" icon color="error" @click="onDeleteDialog(item)">
                                        <v-icon>mdi-trash-can-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>删除</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>

                </v-col>
            </v-row>
            <ConfirmDeleteDialog :deleteDialogStatus.sync="dialog" @confirm="onDelete()"></ConfirmDeleteDialog>

        </div>
    </div>
</template>

<script>
    import ConfirmDeleteDialog from '@/components/dialog/ConfirmDeleteDialog.vue';
    export default {
        components:{
            ConfirmDeleteDialog
        },
        data: () => ({
            ex11: "123",
            addDialogStatus: false,
            headers: [{
                    text: "名称",
                    value: "name",
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
            isLoading: false,
            isDisabled: false,
            dialog: false,
            onDeleteId: "",
            snackbar: false,
            errText: '',
            timeout: 2000,

            teamList: [],
            groupList: [],
            policyList: [],
            targetGroup: "",
            targetPolicy: "",
            groupType: 1,
            simpleDeviceData: [],
            statusPageItem: {
                id: '',
                teamId: "",
                name: "",
                logo: "",
                description: "",
                hasPassword: 0,
                password: "",
                hasPin: 0,
                pinTitle: "",
                pinMessage: "",
                pinColor: "",
                hasCopyright: 0,
                copyright: "",
                hasDomain: 0,
                domain: "",
                deviceGroup: [{
                    name: "",
                    devices: [{
                        device: {}
                    }]
                }]
            },
            planConfig: {},
        }),
        methods: {
            getPlanConfig() {
                this.$service.plan.getConfigBaseService(this.statusPageItem.teamId)
                    .then(res => {
                        this.planConfig = res.data;
                    })
            },
            getDeviceSimpleList() {
                this.$service.device.getSimpleListService(this.statusPageItem.teamId)
                    .then(res => {
                        this.simpleDeviceData = res.data;
                    })
            },
            addStatusPageGroup() {
                this.statusPageItem.deviceGroup.push({
                    name: "",
                    devices: [{
                        device: {},
                    }]
                })
            },

            deleteStatusPageGroup(i) {
                if (this.statusPageItem.deviceGroup.length > 1) {
                    this.statusPageItem.deviceGroup.splice(i, 1);
                }
            },
            addStatusPageDevice(item) {
                item.devices.push({
                    device: {},
                })
            },
            deleteStatusPageDevice(item, i) {
                if (item.devices.length > 1) {
                    item.devices.splice(i, 1);
                }
            },
            onReset() {
                this.addDialogStatus = false;
            },

            changePage() {
                if (this.groupType == 1) {
                    this.getTcpList(this.targetGroup);
                }
            },

            saveStatusPage() {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("teamId", this.statusPageItem.teamId);
                formData.append("name", this.statusPageItem.name);
                formData.append("logo", this.statusPageItem.logo);
                formData.append("description", this.statusPageItem.description);
                formData.append("hasPassword", this.statusPageItem.hasPassword ? 1 : 0);
                formData.append("password", this.statusPageItem.password);
                formData.append("hasPin", this.statusPageItem.hasPin ? 1 : 0);
                formData.append("pinTitle", this.statusPageItem.pinTitle);
                formData.append("pinMessage", this.statusPageItem.pinMessage);
                formData.append("pinColor", this.statusPageItem.pinColor);
                formData.append("hasCopyright", this.statusPageItem.hasCopyright);
                formData.append("copyright", this.statusPageItem.copyright);
                formData.append("hasDomain", this.statusPageItem.hasDomain? 1 : 0);
                formData.append("domain", this.statusPageItem.domain);
                formData.append("deviceGroup", JSON.stringify(this.statusPageItem.deviceGroup))


                if (!Object.prototype.hasOwnProperty.call(this.statusPageItem.deviceGroup[0].devices[0].device,
                        "name")) {
                    this.errText = "请选择设备";
                    this.isLoading = false;
                    this.isDisabled = false;
                    this.snackbar = true;
                    return;
                }
                if (this.statusPageItem.deviceGroup[0].name == "") {
                    this.errText = "请创建分组";
                    this.isLoading = false;
                    this.isDisabled = false;
                    this.snackbar = true;
                    return;
                }

                if (this.statusPageItem.id == "") {
                    this.$service.statusPage.addService(formData)
                        .then((res) => {
                            if (res["code"] == 200) {
                                this.errText = "添加成功";
                            } else {
                                this.errText = res['error'];
                            }
                            this.snackbar = true;
                            this.isLoading = false;
                            this.isDisabled = false;
                            this.getStatusPageList(this.statusPageItem.teamId);
                            this.onReset();
                        })
                } else {
                    formData.append("statusPageId", this.statusPageItem.id);
                    this.$service.statusPage.updateStatusPageService(formData)
                        .then(res => {
                            if (res["code"] == 200) {
                                this.errText = "添加成功";
                            } else {
                                this.errText = res['error'];
                            }
                            this.snackbar = true;
                            this.isLoading = false;
                            this.isDisabled = false;
                            this.getStatusPageList(this.statusPageItem.teamId);
                            this.onReset();
                        })
                }
            },
            onDeleteDialog(item) {
                this.dialog = !this.dialog;
                this.onDeleteId = item.id;
            },
            onDelete() {
                this.deleteStatusPage(this.onDeleteId);
                this.onDeleteId = "";
                this.dialog = false;
            },
            deleteStatusPage(id) {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("team_id", this.statusPageItem.teamId)
                formData.append("statusPageId", id)
                this.$service.statusPage.deleteStatusPageService(formData)
                    .then(res => {
                        if (res["code"] == 200) {
                            this.errText = "成功";
                        } else {
                            this.errText = res['error'];
                        }
                        this.getStatusPageList(this.statusPageItem.teamId);
                        this.snackbar = true;
                        this.isLoading = false;
                        this.isDisabled = false;
                        this.onReset();
                    })
            },
            getStatusPageList(teamId) {
                this.isLoading = true;
                this.isDisabled = true;
                this.$service.statusPage.getListService(teamId, this.pagination.page, this.pagination.itemsPerPage)
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
                this.getStatusPageList(this.statusPageItem.teamId);
            },

            getTeamList() {
                this.$service.team.getListService()
                    .then(res => {
                        this.teamList = res['data'];
                        this.statusPageItem.teamId = this.teamList[0].id;
                        this.getStatusPageList(this.statusPageItem.teamId);
                        this.getPlanConfig(this.statusPageItem.teamId);
                        this.getDeviceSimpleList();
                    })
            },
            onEdit(item) {
                this.getDetail(item.id)
                this.addDialogStatus = true;
            },
            onView(item) {
                window.open("https://status.pingsilo.com/" + item.id);
            },
            getDetail(id) {
                this.$service.statusPage.getUserDetailDevice(this.statusPageItem.teamId, id)
                    .then(res => {
                        this.statusPageItem = res.data;
                    })
            }
        },
        mounted() {
            this.getTeamList();
        },
    }
</script>