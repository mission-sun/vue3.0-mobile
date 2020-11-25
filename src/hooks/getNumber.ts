import { ref, onMounted, computed, watch, watchEffect} from "vue";
export default function useUserRepositories() {
  const setupNumber = ref(0);
  const newNumber = ref(0);
  setTimeout(() => {
    setupNumber.value = 3000;
  }, 3000)

  setTimeout(() => {
    newNumber.value = newNumber.value + 100;
  }, 1000);
  
  // newNumber = computed(() => {
  //   return setupNumber.value * 2;
  // })
  // 响应式的跟踪期依赖，并且立即运行一个函数
  watchEffect(() => {
    console.log('newNumber-effect', newNumber.value, setupNumber.value);
  })
  // 监听两个参数
  watch([newNumber,setupNumber], ([value, newValue]) => {
    console.log('newNumber-watch', value, newValue);
  })
  return {
    setupNumber,
    newNumber
  }
}