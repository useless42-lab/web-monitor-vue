<template>
    <div>
        <div v-if="statusPageItem.name!=''">
            <v-container>
                <div class="display-align-center" style="height: 100px;">
                    <div>
                        <v-img :aspect-ratio="1/1" width="66"
                            :src="imgLogo" ></v-img>
                    </div>
                    <div style="font-size:2em;font-weight:bolder;margin-left:20px;">
                        {{statusPageItem.name}}
                    </div>
                </div>
                <v-alert v-if="statusPageItem.hasPin==1" dense border="left"
                    :color="statusPageItem.pinColor?statusPageItem.pinColor:'deep-purple'" dark dismissible>
                    <div>{{statusPageItem.pinTitle}}</div>
                    <div>{{statusPageItem.pinMessage}}</div>
                </v-alert>
                <v-banner>
                    {{statusPageItem.description}}
                </v-banner>
                <v-card style="margin-bottom:20px;" v-for="(item,index) in statusPageItem.deviceGroup" :key="index">
                    <v-card-title>{{item.name}}</v-card-title>
                    <v-card-text>
                        <div class="display-align-center reset-display" style="justify-content: space-between;"
                            v-for="(item1, index1) in item.devices" :key="index1">
                            <div class="display-align-center">
                                <v-chip class="ma-2" color="#ccc" text-color="white"
                                    v-if="item1.device.log[0].check_success==2">
                                    {{item1.device.log[0].check_success|filterDeviceStatus}}
                                </v-chip>
                                <v-chip class="ma-2" color="success" text-color="white"
                                    v-if="item1.device.log[0].check_success==1">
                                    {{item1.device.log[0].check_success|filterDeviceStatus}}
                                </v-chip>
                                <v-chip class="ma-2" color="red" text-color="white"
                                    v-if="item1.device.log[0].check_success==0">
                                    {{item1.device.log[0].check_success|filterDeviceStatus}}
                                </v-chip>
                                <div>{{item1.device.name}}</div>
                            </div>
                            <div class="display-align-center status-block">
                                <v-tooltip top v-for="(item3,index3) in item1.device.log" :key="index3">
                                    <template v-slot:activator="{ on, attrs }">
                                        <div v-bind="attrs" v-on="on"  :key="index3" class="status-block-item" style=""
                                            :class="{'unknown-color':item3.check_success==2,'success-color':item3.check_success==1,'error-color':item3.check_success==0}">
                                        </div>
                                    </template>
                                    <span>{{item3.created_at}} - {{item3.check_success|filterDeviceStatus}}</span>
                                </v-tooltip>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-container>
            <div style="text-align:center;color:#ccc;font-size:0.9em;">
                <span v-if="statusPageItem.hasCopyright==0">Powered by www.pingsilo.com</span>
                <span v-if="statusPageItem.hasCopyright==1">{{statusPageItem.copyright}}</span>
            </div>
        </div>
        <div v-if="statusPageItem.name==''"
            style="width:100%;height:100vh;display:flex;justify-content:center;align-items:center;">404</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgLogo:require("../../assets/logo.png"),
                statusPageItem: {
                    name: "",
                    logo: "",
                    description: "",
                    hasPassword: 0,
                    password: "",
                    hasPin: 0,
                    pinTitle: "",
                    pinMessage: "",
                    deviceGroup: [{
                        name: "",
                        devices: [{
                            device: {}
                        }]
                    }]
                },
            }
        },
        filters: {
            filterDeviceStatus: function (v) {
                if (v == 1) {
                    return "可用";
                }
                if (v == 0) {
                    return "故障";
                }
                if (v == 2) {
                    return "未知";
                }
            },
        },
        methods: {
            getList() {
                this.$service.statusPage.getDetailService(this.$route.params.id, this.$route.query.p)
                    .then(res => {
                        this.statusPageItem = res.data;
                    })
            }
        },
        mounted() {
            this.getList()
        },
    }
</script>

<style scoped>
    .unknown-color {
        background-color: #ccc;
    }

    .error-color {
        background-color: red;
    }

    .success-color {
        background-color: green;
    }

    .display-align-center {
        display: flex;
        align-items: center;
    }

    .status-block-item {
        width: 8px;
        height: 25px;
        margin-right: 5px;
        border-radius: 3px;
    }

    @media (max-width: 425px) {
        .reset-display {
            display: block;
        }

        .status-block {
            justify-content: space-between;
            margin-bottom: 15px;
        }

        .status-block-item {
            width: 5px;
            height: 20px;
            margin-right: 0px;
            border-radius: 3px;
        }
    }

    @media (min-width: 1920px) {
        .container {
            max-width: 1185px;
        }
    }
</style>