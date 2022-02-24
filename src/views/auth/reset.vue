<template>
  <div>
    <v-form style="width:300px;">
      <v-text-field v-model="password" :error-messages="passwordErrors" label="密码" required type="password">
      </v-text-field>
      <v-row>
        <v-col>
          <v-text-field v-model="captcha" label="验证码" hide-details="auto"></v-text-field>
        </v-col>
        <v-col>
          <img @click="getCaptcha" style="height:50px;" :src="captchaDetail.data" alt="">
        </v-col>
      </v-row>
      <v-btn block depressed color="primary" style="margin-top:20px;color:white;" @click="onReset" :loading="isLoading"
        :disabled="isDisabled">
        重置密码
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
      token: "",
      email: '',
      password: '',
      captcha: '',
      captchaDetail: '',
      snackbar: false,
      errText: '',
      timeout: 2000,

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
      onReset() {
        this.isLoading = true;
        this.isDisabled = true;
        const formData = new FormData();
        formData.append("token", this.token);
        formData.append("password", this.password);
        formData.append("captcha", this.captcha);
        formData.append("captcha_id", this.captchaDetail.captchaId);

        this.$service.auth.resetPasswordService(formData)
          .then(res => {
            if (res['code'] == 200) {
              this.$router.push('login');
            } else {
              this.errText = res['error'];
              this.getCaptcha();
            }
            this.snackbar = true;
            this.isLoading = false;
            this.isDisabled = false;
          })
      }
    },

    mounted() {
      this.token = this.$route.query.t;
      this.getCaptcha();
    }
  }
</script>