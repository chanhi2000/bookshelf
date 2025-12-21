import type { ThemeFunction } from "vuepress/core";
import type { ThemeOptions } from "vuepress-theme-hope";
import { hopeTheme } from "vuepress-theme-hope";

export const theme = (
  name: string,
  { markdown = {}, plugins = {}, ...options }: ThemeOptions,
  /* {
    base = name.replace(/\d+$/, ""),
    indexName,
  }: { base?: string; indexName?: string } = {}, */
): ThemeFunction => {
  const themeOptions: ThemeOptions = {
    hostname: "https://chanhi2000.github.io",
    repo: 'chanhi2000/bookshelf',
    repoLabel: 'Github',
    repoDisplay: true,
    docsDir: `docs/${name}/src`,
    footer: 'MIT Licensed | Copyright © 2022-present <a href="https://github.com/chanhi2000">Chan Hee Lee</a>',
    displayFooter: true,
    darkmode: "enable",
    breadcrumbIcon: true,
    lastUpdated: true,
    fullscreen: true,
    encrypt: {
      config: {
      },
    },
    blog: {
      intro: "https://chanhi2000.github.io",
      description: "프로그램이 작성되는 환경부터 배포되는 환경까지 적용하는 개발자 이찬희 입니다.",
      avatar: 'https://avatars.githubusercontent.com/u/6296241?v=4',
      medias: {
        GitHub: "https://github.com/chanhi2000",
        Notion: {
          icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
          link: 'https://markiiimark.notion.site/MarkiiimarK-Fullstack-DevOps-c231ae6c157d4baba89a3713c92449dd'
        },
        Linkedin: "https://linkedin.com/in/chanhi2000",
        Gmail: "chanhi2000@gmail.com",
      },
    },
    metaLocales: {
      editLink: "Edit this page on GitHub",
    },
    markdown: {
      footnote: true,
      tasklist: true,
      component: true,
      vPre: true,
      include: true,
      align: true,
      attrs: true,
      mark: true,
      spoiler: true,
      sup: true,
      sub: true,
      stylize: [
        /* {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        }, */
      ],
      chartjs: true,
      echarts: true,
      flowchart: true,
      mermaid: true,
      plantuml: true,
      demo: true,
      vuePlayground: true,
      kotlinPlayground: true,
      sandpack: true,
      alert: true,
      hint: true,
      math: {
        type: 'katex', 
        copy: false,
      },
      tabs: true,
      codeTabs: true,
      highlighter: {
        type: "prismjs",
        theme: "dracula",
        notationDiff: true,
        notationFocus: true,
        notationHighlight: true,
        notationErrorLevel: true,
        collapsedLines: 12,
        /* twoslash: {
          twoslashOptions: {
            compilerOptions: {
              moduleResolution: 100,
            },
          },
        } */
      },
      figure: true,
      imgLazyload: true,
      imgSize: true,
    },
    plugins: {
      // blog: true,
      icon: {
        assets: [
          "fontawesome", 
          "fontawesome-with-brands",
          "https://chanhi2000.github.io/iconfont.css", 
          "https://chanhi2000.github.io/iconfont-more.css"
        ],
      },
      components: {
        components: [
          "CodePen"/* , "FontIcon" */, "Badge", "Share", "PDF", "SiteInfo", "VidStack", "VPCard", "VPBanner"
        ],
        rootComponents: {
        }
      },
      copyright: {
        author: 'Chan Hee Lee',
        license: 'MIT Licensed',
      },
      notice: {
        config: [
          /*{
          path: "/",
          title: "Notice Title",
          content: "Notice Content",
          actions: [
            {
              text: "Primary Action",
              link: "https://theme-hope.vuejs.press/",
              type: "primary",
            },
            { text: "Default Action" },
          ],
          fullscreen: true,
        }*/
      ]
      },
      copyCode: {
        locales: {
          "/": {
            // Override copy button label text
            copy: "Copy Codes from code block",
          }
        }
      },
      photoSwipe: {
        download: false,
      },
      nprogress: true,
      git: {
        contributors: false,
        createdTime: false,
        updatedTime: false,
      }
      // install @vuepress/plugin-pwa and uncomment these if you want a PWA
      /* pwa: {
        favicon: "/favicon.ico",
        cacheHTML: true,
        cacheImage: true,
        appendBase: true,
        apple: {
          icon: "/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          icons: [
            {
              src: "/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Demo",
              short_name: "Demo",
              url: "/demo/",
              icons: [
                {
                  src: "/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
              ],
            },
          ],
        },
      },

      install @vuepress/plugin-revealjs and uncomment these if you need slides
      revealjs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      }, */
    },
    ...options
  };

  return hopeTheme(themeOptions, false)

}