import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — terry.so" },
      { name: "description", content: "Terry So (NEE) — 全栈开发者，专注 AI Agent 工具链、Swift/macOS 原生开发与开源工具创造。" },
      { property: "og:title", content: "About Terry So — AI Agent & Swift 开发者" },
      { property: "og:description", content: "认识 Terry So (NEE)：开源 Agent SDK 作者、SwiftWork 维护者、Claude Code 工具链贡献者。" },
      { property: "og:url", content: "https://blog.suchuanyi.dev/about" },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: "https://blog.suchuanyi.dev/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Terry So",
          alternateName: "NEE",
          url: "https://blog.suchuanyi.dev/about",
          jobTitle: "Fullstack Developer",
          description: "Fullstack developer focused on AI Agent tooling and Swift/macOS native development.",
          sameAs: [
            "https://github.com/terryso",
            "https://x.com/suchuanyi",
          ],
        }),
      },
    ],
  }),
});

function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <pre className="text-xs text-accent mb-2">$ cat ~/about.md</pre>
      <h1 className="text-3xl font-bold mb-6">whoami</h1>
      <div className="markdown">
        <p>
          I'm <strong>NEE</strong> — a fullstack developer based in China, currently deep into{" "}
          <strong>AI Agent tooling</strong> and <strong>Swift/macOS native development</strong>.
        </p>
        <p>
          This blog is where I document the process of taking things apart and building them back up —
          SDK internals, Agent architectures, developer tools, and whatever catches my curiosity.
        </p>

        <h2>Open Source</h2>
        <p>A few projects I maintain:</p>
        <ul>
          <li><a href="https://github.com/terryso/open-agent-sdk-swift" target="_blank">Open Agent SDK (Swift)</a> — AI Agent SDK without CLI dependencies, completely open source</li>
          <li><a href="https://github.com/terryso/SwiftWork" target="_blank">SwiftWork</a> — macOS native AI Agent workbench with real-time visualization</li>
          <li><a href="https://github.com/terryso/claude-auto-resume" target="_blank">claude-auto-resume</a> — auto-resume Claude CLI when usage limits reset</li>
          <li><a href="https://github.com/terryso/AutoQA-Agent" target="_blank">AutoQA-Agent</a> — automated QA CLI built on Claude Agent SDK</li>
          <li><a href="https://github.com/terryso/ccpet" target="_blank">ccpet</a> — a virtual pet for your Claude Code status line</li>
        </ul>

        <h2>Links</h2>
        <ul>
          <li><a href="https://github.com/terryso" target="_blank">GitHub</a></li>
          <li><a href="https://x.com/suchuanyi" target="_blank">Twitter / X</a></li>
        </ul>

        <h2>Colophon</h2>
        <p>
          This site is plain-text first. Every post is a Markdown file in{" "}
          <code>content/posts/</code>. Built with TanStack Start + Vite, deployed on Cloudflare.
        </p>

        <h2>Keyboard shortcuts</h2>
        <ul>
          <li><kbd>g</kbd> — go home</li>
          <li><kbd>t</kbd> — tags</li>
          <li><kbd>a</kbd> — about</li>
          <li><kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> — command palette</li>
        </ul>
      </div>
    </div>
  );
}
