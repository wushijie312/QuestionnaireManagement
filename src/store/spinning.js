const state = {
    spinning: true,
    create: false,
    info: true,
    disabled: true,
    refresh: false,
    tokenFlag: false, // 判断是否获取token
    listNumber: 20

};
const mutations = {
    showLoading(state) {
        state.spinning = true
    },
    hideLoading(state) {
        state.spinning = false
    },
    showCreate(state) {
        state.create = true
    },
    hideCreate(state) {
        state.create = false
    },
    showInfo(state) {
        state.info = true
    },
    hideInfo(state) {
        state.info = false
    },
    listNumberChange(state, data) {
        state.listNumber = data
    },
    showDisabled(state) {
        state.disabled = true
    },
    hideDisabled(state) {
        state.disabled = false
    },
    showRefresh(state) {
        state.refresh = true
    },
    hideRefresh(state) {
        state.refresh = false
    },
    showTokenFlag(state) {
        state.tokenFlag = true
    },
    hideTokenFlag(state) {
        state.tokenFlag = false
    }
};

const actions = {
   
};
const getters = {

};

// 不要忘记把state, mutations等暴露出
export default {
    state,
    mutations,
    actions,
    getters
}