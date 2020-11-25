<template>
  <div class="about" ref="root">
    <Demo />
    <h1>This is an about page</h1>
    <h2 @click="number++">number: {{ number }}</h2>
    <h3 @click="arr.push(1)">arr: {{ arr }}</h3>
  </div>

</template>
<script lang="ts">
import { defineComponent, ref, toRefs, onMounted, watch, computed, onUnmounted } from 'vue';
import getNumber from '../hooks/getNumber';
import useIsClickOutSide from "../hooks/isClickOutSide"
import Demo from './demo.vue';
export default defineComponent ({
  setup(){
    // toRefs 把对象转成响应式的
    const arr = ref([12]);
    const { setupNumber,  newNumber } = getNumber();
    watch(arr, (value) => {
      console.log('setup-watch', value);
    }, 
    {
      immediate: true,
      deep: true
    }
    )
    return {
      setupNumber,
      newNumber,
      arr,
    }
  },
 
  data() {
    return{
      number: 1
    }
  },
  components: {
    Demo
  },
  created() {
    // console.log('number', this.number);
  },
  mounted() {
    console.log('mounted');
  }
})
</script>