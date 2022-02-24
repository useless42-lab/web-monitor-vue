<template>
    <div>
        <v-card>
            <v-tabs grow>
                <v-tab>
                    <v-icon left>
                        mdi-account
                    </v-icon>
                    个人信息
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-lock
                    </v-icon>
                    密码设置
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-access-point
                    </v-icon>
                    推送设置
                </v-tab>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <user></user>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <password></password>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <notification></notification>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
</template>

<script>
    import password from '../../components/setting/password.vue';
    import notification from '../../components/setting/notification.vue';
    import user from '../../components/setting/user.vue';
    export default {
        components: {
            password,
            notification,
            user,
        }
    }
</script>