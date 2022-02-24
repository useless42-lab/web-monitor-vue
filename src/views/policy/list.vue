<template>
    <div>
        <v-dialog v-model="addDialogStatus" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark class="deep-purple">
                    <v-btn icon dark @click="onReset()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>监控策略</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="operatePolicy()">
                            确认保存
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field label="名称" required v-model="policyItem.name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="policyItem.frequency" :items="checkFrequency" item-text="label"
                                    item-value="value" label="检查频率"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="policyItem.web_monitor_type" :items="webMonitorTypeData"
                                    item-text="label" item-value="value" label="网站监控类型"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12" v-if="policyItem.web_monitor_type==1">
                                <v-text-field label="网站监控HTTP状态码" required v-model="policyItem.web_http_status_code">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" v-if="policyItem.web_monitor_type==2">
                                <v-text-field label="网站监控关键字" required v-model="policyItem.web_http_regexp_text">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="policyItem.server_monitor_type" :items="serverMonitorTypeData"
                                    item-text="label" item-value="value" label="服务器监控类型"></v-select>
                            </v-col>
                            <div style="width:100%;" v-if="policyItem.server_monitor_type==2">
                                <v-col cols="12" sm="12">
                                    <v-text-field label="内存阈值（%）" required v-model="policyItem.server_memory">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="硬盘阈值（%）" required v-model="policyItem.server_disk">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="CPU阈值（%）" required v-model="policyItem.server_cpu">
                                    </v-text-field>
                                </v-col>
                            </div>
                            <v-col cols="12" sm="12">
                                <v-select v-model="policyItem.api_monitor_type" :items="apiMonitorTypeData"
                                    item-text="label" item-value="value" label="接口监控类型"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12" v-if="policyItem.api_monitor_type==1">
                                <v-text-field label="接口监控HTTP状态码" required v-model="policyItem.api_http_status_code">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="policyItem.check_ssl" :items="checkSSLData" item-text="label"
                                    item-value="value" label="是否检查SSL证书"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12" v-if="policyItem.check_ssl==1">
                                <v-text-field label="提前天数（天）" required v-model="policyItem.check_ssl_advance">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="policyItem.check_whois" :items="checkWHOISData" item-text="label"
                                    item-value="value" label="是否检查WHOIS"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12" v-if="policyItem.check_whois==1">
                                <v-text-field label="提前天数（天）" required v-model="policyItem.check_whois_advance">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field label="失败等待次数（次）" required v-model="policyItem.failed_wait_times">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <div>
            <ConfirmDeleteDialog :deleteDialogStatus.sync="dialog" @confirm="onDelete()"></ConfirmDeleteDialog>
            <v-row>
                <v-col cols="12" sm="2">
                    <v-select outlined dense v-model="policyItem.team_id" :items="teamList" item-text="name"
                        item-value="id" label="工作空间" @change="changeTeam(targetTeam)"></v-select>

                    <v-btn block color="primary" @click="addDialogStatus=true">
                        添加
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="10">
                    <v-data-table :headers="headers" :items="list" :options.sync="pagination"
                        :footer-props="footerProps" :server-items-length="pagination.itemsLength" :loading="isLoading"
                        @update:page="changePage()" disable-sort>
                        <template v-slot:[`item.frequency`]="{item}">
                            <div>
                                {{ item.frequency/60 }}
                            </div>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn @click="onUpdatePolicy(item)" text color="primary">
                                编辑
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
        checkFrequencyData,
        webMonitorTypeData,
        serverMonitorTypeData,
        apiMonitorTypeData,
        checkSSLData,
        checkWHOISData
    } from '../../utils/config';
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
            onDeleteId: "",
            policyItem: {
                id: "",
                team_id: "",
                name: "",
                frequency: 3600,
                web_monitor_type: 1,
                server_monitor_type: 1,
                server_memory: 100,
                server_disk: 100,
                server_cpu: 100,
                api_monitor_type: 1,
                check_ssl: 0,
                check_ssl_advance: 30,
                check_whois: 0,
                check_whois_advance: 30,
                web_http_status_code: 200,
                web_http_regexp_text: "",
                api_http_status_code: 200,
                failed_wait_times: 3,
            },
            checkFrequency: [],
            webMonitorTypeData: webMonitorTypeData,
            serverMonitorTypeData: serverMonitorTypeData,
            apiMonitorTypeData: apiMonitorTypeData,
            checkSSLData: checkSSLData,
            checkWHOISData:checkWHOISData,
            isLoading: false,
            isDisabled: false,
            snackbar: false,
            errText: '',
            timeout: 2000,
            teamList: [],
            headers: [{
                    text: "名称",
                    value: "name",
                },
                {
                    text: "监控频率（分钟）",
                    value: "frequency",
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
        methods: {
            getTeamList() {
                this.$service.team.getListService()
                    .then(res => {
                        this.teamList = res['data'];
                        this.policyItem.team_id = this.teamList[0].id
                        this.getList(this.policyItem.team_id);
                    })
            },
            changeTeam() {
                this.getList(this.policyItem.team_id);
            },
            getList(teamId) {
                this.isLoading = true;
                this.isDisabled = true;
                this.$service.policy.getListPaginationService(teamId, this.pagination.page, this.pagination.itemsPerPage)
                    .then(res => {
                        this.list = res['data'].data != null ? res['data'].data : [];
                        this.pagination.itemsLength = res.data.total;
                        this.pagination.page = res.data.page_index;
                        this.pagination.itemsPerPage = res.data.page_size;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            changePage() {
                this.getList(this.policyItem.team_id);
            },
            addPolicy() {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("team_id", this.policyItem.team_id);
                formData.append("name", this.policyItem.name);
                formData.append("frequency", this.policyItem.frequency);
                formData.append("web_monitor_type", this.policyItem.web_monitor_type);
                formData.append("server_monitor_type", this.policyItem.server_monitor_type);
                formData.append("api_monitor_type", this.policyItem.api_monitor_type);
                formData.append("server_memory", this.policyItem.server_memory)
                formData.append("server_disk", this.policyItem.server_disk);
                formData.append("server_cpu", this.policyItem.server_cpu);
                formData.append("check_ssl", this.policyItem.check_ssl);
                formData.append("check_ssl_advance", this.policyItem.check_ssl_advance * 60 * 60 * 24);
                formData.append("check_whois", this.policyItem.check_whois);
                formData.append("check_whois_advance", this.policyItem.check_whois_advance * 60 * 60 * 24);
                formData.append("web_http_status_code", this.policyItem.web_http_status_code);
                formData.append("web_http_regexp_text", this.policyItem.web_http_regexp_text);
                formData.append("api_http_status_code", this.policyItem.api_http_status_code);
                formData.append("failed_wait_times", this.policyItem.failed_wait_times);
                this.$service.policy.addService(formData)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.getList(this.policyItem.team_id);
                        } else {
                            this.errText = res['error'];
                            this.snackbar = true;
                        }
                        this.isLoading = false;
                        this.isDisabled = false;
                        this.addDialogStatus=false;
                    })
            },
            updatePolicy() {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("policy_id", this.policyItem.id);
                formData.append("team_id", this.policyItem.team_id);
                formData.append("name", this.policyItem.name);
                formData.append("frequency", this.policyItem.frequency);
                formData.append("web_monitor_type", this.policyItem.web_monitor_type);
                formData.append("server_monitor_type", this.policyItem.server_monitor_type);
                formData.append("api_monitor_type", this.policyItem.api_monitor_type);
                formData.append("server_memory", this.policyItem.server_memory)
                formData.append("server_disk", this.policyItem.server_disk);
                formData.append("server_cpu", this.policyItem.server_cpu);
                formData.append("check_ssl", this.policyItem.check_ssl);
                formData.append("check_ssl_advance", this.policyItem.check_ssl_advance * 60 * 60 * 24);
                formData.append("check_whois", this.policyItem.check_whois);
                formData.append("check_whois_advance", this.policyItem.check_whois_advance * 60 * 60 * 24);
                formData.append("web_http_status_code", this.policyItem.web_http_status_code);
                formData.append("web_http_regexp_text", this.policyItem.web_http_regexp_text);
                formData.append("api_http_status_code", this.policyItem.api_http_status_code);
                formData.append("failed_wait_times", this.policyItem.failed_wait_times);
                this.$service.policy.updateService(formData)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.getList(this.policyItem.team_id);
                        } else {
                            this.errText = res['error'];
                            this.snackbar = true;
                        }
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            onUpdatePolicy(item) {
                this.policyItem.id = item.id;
                this.$service.policy.getDetailService(this.policyItem.team_id, this.policyItem.id)
                    .then(res => {
                        this.policyItem = res['data'];
                        this.policyItem.frequency = res['data'].frequency;
                        this.policyItem.check_ssl_advance = res['data'].check_ssl_advance / 60 / 60 / 24;
                        this.policyItem.check_whois_advance = res['data'].check_whois_advance / 60 / 60 / 24;
                    })
                this.addDialogStatus = true;
            },
            operatePolicy() {
                if (this.policyItem.id == "") {
                    // 新增
                    this.addPolicy();
                } else {
                    // 修改
                    this.updatePolicy();
                }
                this.onReset();
            },
            onReset() {
                const targetTeamId = this.policyItem.team_id;
                this.policyItem = {
                    id: "",
                    name: "",
                    frequency: 3600,
                    web_monitor_type: 1,
                    server_monitor_type: 1,
                    server_memory: 100,
                    server_disk: 100,
                    server_cpu: 100,
                    api_monitor_type: 1,
                    check_ssl: 0,
                    check_ssl_advance: 30,
                    check_whois: 0,
                    check_whois_advance: 30,
                    web_http_status_code: 200,
                    web_http_regexp_text: '',
                    api_http_status_code: 200,
                    failed_wait_times: 3,
                }
                this.policyItem.team_id = targetTeamId;
                this.addDialogStatus = false;
            },
            deletePolicy(deleteId) {
                this.isLoading = true;
                this.isDisabled = true;
                this.$service.policy.deleteService(this.policyItem.team_id, deleteId)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.getList(this.policyItem.team_id);
                        } else {
                            this.errText = res['error'];
                            this.snackbar = true;
                        }
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            onDeleteDialog(item) {
                this.dialog = !this.dialog;
                this.onDeleteId = item.id
            },
            onDelete() {
                this.deletePolicy(this.onDeleteId);
                this.onDeleteId = "";
                this.dialog = false;
            },
            getPlanFrequencyByUserId() {
                this.$service.policy.getPlanFrequencyByUserIdService()
                    .then(res => {
                        checkFrequencyData.filter(item => {
                            const arr = res.data["frequency_limit"].split(",")
                            for (let index = 0; index < arr.length; index++) {
                                if (arr[index] == item.value) {
                                    this.checkFrequency.push(item)
                                }
                            }
                        })
                    })
            }
        },
        mounted() {
            this.getPlanFrequencyByUserId();
            this.getTeamList();
        }
    }
</script>