<template>
    <div>
        <v-dialog v-model="transferDialogStatus" persistent max-width="300px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">转移设备</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-select v-model="targetTeam" :items="teamList" item-text="name" item-value="id"
                                    label="工作空间" @change="changeTeam(targetTeam)"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-select v-model="targetGroup" :items="groupList" item-text="name" item-value="id"
                                    label="设备分组" @change="changeGroup(targetGroup)"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" text @click="cancel()">
                        取消
                    </v-btn>
                    <v-btn color="primary darken-1" text @click="confirm()" :loading="isLoading" :disabled="isDisabled">
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: ['deviceId', 'deviceType', "transferDialogStatus"],
        data() {
            return {
                isLoading: true,
                isDisabled: true,
                teamList: [],
                groupList: [],
                targetTeam: "",
                targetGroup: "",
            }
        },
        methods: {
            cancel() {
                this.$emit("update:transferDialogStatus", false);
                this.$emit("cancel",true);
            },
            confirm() {
                const formData = new FormData();
                formData.append("team_id", this.targetTeam);
                formData.append("group_id", this.targetGroup);
                formData.append("device_id", this.deviceId);
                formData.append("device_type", this.deviceType);
                this.$service.device.transferDeviceGroup(formData)
                    .then(res => {
                        this.$emit("confirm", true);
                        this.$emit("update:transferDialogStatus", false);
                    })
            },
            getTeamList() {
                this.$service.team.getListService()
                    .then(res => {
                        this.teamList = res.data;
                        this.targetTeam = this.teamList[0].id;
                        this.getGroupList(this.targetTeam);
                    })
            },
            getGroupList(teamId) {
                this.$service.group.getListByTypeService(teamId, this.deviceType)
                    .then(res => {
                        this.groupList = res.data;
                        this.targetGroup = this.groupList[0].id;
                        this.isLoading = false;
                        this.isDisabled = false;
                    })
            },
            changeTeam(id) {
                this.getGroupList(id);
            },
            changeGroup(id) {
                console.log(id)
            }
        },
        mounted() {
            this.getTeamList();
        }
    }
</script>