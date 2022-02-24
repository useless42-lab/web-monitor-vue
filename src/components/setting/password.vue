<template>
    <div>
        <v-row>
            <v-col cols="12" sm="12">
                <v-text-field label="旧密码" v-model="oldPassword"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
                <v-text-field label="新密码" v-model="newPassword"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
                <v-text-field label="重复新密码" v-model="reNewPassword"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
                <v-btn color="primary" @click="onSubmit()" :loading="isLoading" :disabled="isDisabled">确认修改</v-btn>
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
                oldPassword: "",
                newPassword: "",
                reNewPassword: "",
                snackbar: false,
                errText: '',
                timeout: 2000,
            }
        },
        methods: {
            onSubmit() {
                this.isLoading = true;
                this.isDisabled = true;
                const formData = new FormData();
                formData.append("old_password", this.oldPassword);
                formData.append("new_password", this.newPassword);
                formData.append("re_new_password", this.reNewPassword);
                this.$service.auth.changePasswordService(formData)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.errText = "成功";
                            this.$router.push("/auth/login")
                        } else {
                            this.errText = res['error'];
                        }
                        this.snackbar = true;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
        },
    }
</script>