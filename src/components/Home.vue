<template>

    <a-layout id="components-layout-demo-custom-trigger" style="height:100vh;">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed">
        <Logo :collapsed="collapsed"/>
        <Nav/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <Header @collapseHome="changeCollapse"/>
        </a-layout-header>
        <a-layout-content
          :style="{position:'relative', background: 'rgb(240, 242, 245)', padding: '24px', margin: 0, minHeight: '280px',overflow:'auto' }"
        >
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
const Logo = () => import("@/components/logo/Logo");
const Nav = () => import("@/components/nav/Nav");
const Header = () => import("@/components/Header");

export default {
  data() {
    return {
      collapsed: false,
    };
  },

  methods: {

     changeCollapse(data) {
      this.collapsed = data;
    },
  
  },
  components: {
    Nav,
    Header,
    Logo
  }
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>