<template>
  <div>home 页面 可以放 Dashboard</div>
</template>

<script>
import api from '@/api/';
export default {
  name: 'Home',
  mounted() {
    this.requestLogin();
  },
  methods: {
    requestLogin() {
      api
        .login({ name: '123' })
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
