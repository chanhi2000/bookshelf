import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as l,ao as n,at as i,au as a,ak as t,aq as u,ar as h}from"./app-gTf-Epb-.js";const p={},g={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,o){const r=u("VPCard");return h(),c("div",null,[e("h1",g,[e("a",m,[e("span",null,l(s.$frontmatter.title)+" 관련",1)])]),n(r,i(a({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),o[1]||(o[1]=e("hr",null,null,-1)),n(r,i(a({title:"How to record user videos using ReplayKit | Media - free Swift example code",desc:"How to record user videos using ReplayKit",link:"https://hackingwithswift.com/example-code/media/how-to-record-audio-using-avaudiorecorder",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[2]||(o[2]=e("blockquote",null,[e("p",null,"Available from iOS 3.0")],-1)),t(" TODO: 작성 "),t(` 
While it's not *hard* to record audio with an iPhone, it does take quite a bit of code so give yourself a few minutes to get this implemented. First you need to import the \`AVFoundation\` framework into your view controller.

You will need to add three properties to your view controller: a button for the user to tap to start or stop recording, an audio session to manage recording, and an audio recorder to handle the actual reading and saving of data. You can create the button in Interface Builder if you prefer; we'll be doing it in code here.

Put these three properties into your view controller:

\`\`\`swift
var recordButton: UIButton!
var recordingSession: AVAudioSession!
var audioRecorder: AVAudioRecorder!
\`\`\`

Recording audio requires a user's permission to stop malicious apps doing malicious things, so we need to request recording permission from the user. If they grant permission, we'll create our recording button. Put this into \`viewDidLoad()\`:

\`\`\`swift
recordingSession = AVAudioSession.sharedInstance()

do {
    try recordingSession.setCategory(.playAndRecord, mode: .default)
    try recordingSession.setActive(true)
    recordingSession.requestRecordPermission() { [unowned self] allowed in
        DispatchQueue.main.async {
            if allowed {
                self.loadRecordingUI()
            } else {
                // failed to record!
            }
        }
    }
} catch {
    // failed to record!
}
\`\`\`

You should replace the \`// failed to record!\` comment with a meaningful error alert to your user, or perhaps an on-screen label.

I made the code for \`loadRecordingUI()\` separate so you can replace it easily either with IB work or something else. Here's the least you need to do:

\`\`\`swift
func loadRecordingUI() {
    recordButton = UIButton(frame: CGRect(x: 64, y: 64, width: 128, height: 64))
    recordButton.setTitle("Tap to Record", for: .normal)
    recordButton.titleLabel?.font = UIFont.preferredFont(forTextStyle: .title1)
    recordButton.addTarget(self, action: #selector(recordTapped), for: .touchUpInside)
    view.addSubview(recordButton)
}
\`\`\`

That configures the button to call a method called \`recordTapped()\` when it's tapped. Don't worry, we haven't written that yet!

Before we write the code for \`recordTapped()\` we need to do a few other things. First, we need a method to start recording. This needs to decide where to save the audio, configure the recording settings, then start recording. Here's the code:

\`\`\`swift
func startRecording() {
    let audioFilename = getDocumentsDirectory().appendingPathComponent("recording.m4a")

    let settings = [
        AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
        AVSampleRateKey: 12000,
        AVNumberOfChannelsKey: 1,
        AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
    ]

    do {
        audioRecorder = try AVAudioRecorder(url: audioFilename, settings: settings)
        audioRecorder.delegate = self
        audioRecorder.record()

        recordButton.setTitle("Tap to Stop", for: .normal)
    } catch {
        finishRecording(success: false)
    }
}
\`\`\`

That code won't build just yet, because it has two problems. First, it uses the method \`getDocumentsDirectory()\`, which is a helper method I include in most of my projects. Here it is:

\`\`\`swift
func getDocumentsDirectory() -> URL {
    let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
    return paths[0]
}
\`\`\`

Second, it assigns \`self\` to be the delegate of the audio recorder, which means you need to conform your view controller to the \`AVAudioRecorderDelegate\` protocol.

With the code written to start recording, we need matching code to finish recording. This will tell the audio recorder to stop recording, then put the button title back to either "Tap to Record" (if recording finished successfully) or "Tap to Re-record" if there was a problem. Here's the code:

\`\`\`swift
func finishRecording(success: Bool) {
    audioRecorder.stop()
    audioRecorder = nil

    if success {
        recordButton.setTitle("Tap to Re-record", for: .normal)
    } else {
        recordButton.setTitle("Tap to Record", for: .normal)
        // recording failed :(
    }
}
\`\`\`

With those two in place, we can finally write \`recordTapped()\`, because it just needs to call either \`startRecording()\` or \`finishRecording()\` depending on the state of the audio recorder. Here's the code:

\`\`\`swift
@objc func recordTapped() {
    if audioRecorder == nil {
        startRecording()
    } else {
        finishRecording(success: true)
    }
}    
\`\`\`

Before you're done, there's one more thing to be aware of: iOS might stop your recording for some reason out of your control, such as if a phone call comes in. We are the delegate of the audio recorder, so if this situation crops up you'll be sent a \`audioRecorderDidFinishRecording()\` message that you can pass on to \`finishRecording()\` like this:

\`\`\`swift
func audioRecorderDidFinishRecording(_ recorder: AVAudioRecorder, successfully flag: Bool) {
    if !flag {
        finishRecording(success: false)
    }
}
\`\`\`

`),o[3]||(o[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/media/how-to-record-user-videos-using-replaykit">How to record user videos using ReplayKit 
/example-code/media/how-to-control-the-pitch-and-speed-of-audio-using-avaudioengine">How to control the pitch and speed of audio using AVAudioEngine 
/example-code/games/how-to-create-3d-audio-sound-using-skaudionode">How to create 3D audio sound using SKAudioNode 
/example-code/media/how-to-loop-audio-using-avaudioplayer-and-numberofloops">How to loop audio using AVAudioPlayer and numberOfLoops 
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table</a>
`)],-1))])}const R=d(p,[["render",f],["__file","how-to-record-user-videos-using-replaykit.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-record-user-videos-using-replaykit.html","title":"How to record user videos using ReplayKit","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to record user videos using ReplayKit","description":"Article(s) > How to record user videos using ReplayKit","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to record user videos using ReplayKit"},{"property":"og:description","content":"How to record user videos using ReplayKit"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-record-audio-using-avaudiorecorder.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-record-user-videos-using-replaykit.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to record user videos using ReplayKit"}],["meta",{"property":"og:description","content":"Article(s) > How to record user videos using ReplayKit"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to record user videos using ReplayKit\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.04,"words":911},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-record-user-videos-using-replaykit.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{R as comp,v as data};
