<template>
 <div class="header">
  <div class='header-icon'>
    <i @click.stop="showMenu" class="iconfont icon-modular">
    </i>
  </div>
  <div class='header-user'>
    <!-- <div class="name">mission-sun</div> -->
    <div>爱编程，爱生活</div>
  </div>
</div>
</template>
<script lang="ts">
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
import { defineComponent, ref, PropType } from 'vue'
export default defineComponent ({
  name: 'global-header',
  emits: ['emit-showmenu'],
  props: {
    isShowMenu: {
      type: Boolean
    }
  },
  setup(props, contexts) {
    const isShowMenu = ref< boolean >(false);
    const showMenu = (): void => {
      isShowMenu.value = !props.isShowMenu;
      contexts.emit('emit-showmenu', isShowMenu.value);
    };
    return {
      showMenu
    }
  }
})
</script>
<style lang="less" scoped>
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
</style>