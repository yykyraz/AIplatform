<template>
  <div class="container">
    <div>
      <a-breadcrumb>
        <a-breadcrumb-item>
          <icon-apps />
        </a-breadcrumb-item>
        <a-breadcrumb-item>人才详情</a-breadcrumb-item>
        <a-breadcrumb-item>{{ detail.name }}</a-breadcrumb-item>
      </a-breadcrumb>
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
                'http://127.0.0.1:5173/src/assets/images/' +
                detail.name +
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
                  {{ detail.name }}
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card
                  title="工号"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.jobNum }}
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
                  {{ detail.department }}
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card
                  title="科室"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.office }}
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card
                  title="团队"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.team }}
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
                  {{ detail.position }}
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card
                  title="联系方式"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.contactInfo }}
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
                  {{ detail.reserchField }}
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
                  {{ detail.honor }}
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
import { useRoute } from 'vue-router';

const route = useRoute();
const detail = JSON.parse(route.query.item as any);
console.log(detail);
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
  background-image: url('@/assets/images/backTalent.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
.avator {
  width: 100%;
  margin-top: 30px;
}
</style>