<template>
  <div>
    {{
      num
    }}
  </div>
</template>

<script lang='ts'>
export interface ColumnsProps {
  id: number;
  title: string; 
}
import { defineComponent, PropType } from 'vue';
export default defineComponent ({
  name: 'components-demo',
  props: {
    list: {
     type: Array as PropType < ColumnsProps[] > // PropType 构造函数断言成类型
    }
  },
  setup(props){
    console.log('props', props);
    const num = 1212;
    return {
      num
    } 
  }
})
</script>

<style>

</style>