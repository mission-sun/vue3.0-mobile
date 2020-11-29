import { createStore } from 'vuex'
import apis from '../api'
import { get, post } from '../service/service';


// 择一城终老，遇一人白bai首。挽一帘幽梦，许一世倾城。

// 择一du人相爱，等一人终老。痴一人深情，留一世繁华。

// 断一根琴弦，留一曲离别。我背弃一切，共度朝夕。

const config: any = {
  '/' : {
      title: '推荐阅读',
      quotos: '择一城终老，遇一人白首'
    },
  '/blogs' :{
    title: '文章列表',
    quotos: '挽一帘幽梦，许一世倾城'
  },
  '/message' :{
    title: '留言列表',
    quotos: '痴一人深情，留一世繁华'
  },
  '/person' :{
    title: '个人信息',
    quotos: '断一根琴弦，留一曲离别'
  } 
}
export default createStore({
  state: {
    currentTile: {
      title: '推荐阅读',
      quotos: '择一城终老，遇一人白首'
    },
    blogList: [],
    messageList: [],
    blogDetail: {}
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
    },
    changeBlogDetail(state, value) {
      state.blogDetail = value;
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
    getBlogDetail({commit, state}, value) {
      console.log('value', value);
      get(apis.getDetail, value).then( res => {
        console.log('store', res);
        commit('changeBlogDetail', res);
      })
    },
    saveMessage({commit, state}, value) {
      console.log('value', value);
      post(apis.saveMessage, value).then( res => {
        console.log('save-message', res);
        // commit('changeBlogDetail', res);
      })
    },
  },
  getters: {
    currentTile: state => state.currentTile,
    blogList: state => state.blogList,
    messageList: state => state.messageList,
    blogDetail: state => state.blogDetail

  },
  modules: {
  }
})
