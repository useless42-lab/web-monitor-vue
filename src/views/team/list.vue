<template>
    <div>
        <v-btn block color="primary" @click="addDialogStatus=true">
            添加
        </v-btn>
        <v-row>
            <v-dialog v-model="addDialogStatus" persistent max-width="300px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">工作空间</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="名称" required v-model="teamName"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary darken-1" text @click="addDialogStatus = false">
                            取消
                        </v-btn>
                        <v-btn color="primary darken-1" text @click="createTeam()" :loading="isLoading"
                            :disabled="isDisabled">
                            确认
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <div>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                名称
                            </th>
                            <th class="text-left">
                                创建时间
                            </th>
                            <th class="text-left">
                                操作
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in list" :key="item.path">
                            <td>{{ item.name }}</td>
                            <td>{{ item.created_at }}</td>
                            <td>
                                <v-btn @click="redirectToOverview(item)" text color="primary">
                                    查看
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
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
    export default {
        data: () => ({
            teamName: "",
            path: "",
            list: [],
            dialog: false,
            addDialogStatus: false,
            onDeleteId: "",
            isLoading: false,
            isDisabled: false,
            snackbar: false,
            errText: '',
            timeout: 2000,
        }),
        methods: {
            createApi() {
                this.$router.push("create");
            },
            getList() {
                this.$service.team.getListService()
                    .then(res => {
                        this.list = res['data'];
                    })
            },
            createTeam() {
                const formData = new FormData();
                formData.append("name", this.teamName);
                this.$service.team.createService(formData)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.getList();
                        } else {
                            this.errText = res['error'];
                            this.snackbar = true;
                        }
                        this.isLoading = false;
                        this.isDisabled = false;
                        this.addDialogStatus = false;
                    })
            },
            redirectToOverview(item) {
                localStorage.setItem("path", item.path);
                this.$router.push(`/user/team/detail?i=${item.id}`)
            },
            deleteTeam(deleteId) {
                this.isLoading = true;
                this.isDisabled = true;
                this.$service.team.deleteService(deleteId)
                    .then(res => {
                        if (res['code'] == 200) {
                            this.getList();
                        } else {
                            this.errText = res['error'];
                            this.snackbar = true;
                        }
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
        },
        mounted() {
            this.getList();
        }
    }
</script>