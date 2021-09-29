<template>
  <el-table border stripe :data="$mockData.tableData">
    <flex-table-column label="占位列" prop="placeholder"></flex-table-column>
    <flex-table-column label="贴边的定宽100" prop="fix" width="100" fixed="left"></flex-table-column>
    <flex-table-column label="自由宽度-多" prop="fixedMore"></flex-table-column>
    <flex-table-column label="自由宽度-少" prop="freedomLess1"></flex-table-column>
    <flex-table-column width="100" label="自由宽度-不适应 &lt;table-column :fit='false'&gt;" prop="freedomMore1" :fit="false">
      <template #header>
        <div class="mark">
          <p>不适应</p>
          <p><code>:fit="false"</code></p>
        </div>
      </template>
    </flex-table-column>
    <flex-table-column label="freedom-more2" prop="freedomMore2"></flex-table-column>
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
    <flex-table-column label="贴边中 (自定义)" fixed="right">
      <template #default="scope">
        <el-button>{{scope.row.fix}}</el-button>
      </template>
    </flex-table-column>
  </el-table>
</template>

<script>
  export default {
		name: 'PartNotFit',
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
    white-space: pre-wrap;
    padding: 0;
    line-height: 20px;
  }
  .mark p {
    margin: 0;
  }
</style>