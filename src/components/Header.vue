<template>
  <div class="header clearfix">
    <div class="fl" style="position:relative;">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="collapseState"
      />
    </div>
    <a-breadcrumb
      class="fl"
      style="line-height:64px;margin-right:15px;"
      v-for="(item ,index) in breadList"
      :key="index"
    >
      <a-breadcrumb-item v-if="item.parent.meta">{{item.parent.meta.name}}</a-breadcrumb-item>
      <a-breadcrumb-item>{{item.meta.name}}</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="fr" style="margin-right:24px;">
      <a-dropdown style="margin-right:20px;color:#333;">
        <a class="ant-dropdown-link" href="#">
          <a-icon type="user" style="font-size:15px;color:#333;"/>
          {{username}}
          <a-icon type="caret-down" style="color:#333;"/>
        </a>
        <a-menu slot="overlay">
          <!-- <a-menu-item key="1">{{$t('porsons.information')}}</a-menu-item>
        <a-menu-item key="2">{{$t('porsons.myOrder')}}</a-menu-item>
          <a-menu-item key="3">{{$t('porsons.accountSafe')}}</a-menu-item>-->
          <a-menu-item key="4" @click="headSignOut">退出</a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown style="color:#333;">
        <a class="ant-dropdown-link" href="#">
          <a-icon type="bars" style="font-size:15px;"/>导航
          <a-icon type="caret-down"/>
        </a>
        <a-menu slot="overlay">
          <a-menu-item
            v-for="nav in navigation.Data"
            :key="nav.Id"
            @click="jumpUrl(nav.Url)"
          >{{nav.Alias}}</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
// import { mapState, mapMutations } from "vuex";
import { logout } from "../api";
import storage, {
  TOKEN_KEY,
  USERNAME_KEY,
  NAVIGATION
} from "../public/js/storage";
import bus from "../public/js/bus";
export default {
  name: "Header",
  data() {
    return {
      username: "",
      navigation: "",
      breadList: [],
      collapsed: false
    };
  },
  created() {},
  mounted() {
    bus.$on("usernameState", v => {
      this.username = v;
    });
    if (storage.get(USERNAME_KEY)) {
      this.username = storage.get(USERNAME_KEY);
      this.navigation = JSON.parse(storage.get(NAVIGATION));
    }
    this.getPath();
  },
  // mounted(){
  //   this.$nextTick(()=>{
  //       this.username = storage.get(USERNAME_KEY);
  //   })

  // },
  watch: {
    $route: "getPath"
  },
  components: {},
  methods: {
    headSignOut() {
     storage.remove(TOKEN_KEY);
      storage.remove(USERNAME_KEY);
      localStorage.clear();
     window.open("https://passport.yangguangqicai.com/home/LoginOut", "_self");
    },
    jumpUrl(url) {
      window.open(url, "_bank");
    },
    // enterpriseprocurement() {
    //   window.open("https://portal.yangguangqicai.com/", "_bank");
    // },
    // HeaderWelfareMall() {
    //   window.open("https://iwf.yangguangqicai.com", "_bank");
    // },
    collapseState() {
      this.collapsed = !this.collapsed;
      this.$emit("collapseHome", this.collapsed);
    },
    getPath() {
      console.log(this.$route.matched.slice(-1));
      console.log(this.$route);
      this.breadList = this.$route.matched.slice(-1);
    }
  }
};
</script>

<style lang="scss">
@import "../style/public.scss";
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.header {
  padding: 0;
  background-color: #fff;
  color: #333;

  h2 {
    margin: 0 5rem 0 6rem;
    font-size: 1.8rem;
    color: #fff;
    &:before {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      margin-right: 0.5rem;
      content: "?";
      color: $orange;
      text-align: center;
      background-color: #fff;
      border-radius: 50%;
    }
  }

  h3 {
    font-size: 1.2rem;
    cursor: pointer;
  }
}
</style>
