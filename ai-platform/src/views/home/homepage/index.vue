<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-26 11:13:54
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-04 12:34:19
 * @FilePath: \项目\AIplatform\ai-platform\src\views\home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mainbox">
    <Breadcrumb :items="['menu.home']" />
    <div class="header">
      <a-carousel
        :autoPlay="true"
        animation-name="card"
        show-arrow="never"
        indicator-position="outer"
        :hoverToPause="true"
        :style="{
          width: '100%',
          height: '240px',
        }"
      >
        <a-carousel-item
          v-for="(image, index) in images"
          :style="{ width: '60%' }"
          :key="index"
        >
          <a :href="image.link" :key="index">
            <img
              :src="image.img"
              :style="{
                width: '100%',
                height: '100%'
              }"
            />
          </a>
        </a-carousel-item>
      </a-carousel>
    </div>
    <div class="content">
      <a-card
        :style="{ width: '30%', backgroundColor: '#F2F3F5' }"
        title="Arco Card"
        :bordered="false"
      >
        <template #title>
          <h2 style="text-align: center">常用功能</h2>
        </template>
        <div style="text-align: center">
          <a-tabs trigger="hover" size="large" type="text">
            <a-tab-pane v-for="(tab, index) in tabs" :key="index">
              <template #title>{{ tab.name }}</template>
              <p>{{ tab.des }}</p
              ><br />
              <a-button type="primary" @click="goPage(tab.path)"
                >进入{{ tab.name }}</a-button
              >
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-card>
      <a-card
        :style="{ width: '30%', marginLeft: '5%', backgroundColor: '#F2F3F5' }"
        title="Arco Card"
        :bordered="false"
      >
        <template #title>
          <h2 style="text-align: center">最新资讯</h2>
        </template>
        <div style="text-align: center">
          <p>这里是最新资讯</p>
        </div>
      </a-card>
      <a-card
        :style="{ width: '30%', marginLeft: '5%', backgroundColor: '#F2F3F5' }"
        title="Arco Card"
        :bordered="false"
      >
        <template #title>
          <h2 style="text-align: center">AI大赛</h2>
        </template>
        <div style="text-align: center">
          <p>这里是AI大赛</p>
          <div style="position: relative; top: 62px">
            <p><a-button type="primary">进入AI大赛</a-button> </p>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const images = [
  {
    img: 'http://127.0.0.1:5173/src/assets/images/home/fenwoxin.jpg',
    link: '/exception/404',
  },
  {
    img: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    link: '/exception/403',
  },
  {
    img: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    link: '/exception/500',
  },
];

const tabs = [
  { name: 'OCR文字识别', des: '这是OCR文字识别', path: '/aispace/ocrword' },
  { name: 'OCR转Excel', des: '这是转文字功能', path: '/aispace/ocrexcel' },
  { name: '数据集展示', des: '这是数据集展示', path: '/data/classic' },
];

const goPage = (path: string) => {
  router.push({
    path
  });
};
</script>

<script lang="ts">
export default {
  name: 'homepage',
};
</script>

<style scoped lang="less">
.mainbox {
  padding: 0 20px 20px 20px;
  height: calc(100% - 40px);
}
.header {
  margin-top: 20px;
}

.content {
  display: flex;
  margin: 60px 5%;
}
</style>