<template>
  <div>
    <v-form style="width:300px;">
      <v-text-field v-model="email" :error-messages="emailErrors" label="邮箱" required></v-text-field>
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
      <v-btn block depressed color="primary" style="margin-top:20px;color:white;" @click="onLogin" :loading="isLoading"
        :disabled="isDisabled">
        登录
      </v-btn>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <v-btn text color="primary" style="margin-top:8px;" @click="redirectRegister">立即注册！
        </v-btn>
        <v-btn text color="primary" style="margin-top:8px;" @click="redirectForget">忘记密码！
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
      isLoading: false,
      isDisabled: false,
    }),
    methods: {
      redirectForget() {
        this.$router.push("forget");
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
      onLogin() {
        this.isLoading = true;
        this.isDisabled = true;
        const formData = new FormData();
        formData.append("email", this.email);
        formData.append("password", this.password);
        formData.append("captcha", this.captcha);
        formData.append("captcha_id", this.captchaDetail.captchaId);

        this.$service.auth.loginService(formData)
          .then(res => {
            if (res['code'] == 200) {
              localStorage.setItem("token", res['data']['token']);
              if (localStorage.getItem("redirect")) {
                this.$router.push(localStorage.getItem("redirect"))
                localStorage.removeItem("redirect");
              } else {
                this.$router.push('/user/web/list');
              }
            } else {
              this.errText = res['error'];
              this.snackbar = true;
              this.getCaptcha();
            }
            this.isLoading = false;
            this.isDisabled = false;
          })
      }
    },
    mounted() {
      this.getCaptcha();
    }
  }
</script>