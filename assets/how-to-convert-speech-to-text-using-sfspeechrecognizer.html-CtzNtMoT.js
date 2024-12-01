import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,t as h,e as n,n as i,g as r,a as t,r as p,o as l}from"./app-DLPYIRXq.js";const g={},d={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},m=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 10.0")],-1),S=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/media/how-to-convert-text-to-speech-using-avspeechsynthesizer-avspeechutterance-and-avspeechsynthesisvoice">How to convert text to speech using AVSpeechSynthesizer, AVSpeechUtterance and AVSpeechSynthesisVoice 
/example-code/media/how-to-highlight-text-to-speech-words-being-read-using-avspeechsynthesizer">How to highlight text to speech words being read using AVSpeechSynthesizer 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-add-advanced-text-styling-using-attributedstring">How to add advanced text styling using AttributedString 
/quick-start/swiftui/how-to-create-custom-text-effects-and-animations">How to create custom text effects and animations</a>
`)],-1);function y(s,b){const o=p("VPCard");return l(),a("div",null,[e("h1",d,[e("a",u,[e("span",null,h(s.$frontmatter.title)+" 관련",1)])]),n(o,i(r({title:"Libraries - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/libraries/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),m,f,n(o,i(r({title:"How to convert speech to text using SFSpeechRecognizer | Libraries - free Swift example code",desc:"How to convert speech to text using SFSpeechRecognizer",link:"https://hackingwithswift.com/example-code/libraries/how-to-convert-speech-to-text-using-sfspeechrecognizer",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,t(" TODO: 작성 "),t(` 
iOS has a built-in speech transcription system, which allows you to convert any audio recording into a text stream. It takes a few steps to configure, so let’s walk through them.

First, add \`import Speech\` to the top of your Swift file, to bring in the Speech framework.

Second, request permission to transcribe audio:

\`\`\`swift
func requestTranscribePermissions() {
    SFSpeechRecognizer.requestAuthorization { [unowned self] authStatus in
        DispatchQueue.main.async {
            if authStatus == .authorized {
                print("Good to go!")
            } else {
                print("Transcription permission was declined.")
            }
        }
    }
}
\`\`\`

Third, add a key to your Info.plist called \`NSSpeechRecognitionUsageDescription\`, then give it a string describing what you intend to do with the transcriptions.

Finally, write a method to perform transcription on an audio URL. This URL should be a recording you’ve already made, that is stored locally on the device:

\`\`\`swift
func transcribeAudio(url: URL) {
    // create a new recognizer and point it at our audio
    let recognizer = SFSpeechRecognizer()
    let request = SFSpeechURLRecognitionRequest(url: url)

    // start recognition!
    recognizer?.recognitionTask(with: request) { [unowned self] (result, error) in
        // abort if we didn't get any transcription back
        guard let result = result else {
            print("There was an error: \\(error!)")
            return
        }

        // if we got the final transcription back, print it
        if result.isFinal {
            // pull out the best transcription...
            print(result.bestTranscription.formattedString)
        }
    }
}
\`\`\`

Note: the \`isFinal\` property is there because you may get an initial transcription back containing some or all of the text, but it’s only considered final – i.e. as good as it gets – when the \`isFinal\` flag is true.

`),S])}const k=c(g,[["render",y],["__file","how-to-convert-speech-to-text-using-sfspeechrecognizer.html.vue"]]),z=JSON.parse('{"path":"/hackingwithswift.com/example-code/libraries/how-to-convert-speech-to-text-using-sfspeechrecognizer.html","title":"How to convert speech to text using SFSpeechRecognizer","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to convert speech to text using SFSpeechRecognizer","description":"Article(s) > How to convert speech to text using SFSpeechRecognizer","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-10.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to convert speech to text using SFSpeechRecognizer"},{"property":"og:description","content":"How to convert speech to text using SFSpeechRecognizer"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-convert-speech-to-text-using-sfspeechrecognizer.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-convert-speech-to-text-using-sfspeechrecognizer.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to convert speech to text using SFSpeechRecognizer"}],["meta",{"property":"og:description","content":"Article(s) > How to convert speech to text using SFSpeechRecognizer"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-10.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to convert speech to text using SFSpeechRecognizer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.71,"words":514},"filePathRelative":"hackingwithswift.com/example-code/libraries/how-to-convert-speech-to-text-using-sfspeechrecognizer.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,z as data};
