<template>
  <div class="container">
    <div>
      <a-page-header
        title="场景详情"
        @back="goback"
      >
        <template #subtitle>
          <a-space>
            <span>{{ detail.name }}</span>
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
                detail.name +
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
                  {{ detail.department }}
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card
                  title="名称"
                  :style="{ width: '100%' }"
                  :header-style="{ backgroundColor: '#F2F3F5' }"
                >
                  {{ detail.name }}
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
                  <span v-if="detail.status === '未上传'">
                    <a-tag color="red">{{ detail.status }}</a-tag>
                  </span>
                  <span v-else-if="detail.status === '标记中'">
                    <a-tag color="#ffb400">{{ detail.status }}</a-tag>
                  </span>
                  <span v-else-if="detail.status === '已完成'">
                    <a-tag color="green">{{ detail.status }}</a-tag>
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
                      v-for="(tag, index) in detail.tags"
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
                      v-for="(tecTag, index) in detail.techtag"
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
                  {{ detail.description }}
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

const router = useRouter();
const route = useRoute();
const detail = JSON.parse(route.query.item as any);
console.log(detail);

const goback = () => {
  router.go(-1)
}
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