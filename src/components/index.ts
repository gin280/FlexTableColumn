import FlexTableColumn from './FlexTableColumn/index.vue';
import Test from './Test/index.vue';

function install(app: any) {
  const packages = [FlexTableColumn, Test];
  packages.forEach((item:any) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}

export { install, FlexTableColumn, Test };
export default { install, version:'1.1.0'};