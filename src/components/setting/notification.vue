<template>
    <div>
        <v-row>
            <v-col cols="12" sm="12">
                <v-text-field label="邮箱" required v-model="detail.email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
                <v-row>
                    <v-col cols="12" sm="9">
                        <v-text-field label="Telegram" required v-model="detail.telegram" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-btn @click="linkTelegram()" color="primary" style="color:white;">
                            绑定Telegram
                            <v-icon right dark>
                                mdi-send
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="12">
                <v-text-field label="Bark" required v-model="detail.bark"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
                <v-text-field label="Server酱" required v-model="detail.server_chan"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
                <v-btn color="primary" @click="updateNotification()">确认修改</v-btn>
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
        data() {
            return {
                isLoading: false,
                isDisabled: false,
                snackbar: false,
                errText: '',
                timeout: 2000,
                detail: {
                    user_id: "",
                    email: "",
                    phone: "",
                    sms: "",
                    telegram: "",
                    bark: "",
                    server_chan: "",
                }
            }
        },
        methods: {
            linkTelegram() {
                window.open(`https://t.me/pingsilo_bot?start=${this.detail.user_id}`, '_blank');
            },
            getDetail() {
                this.$service.notification.getService()
                    .then(res => {
                        this.detail = res.data;
                    })
            },
            updateNotification() {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("email", this.detail.email);
                formData.append("phone", this.detail.phone);
                formData.append("sms", this.detail.sms);
                formData.append("telegram", this.detail.telegram);
                formData.append("bark", this.detail.bark);
                formData.append("server_chan", this.detail.server_chan);
                this.$service.notification.updateService(formData)
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
            this.getDetail();
        },
    }
</script>