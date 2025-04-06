import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as d,f as o,av as p,au as i,aw as n,ax as s,b as e,r as u,o as c}from"./app-OR5iPMEZ.js";const y={},m={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function g(r,t){const a=u("VPCard");return c(),d("div",null,[o("h1",m,[o("a",h,[o("span",null,p(r.$frontmatter.title)+" 관련",1)])]),i(a,n(s({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=o("nav",{class:"table-of-contents"},[o("ul")],-1)),t[1]||(t[1]=o("hr",null,null,-1)),i(a,n(s({title:"How to play sounds using AVAudioPlayer | Media - free Swift example code",desc:"How to play sounds using AVAudioPlayer",link:"https://hackingwithswift.com/example-code/media/how-to-play-sounds-using-avaudioplayer",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=o("blockquote",null,[o("p",null,"Available from iOS 2.2")],-1)),e(" TODO: 작성 "),e(` 
The most common way to play a sound on iOS is using \`AVAudioPlayer\`, and it's popular for a reason: it's easy to use, you can stop it whenever you want, and you can adjust its volume as often as you need. The only real catch is that you must store your player as a property or other variable that won't get destroyed straight away – if you don't, the sound will stop immediately.

\`AVAudioPlayer\` is part of the AVFoundation framework, so you'll need to import that:

\`\`\`swift
import AVFoundation
\`\`\`

Like I said, you need to store your audio player as a property somewhere so it is retained while the sound is playing. In our example we're going to play a bomb explosion sound, so I created a property for it like this:

\`\`\`swift
var bombSoundEffect: AVAudioPlayer?
\`\`\`

With those two lines of code inserted, all you need to do is play your audio file. This is done first by finding where the sound is in your project using \`path(forResource:)\`, then creating a file URL out of it. That can then get passed to \`AVAudioPlayer\` to create an audio player object, at which point – finally – you can play the sound. Here's the code:

\`\`\`swift
let path = Bundle.main.path(forResource: "example.mp3", ofType:nil)!
let url = URL(fileURLWithPath: path)

do {
    bombSoundEffect = try AVAudioPlayer(contentsOf: url)
    bombSoundEffect?.play()
} catch {
    // couldn't load file :(
}
\`\`\`

If you want to stop the sound, you should use its \`stop()\` method.

`),t[3]||(t[3]=o("details",{class:"hint-container details"},[o("summary",null,"Similar solutions…"),e(`
/example-code/xcode/how-to-make-xcode-play-sounds-while-debugging">How to make Xcode play sounds while debugging 
/example-code/media/how-to-loop-audio-using-avaudioplayer-and-numberofloops">How to loop audio using AVAudioPlayer and numberOfLoops 
/example-code/media/how-to-play-videos-using-avplayerviewcontroller">How to play videos using AVPlayerViewController 
/example-code/core-haptics/how-to-play-custom-vibrations-using-core-haptics">How to play custom vibrations using Core Haptics 
/quick-start/swiftui/how-to-play-movies-with-videoplayer">How to play movies with VideoPlayer</a>
`)],-1))])}const A=l(y,[["render",g],["__file","how-to-play-sounds-using-avaudioplayer.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-play-sounds-using-avaudioplayer.html","title":"How to play sounds using AVAudioPlayer","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to play sounds using AVAudioPlayer","description":"Article(s) > How to play sounds using AVAudioPlayer","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.2","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to play sounds using AVAudioPlayer"},{"property":"og:description","content":"How to play sounds using AVAudioPlayer"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-play-sounds-using-avaudioplayer.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-play-sounds-using-avaudioplayer.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to play sounds using AVAudioPlayer"}],["meta",{"property":"og:description","content":"Article(s) > How to play sounds using AVAudioPlayer"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.2"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to play sounds using AVAudioPlayer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.63,"words":489},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-play-sounds-using-avaudioplayer.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{A as comp,b as data};
