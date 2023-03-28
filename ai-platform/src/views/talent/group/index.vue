<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-28 15:30:32
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-03-28 21:35:44
 * @FilePath: \项目\AIplatform\ai-platform\src\views\talent\group\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="container">
    <Breadcrumb :items="['menu.talent.group']" />
    <div class="mainbox">
      <div class="header">
        <span style="float: left; margin-left: 150px">
          <span style="font-size: 50px; font-weight: bold"> 人才库 </span>
          <span style="margin-left: 50px; font-size: 20px">
            探索您中意的创新人才
          </span>
        </span>
        <span style="float: right; margin-right: 150px; margin-top: 20px">
          <a-button type="primary" size="large" @click="handleClick"
            >自我引荐</a-button
          >
          <a-drawer
            :width="340"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            unmountOnClose
          >
            <template #title>
              <span> 信息填写表 </span>
              <a-button
                type="primary"
                style="margin-left: 100px"
                @click="clearForm"
                >清空</a-button
              >
            </template>
            <div>
              <a-form :model="talentInfo">
                <a-form-item field="name" label="姓名" required>
                  <a-input v-model="talentInfo.name" placeholder="请输入" />
                </a-form-item>
                <a-form-item field="gender" label="性别" required>
                  <a-select v-model="talentInfo.gender" placeholder="请输入">
                    <a-option value="男">男</a-option>
                    <a-option value="女">女</a-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </div>
          </a-drawer>
        </span>
      </div>
      <div class="content">
        <div>
          <a-space direction="vertical" class="input" style="margin-top: 20px">
            <a-input-search
              v-model="search"
              placeholder="搜索人才"
              size="large"
              allow-clear="true"
              search-button
              @input="searchall"
            >
            </a-input-search>
          </a-space>
        </div>
        <div>
          <a-list
            :grid-props="{ gutter: 1, span: 4 }"
            style="margin-top: 24px"
            :bordered="false"
            :data="talentData"
          >
            <template #item="{ item, index }">
              <a-list-item :key="index">
                <a-card hoverable style="cursor:pointer" @click="gotoDetail(item._id)">
                  <template #cover>
                    <div
                      :style="{
                        height: '124px',
                        overflow: 'hidden',
                      }"
                    >
                      <img
                        :style="{
                          width: '100%',
                          transform: 'translateY(-20px)',
                        }"
                        alt="dessert"
                        :src="
                          'http://127.0.0.1:5173/src/assets/images/' +
                          item.name +
                          '.jpg'
                        "
                      />
                    </div>
                  </template>
                  <a-card-meta>
                    <template #title>
                      <span style="text-align: center">{{ item.name }}</span>
                    </template>
                  </a-card-meta>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const talentData = reactive([
  { _id: '1', name: 'a', gender: '男' },
  { _id: '2', name: 'b', gender: '女' },
  { _id: '3', name: 'a', gender: '男' },
  { _id: '4', name: 'b', gender: '女' },
  { _id: '5', name: 'a', gender: '男' },
  { _id: '6', name: 'b', gender: '女' },
  { _id: '7', name: 'a', gender: '男' },
  { _id: '8', name: 'b', gender: '女' },
  { _id: '9', name: 'a', gender: '男' },
  { _id: '10', name: 'b', gender: '女' },
]);
const talentInfo = reactive({ name: '', gender: '' });
const search = ref('');
const visible = ref(false);

const clearForm = () => {
  talentInfo.name = '';
  talentInfo.gender = '';
};

const handleClick = () => {
  visible.value = true;
};

const handleOk = () => {
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

const searchall = () => {};

const gotoDetail = (_id: string) => {
  router.push({
    path: `/talent/detail/${_id}`,
    query: {
      msg: 'hello',
    },
  });
};
</script>
  
<script lang="ts">
export default {
  name: '403',
};
</script>
  
  <style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
  height: calc(100% - 40px);
  :deep(.mainbox) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    background-color: var(--color-bg-1);
    border-radius: 4px;
  }
}

.header {
  margin-top: 30px;
  width: 100%;
}

.content {
  width: 80%;
  margin-top: 20px;
}

.input {
  font-size: 20px;
  width: 100%;
  height: 38px;
  border: 1px solid blue;
  background-color: transparent;
  box-sizing: border-box;
  transition: border 0.3s ease 0s;
}
</style>