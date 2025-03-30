import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as l,au as n,aw as s,ax as r,b as i,r as p,o as g}from"./app-C2w16SxA.js";const d={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function w(a,t){const o=p("VPCard");return g(),c("div",null,[e("h1",u,[e("a",m,[e("span",null,l(a.$frontmatter.title)+" 관련",1)])]),n(o,s(r({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(o,s(r({title:"How to highlight text to speech words being read using AVSpeechSynthesizer | Media - free Swift example code",desc:"How to highlight text to speech words being read using AVSpeechSynthesizer",link:"https://hackingwithswift.com/example-code/media/how-to-highlight-text-to-speech-words-being-read-using-avspeechsynthesizer",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1)),i(" TODO: 작성 "),i(` 
iOS has text-to-speech synthesis built right into the system, but even better is that it allows you to track when individual words are being spoken so that you can highlight the words on the screen. This is extremely easy to do thanks to the \`AVSpeechSynthesizerDelegate\` protocol: you get two callbacks in the form of \`willSpeakRangeOfSpeechString\` and \`didFinish\`, where you can do your work.

First, make sure you import AVFoundation into your project. Now make your class conform to the \`AVSpeechSynthesizerDelegate\` protocol.

Place a label into your view controller, then hook it up to an outlet called \`label\`. Now add these two methods:

\`\`\`swift
func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, willSpeakRangeOfSpeechString characterRange: NSRange, utterance: AVSpeechUtterance) {
    let mutableAttributedString = NSMutableAttributedString(string: utterance.speechString)
    mutableAttributedString.addAttribute(.foregroundColor, value: UIColor.red, range: characterRange)
    label.attributedText = mutableAttributedString
}

func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
    label.attributedText = NSAttributedString(string: utterance.speechString)
}
\`\`\`

Finally, you need to trigger the text-to-speech engine – this might be by a button press perhaps, but it's down to you. Here's the method I attached to a button press:

\`\`\`swift
@IBAction func speak(_ sender: AnyObject) {
    let string = label.text!
    let utterance = AVSpeechUtterance(string: string)
    utterance.voice = AVSpeechSynthesisVoice(language: "en-GB")

    let synthesizer = AVSpeechSynthesizer()
    synthesizer.delegate = self
    synthesizer.speak(utterance)
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),i(`
/example-code/media/how-to-convert-text-to-speech-using-avspeechsynthesizer-avspeechutterance-and-avspeechsynthesisvoice">How to convert text to speech using AVSpeechSynthesizer, AVSpeechUtterance and AVSpeechSynthesisVoice 
/example-code/libraries/how-to-convert-speech-to-text-using-sfspeechrecognizer">How to convert speech to text using SFSpeechRecognizer 
/quick-start/swiftui/how-to-prevent-a-sheet-from-being-dismissed-with-a-swipe">How to prevent a sheet from being dismissed with a swipe 
/example-code/uikit/how-to-respond-to-the-device-being-shaken">How to respond to the device being shaken 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks</a>
`)],-1))])}const b=h(d,[["render",w],["__file","how-to-highlight-text-to-speech-words-being-read-using-avspeechsynthesizer.html.vue"]]),f=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-highlight-text-to-speech-words-being-read-using-avspeechsynthesizer.html","title":"How to highlight text to speech words being read using AVSpeechSynthesizer","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to highlight text to speech words being read using AVSpeechSynthesizer","description":"Article(s) > How to highlight text to speech words being read using AVSpeechSynthesizer","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to highlight text to speech words being read using AVSpeechSynthesizer"},{"property":"og:description","content":"How to highlight text to speech words being read using AVSpeechSynthesizer"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-highlight-text-to-speech-words-being-read-using-avspeechsynthesizer.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-highlight-text-to-speech-words-being-read-using-avspeechsynthesizer.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to highlight text to speech words being read using AVSpeechSynthesizer"}],["meta",{"property":"og:description","content":"Article(s) > How to highlight text to speech words being read using AVSpeechSynthesizer"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to highlight text to speech words being read using AVSpeechSynthesizer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.65,"words":494},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-highlight-text-to-speech-words-being-read-using-avspeechsynthesizer.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,f as data};
