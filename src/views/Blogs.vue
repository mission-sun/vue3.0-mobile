<template>
  <!-- <div class="home-wrap">
    <div class='section-list-wrap'>
      <main-section :blogList='blogList' />
    </div>
  </div> -->
  <div class="home">
    待更新，敬请期待
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import MainSection from '../components/MianSection.vue';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'blogs',
  components: {
    MainSection
  },
  setup() {
    const store = useStore();
    const blogList = computed(() => store.getters.blogList);
    console.log('blogList', blogList);
    store.dispatch('getBlogsList', 'list');
    // getBlogsList
    return {
      blogList
    }
  }
});
</script>
<style lang="less" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid yellowgreen;
  line-height: 100px;
}
.home-wrap {
  position: relative;
  .home-main-img {
    height: 400px;
    // background: url(https://2heng.xin/wp-content/uploads//2017/08/午後_58898122.jpg) no-repeat center center;
    background-size: cover;
  }
  .home-main-quotos {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 30px;
    // margin: auto 0;
  }
  .section-list-wrap {

  }
}
</style>
