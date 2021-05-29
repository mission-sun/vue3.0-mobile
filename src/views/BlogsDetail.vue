<template>
  <div>
    <div class="main-edit" id="main-edit">
      <div class="result-html full-height" v-html="blogHtml">
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
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
          } 
          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })
    const store = useStore();
    // const route = useRoute();
    const router = useRouter();
    const currentId = useRoute().query.id;
    console.log('currentId', useRoute().query.id);
    const content =  "### 实战演练：深度剖析跨域问题及解决方案\n\n\n### 绑定场景\n\n####  规则1： 默认绑定\n\n1. 全局环境中，this默认绑定到window\n```\nconsole.log(window === this);\n```\n2. 函数独立调用时，this默认绑定到window\n ```\nfunction foo() {\n   console.log( window === this)\n} \nfoo();\n```\n```\n//虽然test()函数被嵌套在obj.foo()函数中，但test()函数是独立调用，而不是方法调用。所以this默认绑定到window\n\nvar a = 0;\nvar obj = {\n    a : 2,\n    foo:function(){\n            function test(){\n                console.log(this.a);\n            }\n            test();\n    }\n}\nobj.foo(); //0\n```\n3. 立即执行函数，this默认绑定到window\n```\nvar obj = {\n fun: function() {\n   (function() { console.log('this', this)})()\n  }\n }\n```\n4. 闭包，this默认绑定到window\n```\nvar a = 0;\nfunction foo(){\n    function test(){ console.log(this.a); } \n    return test;\n};\n var  obj = { a : 2, foo:foo }\n obj.foo()(); \n \n类似地，test()函数是独立调用，而不是方法调用，所以this默认绑定到window\n\n```\n由于闭包的this默认绑定到window对象，但又常常需要访问嵌套函数的this，所以常常在嵌套函数中使用var that = this，然后在闭包中使用that替代this，使用作用域查找的方法来找到嵌套函数的this值\n```\nvar a = 0;\nfunction foo(){\n    var that = this;\n    function test(){\n        console.log(that.a);\n    }\n    return test;\n};\nvar obj = {\n    a : 2,\n    foo:foo\n}\nobj.foo()();//2\n```\n\n####  规则2： 隐式绑定\n\n　　一般地，被直接对象所包含的函数调用时，也称为方法调用，this隐式绑定到该直接对象, 典型的形式为 XXX.fun()\n　　\n　　\n```\nfunction foo(){\n console.log(this.a);\n};\nvar obj1 = {\n a:1,\n foo:foo,\n obj2: { a:2,  foo:foo }\n}\n //foo()函数的直接对象是obj1，this隐式绑定到obj1 obj1.foo();   //1\n\n //foo()函数的直接对象是obj2，this隐式绑定到obj2\nobj1.obj2.foo() ; //2\n\n需要注意的是：对象属性链中只有最后一层会影响到调用位置。\n\n```\n\n#####  隐式绑定-丢失-【函数别名】\n\n\n```\nvar a = 0;\nfunction foo(){\n    console.log(this.a);\n};\nvar obj = {\n    a : 2,\n    foo:foo\n}\n//把obj.foo赋予别名bar，造成了隐式丢失，因为只是把foo()函数赋给了bar，而bar与obj对象则毫无关系\nvar bar = obj.foo;  \n// 等价于var bar = function foo(){ console.log(this.a);}\nbar();//0\n```\n\n#####  隐式绑定-丢失-【定时器-独立函数】\n\n\n```\nvar person1 = {\n    name: 'YvetteLau',\n    sayHi: function(){\n        setTimeout(function(){\n            console.log('Hello,',this);\n        })\n    }\n}\n\nperson1.sayHi()  // window\n\n```\n\n#####  隐式绑定-丢失-其它情况\n\nhttps://www.cnblogs.com/xiaohuochai/p/5735901.html\n\n####  规则3： 显示绑定\n\n通过call()、apply()、bind()方法把对象绑定到this上，叫做显式绑定。对于被调用的函数来说，叫做间接调用\n\n\n```\nvar a = 0;\nfunction foo(){\n    console.log(this.a);\n}\nvar obj = {\n    a:2\n};\nfoo();//0\nfoo.call(obj);//2\n```\n普通的显式绑定无法解决隐式丢失问题\n\n```\nfunction sayHi(){\n    console.log('Hello,', this.name);\n}\nvar person = {\n    name: 'YvetteLau',\n    sayHi: sayHi\n}\nvar name = 'Wiliam';\nvar Hi = function(fn) {\n    fn();\n}\nHi.call(person, person.sayHi); \n\n输出的结果是 Hello, Wiliam. 原因很简单，Hi.call(person, person.sayHi)的确是将this绑定到Hi中的this了。但是在执行fn的时候，相当于直接调用了sayHi方法(记住: person.sayHi已经被赋值给fn了，隐式绑定也丢了)，没有指定this的值，对应的是默认绑定。\n```\n硬绑定是显式绑定的一个变种，使this不能再被修改\n\n\n```\nfunction sayHi(){\n    console.log('Hello,', this.name);\n}\nvar person = {\n    name: 'YvetteLau',\n    sayHi: sayHi\n}\nvar name = 'Wiliam';\nvar Hi = function(fn) {\n    fn.call(this); // 硬绑定\n}\nHi.call(person, person.sayHi);\n```\n\n【API】\n\n　　javascript中新增了许多内置函数，具有显式绑定的功能，如数组的5个迭代方法：map()、forEach()、filter()、some()、every()\n\n\n####  规则4： new 绑定\n\n　　如果函数或者方法调用之前带有关键字new，它就构成构造函数调用。对于this绑定来说，称为new绑定\n\n\n\n其它特殊情况等\n\n##### 箭头函数 操作符\n\n\n```\n它和普通函数有一些区别，箭头函数没有自己的this，==它的this继承于外层代码库中的this==\n\n\nvar obj = () => { console.log(this)}\nlet aa = { obj: obj}\naa.obj() // 外层的this, 就是window\n\n\nvar obj = {\n    hi: function(){\n        console.log(this);\n        return ()=>{\n            console.log(this);\n        }\n    }\n}\n\nlet newobj = new obj.hi(); // obj\nnewobj() // obj\n\n\n如果将箭头函数改成功能函数就会改成window 指引\n\n```\n\n\n参考文章：\nhttps://www.cnblogs.com/xiaohuochai/p/5735901.html\n\nhttps://github.com/YvetteLau/Blog/issues/6\n\n"

    onMounted(() => {
      store.dispatch('getBlogDetail', {_id: currentId});
    })
  
    const blogHtml = computed(() => {
      // return md.render(content);
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
.emoji {
  height: 1.2em;
}
.demo-options {
  margin-bottom: 30px;
}
.opt__strict .not-strict {
  opacity: 0.3;
}
.checkbox {
  margin-right: 10px;
}
.source {
  width: 100%;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 13px;
  padding: 2px;
}
.result-html {
  font-size: 0.3rem;
  padding: 2px 10px;
  overflow: auto;
  background-color: #fff;
  // border: 1px solid #ccc;
  border-radius: 4px;
}
.result-html img {
  max-width: 35%;
}
.result-src,
.result-debug {
  display: none;
}
.result-src-content,
.result-debug-content {
  white-space: pre;
}
.result-as-html .result-html {
  display: block;
}
.result-as-html .result-src,
.result-as-html .result-debug {
  display: none;
}
.result-as-src .result-src {
  display: block;
}
.result-as-src .result-html,
.result-as-src .result-debug {
  display: none;
}
.result-as-debug .result-debug {
  display: block;
}
.result-as-debug .result-html,
.result-as-debug .result-src {
  display: none;
}
.demo-control {
  position: absolute;
  right: 15px;
  top: -17px;
  border-radius: 6px 6px 0 0;
  font-size: 12px;
  background-color: #ddd;
}
.demo-control a {
  padding: 0 20px;
}
.demo-control a:first-child {
  padding-left: 30px;
}
.demo-control a:last-child {
  padding-right: 30px;
}
.hljs {
  padding: 9.5px;
}
.hljs code {
  white-space: pre;
}
.footnotes {
  -moz-column-count: 2;
  column-count: 2;
}
.footnotes-list {
  padding-left: 2em;
}
.warning {
  background-color: #ff8;
  padding: 20px;
  border-radius: 6px;
}
.gh-ribbon {
  display: block;
  position: absolute;
  right: -60px;
  top: 44px;
  transform: rotate(45deg);
  width: 230px;
  z-index: 10000;
  white-space: nowrap;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #686868;
  box-shadow: 0 0 2px rgba(102,102,102,0.4);
  padding: 1px 0;
}
.gh-ribbon a {
  text-decoration: none !important;
  border: 1px solid #ccc;
  color: #fff;
  display: block;
  font-size: 13px;
  font-weight: 700;
  outline: medium none;
  padding: 4px 50px 2px;
  text-align: center;
}
.form-inline .radio,
.form-inline .checkbox {
  display: inline-block;
  margin-bottom: 0;
  margin-top: 0;
}
.form-inline .form-group {
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
}
.form-inline .form-control {
  display: inline-block;
  vertical-align: middle;
  width: auto;
}

pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}

// ol {
//   margin-block-start: 0em;
//   margin-block-end: 1em;
//   margin-inline-start: 0px;
//   margin-inline-end: 0px;
//   padding-inline-start: 40px;
// }





</style>