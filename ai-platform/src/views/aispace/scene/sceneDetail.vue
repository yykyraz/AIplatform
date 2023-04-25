<template>
  <div class="container">
    <div>
      <a-page-header title="场景详情" @back="goback">
        <template #subtitle>
          <a-space>
            <span>{{ detail.value.name }}</span>
            <span style="margin-left: 30px">
              <a-button type="primary" size="large" @click="handleClick"
                >修改信息</a-button
              >
              <a-drawer :visible="visible" unmountOnClose width="600px">
                <template #title>
                  <span style="margin-left: 40px">新建场景</span>
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
                  <a-form :model="newDetail.value" @submit-success="handleOk">
                    <a-form-item field="name" label="场景名称" required>
                      <a-input
                        v-model="newDetail.value.name"
                        placeholder="请输入"
                      />
                    </a-form-item>

                    <a-form-item field="department" label="所属部门" required>
                      <a-select
                        v-model="newDetail.value.department"
                        placeholder="请选择"
                      >
                        <a-option value="信息化部">信息化部</a-option>
                        <a-option value="安全部">安全部</a-option>
                      </a-select>
                    </a-form-item>

                    <a-form-item field="relPerson" label="负责人员工号">
                      <a-input
                        v-model="newDetail.value.relPerson"
                        placeholder="请输入"
                      />
                    </a-form-item>

                    <a-form-item field="status" label="状态" required>
                      <a-select
                        v-model="newDetail.value.status"
                        placeholder="请选择"
                      >
                        <a-option value="未上传">未上传</a-option>
                        <a-option value="标记中">标记中</a-option>
                        <a-option value="已完成">已完成</a-option>
                      </a-select>
                    </a-form-item>

                    <a-form-item field="techtag" label="所属技术">
                      <a-select
                        v-model="newDetail.value.techtag"
                        placeholder="请选择"
                        multiple
                      >
                        <a-option value="计算机视觉">计算机视觉</a-option>
                        <a-option value="自然语言处理">自然语言处理</a-option>
                        <a-option value="知识图谱">知识图谱</a-option>
                        <a-option value="异常检测">异常检测</a-option>
                        <a-option value="推荐算法">推荐算法</a-option>
                        <a-option value="预测算法">预测算法</a-option>
                        <a-option value="注意力机制">注意力机制</a-option>
                      </a-select>
                    </a-form-item>

                    <a-form-item field="tags" label="标签">
                      <a-select
                        v-model="newDetail.value.tags"
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

                    <a-form-item field="description" label="场景描述" required>
                      <a-textarea
                        v-model="newDetail.value.description"
                        placeholder="请输入"
                        allow-clear
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
              <a-popconfirm content="确认删除该场景？" @ok="del">
                <a-button
                  style="margin-left: 10px"
                  size="large"
                  status="danger"
                >
                  删除场景
                  <template #icon>
                    <icon-delete />
                  </template>
                </a-button>
              </a-popconfirm>
            </span>
          </a-space>
        </template>
      </a-page-header>
    </div>
    <div class="mainbox">
      <div class="avator">
        <div style="display: inline-block; width: 30%">
          <div>
            <img
              :style="{
                width: '60%',
              }"
              alt="dessert"
              :src="
                'http://127.0.0.1:5173/src/assets/images/scene/' +
                detail.value.name +
                '.jpg'
              "
            />
          </div>
        </div>
        <div style="display: inline-block; margin-left: 50px; width: 50%">
          <div
            :style="{
              boxSizing: 'border-box',
              width: '100%',
              backgroundColor: 'var(--color-fill-2)',
            }"
          >
            <a-row>
              <a-col :span="12">
                <a-card
                  title="所属部门"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.department }}
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card
                  title="名称"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.name }}
                </a-card>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-card
                  title="状态"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  <span v-if="detail.value.status === '未上传'">
                    <a-tag color="red">{{ detail.value.status }}</a-tag>
                  </span>
                  <span v-else-if="detail.value.status === '标记中'">
                    <a-tag color="#ffb400">{{ detail.value.status }}</a-tag>
                  </span>
                  <span v-else-if="detail.value.status === '已完成'">
                    <a-tag color="green">{{ detail.value.status }}</a-tag>
                  </span>
                  <span v-else>
                    <a-tag color="gray">暂无标签</a-tag>
                  </span>
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card
                  title="标签"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  <a-space size="small">
                    <a-tag
                      v-for="(tag, index) in detail.value.tags"
                      :key="index"
                      color="skyblue"
                    >
                      {{ tag }}
                    </a-tag>
                  </a-space>
                </a-card>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-card
                  title="相关技术"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  <a-space size="medium">
                    <a-tag
                      v-for="(tecTag, index) in detail.value.techtag"
                      :key="index"
                      color="#7816ff"
                    >
                      {{ tecTag }}
                    </a-tag>
                  </a-space>
                </a-card>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-card
                  title="具体描述"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.description }}
                </a-card>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { delScene, updateScene, getSceneDetail } from '@/api/scene';
import { onMounted, reactive, ref } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';

const router = useRouter();
const route = useRoute();

const detail = reactive({
  value: {
    department: '',
    description: '',
    name: '',
    status: '',
    tags: [],
    techtag: [],
    relPerson: '',
  },
});

const newDetail = reactive({
  value: {
    department: '',
    description: '',
    name: '',
    status: '',
    tags: [],
    techtag: [],
    relPerson: '',
  },
});

const visible = ref(false);

const showDetail = () => {
  getSceneDetail({ _id: route.query.id })
    .then((res) => {
      detail.value = JSON.parse(JSON.stringify(res.data));
      console.log(detail.value);

      newDetail.value = { ...detail.value };
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  showDetail();
});

const handleClick = () => {
  visible.value = true;
};

const clearForm = () => {
  newDetail.value = {
    ...{
      department: '',
      description: '',
      name: '',
      status: '',
      tags: [],
      techtag: [],
      relPerson: '',
    },
  };
};

const handleOk = () => {
  updateScene({
    _id: route.query.id,
    ...newDetail.value,
  })
    .then((res) => {
      detail.value = JSON.parse(JSON.stringify(res.data));
      Message.success('修改成功');
      visible.value = false;
    })
    .catch((err) => {
      Message.success(err);
      console.log(err);
    });
};

const handleCancel = () => {
  visible.value = false;
};

const del = () => {
  /* eslint no-underscore-dangle: 0 */
  delScene({ _id: route.query.id })
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

const goback = () => {
  router.go(-1);
};
</script>

<style scoped lang="less">
.container {
  padding: 20px 20px 20px 20px;
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

.mainbox {
  background-image: url('@/assets/images/background/backScene.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
.avator {
  width: 100%;
  padding-top: 30px;
}
</style>