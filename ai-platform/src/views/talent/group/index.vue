<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-28 15:30:32
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-03-30 15:22:25
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
            :width="500"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            unmountOnClose
          >
            <template #title>
              <span> 信息填写表 </span>
              <a-button
                type="primary"
                style="margin-left: 20px"
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
                  <a-select v-model="talentInfo.gender" placeholder="请选择">
                    <a-option value="男">男</a-option>
                    <a-option value="女">女</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item field="jobNum" label="工号" required>
                  <a-input v-model="talentInfo.jobNum" placeholder="请输入" />
                </a-form-item>
                <a-form-item field="department" label="所属部门" required>
                  <a-select
                    v-model="talentInfo.department"
                    placeholder="请选择"
                  >
                    <a-option value="信息化部">信息化部</a-option>
                    <a-option value="人力资源部">人力资源部</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item field="office" label="所属科室" required>
                  <a-select v-model="talentInfo.office" placeholder="请选择">
                    <a-option value="生产科">生产科</a-option>
                    <a-option value="技术科">技术科</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item field="team" label="所属团队" required>
                  <a-select v-model="talentInfo.team" placeholder="请选择">
                    <a-option value="团队一">团队一</a-option>
                    <a-option value="团队二">团队二</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item field="position" label="岗位" required>
                  <a-select v-model="talentInfo.position" placeholder="请选择">
                    <a-option value="软件工程技术师">软件工程技术师</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item field="reserchField" label="研究方向" required>
                  <a-textarea
                    v-model="talentInfo.reserchField"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
                <a-form-item field="honor" label="荣誉/成果" required>
                  <a-textarea
                    v-model="talentInfo.honor"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
                <a-form-item field="contactInfo" label="联系方式" required>
                  <a-input v-model="talentInfo.name" placeholder="请输入" />
                </a-form-item>
                <a-form-item field="certification" label="证明材料">
                  <a-space direction="vertical" :style="{ width: '100%' }">
                    <a-upload action="/" @before-upload="beforeUpload" />
                  </a-space>
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
            :grid-props="{ gutter: 2, span: 4 }"
            style="margin-top: 24px"
            :data="talentData"
          >
            <template #item="{ item, index }">
              <a-list-item :key="index">
                <a-card
                  hoverable
                  style="cursor: pointer"
                  @click="gotoDetail(item.aid)"
                >
                  <template #cover>
                    <div
                      :style="{
                        height: '100px',
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
                          'http://127.0.0.1:5173/src/assets/images/' +
                          item.name +
                          '.jpg'
                        "
                      />
                    </div>
                  </template>
                  <a-card-meta :title="item.department">
                    <template #description>
                      {{ item.name }}
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
import { Modal } from '@arco-design/web-vue';

const router = useRouter();

const talentData = reactive([
  {
    aid: '1',
    name: '杨凌云',
    gender: '男',
    jobNum: '337845818',
    department: '信息化部',
    team: '团队一',
    office: '生产科',
    position: '软件工程技术师',
    contactInfo: '337845818@qq.com',
    reserchField:
      '基于域自适应的知识迁移和交叉学习技术。\n针对某型歼击机和教练机生产线，应用迁移学习和知识迁移技术，提出航空航天制造过程多场景下的模型训练方法；针对特定场景下数据样本量少、质量低等问题建立高效数据迁移补偿方法；针对深度学习模型参数体量大、训练成本高等问题研究模型迁移方法，提高训练效率和精度。基于研究成果构建面向航空制造的人工智能场景库，将所研成果进行封装和抽象，形成可推广、易迁移的人工智能场景库。 ',
    honor: 'AI大赛一等奖',
  },
  {
    aid: '2',
    name: '杨凌云',
    gender: '女',
    jobNum: '88888888',
    department: '人力资源部',
    team: '团队二',
    office: '生产科',
    position: '软件工程技术师',
    contactInfo: '666666666@qq.com',
    reserchField:
      '基于可解释性机器学习的模型推理和决策分析。人工智能模型的“黑箱”特点导致推理决策过程缺乏与用户之间的交互与信任。基于可解释性机器学习理论，研究数据、模型、结果的可解释性，提出推理决策的全流程可解释方法，提高推理过程的透明性，增强决策结果的可信度。基于研究成果构建面向航空制造的人工智能算法库，将所研成果使用非结构化数据库进行智能归集与算法可视化，最终形成人工智能算法库。 ',
    honor: 'AI大赛一等奖',
  },
]);
const talentInfo = reactive({
  aid: '',
  name: '',
  gender: '',
  jobNum: '',
  department: '',
  office: '',
  team: '',
  position: '',
  contactInfo: '',
  honor: '',
  reserchField: '',
});
const search = ref('');
const visible = ref(false);

const clearForm = () => {
  talentInfo.name = '';
  talentInfo.gender = '';
  talentInfo.gender = '';
  talentInfo.jobNum = '';
  talentInfo.department = '';
  talentInfo.office = '';
  talentInfo.team = '';
  talentInfo.position = '';
  talentInfo.contactInfo = '';
  talentInfo.honor = '';
  talentInfo.reserchField = '';
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

const gotoDetail = (aid: string) => {
  const item = talentData.find((item) => {
    return item.aid === aid;
  });
  console.log(item);
  const obj = JSON.stringify(item);
  router.push({
    path: `/talent/detail/${aid}`,
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
  background-image: url('@/assets/images/backTalent.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
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