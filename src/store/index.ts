import { createStore } from 'vuex'
import apis from '../api'
import { get, post } from '../service/service';

const config: any = {
  '/' :'推荐阅读',
  '/blogs' :'文章列表',
  '/message' :'留言列表',
  '/person' :'个人信息' 
}
export default createStore({
  state: {
    currentTile: '推荐阅读',
    blogList: [],
    messageList: []
  },
  mutations: {
    changeTitle(state, value) {
      if (config[value]) {
        state.currentTile = config[value];
      }
    },
    changeBlogList(state, value) {
      state.blogList = value;
    },
    changeMessageList(state, value) {
      state.messageList = value;
    } 
  },
  actions: {
    getBlogsList({commit, state}, value) {
      console.log('getList-state', state);
      get(apis.getList).then( res => {
        commit('changeBlogList', res);
      })
    },
    getMessageList({commit, state}, value) {
      get(apis.getmessage).then( res => {
        commit('changeMessageList', res);
      })
    },
  },
  getters: {
    currentTile: state => state.currentTile,
    blogList: state => state.blogList,
    messageList: state => state.messageList
  },
  modules: {
  }
})
