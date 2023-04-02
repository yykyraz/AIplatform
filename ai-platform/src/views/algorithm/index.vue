<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-26 16:41:45
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-02 14:54:43
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
          <a-drawer
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            unmountOnClose
            width="600px"
          >
            <template #title>
              <span style="margin-left: 40px">新建算法</span>
              <span style="margin-left: 30px"
                ><a-button @click="clearForm" type="primary"
                  >清空</a-button
                ></span
              >
            </template>
            <div>
              <a-form :model="newAlgorithm">
                <a-form-item field="algorithmname" label="算法名字" required>
                  <a-input
                    v-model="newAlgorithm.algorithmname"
                    placeholder="请输入"
                  />
                </a-form-item>

                <a-form-item field="department" label="所属部门" required>
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

                <a-form-item field="tags" label="算法标签" required>
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
                  <a-select v-model="newAlgorithm.scene" placeholder="请选择">
                    <a-option v-for="(item, index) in allscene" :key="index">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>

                <a-form-item field="class" label="算法类型" required>
                  <a-input v-model="newAlgorithm.class" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="description" label="描述" required>
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
              @input="searchall"
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
                  @click="gotoDetail(item.alid)"
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
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Modal } from '@arco-design/web-vue';

const router = useRouter();

const data = reactive([
  {
    alid: '1',
    algorithmname: '异常检测算法',
    class: '计算机视觉',
    department: '流程与信息化部',
    information:
      '异常检测算法、异常检测(anomaly detecion)是计算机视觉领域的一个热门研究话题，其目标是在不使用真实异样样本的情况下，利用现有的正常样本构建模型以检测可能出现的各种异常图像。在工业外观缺陷检测、医学影像分析、高光谱图像处理等领域有较高的研究意义和应用价值',
    description:
      '现有的图像异常检测方法可以分为基于传统方法和基于深度学习的方法两大类别。所示基于传流方法的异常检测技术大致包含六个类脉基于模板四配、基于统计模型、基于图像分解、基于频域分析、基于稀疏编码重构和基于分类面构建的异常检测方法.而基于深度学习的方法大致包含四个类别:基于距离度量、基于分类面构建、基于图像重构和结合传统方法的异常检测方法。使用存陆模块来扩展自动编码器，并开发一种改进的自动编码器，称为内存增强自动编码器，即MemAE。给定输入后，MemAE首先从编码器获取编码，然后将其用作查询以检索最相关的储项以进行重建。在训练阶段，将更新内存内容并鼓励其表示常规数据的原型元素。在测试阶段，将修复学习到的内存，并从一些选定的常规数据存储记录中获得重逮结果。因此，重建将趋于接近正常样本.因此,针对异常的重构错误将得到加强，以进行异常检测。MemAE没有关于数据类型的假设，因此一般可应用于不同的任务，在各种数据集上的实验证明了拟议的IMemAE具有出色的概括性和很高的有效性',
    scene: '区域超员智能视频监控',
    status: '未上传',
    tags: ['其他'],
  },
]);

const newAlgorithm = reactive({
  alid: '',
  algorithmname: '',
  class: '',
  department: '',
  information: '',
  description: '',
  scene: '',
  status: '',
  tags: [],
});

const search = ref('');
const visible = ref(false);
const allscene = reactive([{ name: '区域超员智能视频监控' }]);

const clearForm = () => {
  newAlgorithm.department = '';
  newAlgorithm.class = '';
  newAlgorithm.scene = '';
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
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

const searchall = () => {};

const gotoDetail = (alid: string) => {
  const item = data.find((item) => {
    return item.alid === alid;
  });
  console.log(item);
  const obj = JSON.stringify(item);
  router.push({
    path: `/algorithm/aldetail/${alid}`,
    query: { item: obj },
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