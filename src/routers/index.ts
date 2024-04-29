import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

const views = import.meta.glob([
  "../views/**/*.vue",
  "../views/**/index.vue",
  "../views/**/\\[*\\].vue",
]);

const routes: RouteRecordRaw[] = Object.entries(views).map(
  ([filePath, component]) => {
    let path = filePath.replace(/^\.\.\/views\//, "");
    path = path.replace(/^(.*)\/?index\.vue$/, "$1");
    path = path.replace(/\[(\w+)\]\.vue$/, ":$1");
    path = path.replace(/\.vue$/, "")
    path = "/" + path;
    console.log(filePath, path);

    return {
      path,
      name: filePath.replace(/^\.\.\/views\//, ""),
      component,
    } satisfies RouteRecordRaw;
  }
);

console.table(routes);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
  ],
});

export default router;
