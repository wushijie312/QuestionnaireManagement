
const state = {
  collapsed: false,
  };
  const mutations = {
    collapseState(state){
      state.collapsed = !state.collapsed;
    }
  };
   
  const actions = {
    
  };
  const getters = {
   
  };
   
  // 不要忘记把state, mutations等暴露出去。
  export default {
    state,
    mutations,
    actions,
    getters
  }