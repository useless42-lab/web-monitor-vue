<template>
    <div>
        <v-card>
            <v-tabs grow>
                <v-tab>
                    订阅计划
                </v-tab>
                <v-tab>
                    我的订单
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <div style="padding:10px;">
                                <v-row style="text-align:right;">
                                    <v-col cols="12" xl="2" lg="2" md="2" sm="2" v-for="(item,index) in list"
                                        :key="index" class="plan-list-item">
                                        <h3 style="margin-bottom:15px;">{{item.name}}</h3>
                                        <div class="plan-item">
                                            <div class="plan-item-title">工作空间数量</div>
                                            <div class="plan-item-content">{{item.team_number}} 个</div>
                                        </div>
                                        <div class="plan-item">
                                            <div class="plan-item-title">单团队空间人数</div>
                                            <div class="plan-item-content">{{item.team_member_limit}} 个</div>
                                        </div>
                                        <div class="plan-item">
                                            <div class="plan-item-title">单空间设备分组</div>
                                            <div class="plan-item-content">{{item.per_team_group_limit}} 个</div>
                                        </div>
                                        <div class="plan-item">
                                            <div class="plan-item-title">单空间监控设备</div>
                                            <div class="plan-item-content">{{item.per_team_device_limit}} 个</div>
                                        </div>
                                        <div class="plan-item">
                                            <div class="plan-item-title">单空间监控策略</div>
                                            <div class="plan-item-content">{{item.per_team_monitor_policy_limit}} 个
                                            </div>
                                        </div>
                                        <div class="plan-item">
                                            <div class="plan-item-title">状态页数量</div>
                                            <div class="plan-item-content">{{item.status_page_limit}} 个
                                            </div>
                                        </div>
                                        <div class="plan-item">
                                            <div class="plan-item-title">状态页版权</div>
                                            <div class="plan-item-content">
                                                <v-icon color="green" v-if="item.status_page_copyright==1">
                                                    mdi-check
                                                </v-icon>
                                                <v-icon color="grey" v-else>
                                                    mdi-close
                                                </v-icon>
                                            </div>
                                        </div>
                                        <div class="plan-item">
                                            <div class="plan-item-title">状态页样式</div>
                                            <div class="plan-item-content">
                                                <v-icon color="green" v-if="item.status_page_custom_style==1">
                                                    mdi-check
                                                </v-icon>
                                                <v-icon color="grey" v-else>
                                                    mdi-close
                                                </v-icon>
                                            </div>
                                        </div>
                                        <div class="plan-item">
                                            <div class="plan-item-title">状态页域名</div>
                                            <div class="plan-item-content">
                                                <v-icon color="green" v-if="item.status_page_domain==1">
                                                    mdi-check
                                                </v-icon>
                                                <v-icon color="grey" v-else>
                                                    mdi-close
                                                </v-icon>
                                            </div>
                                        </div>
                                        <div class="plan-item">
                                            <div class="plan-item-title">状态页密码</div>
                                            <div class="plan-item-content">
                                                <v-icon color="green" v-if="item.status_page_password==1">
                                                    mdi-check
                                                </v-icon>
                                                <v-icon color="grey" v-else>
                                                    mdi-close
                                                </v-icon>
                                            </div>
                                        </div>
                                        <div style="margin-bottom:5px;margin-top: 15px;" v-if="item.status==1">
                                            <v-btn outlined color="primary" block @click="navigateToBuy(item.url_key_month)">
                                                月付 {{item.price_month}}￥
                                            </v-btn>
                                        </div>
                                        <div v-if="item.status==1">
                                            <v-btn outlined color="primary" block @click="navigateToBuy(item.url_key_year)">
                                                年付 {{item.price_year}}￥
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-row style="margin:10px;">
                        <v-col cols="10">
                            <v-text-field v-model="orderId" label="订单号" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-btn color="primary" @click="checkOrder" :loading="isLoading" :disabled="isDisabled">确认订单</v-btn>
                        </v-col>
                    </v-row>
                    <v-card flat>
                        <v-card-text>
                            <v-data-table :headers="headers" :items="orderList" :options.sync="pagination"
                                :footer-props="footerProps" :server-items-length="pagination.itemsLength"
                                :loading="isLoading" @update:page="getOrderList()" disable-sort>
                                <template v-slot:[`item.status`]="{item}">
                                    <div>
                                        <div style="display:none;">{{ item.status }}</div>
                                        待发放
                                    </div>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
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
    export default {
        data() {
            return {
                orderId: "",
                qrContent: "",
                list: [],
                orderList: [],
                headers: [{
                        text: "订单编号",
                        value: "order_id",
                    },
                    {
                        text: "状态",
                        value: "status",
                    },
                    {
                        text: "创建时间",
                        value: "created_at"
                    },
                ],
                pagination: {
                    page: 1,
                    itemsPerPage: 5,
                    itemsLength: 1
                },
                footerProps: {
                    itemsPerPageOptions: [5]
                },
                isLoading: true,
                isDisabled: true,
                snackbar: false,
                errText: '',
                timeout: 2000,
            }
        },
        methods: {
            getOrderList() {
                this.$service.plan.getOrderListService(this.pagination.page, this.pagination.itemsPerPage)
                    .then(res => {
                        this.orderList = res['data'].data != null ? res['data'].data : [];
                        this.pagination.itemsLength = res.data.total;
                        this.pagination.page = res.data.page_index;
                        this.pagination.itemsPerPage = res.data.page_size;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            checkOrder() {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("order_id", this.orderId);
                this.$service.plan.checkOrderService(formData)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.errText = "成功";
                        } else {
                            this.errText = res['error'];
                        }
                        this.snackbar = true;
                        this.isLoading = false;
                        this.isDisabled = false;
                        this.getList();
                    })
            },
            getList() {
                this.$service.plan.getListService()
                    .then(res => {
                        this.list = res.data;
                    })
            },
            navigateToBuy(urlKey) {
                window.open("https://mianbaoduo.com/o/bread/" + urlKey);
            }
        },
        mounted() {
            this.getList();
            this.getOrderList();
        },
    }
</script>

<style scoped>
    .plan-list-item {
        border: solid 1px purple;
        padding: 15px;
        border-radius: 6px;
        width: 100%;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .plan-list-item:last-child {
        margin-right: 0px;
    }

    .plan-item {}

    .plan-item-title {}

    .plan-item-content {}
</style>