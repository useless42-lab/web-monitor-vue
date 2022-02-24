<template>
    <div>
        <v-card elevation="2" :loading="isLoading">
            <v-card-text>
                <v-row>
                    <v-col cols="6" xl="3" lg="3" md="3" sm="3" class="ping-item">
                        <div>Min</div>
                        <div>{{overviewDetail.min_elapsed}}ms</div>
                    </v-col>
                    <v-col cols="6" xl="3" lg="3" md="3" sm="3" class="ping-item">
                        <div>Max</div>
                        <div>{{overviewDetail.max_elapsed}}ms</div>
                    </v-col>
                    <v-col cols="6" xl="3" lg="3" md="3" sm="3" class="ping-item">
                        <div>Avg</div>
                        <div>{{Math.round(overviewDetail.avg_elapsed)}}ms</div>
                    </v-col>
                    <v-col cols="6" xl="3" lg="3" md="3" sm="3" class="ping-item">
                        <div>监控状态</div>
                        <div>
                            {{overviewDetail.success_percent}}%
                        </div>
                    </v-col>
                </v-row>
                <div style="text-align:right;font-size:0.8em;">最后检测时间 {{overviewDetail.created_at}}</div>
            </v-card-text>
        </v-card>
        <v-row>
            <v-col cols="12" xl="6" lg="6" md="6" xm="12">
                <v-card elevation="2" :loading="isLoading">
                    <v-card-title>
                        SSL信息
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" icon color="primary" @click="checkSSL()">
                                    <v-icon>mdi-cached</v-icon>
                                </v-btn>
                            </template>
                            <span>更新</span>
                        </v-tooltip>
                    </v-card-title>
                    <v-card-text>
                        <div class="d-flex">
                            <div>状态：</div>
                            <div>{{sslDetail.issuer==0&&sslDetail.subject==0?"无效":"正常"}}</div>
                        </div>
                        <div class="d-flex">
                            <div>申请时间：</div>
                            <div>{{sslDetail.start_time}}</div>
                        </div>
                        <div class="d-flex">
                            <div>到期时间：</div>
                            <div>{{sslDetail.end_time}}</div>
                        </div>
                        <div class="d-flex">
                            <div>颁发者：</div>
                            <div>{{sslDetail.issuer}}</div>
                        </div>

                        <div class="d-flex">
                            <div>颁发给：</div>
                            <div>{{sslDetail.subject}}</div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" xm="12">
                <v-card elevation="2" :loading="isLoading">
                    <v-card-title>
                        WHOIS信息
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" icon color="primary" @click="checkWHOIS()">
                                    <v-icon>mdi-cached</v-icon>
                                </v-btn>
                            </template>
                            <span>更新</span>
                        </v-tooltip>
                    </v-card-title>
                    <v-card-text>
                        <div class="d-flex">
                            <div>创建时间：</div>
                            <div>{{whoisDetail.domain_created_date}}</div>
                        </div>
                        <div class="d-flex">
                            <div>到期时间：</div>
                            <div>{{whoisDetail.domain_expiration_date}}</div>
                        </div>
                        <div class="d-flex">
                            <div>域名所有人：</div>
                            <div>{{whoisDetail.registrant_name}}</div>
                        </div>

                        <div class="d-flex">
                            <div>注册机构：</div>
                            <div>{{whoisDetail.registrar_name}}</div>
                        </div>
                        <div class="d-flex">
                            <div>更新时间：</div>
                            <div>{{whoisDetail.updated_at}}</div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data: () => ({
            isLoading: false,
            webId: "",
            sslDetail: {},
            whoisDetail: {},
            overviewDetail: {},
        }),
        methods: {
            checkSSL() {
                this.isLoading = true;
                const formData = new FormData();
                formData.append("id", this.webId)
                this.$service.web.checkSSLService(formData)
                    .then(res => {
                        if (res.code == 200) {
                            setTimeout(() => {
                                this.getWebSSLConfig();
                                this.isLoading = false;
                            }, 1000);
                        }
                    })
            },
            checkWHOIS() {
                this.isLoading = true;
                const formData = new FormData();
                formData.append("id", this.webId)
                this.$service.web.checkWhoisService(formData)
                    .then(res => {
                        if (res.code == 200) {
                            setTimeout(() => {
                                this.getWhois();
                                this.isLoading = false;
                            }, 3000);
                        }
                    })
            },
            getWebSSLConfig() {
                this.$service.web.getWebSSLConfigService(this.webId)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.sslDetail = res['data'];
                        }
                    })
            },
            getWhois() {
                this.$service.web.getWhoisService(this.webId)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.whoisDetail = res['data'];
                        }
                    })
            },
            getWebOverview() {
                this.$service.web.getWebOverviewService(this.webId)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.overviewDetail = res['data'];
                        }
                    })
            }
        },
        mounted() {
            this.webId = this.$route.params.webId;
            this.getWebSSLConfig();
            this.getWebOverview();
            this.getWhois();
        }
    }
</script>

<style scoped>
    .ping-item {
        text-align: center;
    }

    .ping-item div:last-child {
        color: black;
        font-size: 1.6em;
        margin-top: 5px;
    }
</style>