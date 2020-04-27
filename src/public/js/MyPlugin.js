let MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
    console.log('myGlobalMethod')
  }

 Vue.prototype.collapsed=false;
 // 4. 添加实例方法
  Vue.prototype.$collapseState = function () {
    // 逻辑...
    this.collapsed=!this.collapsed;
    console.log(this.collapsed);
  }
 
}
export default MyPlugin