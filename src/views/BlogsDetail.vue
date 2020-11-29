<template>
  <div>
    <div class="main-edit" id="main-edit">
     
      <!-- <div class="editorHeader">
        <div class="left-box">
          <input class="title" v-model="blog.title" type="text" placeholder="请输入文章标题">
        </div>
      </div> -->
      <div v-html="blogHtml">
      </div>
    </div>
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, defineComponent, getCurrentInstance, watchEffect, toRefs, onMounted } from 'vue';
export default  {
  name: "create",
  components: {
  },
  setup() {
    const md = new MarkdownIt(
      {
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {}
          } 
          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
      }
    );
    const store = useStore();
    // const route = useRoute();
    const router = useRouter();
    const currentId = useRoute().query.id;
    console.log('currentId', useRoute().query.id);

    onMounted(() => {
      store.dispatch('getBlogDetail', {_id: currentId});
    })
  
    const blogHtml = computed(() => {
      console.log('blog-detial', store.getters.blogDetail);
      if (store.getters.blogDetail.content) {
        return md.render(store.getters.blogDetail.content)
       }
    })
    return {
      blogHtml
    }
  }
}
</script>

<style lang="less">
.main-edit {
  position: relative;
  margin: 0 auto;
  margin-top: 60px;
  background-color: #fff;
  padding: 25px;
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
  }
  p {
    line-height: 40px;
    font-size: 30px;
    text-indent: 30px;
    color: #555;

  }
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #333;
    background: #f8f8f8;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font: initial;
    line-height: 80px;
    font-weight: bold;
  }
}
</style>