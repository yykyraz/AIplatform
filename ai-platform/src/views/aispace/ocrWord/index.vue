<!--
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-01 12:24:48
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-03 11:44:16
 * @FilePath: \项目\AIplatform\ai-platform\src\views\aispace\ocrWord\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <Breadcrumb :items="['menu.aispace.ocrword']" />
    <div class="mainbox">
      <div style="text-align: center; padding-top: 30px">
        <b style="font-size: 30px; margin-right: 20px">OCR文字识别</b>
        <a-space style="margin-bottom: 10px">
          <a-upload
            :multiple="false"
            :file-list="fileList"
            :show-file-list="false"
            @beforeRemove="beforeRemove"
            @beforeUpload="beforeUpload"
          >
            <template #upload-button>
              <a-button type="primary"> 试试你的图片？ </a-button>
            </template>
          </a-upload>
          <a-button @click="copyText" type="outline">一键复制</a-button>
        </a-space>
      </div>
      <div style="text-align: center; width: 100%">
        <div style="width: 60%; display: inline-block">
          <a-spin :loading="loading" tip="正在识别中，请稍候哦~">
            <img src="@/assets/images/ocr/test1.jpg" style="width: 100%" />
          </a-spin>
        </div>
        <div style="float: right; width: 30%;margin-right: 40px;">
          <span style="margin-bottom: 10px;"><b style="font-size: 20px;">识别结果</b></span>
          <a-textarea
            v-model="response.text"
            style="height: 300px"
          ></a-textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Modal, Message } from '@arco-design/web-vue';
import { createWorker } from 'tesseract.js';
import { onMounted, reactive, ref } from 'vue';

const worker = createWorker({
  logger: (m) => console.log(m),
});

const loading = ref(false);
const fileList = ref([]);
const outputData = ref('sssss');

const columns = [
  {
    title: '文字',
    dataIndex: 'text',
  },
];

const response = reactive({ text: 'ss' });

const beforeRemove = (file: any) => {
  return new Promise<boolean>((resolve, reject) => {
    Modal.confirm({
      title: 'on-before-remove',
      content: `确认删除 ${file.name}`,
      onOk: () => resolve(true),
      onCancel: () => reject(new Error('cancel')),
    });
  });
};

const beforeUpload = (file: any) => {
  return new Promise<boolean>((resolve, reject) => {
    Modal.confirm({
      title: 'beforeUpload',
      content: `确认上传 ${file.name}`,
      onOk: () => resolve(true),
      onCancel: () => reject(new Error('cancel')),
    });
  });
};

const handleRemove = (file: any) => {
  const index = fileList.value.indexOf(file as never);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const copyText = () => {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', outputData.value);
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    Message.success('复制成功');
  }
  document.body.removeChild(input);
};

const ocr = async function (src: string) {
  loading.value = true;
  await (await worker).loadLanguage('eng');
  await (await worker).initialize('eng');
  const {
    data: { text },
  } = await (await worker).recognize(src);
  console.log(text);

  response.text = text;
  await (await worker).terminate();
  loading.value = false;
};

onMounted(() => {
  ocr('https://tesseract.projectnaptha.com/img/eng_bw.png');
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
  height: calc(100% - 40px);
  :deep(.mainbox) {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    background-color: white;
  }
}
</style>