<template>
  <div>
    home 页面 可以放 Dashboard
    <br />
    <br />
    <br />
    <br />
    <Slider v-model="value1"></Slider>
  </div>
</template>

<script>
import api from '@/api/';
export default {
  name: 'Home',
  data() {
    return {
      value1: 20,
    };
  },
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
