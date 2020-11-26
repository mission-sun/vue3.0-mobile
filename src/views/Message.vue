<template>
  <div class="message-wrap">
    <div class="message-wrap-main">
      <div class="mes-text">
        留言板
      </div>
      <div class="message-list">
        <div class="list-item">
          <div class="icon">
            <i class="iconfont icon-morentouxiang"></i>
          </div>
          <div class="item-box">
            <p class="name">博主 <span class="top1">置顶</span></p>
            <p class="message">哈喽，大家好 我的博客终于再次上线了，这次简单的增加一个留言板功能，希望跟大家来点互动！<br>
            跟大家玩一个小游戏，规则如下：
            <br>
            大家任意留言，发布后会生成一个名字（从水浒108人中随机产生）, <span style="color:red">如果您的名字是宋江（红包50），吴用（10元），武松（5元），林冲（2元），鲁智深（1元）</span>,当出现如上名字的时候，会发给大家对应的红包!
            <br>
            目前留言没有做限制，请合理留言，谢谢！
            </p>

            <p class="time">上线时刻</p>
          </div>
        </div>
        <div v-for="(item, index) in list" :key="index" class="list-item">
          <div class="icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon-test"></use>
            </svg>
          </div>
          <div class="item-box">
            <p class="name">{{item.name}}</p>
            <p class="message">{{item.message}}</p>
            <p class="time">{{item.time}}</p>
          </div>
        </div>
      </div>
      <!-- <input
        type="textarea"
        placeholder="你的鼓励是我前进的动力"
        v-model="message"
        maxlength="50"
        show-word-limit
      >
      <input /> -->
      <div class="message-name-box">
        <input         
          v-model="message"
          type="text">
        <button @click="saveMessage" size="small">提交</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {
    const store = useStore();
    const list = computed(() => store.getters.messageList);
    store.dispatch('getMessageList', 'list');
    return {
      list
    }
  }
});
</script>
<style scoped lang="less">
.message-wrap {
  overflow: hidden;
  .message-wrap-main {
    background: #fff;
    margin: 0 auto;
    margin-top: 60px;
    .message-list {
      font-size: 14px;
      .list-item {
        margin-top: 20px;
        padding: 15px;
        display: flex;
      }
      .icon {
        width: 40px;
        height: 40px;
        // border: 1px solid #aaa;
        border-radius: 40px;
        overflow: hidden;
        padding: 15px 10px 0;
      }
      .item-box {
        flex: 1;
        padding: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #f1f1f1;
        // background-color: yellow;
        .top1 {
          color: red;
        }
        .name {
          color: #8a9aa9;
        }
        .message {
          margin: 10px 0;
          line-height: 40px;
        }
        .time {
          line-height: 30px;
          color: #8a9aa9;
        }
      }
    }
    /deep/ .el-textarea {
      position: relative;
      display: block;
      width: 90%;
      font-size: 14px;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
  .message-name-box {
    padding: 20px 0;    
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    .user-name {
      margin: 10px 20px;
      padding: 5px 0;
      font-size: 16px;
      border: none;
      outline: none;
      width: 200px;
    }
  }
  .mes-text {
    height: 100px;
    line-height: 100px;
    text-align:center;
  }
  .message-name {
    margin-top: 30px;
    display: flex;
    .btn {
      cursor: pointer;
    }
  }
}
</style>



