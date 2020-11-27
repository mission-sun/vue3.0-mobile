<template>
  <div class="main-section" v-for="(data, index) in list" :key="index">
    <!-- <div class="section-top">
      <img class="blog-title-img" :src="data.image" alt="动画">
    </div> -->
    <div class="section-bottom">
      <p class="time">{{data.time}}</p>
      <router-link class="title" :to="{ path: '/detail', query: { id: data._id }}">
        {{ data.title }}
      </router-link>
      <p class="desc">
        {{ data.content }}
      </p>
      <!-- <p><i class="iconfont icon-shenglvehao"></i>
      </p> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, watchEffect, computed }  from 'vue';
export default defineComponent ({
  props: {
    blogList: {
      type: Array
    },
    index: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    console.log('props-list', props.blogList);

    const list = computed(() => {
      return props.blogList.map(item => {
        // eslint-disable-next-line
        item.content = item.content.match(/[^\x00-\xff]+|\d+/g).join();
        return item;
      })
    })
    watchEffect(() => {
      console.log('props-list-watch', props.blogList);
    })
    return {
      list
    }
  }
})
</script>
<style lang="less" scoped>
.main-section {
  // &:first-child{
  //   margin-top: 30px;
  // }
  margin: 0 auto;
  // margin: 0 15px 30px;
  // display: flex;
  overflow: hidden;
  // flex-wrap:wrap;  /*换行*/
  // justify-content: center;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 20px;
  .section-bottom {
    color: #999;
    width: 350PX;
    box-sizing: border-box;
    padding: 20px;
    .time {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    .title {
      color: #666;
      font-size: 32px;
      font-weight: bold;
      line-height: 40PX;
      padding: 10px 0;
      cursor: pointer;
      display: block;
    }
    .desc {
      // height: 60px;
      // line-height: 30px;
      // text-overflow: ellipsis;
      // overflow: hidden;
      // word-break: break-all;
      // white-space: normal;
      // -webkit-box-orient: vertical;
      // -webkit-line-clamp: 2;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      font-size: 30px;
      line-height: 45px;
      color: #999;
    }
    .user-status {
      display: flex;
      font-size: 10px;
      justify-content: flex-start;
      padding: 5px 0;
      .status{
        padding-right: 20PX;
      }
    }
    .contents {
      color: #666;
      font-size: 16px;
      line-height: 30px;
      padding: 10px;
    }
    .edit {
      text-align: right;
      font-size: 16px;
      .edit-btn {
        cursor: pointer;
      }
    }
  }
  .section-top {
    flex: 1;
    overflow: hidden;
    .blog-title-img {
      width: 100%;
      height: 200px;
      // object-fit: cover;
      // transition: transform 500ms ease 0s;
      // &:hover {
      //   transform: scale(1.1);
      // }
    }
  }
}
</style>