<template>
  <div class="message-wrap">
    <div class="message-wrap-main">
      <div class="mes-text">
        留言板
      </div>
      <div class="message-list">
        <div class="list-item">
          <div class="icon">
            <!-- <i class="iconfont icon-morentouxiang"></i> -->
          </div>
          <div class="item-box">
            <!-- <p class="name">博主 <span class="top1">置顶</span></p> -->
            <!-- <p class="message">大家任意留言，发布后会生成一个名字（从水浒108人中随机产生）, <span style="color:red">如果您的名字是宋江（红包50），吴用（10元），武松（5元），林冲（2元），鲁智深（1元）</span>,当出现如上名字的时候，会发给大家对应的红包!
            </p> -->
            <p class="message">欢迎大家留言</p>
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
      <div class="message-name-box">
        <textarea
          class="message"
          placeholder="随便说两句"         
          v-model="message"
           />

          <a class='message-btn' @click="saveMessage" href="javascript:void(0)">
            留下你的脚步
          </a>
        <!-- <button @click="saveMessage" size="small">提交</button> -->
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
    const message = ref('');
    const defaultName = ['宋江', '卢俊义', '吴用', '公孙胜', '关胜', '林冲', '秦明', '呼延灼', '花荣', '柴进', '李应', '朱仝', '鲁智深', '武松', '董平', '张清', '杨志', '徐宁', '索超', '戴宗', '刘唐', '李逵', '史进', '穆弘', '雷横', '李俊', '阮小二', '张衡', '阮小五', '张顺', '阮小七', '杨雄', '石秀', '解珍', '解宝', '燕青', '朱武', '黄信', '孙立', '宣赞', '郝思文', '韩涛', '彭玘', '单廷圭', '魏定国', '萧让', '裴宣', '欧鹏', '邓飞', '燕顺', '杨林', '凌震', '蒋敬', '吕方', '郭盛', '安道全', '皇甫瑞', '王英', '一丈青', '鲍旭', '樊瑞', '孔明', '孔亮', '项充', '李衮', '金大坚', '马麟', '童威', '童猛', '孟康', '侯健', '陈达', '杨春', '郑天寿', '陶宗旺', '宋清', '乐和', '龚旺', '丁得孙', '穆春', '曹正', '宋万', '杜迁', '薛永', '施恩', '周通', '李忠', '杜兴', '汤隆', '邹润', '邹渊', '朱富', '朱贵', '蔡福', '蔡庆', '李立', '李云', '焦挺', '石勇', '孙新', '顾大嫂', '张青', '孙二娘', '王定六', '郁保四', '白胜', '时迁', '段景住']

    const list = computed(() => store.getters.messageList);
    store.dispatch('getMessageList', 'list');
    const saveMessage = () => {
      const item = {
        name: defaultName[Math.ceil(Math.random()*100)],
        message: message.value,
        time: new Date().getTime()
      };
      store.dispatch('saveMessage', item).then(res => {
        console.log('callback', res);
        message.value = '';
        store.dispatch('getMessageList', 'list');
      })
    }
    return {
      list,
      message,
      saveMessage
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
      font-size: 28px;
      .list-item {
        padding: 0 15px;
        display: flex;
        min-height: 100px;
      }
      .icon {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        overflow: hidden;
        padding: 25px 15px 0;
      }
      .item-box {
        flex: 1;
        padding: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #f1f1f1;
        .top1 {
          color: red;
        }
        .name {
          font-size: 32px;
          padding: 10px 0;
          color: #FE9600;
        }
        .message {
          margin: 10px 0;
          font-size: 28px;
          line-height: 40px;
        }
        .time {
          line-height: 30px;
          font-size: 22px;
          padding: 10px 0 0;
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
    padding: 25px 45px;    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    .message {
      display: block;
      float: none;
      width: 100%;
      height: 120px;
      margin-bottom: 10px;
      color: #535a63;
      border: 1px solid #ddd;
      background-color: transparent;
    }
    .message-btn {
      font-size: 30px;
      display: block;
      text-align: center;
      width: 60%;
      margin-top: 30px;
      padding: 20px 25px;
      text-transform: none;
      color: #535a63;
      // border: 1px solid #ccc;
    }
  }
  .mes-text {
    height: 100px;
    line-height: 100px;
    font-size: 35px;
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



