<template>
  <div>
    <iframe frameborder=0 name="showHere" class="draw_frame" scrolling=auto :src="draw_url"></iframe>

  </div>
</template>

<script>
// import {  mapMutations } from "vuex";
import Loader from "./Loader";
import { baseURL} from "../api";
import storage, { TOKEN_KEY, USERNAME_KEY,NAVIGATION } from "../public/js/storage";
import bus from "../public/js/bus";
import QRCode from "qrcodejs2";

export default {
  name: "List",  
  data() {
    return {
       draw_url:baseURL+'/admin/drawio'
    };
  },
  created(){
    // this.go();
    //  getDraw().then(res => {
    //     if (res.code === 0) {
    //       console.log('sss',res);
    //       // if (res.data.result === 0) {
    //       //   // this.$message.success(res.data);
    //       //   this.loginSuccess(res);
    //       // } else {
    //       //   this.$message.info("邮箱或密码错误");
    //       // }
    //     } else {
    //       this.$message.info(res.msg);
    //     }
    //   });
  },
  methods: {
  
  }
};
</script>

<style scoped lang="scss">
@import "../style/public.scss";
.draw_frame{
  width:100%;
 height: calc(100vh - 102px);
}
</style>
