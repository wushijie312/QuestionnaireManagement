// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引用模块 start
import MyPlugin from './public/js/MyPlugin'
Vue.use(MyPlugin);
//引用模块 end

import store from './store'
import { Button,Layout,Icon,Menu,Breadcrumb,Dropdown,Row,DatePicker,Progress,Table,Divider,Modal,Radio,Checkbox,Input,List,LocaleProvider,Form,Select } from 'ant-design-vue';
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Dropdown);
Vue.use(Row);
Vue.use(DatePicker);
Vue.use(Progress);
Vue.use(Table);
Vue.use(Divider);
Vue.use(Modal);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(List);
Vue.use(LocaleProvider);
Vue.use(Form);
Vue.use(Select);
Vue.config.productionTip = false

require('./public/js/mock')
// 以下4行引入解决日期控件英文的问题


//注入全局属性$message
import { message,notification,modal } from 'ant-design-vue'
Vue.prototype.$message = message;
Vue.prototype.$modal = modal;
Vue.prototype.$notification = notification;
// console.log(message);
Vue.prototype.$message = message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
