<template>
  <div class="container">
    <Breadcrumb :items="['menu.data.dataset']" />
    <div class="mainbox">
      <div class="dataset-banner">
        <div class="header">
          <div class="dataset-info">
            <span class="dataset-title">数据集 </span>
            <span class="dataset-introduction">
              在这里探索、分析和分享优质数据。
            </span>
          </div>
          <a-button
            class="dataset-addbuton"
            @click="handleClick"
            type="primary"
          >
            <icon-plus />
            <span class="dataset-plusword">新建数据集</span>
          </a-button>
          <a-drawer :visible="visible" unmountOnClose width="600px">
            <template #title>
              <span style="margin-left: 40px">新建数据集</span>
              <span style="margin-left: 30px"
                ><a-button @click="clearForm" type="primary"
                  >清空</a-button
                ></span
              >
            </template>
            <template #footer>
              <a-button @click="handleCancel">取消</a-button>
            </template>
            <div>
              <a-form :model="newDataSet" @submit-success="handleOk">
                <a-form-item field="dataname" label="数据集名字" required>
                  <a-input v-model="newDataSet.dataname" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="department" label="所属部门" required>
                  <a-select
                    v-model="newDataSet.department"
                    placeholder="请选择"
                  >
                    <a-option value="信息化部">信息化部</a-option>
                    <a-option value="安全部">安全部</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="status" label="状态" required>
                  <a-select v-model="newDataSet.status" placeholder="请选择">
                    <a-option value="未上传">未上传</a-option>
                    <a-option value="标记中">标记中</a-option>
                    <a-option value="已完成">已完成</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="tags" label="数据集标签">
                  <a-select
                    v-model="newDataSet.tags"
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

                <a-form-item field="scene" label="所属场景" required>
                  <a-select
                    v-model="newDataSet.scene.name"
                    placeholder="请选择"
                  >
                    <a-option v-for="(item, index) in allscene" :key="index">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="class" label="所属类型">
                  <a-select v-model="newDataSet.class" placeholder="请选择">
                    <a-option value="计算机视觉">计算机视觉</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="introduction" label="简介" required>
                  <a-textarea
                    v-model="newDataSet.introduction"
                    placeholder="请输入"
                    :allowClear="true"
                  />
                </a-form-item>

                <a-form-item field="description" label="详情" required>
                  <a-textarea
                    v-model="newDataSet.description"
                    placeholder="请输入"
                    :allowClear="true"
                  />
                </a-form-item>
                <a-form-item field="certification" label="相关材料">
                  <a-space direction="vertical" :style="{ width: '100%' }">
                    <a-upload action="/" @before-upload="beforeUpload" />
                  </a-space>
                </a-form-item>

                <a-form-item>
                  <a-button
                    style="margin-left: 140px; margin-top: 20px"
                    html-type="submit"
                    type="primary"
                  >
                    提交
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </a-drawer>
        </div>
        <div style="text-align: center">
          <a-space
            direction="vertical"
            class="input"
            style="margin-top: 20px; width: 80%"
          >
            <a-input-search
              v-model="search"
              placeholder="搜索数据集"
              size="large"
              allow-clear="true"
              search-button
              @input="searchall"
            >
            </a-input-search>
          </a-space>
        </div>
      </div>
      <div class="content">
        <div class="dataset-show">
          <a-list
            :grid-props="{ gutter: 1, span: 8 }"
            :data="data"
            :bordered="false"
            style="margin-top: 24px"
          >
            <template #item="{ item, index }">
              <a-list-item :key="index">
                <a-card
                  hoverable
                  class="dataset-card"
                  @click="gotoDetail(item._id)"
                >
                  <template #actions>
                    <span class="icon-hover"> <IconThumbUp /> </span>
                    <span class="icon-hover"> <IconShareInternal /> </span>
                    <span class="icon-hover"> <IconMore /> </span>
                  </template>
                  <template #cover>
                    <div
                      :style="{
                        height: '200px',
                        overflow: 'hidden',
                      }"
                    >
                      <img
                        :style="{
                          width: '100%',
                          height: '100%',
                          transform: 'translateY(-20px)',
                        }"
                        alt="dessert"
                        :src="
                          'http://127.0.0.1:5173/src/assets/images/dataset/' +
                          item.dataname +
                          '.jpg'
                        "
                      />
                    </div>
                  </template>
                  <div
                    :style="{
                      height: '100px',
                      overflow: 'hidden',
                    }"
                  >
                    <a-card-meta
                      :title="item.dataname"
                      :description="item.tags.length > 0 ? item.tags : '无'"
                    >
                      <template #avatar>
                        <div
                          :style="{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#1D2129',
                          }"
                        >
                          <a-avatar :size="24" :style="{ marginRight: '8px' }">
                            C
                          </a-avatar>
                          <a-typography-text>{{
                            item.class
                          }}</a-typography-text>
                        </div>
                      </template>
                    </a-card-meta>
                  </div>
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
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Message, Modal } from '@arco-design/web-vue';
import { showAllScene } from '@/api/scene';
import { showAllDataset, createDataset, findDataset } from '@/api/dataset';

const router = useRouter();

const data = ref([]);
const allscene = ref([
  {
    department: '',
    description: '',
    name: '',
    status: '',
    tags: [],
    techtag: [],
    relPerson: '',
  },
]);

const newDataSet = reactive({
  dataname: '',
  department: '',
  status: '',
  tags: [],
  scene: {
    name: '',
  },
  class: '',
  description: '',
  introduction: '',
});

const search = ref('');
const visible = ref(false);

const showAll = () => {
  showAllDataset()
    .then((res) => {
      data.value = JSON.parse(JSON.stringify(res.data));
      console.log(data.value);
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
  showAll();
  getAllScene();
});

const clearForm = () => {
  newDataSet.department = '';
  newDataSet.class = '';
  newDataSet.scene = {
    name: '',
  };
  newDataSet.description = '';
  newDataSet.dataname = '';
  newDataSet.status = '';
  newDataSet.tags = [];
  newDataSet.introduction = '';
};

const handleClick = () => {
  visible.value = true;
};

const handleOk = () => {
  createDataset(newDataSet)
    .then((res) => {
      console.log(res);
      showAll();
      visible.value = false;
      clearForm();
      Message.success('创建数据集成功');
    })
    .catch((err) => {
      Message.error(err);
      console.log(err);
    });
};

const handleCancel = () => {
  visible.value = false;
};

const searchall = () => {
  if (search.value !== '') {
    findDataset({ dataname: search.value })
      .then((res) => {
        data.value = JSON.parse(JSON.stringify(res.data));
      })
      .catch((err: any) => {
        Message.error(err);
        console.log(err);
      });
  } else {
    showAll();
  }
};

const gotoDetail = (_id: string) => {
  router.push({
    path: `/data/dataSetDetail/${_id}`,
    query: { id: _id },
  });
};

const beforeUpload = (file: { name: any }) => {
  return new Promise<boolean>((resolve, reject) => {
    Modal.confirm({
      title: '上传确认',
      content: `确认上传 ${file.name}`,
      onOk: () => resolve(true),
      onCancel: () => reject(new Error('cancel')),
    });
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
    height: 100%;
    border-radius: 4px;
  }
}

.mainbox {
  background-image: url('@/assets/images/background/backdatasetpro.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}

.dataset-banner {
  box-sizing: border-box;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  text-align: center;
  padding-top: 30px;
}
.dataset-info {
  float: left;
  margin-left: 15%;
}

.dataset-title {
  color: rgb(32, 33, 36);
  font-size: 40px;
  line-height: 44px;
  font-weight: bold;
  font-family: zeitung, sans-serif;
}
.dataset-introduction {
  color: rgb(32, 33, 36);
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  max-width: 485px;
  margin-top: 12px;
}
.dataset-addbuton {
  -webkit-box-align: center;
  align-items: center;
  background-color: #004899;
  color: white;
  border-radius: 20px;
  border: none;
  float: right;
  cursor: pointer;
  display: inline-flex;
  height: 36px;
  padding: 0px 24px 0px 16px;
  margin-top: 10px;
  margin-right: 15%;
  transition: all 0.3s ease 0s;
  white-space: nowrap;
  width: fit-content;
}
.dataset-plus {
  color: rgb(255, 255, 255);
  font-size: 20px;
  user-select: none;
}
.dataset-plusword {
  color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-left: 10px;
}

.content {
  text-align: center;
  width: 100%;
  margin-top: 20px;
}
.dataset-show {
  width: 80%;
  margin: 0 auto;
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

.dataset-card {
  border-radius: 16px;
  border: 1px solid rgb(218, 220, 224);
  min-width: 200px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  height: 320px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
</style>