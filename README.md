### 简介
基于 `vue3` 和 `element-ui` 组件库的 `el-table-column` 组件, 支持自适应列宽功能

### 使用
```
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import mockData from './mockData'
import MyUI from '@/components/index';

const app = createApp(App)

app.config.globalProperties.$mockData = mockData;
app.use(ElementPlus)
app.use(MyUI)

app.mount('#app')

```

- 默认用法, 全部自适应列宽
```
<template>
  <el-table :data="data">
    <flex-table-column label="row1" prop="field1"></flex-table-column>
    <flex-table-column label="row2" prop="field2"></flex-table-column>
    <!--也支持简单的自定义内容-->
    <flex-table-column label="row3">
      <template #default="scope">
        <div>自定义显示值31: {{ scope.row.field31 }}</div>
        <div>自定义显示值32: {{ scope.row.field32 }}</div>
      </template>
    </flex-table-column>
    <flex-table-column label="操作">
      <template #default="scope">
        <el-button @click="removeItem">删除</el-button>
      </template>
    </flex-table-column>
  </el-table>
</template>
```

- 部分不适应列宽, 两种写法:
```
<template>
  <el-table :data="data">
    <!--1. 设置 fit 属性为 false-->
    <flex-table-column label="row1" prop="field1" :fit="false"></flex-table-column>
    <!--2. 使用 `ElementUI` 原有的 `el-table-column`-->
    <flex-table-column label="row2" prop="field2"></flex-table-column>
  </el-table>
</template>
```

- 部分自适应列宽:
```
// 实现仅有 列2 自适应
<template>
  <!--在 table 上设置 autoFit 属性为 false-->
  <el-table :data="data" :autoFit="false">
    <flex-table-column label="row1" prop="field1"></flex-table-column>
    
    <!--在 column 上设置 fit 属性为 true-->
    <flex-table-column label="row2" prop="field2" fit></flex-table-column>
  </el-table>
</template>

<!--或者其他列使用 ElementUI 原有的 el-table-column-->
<template>
  <el-table :data="data">
    <flex-table-column label="row1" prop="field1"></flex-table-column>
    <flex-table-column label="row2" prop="field2"></flex-table-column>
  </el-table>
</template>
```

### 配置项

自适应列宽时三种字符的字体比例

| 字符 | 字段 | 默认值 |
| ---- | ---- | ---- |
| 汉字 | CHAR_RATE | 1.1 |
| 数字 | NUM_RATE | 0.65 |
| 其他 | OTHER_RATE | 0.5 |
