import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as d,ao as n,at as i,au as s,ak as t,aq as g,ar as p}from"./app-CpYYKbnj.js";const h={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function w(l,o){const a=g("VPCard");return p(),c("div",null,[e("h1",u,[e("a",m,[e("span",null,d(l.$frontmatter.title)+" 관련",1)])]),n(a,i(s({title:"Xcode - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/xcode/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),o[1]||(o[1]=e("hr",null,null,-1)),n(a,i(s({title:"How to make Xcode play sounds while debugging | Xcode - free Swift example code",desc:"How to make Xcode play sounds while debugging",link:"https://hackingwithswift.com/example-code/xcode/how-to-make-xcode-play-sounds-while-debugging",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t(" TODO: 작성 "),t(` 
Xcode has lots of tools to help you debug user interface problems, but it’s a little tricker to debug things you can’t see – network requests failing, data loading code going wrong, and so on.

A few years ago Markos Charatzas gave a <a href="https://qnoid.com/2013/06/08/Sound-Debugging.html">pioneering talk at NSConference</a> about the importance of using sound for debugging, and it’s a concept I’ve since used in my own projects.

To try it out, place a breakpoint somewhere in your code, then right-click on it and choose “Edit Breakpoint”. Click the Add Action button, then change the action to be “Sound” – you’ll see a list of system sounds you can choose from.

It doesn’t matter which sound you choose (although having sad sounds for failures does help!), but no matter what you decide you should check the box below marked “Automatically continue after evaluating actions” – this will ensure your breakpoint doesn’t stop execution of the program.

That checkbox plus the sound together means your program won’t pause when your breakpoints are hit, but will instead almost become musical: as network operations start, succeed, or fail, you’ll hear beeps, clicks, and bongs from your Mac so you’ll know exactly what’s happening just by listening.

**Note:** In case you were worried, none of these sounds will actually play when your app ships – they are just used by Xcode’s debugging engine.

`),o[2]||(o[2]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/media/how-to-play-sounds-using-avaudioplayer">How to play sounds using AVAudioPlayer 
/example-code/media/how-to-play-videos-using-avplayerviewcontroller">How to play videos using AVPlayerViewController 
/example-code/core-haptics/how-to-play-custom-vibrations-using-core-haptics">How to play custom vibrations using Core Haptics 
/quick-start/swiftui/how-to-play-movies-with-videoplayer">How to play movies with VideoPlayer 
/example-code/location/how-to-read-the-users-location-while-your-app-is-in-the-background">How to read the user’s location while your app is in the background</a>
`)],-1))])}const b=r(h,[["render",w],["__file","how-to-make-xcode-play-sounds-while-debugging.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/xcode/how-to-make-xcode-play-sounds-while-debugging.html","title":"How to make Xcode play sounds while debugging","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make Xcode play sounds while debugging","description":"Article(s) > How to make Xcode play sounds while debugging","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make Xcode play sounds while debugging"},{"property":"og:description","content":"How to make Xcode play sounds while debugging"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/xcode/how-to-make-xcode-play-sounds-while-debugging.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/xcode/how-to-make-xcode-play-sounds-while-debugging.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make Xcode play sounds while debugging"}],["meta",{"property":"og:description","content":"Article(s) > How to make Xcode play sounds while debugging"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2020-12-31T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make Xcode play sounds while debugging\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-12-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2020-12-31T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.67,"words":501},"filePathRelative":"hackingwithswift.com/example-code/xcode/how-to-make-xcode-play-sounds-while-debugging.md","localizedDate":"2020년 12월 31일","excerpt":"\\n"}');export{b as comp,k as data};