import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as e,as as c,ao as r,at as n,au as s,ak as a,aq as h,ar as p}from"./app-Dn51E1Ub.js";const m={},g={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function f(i,t){const o=h("VPCard");return p(),l("div",null,[e("h1",g,[e("a",u,[e("span",null,c(i.$frontmatter.title)+" 관련",1)])]),r(o,n(s({title:"Games - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/games/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),r(o,n(s({title:"How to add a fragment shader to an SKSpriteNode using SKShader | Games - free Swift example code",desc:"How to add a fragment shader to an SKSpriteNode using SKShader",link:"https://hackingwithswift.com/example-code/games/how-to-add-a-fragment-shader-to-an-skspritenode-using-skshader",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(` 
Fragment shaders let you adjust individual pixels inside sprites to create effects such as embossing, pixellation, and even water, and you can attach fragment shader to any \`SKSpriteNode\` just by setting its \`shader\` property.

First, you need a fragment shader. This should be a file in your bundle with the extension “fsh”, and should be written in GLSL – the OpenGL shading language. I’m not going to teach GLSL here, but I do want to give you an example. Here’s a commented example that causes all colors in a sprite to be inverted:

\`\`\`swift
void main() {
    // find the current pixel color
    vec4 current_color = texture2D(u_texture, v_tex_coord);

    // if it's not transparent
    if (current_color.a > 0.0) {
        // subtract its current RGB values from 1 and use its current alpha; multiply by the node alpha so we can fade in or out
        gl_FragColor = vec4(1.0 - current_color.rgb, current_color.a) * current_color.a * v_color_mix.a;
    } else {
        // use the current (transparent) color
        gl_FragColor = current_color;
    }
}
\`\`\`

Save that as “inverted.fsh” and put it in your bundle. When you want to assign that to a sprite node, just set its \`shader\` property like this:

\`\`\`swift
yourSprite.shader = SKShader(filename: "inverted")
\`\`\`

Shaders are compiled on the device at runtime, which means they always take advantage of all GPU features on the user’s device. However, it also means there will be a small performance hit while your shader is being compiled, so it’s a good idea to compile them ahead of time and keep a cache.

If you’d like to explore shaders more, I made a whole library of them called ShaderKit. All examples are extensively commented and free to use: <a href="https://github.com/twostraws/ShaderKit">https://github.com/twostraws/ShaderKit</a>.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/how-to-add-metal-shaders-to-swiftui-views-using-layer-effects">How to add Metal shaders to SwiftUI views using layer effects 
/example-code/games/how-to-add-physics-to-an-skspritenode">How to add physics to an SKSpriteNode 
/example-code/games/how-to-add-pixel-perfect-physics-to-an-skspritenode">How to add pixel-perfect physics to an SKSpriteNode 
/example-code/games/how-to-made-an-skspritenode-render-faster-using-blendmode">How to made an SKSpriteNode render faster using blendMode 
/example-code/games/how-to-color-an-skspritenode-using-colorblendfactor">How to color an SKSpriteNode using colorBlendFactor</a>
`)],-1))])}const y=d(m,[["render",f],["__file","how-to-add-a-fragment-shader-to-an-skspritenode-using-skshader.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/games/how-to-add-a-fragment-shader-to-an-skspritenode-using-skshader.html","title":"How to add a fragment shader to an SKSpriteNode using SKShader","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add a fragment shader to an SKSpriteNode using SKShader","description":"Article(s) > How to add a fragment shader to an SKSpriteNode using SKShader","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add a fragment shader to an SKSpriteNode using SKShader"},{"property":"og:description","content":"How to add a fragment shader to an SKSpriteNode using SKShader"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-add-a-fragment-shader-to-an-skspritenode-using-skshader.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-add-a-fragment-shader-to-an-skspritenode-using-skshader.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add a fragment shader to an SKSpriteNode using SKShader"}],["meta",{"property":"og:description","content":"Article(s) > How to add a fragment shader to an SKSpriteNode using SKShader"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add a fragment shader to an SKSpriteNode using SKShader\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.91,"words":574},"filePathRelative":"hackingwithswift.com/example-code/games/how-to-add-a-fragment-shader-to-an-skspritenode-using-skshader.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};
