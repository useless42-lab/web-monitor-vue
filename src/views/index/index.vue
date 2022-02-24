<template>
    <div>
        <div
            style="background-image:url('https://i.loli.net/2017/08/11/598d0a6b6ba2f.jpg');height:100vh;background-size:100% 100%;display:flex;align-items:center;justify-content:center;">
            <div style="color:white;text-align:center;">
                <v-btn @click="onLogin" outlined color="white" elevation="2"  x-large>
                    使用
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        onLogin(){
            this.$router.push("/auth/login");
        }
    }
}
</script>