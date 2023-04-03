<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-01 14:15:06
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-03 16:37:17
 * @FilePath: \项目\AIplatform\ai-platform\src\views\algorithm\aldetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <div>
      <a-page-header title="算法详情" @back="goback">
        <template #subtitle>
          <a-space>
            <span>{{ detail.algorithmname }}</span>
          </a-space>
        </template>
      </a-page-header>
    </div>
    <div class="mainbox">
      <a-card :style="{ margin: '0 25px' }">
        <div class="algorithmDetail-imgboxtop">
          <a-card
            :style="{ marginBottom: '20px' }"
            :header-style="{ height: '200px' }"
          >
            <template #title>
              <div class="algorithmDetail-imgbox">
                <img
                  :src="
                    'http://127.0.0.1:5173/src/assets/images/algorithm/' +
                    detail.algorithmname +
                    '.jpg'
                  "
                  class="algorithmDetail-img"
                />
              </div>
            </template>
            <div>
              <div class="algorithmDetail-titleinfo">
                <h1>{{ detail.algorithmname }}</h1>
                <p>简介：{{ detail.information }}</p>
              </div>
            </div>
          </a-card>
        </div>
        <div>
          <a-tabs v-model="tab" size="large" @tab-click="TabChange" type="text">
            <!-- 展示数据 -->
            <a-tab-pane key="1" title="数据">
              <div class="algorithmDetail-tabcontent">
                <a-row :style="{ marginBottom: '20px' }">
                  <a-col :span="6">
                    <a-card
                      title="所属场景"
                      :style="{ width: '100%', height: '100px' }"
                      :header-style="{ backgroundColor: '#F2F3F5' }"
                    >
                      <a
                        v-if="detail.scene != undefined"
                        :style="{
                          color: '#1890ff',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }"
                        @click="gotoScenedetail(detail.scene.sid)"
                      >
                        {{ detail.scene.name }}</a
                      >
                      <span v-if="detail.scene === undefined"> 未填写 </span>
                    </a-card>
                  </a-col>
                  <a-col :span="6">
                    <a-card
                      title="所属部门"
                      :style="{ width: '100%', height: '100px' }"
                      :header-style="{ backgroundColor: '#F2F3F5' }"
                    >
                      {{ detail.department }}
                    </a-card>
                  </a-col>
                  <a-col :span="6">
                    <a-card
                      title="算法标签"
                      :style="{ width: '100%', height: '100px' }"
                      :header-style="{ backgroundColor: '#F2F3F5' }"
                    >
                      <a-tag
                        v-for="(item, index) in detail.tags"
                        :key="index"
                        color="blue"
                      >
                        {{ item }}
                      </a-tag>
                    </a-card>
                  </a-col>
                  <a-col :span="6">
                    <a-card
                      title="状态"
                      :style="{ width: '100%', height: '100px' }"
                      :header-style="{ backgroundColor: '#F2F3F5' }"
                    >
                      <a-tag color="green">
                        {{ detail.status }}
                      </a-tag>
                    </a-card>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-card
                      title="介绍"
                      :style="{ width: '100%' }"
                      :header-style="{ backgroundColor: '#F2F3F5' }"
                    >
                      {{ detail.description }}
                    </a-card>
                  </a-col>
                </a-row>
              </div>
            </a-tab-pane>

            <!-- 管理信息 -->
            <a-tab-pane key="2" title="管理">
              <a-form :model="newAlgorithm">
                <a-form-item field="algorithmname" label="算法名字">
                  <a-input
                    v-model="newAlgorithm.algorithmname"
                    :placeholder="newAlgorithm.algorithmname"
                  />
                </a-form-item>

                <a-form-item field="department" label="所属部门">
                  <a-input
                    v-model="newAlgorithm.department"
                    placeholder="请输入"
                  />
                </a-form-item>

                <a-form-item field="status" label="状态">
                  <a-select v-model="newAlgorithm.status" placeholder="请选择">
                    <a-option value="未上传">未上传</a-option>
                    <a-option value="已完成">已上传</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="tags" label="算法标签">
                  <a-select
                    v-model="newAlgorithm.tags"
                    placeholder="请选择"
                    multiple
                  >
                    <a-option value="质量">质量</a-option>
                    <a-option value="安全">安全</a-option>
                    <a-option value="装配">装配</a-option>
                    <a-option value="试飞">试飞</a-option>
                    <a-option value="供应链">供应链</a-option>
                    <a-option value="信息化">信息化</a-option>
                    <a-option value="零件">零件</a-option>
                    <a-option value="创新">创新</a-option>
                    <a-option value="党群">党群</a-option>
                    <a-option value="其他">其他</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="scene" label="所属场景">
                  <a-select
                    v-model="newAlgorithm.scene.name"
                    placeholder="请选择"
                  >
                    <a-option v-for="(item, index) in allscene" :key="index">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="class" label="算法类型">
                  <a-input v-model="newAlgorithm.class" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="description" label="描述">
                  <a-textarea
                    v-model="newAlgorithm.description"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-form>
              <div style="text-align: center; margin-top: 30px">
                <a-button type="primary" @click="AlgorithmChange(detail.alid)">
                  确认修改
                </a-button>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const detail = JSON.parse(route.query.item as any);
console.log(detail);

const newAlgorithm = reactive({
  algorithmname: detail.algorithmname,
  department: detail.department,
  status: detail.status,
  tags: detail.tags,
  scene: detail.scene,
  class: detail.class,
  description: detail.description,
  informatiom: detail.informatiom,
});

const goback = () => {
  router.go(-1);
};

const tab = ref(1);
const TabChange = () => {
  tab.value = -tab.value;
};
const allscene = reactive([{ name: '区域超员智能视频监控' }]);

const gotoScenedetail = (id: string) => {
  console.log(id);
  const obj = JSON.stringify(detail.scene);
  router.push({
    path: `/aispace/sceneDetail/${id}`,
    query: { item: obj },
  });
};

const AlgorithmChange = (alid: string) => {
  console.log(alid);
  console.log(newAlgorithm);
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px 20px 20px 20px;
  height: calc(100% - 40px);
  :deep(.mainbox) {
    height: 100%;
    border-radius: 4px;
    padding: 10px;
  }
}

.algorithmDetail-imgbox:before {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 60%,
    rgba(0, 0, 0, 0.7)
  );
  border-radius: 4px 4px 0 0;
  bottom: 0;
  content: '';
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;
}
.algorithmDetail-img {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 200px;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  z-index: 0;
  border-radius: 4px 4px 0px 0px;
  text-align: center;
}
.algorithmDetail-titleinfo {
  margin-left: 30px;
}
.algorithmDetail-tabcontent {
  width: 100%;
  text-align: center;
}
</style>