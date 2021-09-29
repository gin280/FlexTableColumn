<template>
  <!--判断scopedSlots.default可知道是否存在子元素-->
  <el-table-column
    v-if="$slots.default"
    v-bind="$attrs"
    :key="$attrs.label"
    :class-name="className"
    :min-width="minWidth"
  >
    <template #default="scope">
      <!--原element组件使用了作用域插槽, 这里仿照-->
      <slot v-bind="scope"></slot>
    </template>
  </el-table-column>
  <!--使用 slot 自定义 header-->
  <el-table-column
    v-else-if="$slots.header"
    v-bind="$attrs"
    :key="$attrs.label"
    :class-name="className"
    :min-width="minWidth"
  >
    <template #header="scope">
      <slot name="header" v-bind="scope"></slot>
    </template>
  </el-table-column>
  <!--默认情况使用原始 el-table-column-->
  <el-table-column
    v-else
    v-bind="$attrs"
    :key="$attrs.label"
    :class-name="className"
    :min-width="minWidth"
  ></el-table-column>
</template>

<script lang="ts">
import { computed, reactive, getCurrentInstance, watch, nextTick, onMounted, ComponentInternalInstance } from "vue";
import { createComponent } from "../../utils/create";
const { componentName, create } = createComponent("flex-table-column");
import $consts from "./constants";
export default create({
  setup(props, { attrs, slots, emit }) {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const state = reactive({
      minLength: 5, // 初始也不要写成0, 避免未及时设置宽度太丑
      getComputedWidth: 0, // 自定义列中获取元素计算的宽度
    });
    
    // table数据
    const values = computed(() => {
      const data = (instance?.parent?.ctx)?.data || [];
      return data.map(
        (item: { [x: string]: any }) => item[instance?.attrs?.prop as any]
      );
    });

    // 是否自适应列宽, 默认是
    const isFit: any = computed(() => {
      return (instance?.parent?.attrs.autoFit === undefined &&
        instance?.attrs.fit === undefined) ||
        (instance?.parent?.attrs.autoFit === false && instance.attrs.fit !== undefined);
    });

    // 为存在scope的添加className
    const className = computed(() => {
      const parentClass = instance?.attrs["class-name"] || "";
      const classPre =
        instance?.attrs.prop || `encode-${transChar(instance?.attrs.label as any)}`; // 有的列因为有slotScope而不给prop
      return classPre ? `${parentClass} ${classPre}-column` : "";
    });

    // 列最小宽度
    const minWidth = computed(() => {
      if (!instance?.attrs.label) return undefined;
      if (!isFit) return undefined;

      const maxOne: any =
        Math.max(
          state.minLength,
          (instance.attrs.label as any).length * fontRate.value.CHAR_RATE
        ) * (fontSize.value as any) + 20;
      // console.info(instance.attrs.width, 'instance.attrs.width')
      // console.info(maxOne, 'maxOne')
      // console.info(state.getComputedWidth, 'state.getComputedWidth')
      return instance.attrs.width || Math.max(maxOne, state.getComputedWidth);
    });

    // 字体大小
    const fontSize = computed(() => {
      return instance?.attrs.fontSize || $consts.fontSize;
    });

    // 字体比例
    const fontRate = computed(() => {
      return {
        ...$consts.fontRate, // 默认值
        ...(instance?.attrs.fontRate as any || {}), // 父组件属性
      };
    });

    // 获取数组中元素按字体比例最长长度
    const getMaxLength = (arr: any[]) => {
      return arr.reduce((length: number, item: { toString: () => any }) => {
        if (item) {
          const str = item.toString();
          const char = str.match(/[\u2E80-\u9FFF]/g);
          const charLength = char ? char.length : 0;
          const num = str.match(/\d|\./g);
          const numLength = num ? num.length : 0;
          const otherLength = str.length - charLength - numLength;
          let newLength =
            charLength * fontRate.value.CHAR_RATE +
            numLength * fontRate.value.NUM_RATE +
            otherLength * fontRate.value.OTHER_RATE;
          if (str.includes("\n")) newLength = getMaxLength(str.split("\n"));
          if (length < newLength) {
            length = newLength;
          }
        }
        return length;
      }, 0);
    };
    // 转换汉字为class支持的字母
    const transChar = (char: string | number | boolean) => {
      return encodeURIComponent(char).replace(/[^a-zA-z]/g, "eUC");
    };
    watch(
      values,
      (val) => {
        isFit.value !== false &&
          nextTick(() => {
            // 详情中的列表需要在nextTick才能生效
            if (slots.default) {
              // 存在自定义节点
              setTimeout(() => {
                // 首次获取不到子节点, setTimeout才行
                // 可能存在贴边列, 需要使用包含 fixed 的类名
                const bodyWrapper = instance.attrs.fixed
                  ? document
                      .querySelector(
                        `.el-table__fixed${
                          instance.attrs.fixed === "right"
                            ? `-${instance.attrs.fixed}`
                            : ""
                        }`
                      )
                      .querySelector(".el-table__fixed-body-wrapper")
                  : document.querySelector(".el-table__body-wrapper");
                const nodes = bodyWrapper.querySelectorAll(
                  `.${
                    instance?.attrs.prop ||
                    `encode-${transChar(instance?.attrs.label as any)}`
                  }-column`
                );
                if (nodes.length) {
                  // 有可能会来不及获取nodes, 就切换菜单进入下一页了, 再研究吧
                  const target: any[] = [];
                  const getComputedWidths: number[] = [];
                  Array.from(nodes).map((item) => {
                    console.info(item, item.innerText, 'la')
                    target.push(item.innerText);
                    // 有可能存在自定义列内容超出容器, 取 scrollWidth 才行
                    getComputedWidths.push(
                      item.querySelector(".cell").scrollWidth
                    );
                  });
                  state.getComputedWidth = Math.max(...getComputedWidths);
                  state.minLength = getMaxLength(target);
                }
              }, 0);
            } else {
              state.minLength = getMaxLength(val);
            }
          });
      },
      { immediate: true }
    );

    return {
      className,
      minWidth
    }
  }
});

function getComputedWidth(maxOne: any, getComputedWidth: any): unknown {
  throw new Error("Function not implemented.");
}
</script>