<template>
  <div>
    <v-form style="width:300px;">
      <v-text-field v-model="username" :error-messages="usernameErrors" label="用户名" required></v-text-field>
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
      <v-btn block depressed color="primary" style="margin-top:20px;color:white;" @click="onRegister"
        :loading="isLoading" :disabled="isDisabled">
        注册
      </v-btn>

      <div style="display:flex;justify-content:space-between;align-items:center;">
        <v-btn text color="primary" style="margin-top:8px;" @click="redirectLogin">立即登录！
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
      username: '',
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
      redirectLogin() {
        this.$router.push("login");
      },
      getCaptcha() {
        this.$service.auth.getCaptchaService()
          .then(res => {
            if (res['code'] == 200) {
              this.captchaDetail = res['data'];
            }
          })
      },
      onRegister() {
        this.isLoading = true;
        this.isDisabled = true;
        const formData = new FormData();
        formData.append("email", this.email);
        formData.append("username", this.username);
        formData.append("password", this.password);
        formData.append("captcha", this.captcha);
        formData.append("captcha_id", this.captchaDetail.captchaId);
        this.$service.auth.registerService(formData)
          .then(res => {
            if (res['code'] == 200) {
              this.$router.push('login');
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