<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-01 14:15:06
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-25 16:14:18
 * @FilePath: \项目\AIplatform\ai-platform\src\views\algorithm\aldetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <div>
      <a-page-header title="算法详情" @back="goback">
        <template #subtitle>
          <a-space>
            <span>{{ detail.value.algorithmname }}</span>
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
                    detail.value.algorithmname +
                    '.jpg'
                  "
                  class="algorithmDetail-img"
                />
              </div>
            </template>
            <div>
              <div class="algorithmDetail-titleinfo">
                <h1>{{ detail.value.algorithmname }}</h1>
                <p>简介：{{ detail.value.information }}</p>
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
                        v-if="detail.value.scene != undefined"
                        :style="{
                          color: '#1890ff',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }"
                        @click="gotoScenedetail(detail.value.scene.name)"
                      >
                        {{ detail.value.scene.name }}</a
                      >
                      <span v-if="detail.value.scene === undefined">
                        未填写
                      </span>
                    </a-card>
                  </a-col>
                  <a-col :span="6">
                    <a-card
                      title="所属部门"
                      :style="{ width: '100%', height: '100px' }"
                      :header-style="{ backgroundColor: '#F2F3F5' }"
                    >
                      {{ detail.value.department }}
                    </a-card>
                  </a-col>
                  <a-col :span="6">
                    <a-card
                      title="算法标签"
                      :style="{ width: '100%', height: '100px' }"
                      :header-style="{ backgroundColor: '#F2F3F5' }"
                    >
                      <a-tag
                        v-for="(item, index) in detail.value.tags"
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
                      <a-tag
                        :color="
                          detail.value.status === '已完成' ? 'green' : 'red'
                        "
                      >
                        {{ detail.value.status }}
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
                      {{ detail.value.description }}
                    </a-card>
                  </a-col>
                </a-row>
              </div>
            </a-tab-pane>

            <!-- 管理信息 -->
            <a-tab-pane key="2" title="管理">
              <a-form :model="newAlgorithm.value">
                <a-form-item field="algorithmname" label="算法名字">
                  <a-input
                    v-model="newAlgorithm.value.algorithmname"
                    :placeholder="newAlgorithm.value.algorithmname"
                  />
                </a-form-item>

                <a-form-item field="department" label="所属部门">
                  <a-input
                    v-model="newAlgorithm.value.department"
                    placeholder="请输入"
                  />
                </a-form-item>

                <a-form-item field="status" label="状态">
                  <a-select
                    v-model="newAlgorithm.value.status"
                    placeholder="请选择"
                  >
                    <a-option value="未上传">未上传</a-option>
                    <a-option value="已完成">已完成</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="tags" label="算法标签">
                  <a-select
                    v-model="newAlgorithm.value.tags"
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
                    v-model="newAlgorithm.value.scene.name"
                    placeholder="请选择"
                  >
                    <a-option v-for="(item, index) in allscene" :key="index">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="class" label="算法类型">
                  <a-input
                    v-model="newAlgorithm.value.class"
                    placeholder="请输入"
                  />
                </a-form-item>

                <a-form-item field="description" label="描述">
                  <a-textarea
                    v-model="newAlgorithm.value.description"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-form>
              <div style="text-align: center; margin-top: 30px">
                <a-button type="primary" @click="AlgorithmChange()">
                  确认修改
                </a-button>
                <a-popconfirm content="确认删除该算法？" @ok="del">
                  <a-button
                    style="margin-left: 10px"
                    size="large"
                    status="danger"
                  >
                    删除该算法
                    <template #icon>
                      <icon-delete />
                    </template>
                  </a-button>
                </a-popconfirm>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showAllScene } from '@/api/scene';
import {
  delAlgorithm,
  updateAlgorithm,
  getAlgorithmDetail,
} from '@/api/algorithm';
import { Message } from '@arco-design/web-vue';

const router = useRouter();
const route = useRoute();

const detail = reactive({
  value: {
    algorithmname: '',
    class: '',
    department: '',
    information: '',
    description: '',
    scene: {
      name: '',
    },
    status: '',
    tags: [],
  },
});

const newAlgorithm = reactive({
  value: {
    algorithmname: '',
    class: '',
    department: '',
    information: '',
    description: '',
    scene: {
      name: '',
    },
    status: '',
    tags: [],
  },
});

const allscene = ref([
  {
    _id: '',
    department: '',
    description: '',
    name: '',
    status: '',
    tags: [],
    techtag: [],
    relPerson: '',
  },
]);

const showDetail = () => {
  getAlgorithmDetail({ _id: route.query.id })
    .then((res) => {
      detail.value = JSON.parse(JSON.stringify(res.data));
      console.log(detail.value);
      newAlgorithm.value = { ...detail.value };
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllScene = () => {
  showAllScene()
    .then((res) => {
      allscene.value = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  showDetail();
  getAllScene();
});

const tab = ref(1);
const TabChange = () => {
  tab.value = -tab.value;
};

const gotoScenedetail = (name: string) => {
  /* eslint no-underscore-dangle: 0 */
  const sceneId = ref('');
  allscene.value.forEach((item) => {
    if (item.name === name) {
      sceneId.value = item._id;
    }
  });
  console.log(sceneId.value);

  router.push({
    path: `/aispace/sceneDetail/${sceneId.value}`,
    query: { id: sceneId.value },
  });
};

const AlgorithmChange = () => {
  updateAlgorithm({
    _id: route.query.id,
    ...newAlgorithm.value,
  })
    .then((res) => {
      console.log(res.data);

      detail.value = newAlgorithm.value;
      Message.success('修改成功');
    })
    .catch((err) => {
      Message.success(err);
      console.log(err);
    });
};

const del = () => {
  /* eslint no-underscore-dangle: 0 */
  delAlgorithm({ _id: route.query.id })
    .then((res) => {
      Message.success('删除成功');
      router.go(-1);
      console.log(res.data);
    })
    .catch((err) => {
      Message.error(err);
      console.log(err);
    });
};

const goback = () => {
  router.go(-1);
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