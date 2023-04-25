<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-04 13:37:56
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-24 10:46:26
 * @FilePath: \AIplatform\ai-platform\src\views\competition\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h1>这里是AI大赛</h1>
    <div>
      <a-input
        v-model="inputNameValue"
        placeholder="输入姓名"
        allow-clear
      ></a-input>
      <a-input-number
        v-model="inputAgeValue"
        placeholder="输入年龄"
        allow-clear
      ></a-input-number>
      <h1>{{ data }}</h1>
      <a-button type="primary" @click="findTalent">查找</a-button>
      <a-button type="primary" @click="createTalent">添加</a-button>
      <a-button type="primary" @click="deleteTalent">删除</a-button>
      <a-button type="primary" @click="updateTalent">更改</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { find, create, del, update } from '@/api/user';
import { reactive, ref } from 'vue';

const talent = reactive({
  name: '',
  age: 10,
});

const data = ref();

const inputNameValue = ref('');
const inputAgeValue = ref();

const findTalent = () => {
  find({ name: inputNameValue.value })
    .then((res) => {
      data.value = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const createTalent = () => {
  create({ name: inputNameValue.value, age: inputAgeValue.value })
    .then((res) => {
      data.value = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTalent = () => {
  /* eslint no-underscore-dangle: 0 */
  del({ _id: data.value._id })
    .then((res) => {
      data.value = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateTalent = () => {
  update({
    _id: data.value._id,
    name: inputNameValue.value,
    age: inputAgeValue.value,
  })
    .then((res) => {
      console.log(res.data);
      
      data.value = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>