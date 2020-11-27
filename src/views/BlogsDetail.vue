<template>
  <div>
    <div class="main-edit" id="main-edit">
     
      <!-- <div class="editorHeader">
        <div class="left-box">
          <input class="title" v-model="blog.title" type="text" placeholder="请输入文章标题">
        </div>
      </div> -->
      <!-- <mavon-editor 
      defaultOpen="preview"
      :subfield="false"
      :boxShadow="false"
      :transition="false"
      :toolbarsFlag="false"
      previewBackground="#fff"
      v-model="blog.content"/> -->
      <mavon-editor
      v-model="value1"/>
    </div>
  </div>
</template>
<script>
import mavonEditor from 'mavon-editor'
import { useStore } from 'vuex';
import { computed, ref, defineComponent, getCurrentInstance, watchEffect, toRefs } from 'vue';
export default  {
  name: "create",
  components: {
    mavonEditor
  },
  // setup() {
  //   const store = useStore();
  //   const instance: any = getCurrentInstance();
  //   const value = ref<string>('');

  //   watchEffect(() => {
  //     if (instance && instance.ctx && instance.ctx.$router.currentRoute.value.path) {
  //       console.log('instance.ctx', instance.ctx.$router.currentRoute.value.query.id);
  //       const _id = instance.ctx.$router.currentRoute.value.query.id;
  //       store.dispatch('getBlogDetail', {_id});
  //     }
  //   })
  //   const blog = computed(() => {
  //     console.log('blog-detial', store.getters.blogDetail);
  //     return store.getters.blogDetail
  //   })
  //   return {
  //     blog,
  //     value
  //   }
  // },
  data() {                      
    return {
      value1: '',
      id: '',
      title: ''
    };
  }
}
</script>

<style scoped lang="less">
.main-edit {
  position: relative;
  margin: 0 auto;
  margin-top: 60px;
   .editorHeader {
    display: flex;  
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 100;
    .left-box {
      .title {
        margin: 0;
        padding: 0;
        font-size: 24px;
        font-weight: 700;
        color: #000;
        border: none;
        outline: none;
      }
    }
    .right-box {
      .publish {
        font-size: 14px;
        white-space: nowrap;
        color: #007fff;
        cursor: pointer;
      }
    }
  }
}
</style>
