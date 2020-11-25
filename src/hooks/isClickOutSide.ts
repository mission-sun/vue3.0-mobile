import { ref, onMounted, onUnmounted, Ref, reactive } from 'vue';
export interface MenusProps {
  updateTime: string;
  isShow: boolean;
}
const useIsClickOutSide = (elementRef: Ref<null | HTMLElement> ) => {
  const isClickOutSide = reactive({
    updateTime: new Date().getTime(),
    isShow: false
  });
  const hander = (e: MouseEvent) => {
    if(elementRef.value && elementRef.value.contains(e.target as HTMLElement)) {
      isClickOutSide.isShow= true;
    }else {
      isClickOutSide.isShow= false;
    }
    isClickOutSide.updateTime = new Date().getTime();
  }
  onMounted(() => {
    document.addEventListener('click', hander);
  })
  onUnmounted(() => {
    document.removeEventListener('click', hander);
  })
  return isClickOutSide;
};
export default useIsClickOutSide;