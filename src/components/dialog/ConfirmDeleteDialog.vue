<template>
    <div>
        <v-dialog v-model="deleteDialogStatus" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h5">
                    确认
                </v-card-title>
                <v-card-text>是否删除</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="cancel()">
                        取消
                    </v-btn>
                    <v-btn color="primary" text @click="confirm()">
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: ['deleteDialogStatus'],
        methods: {
            cancel() {
                this.$emit("cancel", true);
                this.$emit("update:deleteDialogStatus", false);
            },
            confirm() {
                this.$emit("confirm", true);
                this.$emit("update:deleteDialogStatus", false);
            },
        }
    }
</script>