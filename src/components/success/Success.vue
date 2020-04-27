<template>
  <div class="success_bg">
    <div class="success_top">
      <div class="success_box">
        <div class="success_width">
          <h3 class="success_tit">您的答卷已经提交，感谢您的参与！</h3>
          <div class="success_tab">
            <h3 class="success_tab_tit">感谢参与此次问卷调查</h3>
            <div style="line-height:18px;">
              <p>&nbsp;亲爱的朋友：</p>&nbsp; &nbsp; 感谢您在百忙之中接受本次调查！
              <br>&nbsp; &nbsp; 对您填写的信息，我们将严格遵守《统计法》予以保密，所得调查数据仅用于科学研究需要。请根据您的实际情况放心填写。
              <br>&nbsp; &nbsp; 再次对您表示感谢！
              <br>&nbsp;&nbsp;&nbsp;
              <br>
              <p>
                <b style="color:red;">提示：只有认真填写并符合要求的用户将有机会参与公司其他福利</b>
              </p>
              <div style="margin-top:20px; display:none;">
                地址：
                <a :href="hrefUrl" target="_blank" class="link-U00a6e6">
                  <b>点击这里参与调查</b>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div data-v-75cad162 class="fill_bottom" style="margin:0 2rem;">
          <span data-v-75cad162 style="color: rgb(51, 51, 51);">北京阳光印易科技有限公司</span>
          <br>提供技术支持
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "success",
  data() {
    return {
      hrefUrl: window.location.href
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../style/public.scss";
.success_bg {
  background: #f3f6fa url(./img/success-bg.jpg) center top repeat-x;
  background-size: 1px 300px;
  min-height: 100vh;
}
.success_bottom {
  text-align: center;
  color: #666;
  font-size: 12px;
  padding: 2rem 5rem;
  border-top: 1px solid #bbb;
}
.success_top {
  background: url(./img/success.jpg) no-repeat top center;
  background-size: 940px 144px;
  padding-top: 120px;
  width: 940px;
  margin: 0 auto 5rem;
}
.success_box {
  box-shadow: 0px 1px 6px 0px rgba(205, 220, 245, 1);
  background: #fff;
  padding: 30px 0 0;
}
.success_width {
  width: 90%;
  margin: 0 auto 5rem;
}
.success_tit {
  padding: 10px 0;
  text-align: center;
  line-height: 18px;
  color: #333333;
}
.success_tab {
  border-top: 1px dashed #c3c3c3;
  margin: 10px auto;
  padding: 40px 0px 10px;
}
.success_tab_tit {
  color: #ff6600;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  font-weight: bold;
}
.fill_bottom {
  text-align: center;
  color: #666;
  font-size: 12px;
  padding: 2rem 0;
  border-top: 1px solid #bbb;
}
@media screen and (max-width: 800px) {
  #app {
    width: 100%;
  }
  .success_top {
    background: url(./img/success.jpg) no-repeat top center;
    background-size: 100%;
    padding-top: 50px;
    width: 90%;
  }
  .success_tab {
    padding: 10px 0px 10px;
  }
  .fill_bottom {
    padding: 1rem 0;
  }
  .success_width {
    width: 90%;
    margin: 0 auto 0;
  }
  .success_box {
    padding: 15px 0 0;
  }
}
</style>
