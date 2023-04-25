<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-28 15:30:32
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-24 17:16:27
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
            <template #footer>
              <a-button @click="handleCancel">取消</a-button>
            </template>
            <div>
              <a-form :model="talentInfo" @submit-success="handleOk">
                <a-form-item
                  field="name"
                  label="姓名"
                  :rules="[{ required: true, message: '请输入姓名' }]"
                >
                  <a-input v-model="talentInfo.name" placeholder="请输入" />
                </a-form-item>
                <a-form-item
                  field="gender"
                  label="性别"
                  :rules="[{ required: true, message: '请选择性别' }]"
                >
                  <a-select v-model="talentInfo.gender" placeholder="请选择">
                    <a-option value="男">男</a-option>
                    <a-option value="女">女</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  field="jobNum"
                  label="工号"
                  :rules="[{ required: true, message: '请填写工号' }]"
                >
                  <a-input v-model="talentInfo.jobNum" placeholder="请输入" />
                </a-form-item>
                <a-form-item
                  field="department"
                  label="所属部门"
                  :rules="[{ required: true, message: '请填写您所属的部门' }]"
                >
                  <a-select
                    v-model="talentInfo.department"
                    placeholder="请选择"
                  >
                    <a-option value="信息化部">信息化部</a-option>
                    <a-option value="人力资源部">人力资源部</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  field="office"
                  label="所属科室"
                  :rules="[{ required: true, message: '请填写您所属的科室' }]"
                >
                  <a-select v-model="talentInfo.office" placeholder="请选择">
                    <a-option value="生产科">生产科</a-option>
                    <a-option value="技术科">技术科</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  field="team"
                  label="所属团队"
                  :rules="[{ required: true, message: '请填写您所属的团队' }]"
                >
                  <a-select v-model="talentInfo.team" placeholder="请选择">
                    <a-option value="团队一">团队一</a-option>
                    <a-option value="团队二">团队二</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  field="position"
                  label="岗位"
                  :rules="[{ required: true, message: '请填写您的岗位' }]"
                >
                  <a-select v-model="talentInfo.position" placeholder="请选择">
                    <a-option value="软件工程技术师">软件工程技术师</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  field="reserchField"
                  label="研究方向"
                  :rules="[{ required: true, message: '请描述您的研究方向' }]"
                >
                  <a-textarea
                    v-model="talentInfo.reserchField"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
                <a-form-item field="honor" label="荣誉/成果">
                  <a-textarea
                    v-model="talentInfo.honor"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
                <a-form-item field="contactInfo" label="联系方式">
                  <a-input
                    v-model="talentInfo.contactInfo"
                    placeholder="请输入"
                  />
                </a-form-item>
                <a-form-item field="certification" label="证明材料">
                  <a-space direction="vertical" :style="{ width: '100%' }">
                    <a-upload action="/" @before-upload="beforeUpload" />
                  </a-space>
                </a-form-item>
                <a-form-item>
                  <a-button
                    style="margin-left: 110px; margin-top: 20px"
                    html-type="submit"
                    type="primary"
                    >提交</a-button
                  >
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
              allow-clear
              search-button
              @input="searchAll"
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
                  @click="gotoDetail(item._id)"
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
                          'http://127.0.0.1:5173/src/assets/images/talent/' +
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
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Modal } from '@arco-design/web-vue';
import { showAllTalent, createTalent, findTalent } from '@/api/talent';

const router = useRouter();
const talentData = ref();

onMounted(() => {
  show();
});

const talentInfo = reactive({
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

const show = () => {
  showAllTalent()
    .then((res) => {
      talentData.value = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleClick = () => {
  visible.value = true;
};

const handleOk = () => {
  createTalent(talentInfo)
    .then((res) => {
      console.log(res.data);
      show();
    })
    .catch((err) => {
      console.log(err);
    });
  visible.value = false;
  clearForm();
};

const handleCancel = () => {
  visible.value = false;
};

const searchAll = () => {
  if (search.value !== '') {
    findTalent({ name: search.value })
      .then((res) => {
        talentData.value = JSON.parse(JSON.stringify(res.data));
      })
      .catch((err: any) => {
        console.log(err);
      });
  } else {
    showAllTalent()
      .then((res) => {
        talentData.value = JSON.parse(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const gotoDetail = (_id: string) => {
  router.push({
    path: `/talent/detail/${_id}`,
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
  background-image: url('@/assets/images/background/backTalent.jpg');
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