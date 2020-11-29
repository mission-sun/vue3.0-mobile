<template>
<div :class="isShowMenu? 'main-wrap-right-slide': ''" class="main-wrap">
  <!-- 导航 -->
  <menu-list
    @change-status="changeStatus"
    :is-show-menu="isShowMenu"
    class="main-menu main-menu-left-side"
    :headerList="testList"> 
  </menu-list>
  <!-- 主题内容 -->
  <div class="main-content">
    <Header
      @emit-showmenu="emitShowMenu"
      :is-show-menu="isShowMenu"
     />
     <focus-image />
    <common-title />
    <router-view />
    <Footer />
  </div>
</div>
</template>

<script lang="ts">
// import "./common/index.less";
import { useStore } from 'vuex'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import MenuList, { MenusProps } from './components/menu-list.vue';
import CommonTitle from './components/CommonTitle.vue';
import FocusImage from './components/FouseImage.vue';
import Demo from './views/demo';

import { defineComponent, ref, getCurrentInstance, nextTick, computed, watch, watchEffect, onMounted } from 'vue'
export default defineComponent ({
  components: {
    Header,
    CommonTitle,
    MenuList,
    FocusImage,
    Footer,
    Demo
  },
  // emits: ['change-status'],
  setup() {
    const store = useStore();
    const instance: any = getCurrentInstance();

    // watch(() => instance, (value) => {
    //   console.log('to', value);
    //   // isShowMenu.value = false;
    //   },{ deep: true }
    // )
    const isShowMenu = ref< boolean >(false);
    const arr = ref< number[]> ([12]);

    const testList: MenusProps[] = [
      {
        title: '首页',
        url: '/',
        icon: 'icon-home'
      },
      {
        title: '文章',
        url: '/blogs',
        icon: 'icon-file-common'
      },
      {
        title: '留言板',
        url: '/message',
        icon: 'icon-file-common'
      },
      {
        title: '个人',
        url: '/person',
        icon: 'icon-morentouxiang'
      }
    ]
    // watchEffect(() => console.log(instance))
    // const ctx = computed(instance, (value) => {
    //   return value
    // })
    // 检测路由变化 等待更好的写法
    watchEffect(() => {
      if (instance && instance.ctx && instance.ctx.$router.currentRoute.value.path) {
        store.commit('changeTitle', instance.ctx.$router.currentRoute.value.path);
        isShowMenu.value = false;
      }
      // id.value = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    })
    
    const changeStatus = (value: boolean): void => {
      console.log('emit-parent', value);
      isShowMenu.value = value;
    };

    const emitShowMenu = (val: boolean) => {
      console.log(val);
      isShowMenu.value = val;
    }

    return {
      emitShowMenu,
      isShowMenu,
      testList,
      changeStatus,
      arr
    }
  }
})
</script>

<style lang="less" scoped>
// @import url('./common/index.less');
/* require('') */
.main-wrap-right-slide {
  position: relative;
  transform: translate3d(60%,0,0);
  .main-menu-left-side {
    opacity: 1;
    position: absolute;
    left: 0;
    z-index: 10;
  }

}
.main-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  transition: 0.3s ease;
  font-size: 14px;
  background-color: #f4f5f5;
  .main-menu {
    width: 60%;
    min-height: 100vh;
    margin-left: -60%;
    flex-shrink: 0;
    background-color: #f9fafb;
    color: #4c555a;
    font-size: 14px;
  }
  .main-content {
    width: 100%;
    height: 80px;
    background-color: #26a2ff;
    flex-shrink: 0;
  }
}
.header {
  font-size: 26px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  margin: 0 15px;
  .header-icon {
    .iconfont {
      font-size: 40px;
    }
  }
  .header-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      margin-right: 10px;
    }
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// #nav a.router-link-exact-active {
//   color: #42b983;
// }
</style>
