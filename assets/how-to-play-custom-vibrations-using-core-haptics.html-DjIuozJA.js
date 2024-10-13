import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,b as e,t as c,e as n,n as a,g as i,a as r,r as l,o as h}from"./app-TWLwS86W.js";const m={},u={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"},g=e("nav",{class:"table-of-contents"},[e("ul")],-1),y=e("hr",null,null,-1),v=e("blockquote",null,[e("p",null,"Available from iOS 13.0")],-1),w=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),r(`
/example-code/media/how-to-play-sounds-using-avaudioplayer">How to play sounds using AVAudioPlayer 
/example-code/media/how-to-play-videos-using-avplayerviewcontroller">How to play videos using AVPlayerViewController 
/example-code/xcode/how-to-make-xcode-play-sounds-while-debugging">How to make Xcode play sounds while debugging 
/quick-start/swiftui/how-to-play-movies-with-videoplayer">How to play movies with VideoPlayer 
/example-code/core-haptics/how-to-modify-haptic-events-over-time-using-chhapticparametercurve">How to modify haptic events over time using CHHapticParameterCurve</a>
`)],-1);function H(o,f){const t=l("VPCard");return h(),p("div",null,[e("h1",u,[e("a",d,[e("span",null,c(o.$frontmatter.title)+" 관련",1)])]),n(t,a(i({title:"Core Haptics - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/core-haptics/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,y,n(t,a(i({title:"How to play custom vibrations using Core Haptics | Core Haptics - free Swift example code",desc:"How to play custom vibrations using Core Haptics",link:"https://hackingwithswift.com/example-code/core-haptics/how-to-play-custom-vibrations-using-core-haptics",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),v,r(` 
Core Haptics lets us define a variety of vibrations and sound effects that trigger with precise timing and behaviors, all powered by the iPhone’s Taptic Engine. These behaviors are somewhat hard to define with words, and are best *felt* rather than *described*, but the words Apple uses are things like “intensity” (the relative strength of the vibration) and “sharpness” (whether it’s a dull tap or a more precise one).

To try it out for yourself, first import Core Haptics, then create a property to store an instance of the main Core Haptics engine:

\`\`\`swift
var engine: CHHapticEngine?
\`\`\`

Before you try to create an instance of that engine, you should make sure haptics are supported on the current device using code like this:

\`\`\`swift
guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }
\`\`\`

But if that passes you’re safe to create and start your haptic engine. This might be inside \`viewDidLoad()\`, for example:

\`\`\`swift
guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }

do {
    engine = try CHHapticEngine()
    try engine?.start()
} catch {
    print("There was an error creating the engine: \\(error.localizedDescription)")
}
\`\`\`

It’s not *required*, but at the same time you might also want to assign closures to the \`stoppedHandler\` and \`resetHandler\` properties of your engine, like this:

\`\`\`swift
// The engine stopped; print out why
engine?.stoppedHandler = { reason in
    print("The engine stopped: \\(reason)")
}

// If something goes wrong, attempt to restart the engine immediately
engine?.resetHandler = { [weak self] in
    print("The engine reset")

    do {
        try self?.engine?.start()
    } catch {
        print("Failed to restart the engine: \\(error)")
    }
}
\`\`\`

Finally you’re all set to start making haptic effects. For example, this creates one strong, sharp tap whenever you touch the screen:

\`\`\`swift
override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }

    let intensity = CHHapticEventParameter(parameterID: .hapticIntensity, value: 1)
    let sharpness = CHHapticEventParameter(parameterID: .hapticSharpness, value: 1)
    let event = CHHapticEvent(eventType: .hapticTransient, parameters: [intensity, sharpness], relativeTime: 0)

    do {
        let pattern = try CHHapticPattern(events: [event], parameters: [])
        let player = try engine?.makePlayer(with: pattern)
        try player?.start(atTime: 0)
    } catch {
        print("Failed to play pattern: \\(error.localizedDescription).")
    }
}
\`\`\`

For something more exciting you can create a series of events and pass in various values for their \`relativeTime\` so they either overlap or play in a sequence.

For example, this creates a series of taps, starting strong and sharp and fading away to weak and dull over a second:

\`\`\`swift
override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }

    var events = [CHHapticEvent]()

    for i in stride(from: 0, to: 1, by: 0.1) {
        let intensity = CHHapticEventParameter(parameterID: .hapticIntensity, value: Float(1 - i))
        let sharpness = CHHapticEventParameter(parameterID: .hapticSharpness, value: Float(1 - i))
        let event = CHHapticEvent(eventType: .hapticTransient, parameters: [intensity, sharpness], relativeTime: i)
        events.append(event)
    }

    do {
        let pattern = try CHHapticPattern(events: events, parameters: [])
        let player = try engine?.makePlayer(with: pattern)
        try player?.start(atTime: 0)
    } catch {
        print("Failed to play pattern: \\(error.localizedDescription).")
    }
}
\`\`\`

And this taps out the Morse code for SOS (...---...) on the Taptic engine by mixing transient events (brief taps) with continuous events (long buzzes over a period of time):

\`\`\`swift
override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }

    let short1 = CHHapticEvent(eventType: .hapticTransient, parameters: [], relativeTime: 0)
    let short2 = CHHapticEvent(eventType: .hapticTransient, parameters: [], relativeTime: 0.2)
    let short3 = CHHapticEvent(eventType: .hapticTransient, parameters: [], relativeTime: 0.4)
    let long1 = CHHapticEvent(eventType: .hapticContinuous, parameters: [], relativeTime: 0.6, duration: 0.5)
    let long2 = CHHapticEvent(eventType: .hapticContinuous, parameters: [], relativeTime: 1.2, duration: 0.5)
    let long3 = CHHapticEvent(eventType: .hapticContinuous, parameters: [], relativeTime: 1.8, duration: 0.5)
    let short4 = CHHapticEvent(eventType: .hapticTransient, parameters: [], relativeTime: 2.4)
    let short5 = CHHapticEvent(eventType: .hapticTransient, parameters: [], relativeTime: 2.6)
    let short6 = CHHapticEvent(eventType: .hapticTransient, parameters: [], relativeTime: 2.8)

    do {
        let pattern = try CHHapticPattern(events: [short1, short2, short3, long1, long2, long3, short4, short5, short6], parameters: [])
        let player = try engine?.makePlayer(with: pattern)
        try player?.start(atTime: 0)
    } catch {
        print("Failed to play pattern: \\(error.localizedDescription).")
    }
}
\`\`\`

Notice how I’ve specified all the \`relativeTime\` parameters so they are spaced roughly correctly for the sequence I want.

`),w])}const T=s(m,[["render",H],["__file","how-to-play-custom-vibrations-using-core-haptics.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/core-haptics/how-to-play-custom-vibrations-using-core-haptics.html","title":"How to play custom vibrations using Core Haptics","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to play custom vibrations using Core Haptics","description":"Article(s) > How to play custom vibrations using Core Haptics","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to play custom vibrations using Core Haptics"},{"property":"og:description","content":"How to play custom vibrations using Core Haptics"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/core-haptics/how-to-play-custom-vibrations-using-core-haptics.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/core-haptics/how-to-play-custom-vibrations-using-core-haptics.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to play custom vibrations using Core Haptics"}],["meta",{"property":"og:description","content":"Article(s) > How to play custom vibrations using Core Haptics"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-06-04T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to play custom vibrations using Core Haptics\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-04T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-06-04T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.07,"words":920},"filePathRelative":"hackingwithswift.com/example-code/core-haptics/how-to-play-custom-vibrations-using-core-haptics.md","localizedDate":"2019년 6월 4일","excerpt":"\\n"}');export{T as comp,k as data};
