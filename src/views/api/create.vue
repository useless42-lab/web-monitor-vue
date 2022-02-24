<template>
    <div>
        <v-row>
            <v-col cols="12" xl="8" lg="8" md="8" sm="12">
                <div>
                    <h3 class="title-margin">基本设置</h3>
                    <v-form>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-select v-model="targetTeam" :items="teamList" item-text="name" item-value="id"
                                    label="工作空间" @change="changeTeam(targetTeam)"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="targetGroup" :items="groupList" item-text="name" item-value="id"
                                    label="设备分组"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="targetPolicy" :items="policyList" item-text="name" item-value="id"
                                    label="监控策略"></v-select>
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
                            <v-col cols="12">
                                <v-text-field v-model="apiConfig.name" label="名称" hide-details="auto"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="apiConfig.path" label="地址" hide-details="auto"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </div>
                <div>
                    <h3 class="title-margin">请求参数</h3>

                    <v-form>
                        <v-form>
                            <div>请求头</div>
                            <v-row v-for="(item,index) in apiConfig.requestHeaders" :key="index">
                                <v-col cols="12" xl="5" lg="5" md="5" sm="12">
                                    <v-text-field v-model="item.name" label="请求头名称" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" xl="5" lg="5" md="5" sm="12">
                                    <v-text-field v-model="item.value" label="请求头值" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" xl="2" lg="2" md="2" sm="12">
                                    <v-btn icon color="success" @click="addHeadersFormParams()">
                                        <v-icon>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                    <v-btn icon color="red" @click="deleteHeadersFormParams(index)">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-select v-model="apiConfig.method" :items="httpMethod" item-text="label" item-value="value"
                            label="Method"></v-select>
                        <v-select v-model="apiConfig.bodyType" @change="clickTest(apiConfig.bodyType)" :items="bodyType"
                            item-text="label" item-value="value" label="Body"></v-select>
                        <v-form>
                            <v-textarea v-if="apiConfig.bodyType==1" outlined label="Raw Data"
                                v-model="apiConfig.rawData">
                            </v-textarea>
                            <v-textarea v-if="apiConfig.bodyType==2" outlined label="JSON Data"
                                v-model="apiConfig.jsonData">
                            </v-textarea>
                        </v-form>
                        <v-form v-if="apiConfig.bodyType==3">
                            <v-row v-for="(item,index) in apiConfig.formParamsData" :key="index">
                                <v-col cols="12" xl="5" lg="5" md="5" sm="12">
                                    <v-text-field v-model="item.name" label="参数名称" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" xl="5" lg="5" md="5" sm="12">
                                    <v-text-field v-model="item.value" label="参数值" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" xl="2" lg="2" md="2" sm="12">
                                    <v-btn icon color="success" @click="addFormParams()">
                                        <v-icon>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                    <v-btn icon color="red" @click="deleteFormParams(index)">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field v-model="apiConfig.basicUser" label="Basic Authentication User" hide-details="auto"></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" sm="12">
                                <v-text-field v-model="apiConfig.basicPassword" label="Basic Authentication Password" hide-details="auto"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </div>
                <div>
                    <h3 class="title-margin">响应内容</h3>
                    <v-form>
                        <v-textarea outlined label="响应内容" v-model="apiConfig.responseData">
                        </v-textarea>
                    </v-form>
                </div>
                <div>
                    <v-btn block @click="updateApiConfig()" color="success">
                        保存
                    </v-btn>
                </div>
            </v-col>
            <v-col cols="12" xl="4" lg="4" md="4" sm="12" v-if="Object.keys(mockData).length != 0">
                <h3 class="title-margin">模拟请求</h3>
                <div class="mock-item">
                    <div class="mock-title">请求地址</div>
                    <div>{{mockData.path}}</div>
                </div>
                <div class="mock-item">
                    <div class="mock-title">请求方法</div>
                    <div>{{mockData.method|filterHttpMethod}}</div>
                </div>
                <div class="mock-item">
                    <div class="mock-title">Headers</div>
                    <div>
                        <v-row v-for="(item,index) in JSON.parse(mockData.request_headers)" :key="index">
                            <v-col cols="12" xl="6" lg="6" md="6" sm="6" style="color:#999999;">{{item.name}}</v-col>
                            <v-col cols="12" xl="6" lg="6" md="6" sm="6">{{item.value}}</v-col>
                        </v-row>
                    </div>
                </div>
                <div class="mock-item">
                    <div style="display:flex;">
                        <div class="mock-title">Body</div>
                        <div style="font-size:0.8em;margin-left:3px;margin-top:0.2em;">
                            {{mockData.body_type|filterBodyType}}</div>
                    </div>
                    <div>
                        <div v-if="mockData.body_type==1">
                            {{mockData.body_raw}}
                        </div>
                        <div v-if="mockData.body_type==2">
                            {{mockData.body_json}}
                        </div>
                        <div v-if="mockData.body_type==3">
                            <v-row v-for="(item,index) in JSON.parse(mockData.body_form)" :key="index">
                                <v-col cols="12" xl="6" lg="6" md="6" sm="6" style="color:#999999;">{{item.name}}
                                </v-col>
                                <v-col cols="12" xl="6" lg="6" md="6" sm="6">{{item.value}}</v-col>
                            </v-row>
                        </div>
                    </div>
                </div>
                <div class="mock-item">
                    <div class="mock-title">Response</div>
                    <div>{{mockData.response_data}}</div>
                </div>

                <div class="mock-item">
                    <v-btn block @click="mockApi(id)" color="primary" :loading="isLoading" :disabled="isDisabled">
                        模拟请求
                    </v-btn>
                </div>
            </v-col>
        </v-row>

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
        httpMethodData,
        bodyTypeData,
        monitorRegionData
    } from '../../utils/config';
    export default {
        data: () => ({
            selectMonitorRegion: [{
                label: "默认1",
                value: 1
            }],
            monitorRegion: [],
            id: 0,
            apiConfig: {
                name: "",
                path: "",
                method: 1,
                requestHeaders: [{
                    name: "",
                    value: "",
                }],
                bodyType: 1,
                rawData: "",
                jsonData: "",
                formParamsData: [{
                    name: "",
                    value: "",
                }],
                responseData: "",
                basicUser:"",
                basicPassword:"",
            },
            httpMethod: httpMethodData,
            bodyType: bodyTypeData,
            mockData: {},
            teamList: [],
            groupList: [],
            policyList: [],
            targetTeam: "",
            targetGroup: "",
            targetPolicy: "",
            isLoading: false,
            isDisabled: false,
            snackbar: false,
            errText: '',
            timeout: 2000,
        }),
        filters: {
            filterHttpMethod: function (v) {
                const a = httpMethodData.filter(item => {
                    if (item.value == v) {
                        return item;
                    }
                })
                return a[0].label;
            },
            filterBodyType: function (v) {
                const a = bodyTypeData.filter(item => {
                    if (item.value == v) {
                        return item;
                    }
                })
                return a[0].label;
            }
        },
        methods: {
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
                this.$service.group.getListByTypeService(teamId, 3)
                    .then(res => {
                        this.groupList = res.data;
                        this.targetGroup = this.groupList[0].id;
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
            clickTest(v) {
                console.log(v);
            },
            addFormParams() {
                this.apiConfig.formParamsData.push({
                    name: "",
                    value: "",
                })
            },
            deleteFormParams(i) {
                this.apiConfig.formParamsData.splice(i, 1);
            },
            addHeadersFormParams() {
                this.apiConfig.requestHeaders.push({
                    name: "",
                    value: "",
                })
            },
            deleteHeadersFormParams(i) {
                this.apiConfig.requestHeaders.splice(i, 1);
            },
            updateApiConfig() {
                const formData = new FormData();
                formData.append("id", this.id);
                formData.append("name", this.apiConfig.name);
                formData.append("path", this.apiConfig.path);
                formData.append("team_id", this.targetTeam);
                formData.append("group_id", this.targetGroup);
                formData.append("policy_id", this.targetPolicy);
                formData.append("method", this.apiConfig.method);
                formData.append("request_headers", JSON.stringify(this.apiConfig.requestHeaders));
                formData.append("body_type", this.apiConfig.bodyType);
                formData.append("body_raw", this.apiConfig.rawData);
                formData.append('body_json', this.apiConfig.jsonData);
                formData.append("body_form", JSON.stringify(this.apiConfig.formParamsData));
                formData.append("response_data", this.apiConfig.responseData);
                formData.append("basic_user",this.apiConfig.basicUser);
                formData.append("basic_password",this.apiConfig.basicPassword);
                
                const selectMonitorRegionArr = [];
                this.selectMonitorRegion.forEach(item => {
                    selectMonitorRegionArr.push(item.value);
                });
                selectMonitorRegionArr.join(",")
                formData.append("monitor_region", selectMonitorRegionArr.toString())

                if (this.id == 0) {
                    this.$service.api.createService(formData)
                        .then(res => {
                            if (res["code"] == 200) {
                                this.errText = "添加成功";
                                this.mockData = res.data;
                                this.id = res.data.id;
                            } else {
                                this.errText = res['error'];
                            }
                            this.snackbar = true;
                            this.isLoading = false;
                            this.isDisabled = false;
                        })
                } else {
                    this.$service.api.updateService(formData)
                        .then(res => {
                            if (res["code"] == 200) {
                                this.errText = "更新成功";
                                this.mockData = res.data;
                            } else {
                                this.errText = res['error'];
                            }
                            this.snackbar = true;
                            this.isLoading = false;
                            this.isDisabled = false;
                        })
                }
            },
            getDetail(id) {
                this.$service.api.detailService(id)
                    .then(res => {
                        this.mockData = res.data;
                        this.apiConfig.name = res.data.name;
                        this.apiConfig.path = res.data.path;
                        this.targetGroup = res.data.group_id;
                        this.targetPolicy = res.data.policy_id;
                        this.apiConfig.method = res.data.method;
                        this.apiConfig.requestHeaders = JSON.parse(res.data.request_headers);
                        this.apiConfig.formParamsData = JSON.parse(res.data.body_form);
                        this.apiConfig.jsonData = res.data.body_json;
                        this.apiConfig.rawData = res.data.body_raw;
                        this.apiConfig.bodyType = res.data.body_type;
                        this.apiConfig.responseData = res.data.response_data;
                        this.apiConfig.basicUser=res.data.basic_user;
                        this.apiConfig.basicPassword=res.data.basic_password;
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
            mockApi(id) {
                this.isLoading = true;
                this.isDisabled = true;
                this.$service.api.mockService(id)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.errText = res['data'];
                        } else {
                            this.errText = res['error'];
                        }
                        this.snackbar = true;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            }
        },
        mounted() {
            if (this.$route.query.i) {
                this.id = this.$route.query.i;
                this.getDetail(this.id);
            }
            this.getTeamList();
        },
    }
</script>

<style lang="stylus">
    .title-margin {
        margin-bottom: 10px;
    }

    .mock-item {
        margin-bottom: 10px;
    }

    .mock-title {
        color: #999999;
        margin-bottom: 5px;
    }
</style>