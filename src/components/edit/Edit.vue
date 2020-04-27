<template>
  <div class="container">
    <div class="qu-wrap">
      <header>
        <span @click="iterator = backBtn(); iterator.next()">
          <a-icon type="arrow-left"/>返回
        </span>
        <p v-show="!titleEditing" @click="titleEditing = true">{{ paperObj.title || '问卷标题' }}</p>
        <input
          type="text"
          v-focus
          v-model="paperObj.title"
          :class="{inlineShow: titleEditing}"
          @blur="titleEditing = false"
          @keyup.enter="titleEditing = false"
        >
      </header>
      <div class="qu-content">
        <section
          class="qu-item"
          v-for="(item, index) in questionList"
          :key="index"
          :class="{nowEditing: curIndex === index && topicEditing, optEditing: curIndex === index}"
        >
          <div class="clearfix">
            <h3 @click="curIndex = index; curOptIndex=''; topicEditing = true" class="fl">
              <span class="qu-num">{{`Q${index + 1}`}}</span>
              <span class="qu-topic">{{ item.questionTitle || '请编辑题目内容' }}</span>
              <input
                type="text"
                v-focus
                v-model="item.questionTitle"
                @blur="topicEditing = false"
                @keyup.enter="topicEditing = false"
              >
              <span class="qu-type">{{ item.questionType | transformQursiotnType}}</span>
            </h3>
            <ul class="operat-list fr">
              <li v-if="index !== 0" @click="moveUp(index, questionList)">上移</li>
              <li v-if="index !== questionList.length - 1" @click="moveDown(index, questionList)">下移</li>
              <li @click="iterator = deleteQuestion(index) ; iterator.next()">删除</li>
            </ul>
          </div>
          <textarea v-if="item.questionType === 3" rows="8" cols="80"></textarea>
          <ul v-else class="options-list">
            <li
              v-for="(option, optIndex) in item.questionOption"
              :key="optIndex"
              :class="{optionEditing: curOptIndex === optIndex}"
            >
              <span
                class="optionText"
                @click="curIndex=index; curOptIndex=optIndex; topicEditing = false"
              >{{ option || '请编辑选项内容' }}</span>
              <input
                type="text"
                v-focus
                v-model="item.questionOption[optIndex]"
                @blur="curIndex=''"
                @keyup.enter="curIndex=''"
              >
              <ul class="opt-ctrl">
                <li
                  v-if="optIndex === item.questionOption.length - 1"
                  @click="addOption(item.questionOption)"
                >添加</li>
                <li @click="deleteOption(optIndex, item.questionOption)">删除</li>
              </ul>
            </li>
          </ul>

          <div></div>
        </section>

        <ul class="list_ul clearfix">
          <li class="list_add_btn" v-if="excelFile === null">
            <div class="list_tit">添加问题</div>
            <div class="list_open_bg">
              <div class="list_btn_pos">
                <a-button size="small" @click="addQuestion('radio')">单选题</a-button>
                <a-button size="small" @click="addQuestion('checkbox')">多选题</a-button>
                <a-button size="small" @click="addQuestion('textarea')">文本题</a-button>
              </div>
            </div>
          </li>
          <li class="list_download_btn" v-if="!questionList.length">
            <div class="list_tit" @click="downLoadExcel()">下载Excel模板</div>
          </li>
          <li class="list_upload_btn" v-if="!questionList.length">
            <div class="list_tit" v-if="!isEditMode" @click="importExcel()">
              <p>
                <input
                  type="file"
                  ref="fileInput"
                  @change="fileChange($event)"
                  style="display: none"
                >
                <span>{{ excelFileName || '上传Excel表格' }}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <footer>
        <template v-if="excelFile === null">
          <div>
            <a-range-picker
              :disabledDate="disabledDate"
              @change="onDataChange"
              :placeholder="['开始时间','结束时间']"
              :value="paperObj.startTime?[moment(paperObj.startTime, dateFormat), moment(paperObj.endTime, dateFormat)]:[]"
              :ranges="{ '今天': [moment(), moment()], '月末': [moment(), moment().endOf('month')] }"
              showTime
              locale="{locale}"
            />
          </div>
          <div class="ctrl-part">
            <a-button @click="iterator = savePaper(); iterator.next()">保存问卷</a-button>
            <a-button type="primary" @click="_releasePaper">发布问卷</a-button>
          </div>
        </template>
        <div class="upload-part" v-else>
          <span @click="iterator = savePaperExcel(); iterator.next()">保存问卷表格</span>
        </div>
      </footer>
    </div>
    <a-modal
      title="提示"
      centered
      okText="确定"
      cancelText="取消"
      v-model="isShowPrompt"
      @ok="isShowPrompt = false; iterator && iterator.next()"
      @cancel="isShowPrompt = false"
    >
      <p>{{ promptText }}</p>
    </a-modal>
    <loader v-show="isLoading"/>
  </div>
</template>

<script>
import Loader from "../Loader";
// import Datepicker from './Datepicker'
import { apiDomain, getPaper, updatePaper, uploadPaper } from "../../api";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
const questionTemplate = {
  radio: {
    questionType: 1,
    questionTitle: "",
    questionOption: ["", ""]
  },
  checkbox: {
    questionType: 2,
    questionTitle: "",
    questionOption: ["", ""]
  },
  textarea: {
    questionType: 3,
    questionTitle: "",
    questionOption: []
  }
};

export default {
  name: "Edit",

  components: {
    loader: Loader
    // "date-picker": Datepicker
  },

  directives: {
    focus: {
      update: el => el.focus()
    }
  },

  filters: {
    transformQursiotnType(type) {
      return type === 1 ? "(单选题)" : type === 2 ? "(多选题)" : "(文本题)";
    }
  },

  data() {
    return {
      excelFile: null,
      excelFileName: "",
      paperObj: {},
      questionList: [],
      curIndex: "",
      curOptIndex: "",
      promptText: "",
      iterator: null,
      isEditMode: false,
      isAdding: false,
      titleEditing: false,
      topicEditing: false,
      isShowPrompt: false,
      isShowDatepicker: false,
      isLoading: false,
      dateFormat: "YYYY-MM-DD HH:mm:ss"
    };
  },

  created() {
    // 设置编辑模式 (add, edit, re-edit)
    console.log(this.$route.path);
    this.isEditMode = this.$route.path !== "/lists/add";
    if (this.isEditMode) {
      this._getPaper();
    } else {
      this.paperObj = {
        title: "",
        status: 0,
        startTime: new Date().toLocaleString().substr(0, 17),
        endTime: new Date().toLocaleString().substr(0, 17),
        questions: []
      };
    }
  },

  methods: {
    moment,
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },

    disabledDate(current) {
      // Can not select days before today and today
      return current < moment().subtract(1, "day");
    },
    // disabledDate(startValue) {
    //     const endValue = this.endValue;
    //     if (!startValue || !endValue) {
    //       return false;
    //     }
    //     return startValue.valueOf() > endValue.valueOf();
    //   },
    onDataChange(date, dateString) {
      this.paperObj.startTime = dateString[0];
      this.paperObj.endTime = dateString[1];
    },
    switchItem(index, array) {
      this.optIndex = "";
      this.curIndex = "";

      let arr = array.splice(index, 2);
      array.splice(index, 0, ...arr.reverse());
    },

    moveUp(index, array) {
      this.switchItem(index - 1, array);
    },

    moveDown(index, array) {
      this.switchItem(index, array);
    },

    errorPrompt(text) {
      this.iterator = null;
      this.showPrompt(text);
    },

    downLoadExcel() {
      window.open(`${apiDomain}/template.xls`);
    },

    importExcel() {
      this.$refs.fileInput.click();
    },

    fileChange(event) {
      let excelFile = event.target.files[0];
      let fileSuffix = excelFile.name.split(".").pop();

      if (fileSuffix !== "xls" && fileSuffix !== "xlsx") {
        this.showPrompt("上传文件格式错误");
      } else {
        this.excelFile = excelFile;
        this.excelFileName = excelFile.name;
      }
    },
    *backBtn() {
      yield this.showPrompt(`确认未保存回到主页吗？`);
      yield this.$router.push({ path: "/" });
    },
    *deleteQuestion(index) {
      if (this.questionList.length <= 1) {
        this.errorPrompt(`每份问卷至少一个问题！`);
        return;
      }
      console.log("asd");
       yield this.showPrompt(`确定要删除该问题吗？`);
       yield this.questionList.splice(index, 1);
    },
    // deleteQuestion(index) {
    //       if (this.questionList.length <= 1) {
    //         this.errorPrompt(`每份问卷至少一个问题！`);
    //         return;
    //       }
    //       this.promptText = "确定要删除该问题吗！";
    //       this.isShowPrompt = true;
    //       this.questionList.splice(index, 1);
    //     },
    deleteOption(index, options) {
      if (options.length <= 2) {
        this.errorPrompt(`每个问题至少两个选项`);
        return;
      }
      options.splice(index, 1);
    },

    addOption(options) {
      if (options.length === 6) {
        this.errorPrompt(`每个问题至多六个选项`);
        return;
      }
      options.push("");
    },

    showPrompt(text) {
      this.promptText = text;
      this.isShowPrompt = true;
    },

    addQuestion(type) {
      if (this.questionList.length === 10) {
        this.errorPrompt(`每份问卷至多10个问题！`);
        return;
      }
      let template = JSON.parse(JSON.stringify(questionTemplate[type]));
      this.questionList.push(template);
    },

    validatePaper() {
      if (!this.paperObj.title) {
        this.errorPrompt("请填写问卷标题");
        return false;
      }

      if (!this.questionList.length) {
        this.errorPrompt(`每份问卷至少一个问题！`);
        return false;
      }

      let isAllQuestionFull = this.questionList.every(item => {
        let emptyOptionList = item.questionOption.filter(
          option => option === ""
        );
        return item.questionTitle !== "" && !emptyOptionList.length;
      });
      if (!isAllQuestionFull) {
        this.errorPrompt("请完善问卷题目内容！");
        return false;
      }

      if (!this.paperObj.startTime || !this.paperObj.endTime) {
        this.errorPrompt("请填写问卷发布时间段！");
        return false;
      }
      if (this.paperObj.startTime == this.paperObj.endTime) {
        this.errorPrompt("开始结束日期不能相同！");
        return false;
      }

      return true;
    },

    *backBtn() {
      yield this.showPrompt(`确认未保存回到主页吗？`);
      yield this.$router.push({ path: "/" });
    },

    *savePaper() {
      if (this.validatePaper()) {
        yield this.showPrompt(`确认保存问卷吗？`);
        yield this._savePaper();
      }
    },

    *savePaperExcel() {
      yield this.showPrompt(`确认保存问卷表格吗？`);
      yield this._uploadPaper();
    },

    _getPaper() {
      let data = { id: this.$route.query.id };
      this.isLoading = true;
      getPaper(data).then(res => {
        if (res.code === 0) {
          if (this.$route.path === "lists/re-edit") {
            // 重新编辑模式下 初始化试卷的属性
            delete res.data["id"];
            delete res.data["createdTime"];
            res.data.status = 0;
          }

          this.paperObj = res.data;
          this.questionList = res.data.questions;
          this.isLoading = false;
        }
      });
    },

    _savePaper() {
      //this.paperObj.startTime=

      let data = this.paperObj;
      this.paperObj.questions = this.questionList;
      updatePaper(data).then(res => {
        if (res.code === 0) {
          this.$router.push({ path: "/" });
        }
      });
    },

    _releasePaper() {
      if (this.validatePaper()) {
        let data = this.paperObj;
        this.paperObj.status = 1;
        this.paperObj.questions = this.questionList;
        updatePaper(data).then(res => {
          if (res.code === 0) {
            this.$router.push({ path: "/" });
          } else {
            this.$message.info(res.msg);
          }
        });
      }
    },

    _uploadPaper() {
      let formData = new FormData();
      formData.append("file", this.excelFile);

      uploadPaper(formData).then(res => {
        if (res.code === 0) {
          this.$router.push({ path: "/" });
        } else {
          this.showPrompt(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../style/_Edit";

.list_ul {
  width: 822px;
  margin: 80px auto;
  text-align: center;
}
.list_ul li {
  width: 218px;
  height: 194px;
  position: relative;
  display: inline-block;
  margin-right: 80px;
  border: 1px solid #e6e6e6;
  -webkit-box-shadow: 0 0 6px #e6e6e6;
  box-shadow: 0 0 6px #e6e6e6;
}
.list_ul li:last-child {
  margin-right: 0;
}
.list_open_bg {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: none;
  cursor: auto;
}

.list_tit {
  line-height: 24px;
  font-size: 14px;
  padding-left: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  font-size: 14px;
  cursor: pointer;
}
.list_add_btn .list_tit {
  background: url(./img/add.png) left center no-repeat;
  background-size: 14px;
}
.list_add_btn:hover .list_open_bg {
  display: block;
}
.list_download_btn .list_tit {
  background: url(./img/download.png) left center no-repeat;
  background-size: 14px;
}
.list_download_btn .list_tit:hover {
  color: #1890ff;
}
.list_upload_btn .list_tit {
  background: url(./img/upload.png) left center no-repeat;
  background-size: 14px;
}
.list_upload_btn .list_tit:hover {
  color: #1890ff;
}
.list_tit p {
  margin: 0;
  padding: 0;
}
.list_btn_pos {
  position: absolute;
  bottom: 20px;
  left: 50%;
  z-index: 1001;
  width: 182px;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
}
</style>
