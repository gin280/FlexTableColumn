<template>
  <el-table border stripe :data="$mockData.tableData" :autoFit="false">
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="贴边定宽100" prop="fix" width="100" fixed="left"></flex-table-column>
    <flex-table-column label="定宽100少" prop="fixedLess" width="100"></flex-table-column>
    <flex-table-column label="固定宽度100-多" prop="fixedMore" fit></flex-table-column>
    <flex-table-column label="自由宽度-多" prop="fixedMore"></flex-table-column>
    <flex-table-column label="自由宽度-少" prop="freedomLess1"></flex-table-column>
    <flex-table-column label="自由宽度-自适应!!!" prop="freedomMore1" fit>
      <template #header>
        <div class="mark">自由宽度-自适应 <code>&lt;table-column fit&gt;</code></div>
      </template>
    </flex-table-column>
    <!-- <flex-table-column label="freedom-more2" prop="freedomMore2"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="贴边的 (自定义)" fixed="right">
      <template #default="scope">
        <el-button>{{scope.row.fix}}</el-button>
      </template>
    </flex-table-column> -->
  </el-table>
</template>

<script>
  export default {
		name: 'PartFit',
    created() {
		},
		mounted() {
		},
		data() {
			return {}
		},
		methods: {},
	}
</script>

<style scoped>
  .mark {
    color: red;
    font-weight: 600;
  }
</style>
