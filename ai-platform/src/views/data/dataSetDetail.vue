<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-01 14:15:06
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-02 20:17:05
 * @FilePath: \项目\AIplatform\ai-platform\src\views\algorithm\aldetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <div>
      <a-page-header title="数据集详情" @back="goback">
        <template #subtitle>
          <a-space>
            <span>{{ detail.dataname }}</span>
          </a-space>
        </template>
      </a-page-header>
    </div>
    <div class="mainbox">
      <a-card :style="{ width: '100%' }" :bordered="false">
        <a-card
          hoverable
          :style="{ width: '100%', marginBottom: '20px' }"
          :body-style="{ height: '200px' }"
        >
          <div class="datasetdetail-imgbox">
            <img
              :src="
                'http://127.0.0.1:5173/src/assets/images/dataset/' +
                detail.dataname +
                '.jpg'
              "
              class="datasetdetail-img"
            />
          </div>
        </a-card>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="数据">
            <a-row class="grid-demo" :gutter="24">
              <a-col :span="18">
                <a-descriptions size="large" layout="vertical" bordered>
                  <a-descriptions-item label="所属场景">
                    <a
                      style="color: #1890ff; font-size: 16px; font-weight: bold"
                      >{{ detail.scene.name }}</a
                    >
                  </a-descriptions-item>
                  <a-descriptions-item label="所属部门">
                    <span> {{ detail.department }} </span>
                  </a-descriptions-item>
                  <a-descriptions-item label="数据集标签">
                    <a-tag
                      color="blue"
                      v-for="tag in detail.tags"
                      :key="tag"
                      style="margin-right: 5px"
                    >
                      {{ tag.toUpperCase() }}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="介绍">
                    <p style="margin-bottom: 0">
                      {{ detail.introduction ? detail.introduction : '暂无' }}
                    </p>
                  </a-descriptions-item>
                </a-descriptions>
              </a-col>
              <a-col :span="6">
                <a-descriptions
                  size="large"
                  layout="vertical"
                  bordered
                  class="data-description"
                >
                  <a-descriptions-item label="状态" :span="3">
                    <a-tag size="large" color="green">{{
                      detail.status
                    }}</a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="数据">
                    <span v-if="detail.data && detail.data.length > 0">
                      <span
                        v-for="file in detail.data"
                        :key="file._id"
                        style="display: flex"
                      >
                        <p class="download-version">{{ file.version }}版本 </p>
                        <a
                          class="downloadlink"
                          :href="
                            'http://10.1.1.135:7001/public' +
                            '/aiplat/dataset/' +
                            file.link
                          "
                        >
                          下载
                        </a>
                      </span>
                    </span>
                    <p v-else>暂未上传数据集</p>
                  </a-descriptions-item>
                </a-descriptions>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" title="任务"></a-tab-pane>
          <a-tab-pane key="3" title="讨论"></a-tab-pane>
          <a-tab-pane key="4" title="管理">
            <a-card>
              <a-row :gutter="12">
                <a-col :span="6">
                  <a-row>
                    <a-col :span="20" :offset="1">
                      <a-upload
                        action="/"
                        :fileList="file ? [file] : []"
                        :show-file-list="false"
                        @change="handleChange"
                        @progress="onProgress"
                      >
                        <template #upload-button>
                          <div
                            :class="`arco-upload-list-item${
                              file && file.status === 'error'
                                ? ' arco-upload-list-item-error'
                                : ''
                            }`"
                          >
                            <div
                              class="arco-upload-list-picture custom-upload-avatar"
                              v-if="file && file.url"
                              style="
                                background-color: var(--color-fill-2);
                                color: var(--color-text-1);
                                border: 1px dashed var(--color-fill-4);
                                height: 100px;
                                width: 185px;
                                border-radius: 2;
                                line-height: 158px;
                                text-align: center;
                              "
                            >
                              <img :src="file.url" />
                              <div class="arco-upload-list-picture-mask">
                                <IconEdit />
                              </div>
                              <a-progress
                                v-if="
                                  file.status === 'uploading' &&
                                  file.percent < 100
                                "
                                :percent="file.percent"
                                type="circle"
                                size="mini"
                                :style="{
                                  position: 'absolute',
                                  left: '50%',
                                  top: '50%',
                                  transform:
                                    'translateX(-50%) translateY(-50%)',
                                }"
                              />
                            </div>
                            <div
                              class="arco-upload-picture-card"
                              style="background-color: var(--color-fill-2);
                                color: var(--color-text-1);
                                border: 1px dashed var(--color-fill-4);
                                height: 100px;
                                width: 185px;
                                border-radius: 2;
                                line-height: 158px;
                                text-align: center;"
                              v-else
                            >
                              <div class="arco-upload-picture-card-text">
                                <IconPlus />
                              </div>
                            </div>
                          </div>
                        </template>
                      </a-upload>
                      <a-button
                        style="width: 100%"
                        @click="handleClick"
                        class="upbtn"
                        type="primary"
                      >
                        <icon-upload />
                        上传数据集
                      </a-button>
                      <a-drawer
                        :visible="visible"
                        @ok="handleOk"
                        @cancel="handleCancel"
                        unmountOnClose
                        width="400px"
                      >
                        <template #title> 上传数据 </template>
                        <div>
                          <a-form :model="smallform" size="large">
                            <a-form-item
                              field="version"
                              label="版本号"
                              validate-trigger="input"
                              required
                            >
                              <a-input
                                v-model="smallform.version"
                                placeholder="请输入"
                              />
                            </a-form-item>
                            <a-form-item
                              field="file"
                              label="文件名"
                              validate-trigger="input"
                              required
                            >
                              <a-space
                                direction="vertical"
                                :style="{ width: '100%' }"
                              >
                                <a-upload action="/" />
                              </a-space>
                            </a-form-item>
                          </a-form>
                        </div>
                      </a-drawer>
                      <br />
                      <span v-if="detail.data && detail.data.length > 0">
                        <span
                          v-for="file in detail.data"
                          :key="file._id"
                          style="display: flex"
                        >
                          <p class="download-version"
                            >{{ file.version }}版本
                          </p>
                          <a
                            class="downloadlink"
                            :href="
                              'http://10.1.1.135:7001/public' +
                              '/aiplat/dataset/' +
                              file.link
                            "
                          >
                            下载
                          </a>
                        </span>
                      </span>
                      <p v-else>暂未上传数据集</p>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="18">
                  <a-form style="padding: 0 12px" :model="newDataSet">
                    <a-form-item
                      field="dataname"
                      label="数据集名字"
                      validate-trigger="input"
                      required
                    >
                      <a-input v-model="newDataSet.dataname" />
                    </a-form-item>
                    <a-form-item
                      field="department"
                      label="所属部门"
                      validate-trigger="input"
                      required
                    >
                      <a-input
                        v-model="newDataSet.department"
                        placeholder="请输入"
                      />
                    </a-form-item>
                    <a-form-item
                      label="状态"
                      field="status"
                      validate-trigger="input"
                      required
                    >
                      <a-select v-model="newDataSet.status" placeholder="请选择">
                        <a-option>未上传</a-option>
                        <a-option>标记中</a-option>
                        <a-option>已完成</a-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item
                      label="标签"
                      field="tags"
                      validate-trigger="input"
                      required
                    >
                      <a-select
                        v-model="newDataSet.tags"
                        placeholder="请选择"
                        multiple
                      >
                        <a-option>质量</a-option>
                        <a-option>安全</a-option>
                        <a-option>装配</a-option>
                        <a-option>试飞</a-option>
                        <a-option>供应链</a-option>
                        <a-option>信息化</a-option>
                        <a-option>零件</a-option>
                        <a-option>创新</a-option>
                        <a-option>党群</a-option>
                        <a-option>其他</a-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item
                      label="所属场景"
                      field="scene"
                      validate-trigger="input"
                      required
                    >
                      <a-select v-model="newDataSet.scene" placeholder="请选择">
                        <a-option>OCR识别</a-option>
                        <a-option>优秀项目</a-option>
                        <a-option>场景测试</a-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item
                      field="description"
                      label="简介"
                      validate-trigger="input"
                      required
                    >
                      <a-textarea v-model="newDataSet.description" :rows="3" />
                    </a-form-item>
                    <a-form-item field="introduction" label="介绍">
                      <a-textarea v-model="newDataSet.introduction" :rows="3" />
                    </a-form-item>
                  </a-form>
                  <a-button
                    type="primary"
                    style="float: right"
                    @click="handleInfoChange(detail.dataid)"
                  >
                    确认修改
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
          </a-tab-pane>
        </a-tabs>
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

const newDataSet = reactive({
  dataname: detail.dataname,
  department: detail.department,
  status: detail.status,
  tags: detail.tags,
  scene: detail.scene,
  class: detail.class,
  description: detail.description,
  introduction: detail.introduction,
})

const file = ref();
const tab = ref(1);
const visible = ref(false);
const smallform = reactive({
  version: '',
});
const goback = () => {
  router.go(-1);
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

const onProgress = (currentFile: any) => {
  file.value = currentFile;
};

const handleInfoChange = (id: string) => {
  console.log(id);
};

const handleChange = (f: any) => {
  console.log(f);
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

.datasetdetail-img {
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
.datasetdetail-imgbox:before {
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
.upbtn {
  margin: 20px 0;
}
.downloadlink {
  margin-left: 80px;
  margin-top: 13px;
}
#dataset_detail {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 50px);
}
</style>