<template>
  <div>
    <v-form style="width:300px;">
      <v-text-field v-model="email" :error-messages="emailErrors" label="邮箱" required></v-text-field>
      <v-row>
        <v-col>
          <v-text-field v-model="captcha" label="验证码" hide-details="auto"></v-text-field>
        </v-col>
        <v-col>
          <img @click="getCaptcha" style="height:50px;" :src="captchaDetail.data" alt="">
        </v-col>
      </v-row>
      <v-btn block depressed color="primary" style="margin-top:20px;color:white;" @click="onSend" :loading="isLoading" :disabled="isDisabled">
        {{btnMsg}}
      </v-btn>
      <div style="display:flex;justify-content:space-between;align-items:center;">
          <v-btn text color="primary" style="margin-top:8px;" @click="redirectLogin">返回登录！
      </v-btn>
      <v-btn text color="primary" style="margin-top:8px;" @click="redirectRegister">立即注册！
      </v-btn>
      </div>
    </v-form>
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
      email: '',
      password: '',
      captcha: '',
      captchaDetail: '',
      snackbar: false,
      errText: '',
      timeout: 2000,
      countDown:90,
      btnMsg:"发送验证",
      
      isLoading: false,
      isDisabled: false,
    }),

    methods: {
      redirectLogin() {
        this.$router.push("login");
      },
      redirectRegister() {
        this.$router.push("register")
      },
      getCaptcha() {
        this.$service.auth.getCaptchaService()
          .then(res => {
            if (res['code'] == 200) {
              this.captchaDetail = res['data'];
            }
          })
      },
      onSend() {
        this.isLoading=true;
        this.isDisabled=true;
        const intervalSend=setInterval(()=>{
          if(this.countDown<=0){
            clearInterval(intervalSend);
            this.isDisabled=false;
            this.countDown=90;
            this.btnMsg="发送验证";
          }else{
          this.countDown--;
          this.btnMsg=`${this.countDown}秒`;
          }
        },1000)
        const formData = new FormData();
        formData.append("email", this.email);
        formData.append("password", this.password);
        formData.append("captcha", this.captcha);
        formData.append("captcha_id", this.captchaDetail.captchaId);

        this.$service.auth.generateResetPasswordService(formData)
          .then(res => {
            if (res['code'] == 200) {
             this.errText = "发送成功";
            } else {
              this.errText = res['error'];
              this.getCaptcha();
            }
              this.snackbar = true;
              this.isLoading=false;
        this.isDisabled=false;
          })
      }
    },
    mounted() {
      this.getCaptcha();
    }
  }
</script>