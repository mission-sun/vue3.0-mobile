import { ref, onMounted, onUnmounted, Ref, isReactive } from 'vue';
const useIsClickOutSide = (elementRef: Ref<boolean> ) => {
  const isClickOutSide = ref(false);
  isClickOutSide.value = elementRef.value;
  console.log('监控', elementRef.value);
  return isClickOutSide;
};
export default useIsClickOutSide;