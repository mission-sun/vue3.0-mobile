<template>
  <div class="list-box" ref="menuRef">
    <ul class="menu-list-box">
      <li 
        class="menu-item" 
        v-for="(item, index) in headerList" :key="index"
        @click="changeActive(index)"
      >
        <router-link active-class="active" :to="item.url">
           <i class="iconfont" :class="item.icon"></i>
           <span class='item-name'> {{ item.title }} </span>
        </router-link> 
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, nextTick, PropType, watch,watchEffect, ref, toRef, toRefs, reactive } from 'vue';
import useIsClickOutSide from "../hooks/isClickOutSide";

export interface MenusProps {
  title: string;
  icon?: string;
  url: string;
}
export interface EmitSubmit {
  email: string;
  password?: number;
}
export default defineComponent ({
  props: {
    headerList: {
      type: Array as PropType < MenusProps[] >, // PropType 构造函数断言成类型
      required: true
    },
    isShowMenu: {
      type: Boolean,
      required: true
    },
    arr: {
      type: Array
    }
  },
  emits: ['change-status'],
  setup(props, contexts) {
    const activeIndex = ref< number >(0);
    const menuRef = ref< null | HTMLElement >(null);
    const isShow = useIsClickOutSide(menuRef);
    watch(isShow,
      (value) => {
        if (props.isShowMenu && !value.isShow) {
          contexts.emit('change-status', value.isShow);
        }
      },
      {
        deep: true
      }
    )
    watchEffect(() => {
      if (props.isShowMenu) {
        console.log('aa-打开', props.isShowMenu);
      }
    })
    const changeActive = (index: number) => {
      activeIndex.value = index;
    };
    return {
      menuRef,
      activeIndex,
      changeActive
    }
  }
})
</script>

<style lang='less'>
.list-box {
  display: inline-block;
  width: 100%;
  padding-top: 100px;
  overflow: hidden;
  .menu-list-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .menu-item {
      width: 150px;
      text-align: left;
      padding: 10px 0;
      height: 50px;
      line-height: 50px;
      font-size: 30px;
      color: #333;
      .iconfont {
        vertical-align: -5%;
      }
      .item-name {
        margin-left: 10px;
      }
    }
    .active {
      color: red;
    }
  }
}

</style>