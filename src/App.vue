<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view></router-view>
    </a-locale-provider>
  </div>
</template>

<script>
import vHeader from "./components/Header";
//用于解决日期英文问题start
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";

import "moment/locale/zh-cn";
moment.locale("zh-cn");
//用于解决日期英文问题end

export default {
  name: "App",
  data() {
    return {
      locale: zhCN
    };
  },
  components: {
    vHeader
  },

  methods: {}
};
</script>

<style>
@import "style/reset";

#app {
  min-width: 110rem;
  height: 100%;
  font-family: arial;
  background-color: #f9f9f9;
  overflow: auto;
}

@media screen and (max-width: 1100px) {
  #app {
    min-width: 100%;
  }
  body {
    min-width: auto;
  }
}
</style>
