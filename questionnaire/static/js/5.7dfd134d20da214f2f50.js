webpackJsonp([5],{i8ck:function(t,e,s){"use strict";s.d(e,"a",function(){return i});var i={data:function(){return{resultType:"",resultText:"",isShowResult:!1}},computed:{resultClassName:function(){return this.resultType}},methods:{showResult:function(t,e){this.resultType=t,this.resultText=e,this.isShowResult=!0}}}},jZ6p:function(t,e){},xJsL:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("gyMJ"),a=s("i8ck"),r=s("sEDI"),o={name:"Login",mixins:[a.a],data:function(){return{email:"",password:"",submitText:""}},methods:{submit:function(){var t=this;if((this.isShowResult=!1,!this.submitText)&&this.validateInfo()){var e={email:this.email,password:this.password};this.submitText="登录中...",Object(i.h)(e).then(function(e){0===e.code&&(0===e.data.result?t.loginSuccess(e.data):(t.showResult("error","邮箱或密码错误"),t.submitText=""))})}},loginSuccess:function(t){var e=t.token,s=(t.email,t.username);r.d.set(r.b,e),r.d.set(r.c,s),this.$router.push("/")},validateInfo:function(){return/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(this.email)?!!this.password||(this.showResult("error","请输入密码"),!1):(this.showResult("error","邮箱格式不正确"),!1)},switchToRegister:function(){this.$router.push("register")}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"login"},[t._m(0),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowResult,expression:"isShowResult"}],staticClass:"login-result",class:t.resultClassName},[s("p",[s("span",[t._v(t._s(t.resultText))]),t._v(" "),s("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.isShowResult=!1}}},[t._v("×")])])]),t._v(" "),s("div",{staticClass:"login-body"},[s("form",[s("div",{staticClass:"form-group"},[s("label",[t._v("邮箱")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",autocomplete:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",[t._v("密码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{id:"password",type:"password",autocomplete:""},domProps:{value:t.password},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit()},input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("input",{attrs:{type:"button",value:t.submitText||"登录"},on:{click:function(e){return t.submit()}}})])])]),t._v(" "),s("p",{staticClass:"create-account"},[s("span",[t._v("没有账号？")]),t._v(" "),s("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.switchToRegister()}}},[t._v("注册一个")])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"login-header"},[e("h1",[this._v("登录")])])}]};var u=s("C7Lr")(o,n,!1,function(t){s("jZ6p")},"data-v-7258eb1f",null);e.default=u.exports}});