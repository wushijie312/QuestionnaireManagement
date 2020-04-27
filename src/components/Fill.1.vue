<template>
  <div class="container">
    <loader v-show="isLoading"/>
    <div class="qu-wrap" v-if="!isLoading">
      <header>{{ paperObj.title }}</header>
      <div class="qu-content">
        <section class="qu-item" v-for="(item, index) in questionList" :key="index">
          <h3>
            <span class="qu-num">{{`Q${index + 1}`}}</span>
            <span class="qu-topic">{{ item.questionTitle }}</span>
            <span class="qu-type">{{ item.questionType | transformQursiotnType}}</span>
          </h3>
          <a-textarea
            v-if="item.questionType === 3"
            placeholder="请您输入内容"
            v-model="answerList[index].answerContent[0]"
            :autosize="{ minRows: 3,cols:6 }"
          />
          <div v-else>
            <a-radio-group
              v-if="item.questionType === 1"
              v-model="answerList[index].answerContent[0]"
              :options="item.questionOption"
            />
            <a-checkbox-group
              v-if="item.questionType === 2"
              v-model="answerList[index].answerContent"
              :options="item.questionOption"
            />
          </div>
        </section>
      </div>
      <footer>
        <a-button class="btn" v-if="isFillMode" @click="iterator = submit(); iterator.next()">提交问卷</a-button>
        <a-button class="btn" v-else @click="back()">返回</a-button>
      </footer>
    </div>
    <a-modal
      title="提示"
      centered
      okText="确定"
      cancelText="取消"
      v-model="isShowPrompt"
      @ok="iterator.next(); isShowPrompt = false"
      @cancel="isShowPrompt = false"
    >
      <p>{{ promptText }}</p>
    </a-modal>
  </div>
</template>

<script>
import Loader from "./Loader";
import { getPaper, viewPaper, commitPaper } from "../api";
import localStorage, { SUBMIT_NUMBER_KEY } from "./../public/js/localStorage";

export default {
  name: "Fill",

  components: {
    loader: Loader,
  },

  filters: {
    transformQursiotnType(type) {
      return type === 1 ? "(单选题)" : type === 2 ? "(多选题)" : "(文本题)";
    }
  },

  data() {
    return {
      paperObj: {},
      questionList: [],
      answerList: [],
      promptText: "",
      isShowPrompt: false,
      isFillMode: false,
      isLoading: false
    };
  },

  created() {
    // 设置该页面模式 /fill（答题） /view（查看）
    this.isFillMode = this.$route.path === "/fill";
    this._getPaper();
  },

  methods: {
    showPrompt(text) {
      this.promptText = text;
      this.isShowPrompt = true;
    },

    validateAnswer() {
      console.log(this.answerList);
      let noAnswerList = this.answerList.filter(item => {
        if (item.questionType !== 3 && !item.answerContent.length) {
          return item;
        }
      });

      return !!noAnswerList.length;
    },

    initAnswerList() {
      this.questionList.map((item, index) => {
        this.$set(this.answerList, index, {
          id: item.id,
          questionType: item.questionType,
          answerContent: []
        });
      });
    },

    back() {
      this.$router.push("/");
    },

    *commitSuccess() {

      // this.$message.success("提交成功");
      this.$router.push({ path: "/success" });
      // yield this.showPrompt("提交成功");
      // yield (() => {
      //   window.location.href = "about:blank";
      //   window.close();
      // })();
    },

    *submit() {
      let text = "";
      if (this.validateAnswer()) {
        text = "有选择题未填写，无法提交！";
        this.iterator = null;
      } else {
        text = `确认提交问卷吗？`;
      }
      let number = localStorage.get(this.$route.query.id);
      if (number) {
        this.$message.info("不能重复提交！");
        return;
      }
      yield this.showPrompt(text);
      yield this._commitPaper();
    },

    _getPaper() {
      let data = { id: this.$route.query.id };
      this.isLoading = true;
      if (this.isFillMode) {
        viewPaper(data).then(res => {
          if (res.code === 0) {
            let status = res.data.status;
            if (status === 1) {
              this.paperObj = res.data;
              this.questionList = res.data.questions;
              this.initAnswerList();
              this.isLoading = false;
            } else {
              this.$message.info(res.msg);

              setTimeout(() => {
                this.$router.push("/");
              }, 2000);
              //   setTimeout(() => {
              //     window.location.href = "about:blank";
              //     window.close();
              //   }, 5000);
            }
          }
        });
      } else {
        getPaper(data).then(res => {
          if (res.code === 0 && res.msg!="该问卷未发布") {
            this.paperObj = res.data;
            this.questionList = res.data.questions;
            console.log(this.questionList);
            this.initAnswerList();
          }else{
              this.$message.info(res.msg);

              setTimeout(() => {
                this.$router.push("/");
              }, 2000);
          }
        });
      }
    },

    _commitPaper() {
      let data = {
        id: this.paperObj.id,
        answers: this.answerList
      };
      console.log(this.answerList);
      commitPaper(data).then(res => {
        if (res.code === 0) {
          localStorage.set(this.$route.query.id, this.$route.query.id);

          this.iterator = this.commitSuccess();
          this.iterator.next();
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/public.scss";
@import "../style/_Fill.scss";

</style>
