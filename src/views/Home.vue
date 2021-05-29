<template>
  <div class="home-wrap">
    <!-- <div class="home-main-img">
    </div>
    <div class="home-main-quotos">
      择一城终老，遇一人白首
    </div> -->
    <div class='section-list-wrap'>
      <main-section :blogList='blogList' :is-show-img="false" />
    </div>
    <!-- <div class="home">
      待更新，敬请期待
    </div> -->
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import MainSection from '../components/MianSection.vue';
// const demo01 = () => <div>Vue 3.0</div>;
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
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
  border-top: 0.01333rem solid #f5f5f5;
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
