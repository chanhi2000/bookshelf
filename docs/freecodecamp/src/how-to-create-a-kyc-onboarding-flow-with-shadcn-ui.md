---
lang: en-US
title: "How to Create a Scalable KYC Onboarding Flow in React with Shadcn UI"
description: "Article(s) > How to Create a Scalable KYC Onboarding Flow in React with Shadcn UI"
icon: iconfont icon-shadcn
category:
  - Node.js
  - React.js
  - Shadcn
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - shadcn
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create a Scalable KYC Onboarding Flow in React with Shadcn UI"
    - property: og:description
      content: "How to Create a Scalable KYC Onboarding Flow in React with Shadcn UI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-kyc-onboarding-flow-with-shadcn-ui.html
prev: /programming/js-shadcn/articles/README.md
date: 2026-08-14
isOriginal: false
author:
  - name: Vaibhav Gupta
    url: https://freecodecamp.org/news/author/vaibhavg/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c86a7b7f-9199-499c-8f61-7a1fda09f519.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shadcn > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-shadcn/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Scalable KYC Onboarding Flow in React with Shadcn UI"
  desc="Every B2B SaaS product with a compliance requirement (like banking, lending, payroll, or crypto) hits the same wall early on: before you can let a business use your platform, you need to verify who th"
  url="https://freecodecamp.org/news/how-to-create-a-kyc-onboarding-flow-with-shadcn-ui"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c86a7b7f-9199-499c-8f61-7a1fda09f519.png"/>

Every B2B SaaS product with a compliance requirement (like banking, lending, payroll, or crypto) hits the same wall early on: before you can let a business use your platform, you need to verify who they are.

That means collecting a business type, pulling in registration documents, and showing the user where their verification stands, all without making onboarding feel like a customs form.

This article breaks down a working three step KYC (Know Your Customer) flow built with Shadcn UI: a stepper for progress, a radio group for account type, a file upload zone for documents, and an alert for verification status. You'll see the actual component code, not a simplified stand-in, along with the reasoning behind each decision.

You can try the finished flow at [<VPIcon icon="fas fa-globe"/>onboarding-kyc-flow.vercel.app](http://onboarding-kyc-flow.vercel.app). Click through it once before reading on, as it makes the code below easier to follow. And it also comes in dark and light mode.

::: note Prerequisites

Before working through this flow, you should be comfortable with React function components and hooks, specifically `useState`, `useRef`, and `useEffect`.

You should have:

- A Next.js project with the App Router and shadcn/ui already initialized, since this article doesn't cover that initial setup.
- A v0 account is optional. You can also use Bolt or Lovable, which support the same shadcn MCP prompt feature.

:::

---

## What You're Building

The flow has three steps:

1. **Account type:** The user picks Startup, Enterprise, or Government. This decision drives the rest of the experience. It's shown back to the user as a confirmation line, and would typically decide which workspace defaults get applied.
2. **Document upload:** The user drags in a business registration document, a tax return, or a company registry export, in PDF or CSV format.
3. **Verification status:** The user sees a live status: checking in progress, then either verified or an issue that needs attention.

---

## Project Structure

The project is a standard Next.js app with [<VPIcon icon="iconfont icon-shadcn"/>shadcn/ui](https://shadcnspace.com/) already initialized. Here's the top-level layout:

```sh title="file structure"
onboarding-kyc-flow/
├── .vercel/
├── app/
├── components/
├── lib/
├── public/
├── .env.development.local
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

.<VPIcon icon="iconfont icon-json"/>`components.json` is the file the shadcn CLI reads to know where your components live and which style and primitives you're using. <VPIcon icon="fas fa-folder-open"/>`components/` holds the shared UI pieces (Alert, Badge, Button, Card, Progress, RadioGroup, Separator) that the flow is built from. <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="iconfont icon-typsecript"/>`utils.ts` provides the `cn` helper used throughout the flow to combine conditional class names. <VPIcon icon="fas fa-olfder-open"/>`app/` holds the page itself, shown in full below.

---

## Radix UI vs Base UI: Which Primitives this Flow Uses

[`<VPIcon icon="iconfont icon-shadcn"/>Shadcn components](https://shadcnspace.com/components) aren't tied to one underlying primitive library. Most of the ecosystem defaults to Radix UI, but Base UI has become a solid alternative, and it's what this flow is built on.

The underlying primitive library can affect how a component behaves and how you work with it in your project. If you're pulling components from a set like Shadcn UI, check which primitive library it targets before mixing components from different sources.

Mixing Radix-based and Base UI-based components generally works, but it means using two different unstyled primitive libraries in the same project. You can [`<VPIcon icon="iconfont icon-shadcn"/>compare Radix UI and Base UI here](https://shadcnspace.com/blog/radix-ui-vs-base-ui).

---

## Scaffolding the Flow with v0 and an MCP Server

An MCP (Model Context Protocol) server exposes a component library to an AI coding assistant as a set of callable tools. Instead of the assistant guessing at component names and props from training data, it queries the server for the real, current API.

This matters here specifically, since there are now several shadcn-style component sets with similar names and different props.

The Shadcn Components library publishes an MCP server for its free set, connected to v0 by following its [<VPIcon icon="iconfont icon-shadcn"/>getting started guide](https://shadcnspace.com/docs/getting-started/mcp-server-docs). The video below covers the connection step by step. The same generated output can also be copied into Lovable or Bolt through their copy prompt feature, so the workflow isn't locked to one AI builder.

<VidStack src="youtube/ymTlzbkvvPk" />

The prompt used to scaffold this flow looked like this:

```md title="prompt"
Create an Enterprise SaaS Onboarding & KYC Flow. Use free components of the shadcn space MCP server: shadcn alert, shadcn radio group, shadcn stepper, shadcn file upload. Only use free components, not pro ones, and list which free component was used for each part.
 
Step 1: Account Type (stepper) - radio group for Startup, Enterprise, or Government
 
Step 2: Upload Documents (stepper) - file upload for a business registration document
 
Step 3: Verification (stepper) - alert showing verification status
```

This produces a working first draft fast. What follows is the result after cleaning that draft up: real state management, real validation, and states that a generated draft tends to skip.

---

## Step 1: Account Type with a Radio Group

Account type is the first decision in the flow because it's the one most likely to affect what comes after it. Asking it early keeps the rest of the flow feeling relevant to the choice the user just made.

```ts
const tiers: { id: Tier; name: string; description: string; tag: string }[] = [
  { id: 'startup', name: 'Startup', description: 'For teams building and scaling fast', tag: 'Up to 25 seats' },
  { id: 'enterprise', name: 'Enterprise', description: 'For established teams with advanced needs', tag: 'Unlimited seats' },
  { id: 'government', name: 'Government', description: 'For public sector and regulated teams', tag: 'FedRAMP-ready' },
]
```

```tsx
<RadioGroup value={tier} onValueChange={(value) => setTier(value as Tier)} className="grid gap-3">
  <fieldset className="contents">
    <legend className="sr-only">Account type</legend>
    {tiers.map((item) => (
      <label
        key={item.id}
        htmlFor={item.id}
        className={cn(
          'flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors hover:border-primary/50',
          tier === item.id && 'border-primary bg-primary/5'
        )}
      >
        <RadioGroupItem value={item.id} id={item.id} className="mt-0.5" />
        <span className="flex flex-1 flex-col gap-1">
          <span className="flex flex-wrap items-center gap-2 text-sm font-semibold">
            {item.name}
            {item.id === 'enterprise' && <Badge variant="secondary">Recommended</Badge>}
          </span>
          <span className="text-sm text-muted-foreground">{item.description}</span>
          <span className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">{item.tag}</span>
        </span>
      </label>
    ))}
  </fieldset>
</RadioGroup>
```

Two things worth noticing here. The tier data lives in a plain array outside the component, so adding a fourth tier later is a one-line change, not a markup change. And the `fieldset` with a visually hidden (`sr-only`) legend groups the three options as one related choice for screen readers. Sighted users never see it, since the card title above already states "Choose your account type" visually.

This step uses a [<VPIcon icon="iconfont icon-shadcn"/>shadcn radio group](https://shadcnspace.com/components/radio-group) rather than a select or checkboxes, since account type is a single, mutually exclusive choice, and a radio group is the only one of the three that makes both the options and the current selection visible at a glance.

::: info Live Preview:

![Step 1: Account type with a radio group](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/5ad2e892-88ae-4e6b-b83d-451ebe13dc74.png)

:::

---

## Step 2: Document Upload with Drag and Drop

The upload zone needs to handle three states cleanly: nothing selected yet, a file selected and ready, and a rejected file with a specific reason why.

```tsx :collapsed-lines
function FileUpload({ file, onFile, onRemove, error }: {
  file: File | null
  onFile: (file: File) => void
  onRemove: () => void
  error: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const accept = (candidate: File) => {
    if (candidate.type !== 'application/pdf' && candidate.type !== 'text/csv' && !candidate.name.toLowerCase().endsWith('.csv')) {
      return 'Upload a PDF or CSV file only.'
    }
    if (candidate.size > 10 * 1024 * 1024) {
      return 'Files must be smaller than 10 MB.'
    }
    onFile(candidate)
    return ''
  }

  return (
    <div className="flex flex-col gap-3">
      {!file ? (
        <button
          type="button"
          className={cn(
            'group flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 px-6 text-center transition-colors hover:border-primary hover:bg-primary/5',
            dragging && 'border-primary bg-primary/10'
          )}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            const dropped = event.dataTransfer.files[0]
            if (dropped) accept(dropped)
          }}
        >
          <input
            ref={inputRef}
            className="sr-only"
            type="file"
            accept=".pdf,.csv,application/pdf,text/csv"
            onChange={(event) => {
              const selected = event.target.files?.[0]
              if (selected) accept(selected)
            }}
          />
          <span className="mb-3 flex size-11 items-center justify-center rounded-lg border bg-background text-primary shadow-sm">
            <UploadCloud className="size-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold">Drop your business document here</span>
          <span className="mt-1 text-xs text-muted-foreground">or click to browse · PDF or CSV · max 10 MB</span>
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready to verify</p>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">Uploaded</Badge>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="Remove file" onClick={onRemove}>
            <X className="size-4" aria-hidden="true" />
          </Button>
        </div>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" aria-hidden="true" />
          <AlertTitle>Unsupported document</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
```

The `accept` function is the whole validation layer, and it runs from two different places: the change handler on the hidden file input, and the drop handler on the drag zone.

Both paths call the same function, so a file dragged in gets the same validation checks as a file selected by clicking browse. It ensures that only **PDF or CSV files** are allowed, regardless of how the file is added.

This is where [<VPIcon icon="iconfont icon-shadcn"/>shadcn file upload](https://shadcnspace.com/components/file-upload) earns its place over a plain `<input type="file">`: the drag zone, the selected state, and the rejected state are all handled as one component instead of three separate pieces wired together by hand.

::: info Live Preview

![Step 2: Document upload with drag and drop](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/959c806e-9e52-43f9-ad7f-c2855329ac5c.png)

:::

---

## Step 3: Verification Status with an Alert

Verification isn't instant, so the interface needs to say clearly what's happening and what happens next, rather than showing a spinner with no explanation.

```tsx :collapsed-lines
{verified ? (
  <Alert className="border-primary/30 bg-primary/5">
    <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
    <AlertTitle>Verification complete</AlertTitle>
    <AlertDescription>
      Your {selectedTier.name.toLowerCase()} workspace is ready to configure.
    </AlertDescription>
  </Alert>
) : (
  <>
    <Alert>
      <AlertCircle className="size-4" aria-hidden="true" />
      <AlertTitle>Verification in progress</AlertTitle>
      <AlertDescription>
        This usually takes a few moments. You can keep this tab open while we finish.
      </AlertDescription>
    </Alert>
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Checking business registry</span>
        <span className="font-mono text-xs text-muted-foreground">{checking ? '68%' : '100%'}</span>
      </div>
      <Progress value={checking ? 68 : 100} />
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Building2 className="size-3.5" aria-hidden="true" /> Matching company details and tax identifiers
      </div>
    </div>
  </>
)}
```

Pairing the [<VPIcon icon="iconfont icon-shadcn"/>shadcn alert](https://shadcnspace.com/components/alert) with a progress bar does two jobs at once: the alert states the current status in words, while the progress bar gives a rough sense of how much is left, without promising a specific time. Neither one alone tells the full story, the alert alone feels static, and a progress bar alone doesn't explain what's actually being checked.

Worth adding here, and easy to skip when a demo only shows the success path: a mismatch state, where the tax ID on the document doesn't match the company registry, deserves its own alert with a clear next step: contact support or re-upload a corrected document. It's not shown above, since the flow currently resolves to either checking or verified, but it's the state a production version of this flow would hit the most.

::: info Live Preview

![Step 3: Verification status with an alert](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/55f02dfe-af23-4d07-aaaa-868e2a7fb834.png)

:::

---

## Adding a Stepper to the Flow

The stepper is the visual anchor of the whole flow. It's the piece that tells the user how much is left before the checking and account-type-selecting are done.

```tsx :collapsed-lines
function Stepper({ current }: { current: Step }) {
  return (
    <nav
      aria-label="Onboarding progress"
      className="grid grid-cols-[minmax(0,1fr)_minmax(2rem,5rem)_minmax(0,1fr)_minmax(2rem,5rem)_minmax(0,1fr)] items-start gap-0"
    >
      {steps.map((step, index) => (
        <div key={step.number} className="contents">
          <div className="flex min-w-0 flex-col items-center text-center">
            <div
              className={cn(
                'flex size-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                current > step.number
                  ? 'border-primary bg-primary text-primary-foreground'
                  : current === step.number
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-background text-muted-foreground'
              )}
              aria-current={current === step.number ? 'step' : undefined}
            >
              {current > step.number ? <Check className="size-4" aria-hidden="true" /> : step.number}
            </div>
            <div className="mt-2 min-w-0">
              <p className={cn('truncate text-sm font-semibold', current >= step.number ? 'text-foreground' : 'text-muted-foreground')}>
                {step.label}
              </p>
              <p className="mt-1 hidden text-xs leading-5 text-muted-foreground sm:block">{step.caption}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={cn('mt-4 h-px w-full', current > step.number ? 'bg-primary' : 'bg-border')} />
          )}
        </div>
      ))}
    </nav>
  )
}
```

The `current > step.number` check keeps the entire stepper in sync with a single comparison. It determines the circle’s fill color, decides when the step number should be replaced by a checkmark, and controls whether the connecting line to the next step is filled.

This is important because the stepper only needs one piece of state, `step`, from the parent component. It doesn’t need to know why the user is on step 2, it only needs to know which step is currently active and update its visual state accordingly.

The "continue" logic that actually advances `step` lives outside the stepper itself:

```js
const continueStep = () => {
  if (step === 1) setStep(2)
  else if (step === 2 && file) {
    setStep(3)
    setChecking(true)
    window.setTimeout(() => {
      setChecking(false)
      setVerified(true)
    }, 1400)
  }
}
```

Keeping this in the page component, not inside the [<VPIcon icon="iconfont icon-shadcn"/>shadcn stepper](https://shadcnspace.com/components/stepper) itself, is what keeps the stepper reusable. It only renders progress. Whether the user is allowed to move forward, a file is required on step 2, or whether nothing is required on step 1, is a decision for the flow around it to make.

---

## Small Details that Make it Feel Finished

A few things in this build are easy to skip but change how the flow feels in practice:

- **A dark mode toggle** in the header, wired to a `darkMode` state that toggles a class on `document.documentElement`. It's small, but it means the flow doesn't fight a user's system theme preference.
- **A security note** in the sidebar, stating documents are encrypted and deleted after verification. This is copy, not code, but it answers the question a corporate user is quietest about and most worried by: what happens to the file after I upload it.
- **A "Selected" confirmation line** under the radio group, restating the chosen tier in plain text. A small detail, but it removes any doubt about what was actually selected before moving on.

If you're looking to wrap a flow like this inside a full application shell, with navigation and a dashboard around it, the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Dashboard](https://shadcnspace.com/admin-dashboard) starter uses the same component set. It's a reasonable base to extend from rather than building a shell from scratch.

::: info Live Preview

```component VPCard
{
  "title": "Workspace onboarding | WrapPixel",
  "desc": "Secure enterprise workspace onboarding and business verification for WrapPixel.",
  "link": "https://onboarding-kyc-flow.vercel.app/",
  "logo": "https://onboarding-kyc-flow.vercel.app/icon.svg",
  "background": "rgba(0,99,211,0.2)"
}
```

:::

::: info

This project is open source, and you can easily download the zip and if you like. Please consider giving it a star.

<SiteInfo
  name="vaibhavsudo/onboarding-kyc-flow"
  desc="Build a three-step KYC onboarding flow in React using shadcn stepper, radio group, file upload, and alert components, with real code and accessibility notes."
  url="https://github.com/vaibhavsudo/onboarding-kyc-flow/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a72181b42ec0890a1f6401480d613e180464d663c1223c0f650013e3f10c26e8/vaibhavsudo/onboarding-kyc-flow"/>

:::

::: note Accessibility notes

- The stepper's `nav` element has an `aria-label`, and the current step carries `aria-current="step"`, so assistive technology can identify progress without relying on visual position alone.
- The radio group sits inside a `fieldset` with a screen-reader-only `legend`, grouping the three account types as one decision.
- Icons throughout (`Check`, `AlertCircle`, `UploadCloud`, and so on) carry `aria-hidden="true"`, since they're decorative next to text that already states the same information. This stops screen readers from announcing redundant icon labels.
- The remove-file button has an explicit `aria-label`, since its visible content is an icon only, with no text.

:::

::: important Key Concepts Recap

- Account type comes first because it's the one decision most likely to affect the rest of the flow, and it's kept in state at the page level, not inside the radio group itself.
- File validation runs in a shared function used by both the drag-and-drop path and the click-to-browse path, so both paths apply the same PDF/CSV validation.
- Verification status is communicated with both words (the alert) and a rough sense of progress (the progress bar), since either one alone leaves out part of the picture.
- The stepper is a pure display component driven by a single `step` value from its parent. The logic for whether the user can advance lives outside it, not inside it.
- Small, non-technical details (like a security note, a confirmation line, or a theme toggle) do as much for how finished a flow feels as any of the four core components.

:::

---

## Conclusion

None of the four components in this flow are complicated individually. What makes a KYC flow work is the decisions around them: which choice comes first, where validation actually runs, and how honestly the interface talks to the user while something outside their control is being checked.

Whether the first draft comes from typing every line by hand or from scaffolding it with an MCP server and v0, that's the part worth spending time getting right before it ships.

::: info Resources

<SiteInfo
  name="393+ Shadcn Components and Variants"
  desc="Open-source collection of reusable Shadcn components and variants for React apps. Built on Base UI and Radix UI primitives, styled with Tailwind CSS. Preview, copy, or install via the shadcn CLI."
  url="https://shadcnspace.com/components"
  logo="https://shadcnspace.com/components/favicon.ico?favicon.0hiis3chfprji.ico?dpl=dpl_BMFBXNaCimLt9BFqUVArxDtn1SQw"
  preview="https://shadcnspace.com/images/og-images/OG-components.webp"/>

<SiteInfo
  name="Shadcn UI Blocks, Templates, and Components | Free and Pro"
  desc="A collection of beautifully designed Shadcn UI blocks, components, templates, and dashboard layouts for React. Built on Base UI and Radix UI primitives, styled with Tailwind CSS, ready to copy-paste or install via the shadcn CLI."
  url="https://shadcnspace.com"
  logo="https://shadcnspace.com/favicon.ico?favicon.0hiis3chfprji.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Remote MCP server for Shadcn UI"
  desc="Free Shadcn Space shadcn/ui MCP server that lets AI tools browse, search, and install UI components from a registry. Provides component context, including props, variants, and usage to generate TypeScript code for React. Works with Claude, Cursor, and VS Code."
  url="https://shadcnspace.com/mcp"
  logo="/favicon.ico?favicon.0hiis3chfprji.ico"
  preview="https://shadcnspace.com/images/og-images/OG-MCP-page.webp"/>

<SiteInfo
  name="ARIA: aria-current attribute - ARIA | MDN"
  desc="A non-null aria-current state on an element indicates that this element represents the current item within a container or set of related elements."
  url="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>


<SiteInfo
  name="What is the Model Context Protocol (MCP)? - Model Context Protocol"
  desc="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."
  url="https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro/"
  logo="https://modelcontextprotocol.io/mintlify-assets/_mintlify/favicons/mcp/ebiVJzri-bsiCfVZ/_generated/favicon-dark/favicon.ico"
  preview="https://raw.githubusercontent.com/modelcontextprotocol/docs/2eb6171ddbfeefde349dc3b8d5e2b87414c26250/images/og-image.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a Scalable KYC Onboarding Flow in React with Shadcn UI",
  "desc": "Every B2B SaaS product with a compliance requirement (like banking, lending, payroll, or crypto) hits the same wall early on: before you can let a business use your platform, you need to verify who th",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-kyc-onboarding-flow-with-shadcn-ui.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
