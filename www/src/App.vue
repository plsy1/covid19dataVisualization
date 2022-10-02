<template>
  <router-view/>
</template>

<script>
export default {
  //name: "DeathRate",
  data() {
    return {
      value: '',
    }
  },
  methods: {
    jumpPage() {
      if (this.value === 'state') {
        this.$router.push('/');
      } 
       else if (this.value === 'testPage') {
        this.$router.push('/provincePage');
      }
      this.$forceUpdate();
    }
  }
}
</script>
<style>
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
