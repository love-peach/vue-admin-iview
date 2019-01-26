<template>
  <div class="demo1" style="width: 2000px;">module-1 about-1</div>
</template>

<script>
export default {
  name: 'M1About1',
  mounted() {
    console.log(this.$route.meta.btnPermissionsList, '0');
  },
};
</script>
