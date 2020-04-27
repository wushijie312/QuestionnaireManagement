<template>
  <a-menu
    theme="dark"
    mode="inline"
    :openKeys="openKeys"
    @openChange="onOpenChange"
    :selectedKeys="[this.$route.path]"
  >
    <template v-for="item in list">
      <a-menu-item v-if="!item.children" :key="item.key">
        <a-icon :type="item.type"/>
        <router-link :to="item.key">{{item.title}}</router-link>
      </a-menu-item>
      <sub-menu v-else :menu-info="item" :key="item.key"/>
    </template>
  </a-menu>
</template>

<script>
import { mapState } from "vuex";
import func from "./vue-temp/vue-editor-bridge";
const SubMenu = () => import("@/components/nav/SubMenu");
export default {
  data() {
    return {
      rootSubmenuKeys: ["sub1", "sub2"],
      openKeys: ["sub1"],
      current: "/list"
    };
  },
  computed: {
    list() {
      return [
        {
          key: "sub1",
          type: "form",
          title: "问卷管理",
          children: [
            {
              key: "/list",
              title: "问卷列表"
            }
          ]
        },
        {
          key: "sub2",
          type: "picture",
          title: "画图工具",
          children: [
            {
              key: "/draw",
              title: "画图"
            }
          ]
        }
      ];
    }
  },
  // watch: {
  //   $route: "watchpath"
  // },
  components: {
    "sub-menu": SubMenu
  },
  // mounted(){
  //   this.watchpath();
  // },
  methods: {
    // watchpath(to, from) {
    //   console.log(to, from);
    //   // if()
    // },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* //ant 左侧导航li背景色 */
.ant-layout-sider {
  background: rgba(20, 20, 20);
}
.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  background: transparent;
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background: transparent;
  box-shadow: none;
}
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected,
.ant-menu.ant-menu-dark .ant-menu-item-selected {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>