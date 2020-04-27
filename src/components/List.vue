<template>
  <div>
    <a-button type="primary" v-if="!paperList.length" @click="addPaper()">+ 新建问卷</a-button>
    <div v-else>
      <a-button type="primary" @click="addPaper()" style="margin-bottom:20px;">+ 新建问卷</a-button>
      <a-table
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :dataSource="paperList"
        :rowKey="record => record.id"
      >
        <a-table-column title="标题" data-index="title"/>
        <a-table-column title="开始时间" data-index="startTime"/>
        <a-table-column title="截止时间" data-index="endTime"/>
        <a-table-column title="状态" data-index="status">
          <template slot-scope="text, record">
            <span
              :class="record.status | transformStatusClass"
            >{{ record.status | transformStatusText }}</span>
          </template>
        </a-table-column>
        <a-table-column title="操作" data-index="action">
          <template slot-scope="text, record">
            <template v-if="record.status === 0">
              <a-button @click="iterator = editItem(record); iterator.next()">编辑</a-button>
              <a-button @click="viewPaper(record.id)">查看问卷</a-button>
            </template>
            <template v-else-if="record.status === 1">
              <a-button @click="sharePaper(record.id)">分享问卷</a-button>
              <a-button @click="viewData(record.id)">查看数据</a-button>
            </template>
            <template v-else>
              <a-button @click="iterator = reEditItem(record); iterator.next()">重新编辑</a-button>
              <a-button @click="viewData(record.id)">查看数据</a-button>
            </template>
            <a-button @click="iterator = deleteItem(record); iterator.next()">删除</a-button>
          </template>
        </a-table-column>
      </a-table>
      <div style="margin-bottom: 16px">
        <template v-if="hasSelected">已选择{{selectedRowKeys.length}}条数据</template>
        <a-button
          type="primary"
          :disabled="!hasSelected"
          @click="iterator = deleteCheckedItems(); iterator.next()"
        >删除已选数据</a-button>
      </div>
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

    <a-modal
      title="分享问卷"
      centered
      :footer="null"
      v-model="isShowSharePrompt"
      :afterClose="qrcodeClearHtml"
    >
      <div style="width:300px;margin:0 auto;text-align:center;">
        <router-link :to="getShareLink">{{shareLink}}</router-link>
        <div id="qrcode" ref="qrcode" style="width:250px;margin:0 auto;"></div>
        <p>(点击右键复制链接/二维码分享问卷)</p>
      </div>
    </a-modal>
    <loader v-show="isLoading"/>
  </div>
</template>

<script>
// import {  mapMutations } from "vuex";
import Loader from "./Loader";
import { getPaperList, deletePaper, login } from "../api";
import storage, { TOKEN_KEY, USERNAME_KEY,NAVIGATION } from "../public/js/storage";
import bus from "../public/js/bus";
import QRCode from "qrcodejs2";

export default {
  name: "List",
  components: {
    loader: Loader,
    QRCode
  },

  filters: {
    transformStatusText(status) {
      return status === 0 ? "未发布" : status === 1 ? "已发布" : "已结束";
    },

    transformStatusClass(status) {
      return status === 0 ? "unrelease" : status === 1 ? "released" : "ended";
    }
  },

  data() {
    return {
      getShareLink: "",
      selectedRowKeys: [],
      iterator: null,
      paperList: [],
      promptText: "",
      shareLink: "",
      isShowPrompt: false,
      isShowSharePrompt: false,
      isLoading: false
    };
  },

  computed: {
    isCheckedAll() {
      return this.paperList.every(item => item.checked);
    },
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  created() {
    //  setTimeout(()=>{
    //     this._getPaperList();
    //  },2000);
    if (!(storage.get(TOKEN_KEY) && storage.get(USERNAME_KEY))) {
      this.getUsers();
      var timeser = null;
      clearInterval(timeser);
      timeser = setInterval(() => {
        this.getUsers();
      }, 3600000 - 80000);
    } else {
      this._getPaperList();
    }
  },

  methods: {
    // ...mapMutations(['usernameState']),
    getUsers() {
      login().then(res => {
        if (res.code === 0) {
          if (res.data.result === 0) {
            // this.$message.success(res.data);
            this.loginSuccess(res);
          } else {
            this.$message.info("邮箱或密码错误");
          }
        } else {
          this.$message.info(res.msg);
        }
      });
    },
    loginSuccess(res) {
     
      let { token, username } = res.data;
      let { header } = res;
      storage.set(TOKEN_KEY, token);
      storage.set(USERNAME_KEY, username);
      storage.set(NAVIGATION, header);
      bus.$emit("usernameState", username);
      // this.usernameState(username);
      this._getPaperList();

      // this.$router.push("/list");
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      this.paperList.forEach(item => (item.checked = false));
      for (var key in this.selectedRowKeys) {
        var selects = this.selectedRowKeys[key];
        for (var j = 0; j < this.paperList.length; j++) {
          if (selects == this.paperList[j].id) {
            this.paperList[j].checked = true;
          }
        }
      }
    },

    addPaper() {
      this.$router.push("/lists/add");
    },

    viewPaper(id) {
      this.$router.push({ path: "/lists/view", query: { id } });
    },

    viewData(id) {
      this.$router.push({ name: "data", query: { id } });
    },
    showPrompt(text) {
      this.promptText = text;
      this.isShowPrompt = true;
    },

    sharePaper(id) {
      //   this.shareLink = `${
      //     window.location.origin
      //   }/questionnaire/#/fill?id=${id}`;
      this.shareLink = `${window.location.origin}/lists/fill?id=${id}`;
      this.$nextTick(function() {
        this.qrcode();
      });
      this.getShareLink = `/lists/fill?id=${id}`;
      this.isShowSharePrompt = true;
    },
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 250, // 设置宽度
        height: 250, // 设置高度
        text: this.shareLink
      });
    },
    qrcodeClearHtml() {
      document.getElementById("qrcode").innerHTML = "";
    },
    *editItem(item) {
      yield this.showPrompt(`确认要编辑《${item.title}》？`);
      yield this.$router.push({ name: "edit", query: { id: item.id } });
    },

    *reEditItem(item) {
      yield this.showPrompt(`确认要重新编辑《${item.title}》？`);
      yield this.$router.push({ path: "/lists/re-edit", query: { id: item.id } });
    },

    *deleteItem(item) {
      let index;
      yield (() => {
        index = this.paperList.indexOf(item);
        this.showPrompt(`确认要删除《${item.title}》？`);
      })();
      yield this._deletePaper([item]);
    },

    *deleteCheckedItems() {
      let checkedPaperList = this.paperList.filter(item => item.checked);
      if (!checkedPaperList) {
        yield this.showPrompt("未选择问卷");
      } else {
        yield this.showPrompt("确认要删除所选问卷？");
        yield this._deletePaper(checkedPaperList);
      }
    },

    _getPaperList() {
      this.isLoading = true;
      getPaperList().then(res => {
        if (res.code === 0) {
          this.paperList = res.data;
          this.isLoading = false;
        } else if (res.code === -1) {
          storage.clear();
          // this.$router.push('/login')
        }
      });
    },

    _deletePaper(list) {
      let idList = list.map(item => item.id);
      let data = { idList };
      deletePaper(data).then(res => {
        if (res.code === 0) {
          if (res.data === 0) {
            this._getPaperList();
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/public.scss";
.released {
  color: $light-green;
}
</style>
