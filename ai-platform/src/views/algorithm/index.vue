<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-26 16:41:45
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-25 19:41:47
 * @FilePath: \项目\AIplatform\ai-platform\src\views\aispace\algorithm\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="container">
    <Breadcrumb :items="['menu.algorithm.showAl']" />
    <div class="mainbox">
      <div class="algorithm-banner">
        <div class="header">
          <div class="algorithm-info">
            <span class="algorithm-title">算法展示 </span>
            <span class="algorithm-introduction">
              在这里探索、分析和分享AI算法。
            </span>
          </div>
          <a-button
            class="algorithm-addbuton"
            @click="handleClick"
            type="primary"
          >
            <icon-plus />
            <span class="algorithm-plusword">新建算法</span>
          </a-button>
          <a-drawer :visible="visible" unmountOnClose width="600px">
            <template #title>
              <span style="margin-left: 40px">新建算法</span>
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
              <a-form :model="newAlgorithm" @submit-success="handleOk">
                <a-form-item field="algorithmname" label="算法名字" required>
                  <a-input
                    v-model="newAlgorithm.algorithmname"
                    placeholder="请输入"
                  />
                </a-form-item>

                <a-form-item field="department" label="所属部门" required>
                  <a-select
                    v-model="newAlgorithm.department"
                    placeholder="请选择"
                  >
                    <a-option value="信息化部">信息化部</a-option>
                    <a-option value="安全部">安全部</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="status" label="状态" required>
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

                <a-form-item field="algorithm" label="所属场景">
                  <a-select
                    v-model="newAlgorithm.scene.name"
                    placeholder="请选择"
                  >
                    <a-option v-for="(item, index) in allscene" :key="index">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="class" label="算法类型" required>
                  <a-select v-model="newAlgorithm.class" placeholder="请选择">
                    <a-option value="计算机视觉">计算机视觉</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="information" label="简介" required>
                  <a-textarea
                    v-model="newAlgorithm.information"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>

                <a-form-item field="description" label="详细描述" required>
                  <a-textarea
                    v-model="newAlgorithm.description"
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
        </div>
        <div style="text-align: center">
          <a-space
            direction="vertical"
            class="input"
            style="margin-top: 20px; width: 80%"
          >
            <a-input-search
              v-model="search"
              placeholder="搜索算法"
              size="large"
              allow-clear="true"
              search-button
              @input="searchAlgorithm"
            >
            </a-input-search>
          </a-space>
        </div>
      </div>
      <div class="content">
        <div class="algorithm-show">
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
                  class="algorithm-card"
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
                          'http://127.0.0.1:5173/src/assets/images/algorithm/' +
                          item.algorithmname +
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
                      :title="item.algorithmname"
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
import {
  showAllAlgorithm,
  createAlgorithm,
  findAlgorithm,
} from '@/api/algorithm';

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

const newAlgorithm = reactive({
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
});

const search = ref('');
const visible = ref(false);

const showAll = () => {
  showAllAlgorithm()
    .then((res) => {
      data.value = JSON.parse(JSON.stringify(res.data));
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
  newAlgorithm.department = '';
  newAlgorithm.class = '';
  newAlgorithm.scene = {
    name: '',
  };
  newAlgorithm.information = '';
  newAlgorithm.description = '';
  newAlgorithm.algorithmname = '';
  newAlgorithm.status = '';
  newAlgorithm.tags = [];
};

const handleClick = () => {
  visible.value = true;
};

const handleOk = () => {
  createAlgorithm(newAlgorithm)
    .then((res) => {
      console.log(res);
      showAll();
      visible.value = false;
      clearForm();
      Message.success('创建算法成功');
    })
    .catch((err) => {
      Message.error(err);
      console.log(err);
    });
};

const handleCancel = () => {
  visible.value = false;
};

const searchAlgorithm = () => {
  if (search.value !== '') {
    findAlgorithm({ algorithmname: search.value })
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
    path: `/algorithm/aldetail/${_id}`,
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
  background-image: url('@/assets/images/background/backAl.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}

.algorithm-banner {
  box-sizing: border-box;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  text-align: center;
  padding-top: 30px;
}
.algorithm-info {
  float: left;
  margin-left: 15%;
}

.algorithm-title {
  color: rgb(32, 33, 36);
  font-size: 40px;
  line-height: 44px;
  font-weight: bold;
  font-family: zeitung, sans-serif;
}
.algorithm-introduction {
  color: rgb(32, 33, 36);
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  max-width: 485px;
  margin-top: 12px;
}
.algorithm-addbuton {
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
.algorithm-plus {
  color: rgb(255, 255, 255);
  font-size: 20px;
  user-select: none;
}
.algorithm-plusword {
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
.algorithm-show {
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

.algorithm-card {
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