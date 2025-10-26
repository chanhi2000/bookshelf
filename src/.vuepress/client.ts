import { onMounted } from 'vue'
import { defineClientConfig } from "vuepress/client"
// import { useDarkMode } from "vuepress-theme-hope/client";

export default defineClientConfig({
  async enhance({ app, router, siteData }) {
    router.beforeEach((to) => {
      // console.log("before navigation");
    });

    router.afterEach((to) => {
      // console.log("after navigation");
    });
  },
  setup() {
    /* const { isDarkMode } = useDarkMode();
    console.log(isDarkMode.value); // get dark mode status */
    
    onMounted(() => {
      // use DOM API after mounted
      document.querySelector("#app");
    })
  },
  layouts: {

  },
  rootComponents: [
  ]
})
