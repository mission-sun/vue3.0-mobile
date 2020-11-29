<template>
  <div class='common-title'>
    {{
      title
    }}
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
// import { GlobalDataProps } from '../store'
export default defineComponent ({
  // props: {
  //   title: {
  //     type: String
  //   }
  // },
  setup(props, contexts) {
    const store = useStore();
    const title = computed(() => store.getters.currentTile.title);
    store.commit('changeTitle', 'myname');
    console.log('title', title.value);
    return {
      title
    }
  }
})
</script>

<style lang='less' scoped>
.common-title {
  padding-top: 50px;
  background-color: #fff;
  line-height: 100px;
  padding-left: 15px;
  font-size: 30px;
}
</style>