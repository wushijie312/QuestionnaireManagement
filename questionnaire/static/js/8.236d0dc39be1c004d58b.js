webpackJsonp([8],{Pi7O:function(t,e){},kKgw:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("lC5x"),i=s.n(n),o=s("wd27"),a=s("gyMJ"),r=function(t){return window.localStorage.getItem(t)},u=function(t,e){window.localStorage.setItem(t,e)},c={name:"Fill",components:{loader:o.a},filters:{transformQursiotnType:function(t){return 1===t?"(单选题)":2===t?"(多选题)":"(文本题)"}},data:function(){return{paperObj:{},questionList:[],answerList:[],promptText:"",isShowPrompt:!1,isFillMode:!1,isLoading:!1}},created:function(){this.isFillMode="/lists/fill"===this.$route.path,this._getPaper()},methods:{showPrompt:function(t){this.promptText=t,this.isShowPrompt=!0},validateAnswer:function(){return console.log(this.answerList),!!this.answerList.filter(function(t){if(3!==t.questionType&&!t.answerContent.length)return t}).length},initAnswerList:function(){var t=this;this.questionList.map(function(e,s){t.$set(t.answerList,s,{id:e.id,questionType:e.questionType,answerContent:[]})})},back:function(){this.$router.push("/")},commitSuccess:i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.$router.push({path:"/lists/success"});case 1:case"end":return t.stop()}},t,this)}),submit:i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e="",this.validateAnswer()?(e="有选择题未填写，无法提交！",this.iterator=null):e="确认提交问卷吗？",!r(this.$route.query.id)){t.next=6;break}return this.$message.info("不能重复提交！"),t.abrupt("return");case 6:return t.next=8,this.showPrompt(e);case 8:return t.next=10,this._commitPaper();case 10:case"end":return t.stop()}},t,this)}),_getPaper:function(){var t=this,e={id:this.$route.query.id};this.isLoading=!0,this.isFillMode?Object(a.l)(e).then(function(e){0===e.code&&(1===e.data.status?(t.paperObj=e.data,t.questionList=e.data.questions,t.initAnswerList(),t.isLoading=!1):(t.$message.info(e.msg),setTimeout(function(){t.$router.push("/")},2e3)))}):Object(a.e)(e).then(function(e){0===e.code&&"该问卷未发布"!=e.msg?(t.paperObj=e.data,t.questionList=e.data.questions,console.log(t.questionList),t.initAnswerList()):(t.$message.info(e.msg),setTimeout(function(){t.$router.push("/")},2e3))})},_commitPaper:function(){var t=this,e={id:this.paperObj.id,answers:this.answerList};console.log(this.answerList),Object(a.c)(e).then(function(e){0===e.code&&(u(t.$route.query.id,t.$route.query.id),t.iterator=t.commitSuccess(),t.iterator.next())})}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"fill_bg"},[s("loader",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}]}),t._v(" "),s("div",{staticClass:"fill_top"},[t.isLoading?t._e():s("div",{staticClass:"qu-wrap"},[s("header",[t._v(t._s(t.paperObj.title))]),t._v(" "),s("div",{staticClass:"qu-content"},t._l(t.questionList,function(e,n){return s("section",{key:n,staticClass:"qu-item"},[s("h3",[s("span",{staticClass:"qu-num"},[t._v(t._s("Q"+(n+1)))]),t._v(" "),s("span",{staticClass:"qu-topic"},[t._v(t._s(e.questionTitle))]),t._v(" "),s("span",{staticClass:"qu-type"},[t._v(t._s(t._f("transformQursiotnType")(e.questionType)))])]),t._v(" "),3===e.questionType?s("a-textarea",{attrs:{placeholder:"请您输入内容",autosize:{minRows:3,cols:6}},model:{value:t.answerList[n].answerContent[0],callback:function(e){t.$set(t.answerList[n].answerContent,0,e)},expression:"answerList[index].answerContent[0]"}}):s("div",[1===e.questionType?s("a-radio-group",{attrs:{options:e.questionOption},model:{value:t.answerList[n].answerContent[0],callback:function(e){t.$set(t.answerList[n].answerContent,0,e)},expression:"answerList[index].answerContent[0]"}}):t._e(),t._v(" "),2===e.questionType?s("a-checkbox-group",{attrs:{options:e.questionOption},model:{value:t.answerList[n].answerContent,callback:function(e){t.$set(t.answerList[n],"answerContent",e)},expression:"answerList[index].answerContent"}}):t._e()],1)],1)}),0),t._v(" "),s("footer",[t.isFillMode?s("a-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(e){t.iterator=t.submit(),t.iterator.next()}}},[t._v("提交问卷")]):s("a-button",{staticClass:"btn",on:{click:function(e){return t.back()}}},[t._v("返回")])],1),t._v(" "),t._m(0)])]),t._v(" "),s("a-modal",{attrs:{title:"提示",centered:"",okText:"确定",cancelText:"取消"},on:{ok:function(e){t.iterator.next(),t.isShowPrompt=!1},cancel:function(e){t.isShowPrompt=!1}},model:{value:t.isShowPrompt,callback:function(e){t.isShowPrompt=e},expression:"isShowPrompt"}},[s("p",[t._v(t._s(t.promptText))])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fill_bottom"},[e("span",{staticStyle:{color:"#333"}},[this._v("北京阳光印易科技有限公司")]),this._v("    提供技术支持\n      ")])}]};var p=s("C7Lr")(c,l,!1,function(t){s("Pi7O")},"data-v-23c2e858",null);e.default=p.exports}});