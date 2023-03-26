<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-26 11:13:54
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-03-26 16:25:20
 * @FilePath: \项目\AIplatform\ai-platform\src\views\home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mainbox">
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
          <a v-for="(link, index) in links" :href="link" :key="index">
            <img
              :src="image"
              :style="{
                width: '100%',
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
              <a-button type="primary">进入{{ tab.name }}</a-button>
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
          <p>我爱宝宝</p>
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
          <p>我爱宝宝</p>
          <div style="position: relative; top: 62px">
            <p><a-button type="primary">进入AI大赛</a-button> </p>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
const images = [
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
];

const links = ['/exception/404', 'exception/403', 'exception/500'];
const tabs = [
  { name: 'OCR文字识别', des: '这是OCR文字识别' },
  { name: 'OCR转Excel', des: '这是转文字功能' },
  { name: '数据集展示', des: '这是数据集展示' },
];
</script>

<script lang="ts">
export default {
  name: 'homepage',
};
</script>

<style scoped>
.header {
  margin-top: 20px;
}

.content {
  display: flex;
  margin: 60px 5%;
}
</style>