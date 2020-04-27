<template>
  <div v-if="!collapsed" class="logo"></div>
  <div v-else class="logo_small"></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["collapsed"],
  components: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.logo {
  height: 40px;
  background: url("./img/logo_s.png") center center no-repeat;
  margin: 16px;
  max-width: 160px;
  background-size: auto 28px;
}
.logo_small {
  height: 40px;
  background: url("./img/logo_small.png") center center no-repeat;
  margin: 16px 5px;
  max-width: 160px;
  background-size: auto 28px;
}
</style>