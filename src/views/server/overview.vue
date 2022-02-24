<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card elevation="2">
                    <v-card-title>
                        资源使用情况
                    </v-card-title>
                    <v-card-text>
                        <div>
                            <v-progress-linear v-model="newestLogData.memory_used_percent" color="primary" height="25">
                            </v-progress-linear>
                            <div class="d-flex" style="margin-top:8px;">
                                <div>内存：</div>
                                <div>
                                    {{newestLogData.memory_used}}GB/{{newestLogData.memory_total}}GB
                                </div>
                            </div>
                        </div>
                        <div style="margin-top:15px;">
                            <v-progress-linear v-model="newestLogData.disk_used_percent" color="primary" height="25">
                            </v-progress-linear>
                            <div class="d-flex" style="margin-top:8px;">
                                <div>系统盘：</div>
                                <div>
                                    {{newestLogData.disk_used}}GB/{{newestLogData.disk_total}}GB
                                </div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card elevation="2">
                    <v-card-title>
                        CPU利用率
                    </v-card-title>
                    <div style="width:100%;padding:10px;" id="cpu-chart"></div>
                </v-card>
                <v-card elevation="2" style="margin-top:20px;">
                    <v-card-title>
                        内存使用率
                    </v-card-title>
                    <div style="width:100%;padding:10px;" id="memory-chart"></div>
                </v-card>
                <v-card elevation="2" style="margin-top:20px;">
                    <v-card-title>
                        内存使用量
                    </v-card-title>
                    <div style="width:100%;padding:10px;" id="memory-used-chart"></div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import * as G2 from '@antv/g2';
    export default {
        data() {
            return {
                serverId: "",
                serverLogData: "",
                newestLogData: "",
            }
        },
        methods: {
            getFormatData(data) {
                return Math.round(data / 1024 / 1024 / 1024 * 100) / 100;
            },
            getFormatPercent(data) {
                return Math.round(data * 100) / 100;
            },
            getServerLog() {
                this.$service.server.getServerLogService(this.serverId)
                    .then(res => {
                        this.serverLogData = res['data'];
                        this.newestLogData = this.serverLogData[this.serverLogData.length - 1];
                        this.serverLogData.forEach(item => {
                            /* eslint-disable @typescript-eslint/camelcase */
                            item.cpu_percent = this.getFormatPercent(item.cpu_percent);
                            item.memory_used_percent = this.getFormatPercent(item.memory_used_percent);
                            item.memory_used = this.getFormatData(item.memory_used);
                            item.memory_total = this.getFormatData(item.memory_total);
                            item.disk_total = this.getFormatData(item.disk_total);
                            item.disk_used = this.getFormatData(item.disk_used);
                            item.disk_used_percent = this.getFormatPercent(item.disk_used_percent);
                            item.created_at=this.$moment(item.created_at).format("HH:mm");

                        });
                        this.generateChart("cpu-chart", this.serverLogData, "created_at*cpu_percent")
                        this.generateChart("memory-chart", this.serverLogData, "created_at*memory_used_percent")
                        this.generateChart("memory-used-chart", this.serverLogData, "created_at*memory_used")
                    })
            },
            generateChart(target, data, xy) {
                const chart = new G2.Chart({
                    container: target,
                    width: 1000,
                    height: 100,
                    forceFit: true,
                });
                chart.source(data);
                // chart.scale('cpu_percent', {
                //     // min: 0
                // });
                // chart.scale('created_at', {
                //     // range: [0, 1]
                // });
                chart.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                chart.line().position(xy);
                // chart.point().position('created_at*cpu_percent').size(4).shape('circle').style({
                //     stroke: '#fff',
                //     lineWidth: 1
                // });
                chart.render();
                chart.forceFit();
            }
        },
        mounted() {
            this.serverId = this.$route.params.serverId;
            this.getServerLog();
        }
    }
</script>