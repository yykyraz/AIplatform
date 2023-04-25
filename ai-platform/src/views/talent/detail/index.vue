<template>
  <div class="container">
    <div>
      <a-page-header title="人才详情" @back="goback">
        <template #subtitle>
          <a-space>
            <span>{{ detail.value.name }}</span>
            <span style="margin-left: 30px">
              <a-button type="primary" size="large" @click="handleClick"
                >修改信息</a-button
              >
              <a-drawer :width="500" :visible="visible" unmountOnClose>
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
                  <a-form :model="newDetail.value" @submit-success="handleOk">
                    <a-form-item field="name" label="姓名" required>
                      <a-input
                        v-model="newDetail.value.name"
                        placeholder="请输入"
                      />
                    </a-form-item>
                    <a-form-item field="gender" label="性别" required>
                      <a-select
                        v-model="newDetail.value.gender"
                        placeholder="请选择"
                      >
                        <a-option value="男">男</a-option>
                        <a-option value="女">女</a-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item field="jobNum" label="工号" required>
                      <a-input
                        v-model="newDetail.value.jobNum"
                        placeholder="请输入"
                      />
                    </a-form-item>
                    <a-form-item field="department" label="所属部门" required>
                      <a-select
                        v-model="newDetail.value.department"
                        placeholder="请选择"
                      >
                        <a-option value="信息化部">信息化部</a-option>
                        <a-option value="人力资源部">人力资源部</a-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item field="office" label="所属科室" required>
                      <a-select
                        v-model="newDetail.value.office"
                        placeholder="请选择"
                      >
                        <a-option value="生产科">生产科</a-option>
                        <a-option value="技术科">技术科</a-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item field="team" label="所属团队" required>
                      <a-select
                        v-model="newDetail.value.team"
                        placeholder="请选择"
                      >
                        <a-option value="团队一">团队一</a-option>
                        <a-option value="团队二">团队二</a-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item field="position" label="岗位" required>
                      <a-select
                        v-model="newDetail.value.position"
                        placeholder="请选择"
                      >
                        <a-option value="软件工程技术师"
                          >软件工程技术师</a-option
                        >
                      </a-select>
                    </a-form-item>
                    <a-form-item field="reserchField" label="研究方向" required>
                      <a-textarea
                        v-model="newDetail.value.reserchField"
                        placeholder="请输入"
                        allow-clear
                      />
                    </a-form-item>
                    <a-form-item field="honor" label="荣誉/成果" required>
                      <a-textarea
                        v-model="newDetail.value.honor"
                        placeholder="请输入"
                        allow-clear
                      />
                    </a-form-item>
                    <a-form-item field="contactInfo" label="联系方式" required>
                      <a-input
                        v-model="newDetail.value.contactInfo"
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
                      >
                        提交
                      </a-button>
                    </a-form-item>
                  </a-form>
                </div>
              </a-drawer>
              <a-popconfirm content="确认退出人才库？" @ok="del">
                <a-button
                  style="margin-left: 10px"
                  size="large"
                  status="danger"
                >
                  退出人才库
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
                'http://127.0.0.1:5173/src/assets/images/talent/' +
                detail.value.name +
                '.jpg'
              "
            />
          </div>
          <div style="width: 100%">
            <a-row>
              <a-col :span="12">
                <a-card
                  title="姓名"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.name }}
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card
                  title="工号"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.jobNum }}
                </a-card>
              </a-col>
            </a-row>
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
              <a-col :span="8">
                <a-card
                  title="部门"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.department }}
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card
                  title="科室"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.office }}
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card
                  title="团队"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.team }}
                </a-card>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-card
                  title="岗位"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.position }}
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card
                  title="联系方式"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.contactInfo }}
                </a-card>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-card
                  title="研究方向"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.reserchField }}
                </a-card>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-card
                  title="荣誉/成果"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.value.honor }}
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
import { delTalent, updateTalent, getTalentDetail } from '@/api/talent';
import { onMounted, reactive, ref } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';

const router = useRouter();
const route = useRoute();

const detail = reactive({
  value: {
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
  },
});

const newDetail = reactive({
  value: {
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
  },
});

const visible = ref(false);

const showDetail = () => {
  getTalentDetail({ _id: route.query.id })
    .then((res) => {
      detail.value = JSON.parse(JSON.stringify(res.data));
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
    },
  };
};

const handleOk = () => {
  updateTalent({
    _id: route.query.id,
    ...newDetail.value,
  })
    .then((res) => {
      detail.value = JSON.parse(JSON.stringify(res.data));
      Message.success('修改成功');
      visible.value = false;
    })
    .catch((err) => {
      Message.error(err);
      console.log(err);
    });
};

const handleCancel = () => {
  visible.value = false;
};

const del = () => {
  /* eslint no-underscore-dangle: 0 */
  delTalent({ _id: route.query.id })
    .then((res) => {
      console.log(res.data);
      Message.success('成功退出');
      router.go(-1);
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
  background-image: url('@/assets/images/background/backTalent.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
.avator {
  width: 100%;
  margin-top: 30px;
}
</style>