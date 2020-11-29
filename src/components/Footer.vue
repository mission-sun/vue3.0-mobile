<template>
 <div class="footer">
  Crafted width 孙明欣
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
  name: 'global-footer',
  props: {
    isShowMenu: {
      type: Boolean
    }
  },
  setup(props, contexts) {
    return {
      
    }
  }
})
</script>
<style lang="less" scoped>
.footer {
  font-size: 26px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b0ce82;
  margin: 0 15px;
}
</style>