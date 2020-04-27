<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <a-icon :type="props.menuInfo.type" /><span>{{ props.menuInfo.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.key">
         <router-link :to="item.key">{{item.title}}</router-link>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item"/>
    </template>
  </a-sub-menu>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ['menuInfo'],
   computed: {
   }
};
</script>