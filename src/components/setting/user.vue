<template>
    <div>
        <div style="display:flex;">
            <v-avatar color="primary" size="88" style="color:white;">您好</v-avatar>
            <div style="margin-left:20px;display:flex;flex-direction:column;justify-content:space-between;">
                <div style="font-size:1.5em;">{{userInfo.username}}</div>
                <div style="font-size:1.1em;">{{userInfo.plan_name}}</div>
                <div>过期于{{userInfo.expired_at}}</div>
            </div>
        </div>
        <v-row>
            <v-col cols="12" sm="12">
                <v-text-field v-model="steamApiKey" label="Steam Api Key" hide-details="auto"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
                <v-btn color="primary" @click="updateThirdParty()" :loading="isLoading" :disabled="isDisabled">确认
                </v-btn>
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
    export default {
        data: () => ({
            userInfo: "",
            isLoading: false,
            isDisabled: false,
            steamApiKey: "",
            snackbar: false,
            errText: '',
            timeout: 2000,
        }),
        methods: {
            getUserBaseInfo() {
                this.isLoading = true;
                this.isDisabled = true;
                this.$service.auth.getBaseUserInfo()
                    .then(res => {
                        this.userInfo = res.data;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },

            getThirdParty() {
                this.isLoading = true;
                this.isDisabled = true;
                this.$service.auth.getThirdPartyInfoService()
                    .then(res => {
                        this.steamApiKey = res.data.steam_api_key;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            updateThirdParty() {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData()
                formData.append("steam_api_key", this.steamApiKey);
                this.$service.auth.updateThirdPartyInfoService(formData)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.errText = "成功";
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
            this.getUserBaseInfo();
            this.getThirdParty()
        },
    }
</script>