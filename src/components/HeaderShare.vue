<template>
  <div class="headershare">
    <h2 class="shareHead">问卷分享</h2>
    <!-- <div class="user">
			<span>{{ username }}</span>
			<span @click="logout()">退出</span>
    </div>-->
  </div>
</template>

<script>
import { logout } from "../api";
export default {
  name: "Header",

  methods: {
    logout() {
      logout();
    }
  }
};
</script>

<style lang="scss">
@import "../style/public.scss";

.headershare {
  display: block;
  background-color: #e6e6e6;
  color: #333;

  h2.shareHead {
    margin: 0 auto;
    font-size: 1.8rem;
    width: 1200px;
    line-height: 5rem;
    color: #333;

    &:before {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      margin-right: 0.5rem;
      content: "?";
      color: #fff;
      text-align: center;
      background-color: #1890ff;
      border-radius: 50%;
    }
  }

  h3 {
    font-size: 1.2rem;
    cursor: pointer;
  }
}
@media screen and (max-width: 640px) {
  .header h2.shareHead {
    margin: 0 0 0 2rem;
    width: auto;
  }
}
</style>
