<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-26 16:41:45
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-25 15:41:50
 * @FilePath: \项目\AIplatform\ai-platform\src\views\aispace\scene\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="container">
    <Breadcrumb :items="['menu.aispace.scene']" />
    <div class="mainbox">
      <div class="scene-banner">
        <div class="header">
          <div class="scene-info">
            <span class="scene-title">AI场景库 </span>
            <span class="scene-introduction">
              在这里探索、分享和交流优质AI场景。
            </span>
          </div>
          <a-button class="scene-addbuton" @click="handleClick" type="primary">
            <icon-plus />
            <span class="scene-plusword">发起场景</span>
          </a-button>
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
              <a-form :model="newScene" @submit-success="handleOk">
                <a-form-item field="name" label="场景名称" required>
                  <a-input v-model="newScene.name" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="department" label="所属部门" required>
                  <a-select v-model="newScene.department" placeholder="请选择">
                    <a-option value="信息化部">信息化部</a-option>
                    <a-option value="安全部">安全部</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="relPerson" label="负责人员工号">
                  <a-input v-model="newScene.relPerson" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="status" label="状态" required>
                  <a-select v-model="newScene.status" placeholder="请选择">
                    <a-option value="未上传">未上传</a-option>
                    <a-option value="标记中">标记中</a-option>
                    <a-option value="已完成">已完成</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="techtag" label="所属技术">
                  <a-select
                    v-model="newScene.techtag"
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
                    v-model="newScene.tags"
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
                    v-model="newScene.description"
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
              placeholder="搜索场景名称"
              size="large"
              allow-clear="true"
              search-button
              @input="searchScene"
            >
            </a-input-search>
          </a-space>
        </div>
      </div>
      <div class="content">
        <div class="scene-show">
          <a-tabs v-model="tab" style="margin-top: 30px" @tab-click="TabChange">
            <a-tab-pane
              key="1"
              title="全部场景"
              :disabled="tab !== 1 && search !== '' ? true : false"
            />
            <a-tab-pane
              key="2"
              title="我的场景"
              :disabled="tab === 1 && search !== '' ? true : false"
            />
          </a-tabs>
          <a-list
            :grid-props="{ gutter: 1, span: 8 }"
            :data="tab === 1 ? data : mydata"
            :bordered="false"
            style="margin-top: 24px"
          >
            <template #item="{ item, index }">
              <a-list-item :key="index">
                <a-card
                  hoverable
                  class="scene-card"
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
                          'http://127.0.0.1:5173/src/assets/images/scene/' +
                          item.name +
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
                      :title="item.name"
                      :description="
                        item.techtag.length > 0 ? item.techtag : '无'
                      "
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
                            T
                          </a-avatar>
                          <a-typography-text>{{
                            item.tags[0]
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
import { showAllScene, createScene, findScene } from '@/api/scene';

const router = useRouter();

onMounted(() => {
  showAll();
  showMyScene();
});

const data = ref([]);
const mydata = ref([]);

const newScene = reactive({
  department: '',
  description: '',
  name: '',
  status: '',
  tags: [],
  techtag: [],
  relPerson: '',
});

const search = ref('');
const visible = ref(false);
const tab = ref(1);

const showAll = () => {
  showAllScene()
    .then((res) => {
      data.value = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const showMyScene = () => {
  findScene({ relPerson: '337845818' })
    .then((res) => {
      mydata.value = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const clearForm = () => {
  newScene.department = '';
  newScene.description = '';
  newScene.name = '';
  newScene.status = '';
  newScene.tags = [];
  newScene.techtag = [];
  newScene.relPerson = '';
};

const handleClick = () => {
  visible.value = true;
};

const handleOk = () => {
  if (
    data.value.every((item: {name: ''}) => {
      return item.name !== newScene.name;
    })
  ) {
    createScene(newScene)
      .then((res) => {
        showAll();
        showMyScene();
        visible.value = false;
        clearForm();
      })
      .catch((err) => {
        Message.error(err);
        console.log(err);
      });
  } else {
    Message.error('存在同名场景，请修改场景名称！');
  }
};

const handleCancel = () => {
  visible.value = false;
};

const searchScene = () => {
  if (search.value !== '') {
    if (tab.value === 1) {
      findScene({ name: search.value })
        .then((res) => {
          data.value = JSON.parse(JSON.stringify(res.data));
        })
        .catch((err: any) => {
          Message.error(err);
          console.log(err);
        });
    } else {
      findScene({ name: search.value, relPerson: '337845818' })
        .then((res) => {
          mydata.value = JSON.parse(JSON.stringify(res.data));
        })
        .catch((err: any) => {
          Message.error(err);
          console.log(err);
        });
    }
  } else {
    showAll();
    showMyScene();
  }
};

const TabChange = () => {
  tab.value = -tab.value;
};

const gotoDetail = (_id: string) => {
  router.push({
    path: `/aispace/sceneDetail/${_id}`,
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
  background-image: url('@/assets/images/background/backScene.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}

.scene-banner {
  box-sizing: border-box;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  text-align: center;
  padding-top: 30px;
}
.scene-info {
  float: left;
  margin-left: 15%;
}

.scene-title {
  color: rgb(32, 33, 36);
  font-size: 40px;
  line-height: 44px;
  font-weight: bold;
  font-family: zeitung, sans-serif;
}
.scene-introduction {
  color: rgb(32, 33, 36);
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  max-width: 485px;
  margin-top: 12px;
}
.scene-addbuton {
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
.scene-plus {
  color: rgb(255, 255, 255);
  font-size: 20px;
  user-select: none;
}
.scene-plusword {
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
.scene-show {
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

.scene-card {
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