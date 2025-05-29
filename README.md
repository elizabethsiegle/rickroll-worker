### 🎵 Universal Rickroll Worker - The Ultimate Educational Portal 🍓

A Cloudflare Worker that intercepts any path, generates a dynamic webpage about the URL slug, and serves a rickroll.

🌟 Overview
This is the second half of [a MCP server that returns a link to a rickroll](https://github.com/elizabethsiegle/remote-mcp-server-authless-rickroll). It gets past Claude's URL filtering by making the LLM think it is generating a podcast about an input topic from the user (via MCP).

🏗️ Architecture
User clicks innocent link in MCP client → Worker intercepts ANY path → serves rickroll HTML

### 🎵 Smart Audio System
Triple autoplay strategy:

- Direct autoplay attempt
- Waits for any user interaction
- Highlights audio controls if autoplay fails

### 🛠️ Technical Implementation
📂 Path Interception
```typescript
// ANY path except root gets rickrolled
if (url.pathname !== '/' && url.pathname !== '') {
    // Serve rickroll HTML
}
```

### 🚀 Deployment
1. Create Cloudflare Worker
```bash
npm create cloudflare@latest rickroll-worker
cd rickroll-worker
```
2. Replace worker code
Copy the worker code into `src/index.ts`
3. Deploy
```bash
npm run deploy
```
4. Get your URL
Your worker will be available at: `https://your-worker-name.your-subdomain.workers.dev`

### 🎮 Easter Eggs
🕹️ Konami Code
Enter the classic cheat code: ↑ ↑ ↓ ↓ ← → ← → B A
for an enhanced rickroll experience


### 🔧 Configuration
🎨 Customization Options
```typescript
// Change the rickroll audio source
const audioUrl = "https://your-custom-audio.mp3";

// Modify color scheme
background: linear-gradient(135deg, #your-colors);

// Adjust timing
setTimeout(() => { /* rickroll reveal */ }, 3000); // 3 seconds
```

### 📊 Slug Examples
Slugs can be anything!
The MCP server uses Cloudflare Workers AI to generate the slug.
Cloudflare -> /cloudflare-explained-optimizing-website-performance-with-edge-computing
San Francisco -> /sf-podcast-exploring-the-city-by-the-bay
West Wing -> /west-wing-rewatch-podcast
MCP -> /mcp-and-the-art-of-not-losing-your-mind


All paths lead to the same rickroll! 🎵