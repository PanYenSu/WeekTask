<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,

    };
  },
  mounted() {
    this.isLoading = true;
    this.$http.get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`)
      .then((res) => {
        console.log(res);
        this.isLoading = false;
      });
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 2000);
  },

};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
