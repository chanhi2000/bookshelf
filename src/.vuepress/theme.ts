import { theme } from "@bookshelf/shared-vuepress"

import {
  // head,
  navbarEn,
  sidebarEn,
} from './configs'

export default theme("", {
  navbar: navbarEn,
  sidebar: sidebarEn,
})

/* export default hopeTheme({
  logo: imgLogoPath,
  
  markdown: {
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
});
 */