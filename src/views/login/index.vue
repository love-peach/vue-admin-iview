<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from './login-form';
import api from '@/api/';
import storage from '@/libs/storage';

export default {
  components: {
    LoginForm,
  },
  methods: {
    handleSubmit({ userName, password }) {
      storage.setToken('1213');
      api
        .login({ userName, password })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>
