<template>
  <div class="focus-wrap">
    <div class="home-main-img">
    </div>
    <div class="home-main-quotos">
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts">
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
import { defineComponent, ref, PropType,computed } from 'vue'
import { useStore } from 'vuex'; 
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
    const store = useStore();
    const title = computed(() => store.getters.currentTile.quotos);
    const showMenu = (): void => {
      isShowMenu.value = !props.isShowMenu;
      contexts.emit('emit-showmenu', isShowMenu.value);
    };
    return {
      showMenu,
      title
    }
  }
})
</script>
<style lang="less" scoped>
.focus-wrap {
  position: relative;
  .home-main-img {
    height: 400px;
    background: url(../assets/header.jpg) no-repeat center center;
    background-size: cover;
  }
  .home-main-quotos {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 30px;
  }
}
</style>