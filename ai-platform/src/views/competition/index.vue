<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-04 13:37:56
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-23 13:22:33
 * @FilePath: \AIplatform\ai-platform\src\views\competition\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h1>这里是AI大赛</h1>
    <div>
      <a-input v-model="inputValue" allow-clear></a-input>
      <h1>{{ data }}</h1>
      <a-button type="primary" @click="findTalent">查找</a-button>
      <a-button type="primary">添加</a-button>
      <a-button type="primary">删除</a-button>
      <a-button type="primary">更改</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { find, create, del, update } from '@/api/talent';
import { reactive, ref } from 'vue';

const talent = reactive({
  name: '',
  age: 10,
});

const data = ref('');

const inputValue = ref('');

const findTalent = () => {
  console.log({ name: inputValue.value });
  find({ name: inputValue.value })
    .then((res) => {
      data.value = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>