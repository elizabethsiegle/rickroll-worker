export interface Env {
	AI: any;
    DB: D1Database;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		
		// Enable CORS
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// NEW LOGIC: Default behavior is audio podcast, rickroll is the bonus feature!
		if (url.pathname !== '/' && url.pathname !== '') {
			const slug = url.pathname.substring(1); // Remove leading slash
			
			// Check if this is a RICKROLL request (starts with "rickroll-")
			if (slug.startsWith('rickroll-')) {
				console.log(`Processing rickroll request for slug: ${slug}`);
				
				// Extract topic from slug (remove "rickroll-" prefix)
				const topicSlug = slug.replace('rickroll-', '');
				const decodedTopic = decodeURIComponent(topicSlug).replace(/-/g, ' ');
				
				// Generate dynamic content based on the topic
				const { theme, title, description, icon, backgroundColor } = generateTopicTheme(decodedTopic);

				const rickrollHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - SURPRISE!</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        
        body {
            font-family: 'Comic Neue', 'Comic Sans MS', cursive;
            background: ${backgroundColor};
            color: white;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow-x: hidden;
        }
        
        /* Animated background bubbles */
        .bubble {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            animation: float 6s ease-in-out infinite;
            pointer-events: none;
        }
        
        .bubble:nth-child(1) { width: 80px; height: 80px; top: 10%; left: 10%; animation-delay: 0s; }
        .bubble:nth-child(2) { width: 120px; height: 120px; top: 20%; left: 80%; animation-delay: 2s; }
        .bubble:nth-child(3) { width: 60px; height: 60px; top: 60%; left: 5%; animation-delay: 4s; }
        .bubble:nth-child(4) { width: 100px; height: 100px; top: 70%; left: 85%; animation-delay: 1s; }
        .bubble:nth-child(5) { width: 40px; height: 40px; top: 40%; left: 90%; animation-delay: 3s; }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        .portal {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 30px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            padding: 50px;
            max-width: 650px;
            text-align: center;
            box-shadow: 
                0 30px 60px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.4);
            position: relative;
            z-index: 10;
            margin-bottom: 80px;
        }
        
        h1 {
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 
                2px 2px 4px rgba(0, 0, 0, 0.5),
                0 0 20px rgba(255, 255, 255, 0.8);
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
            from { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.8); }
            to { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 165, 0, 0.8); }
        }
        
        .loading {
            font-size: 1.4em;
            margin: 30px 0;
            font-weight: 700;
        }
        
        .spinner {
            width: 60px;
            height: 60px;
            border: 6px solid rgba(255, 255, 255, 0.3);
            border-top: 6px solid #ff6b35;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 30px auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .surprise {
            font-size: 4em;
            margin: 30px 0;
            animation: bounce 1s infinite, rainbow 3s linear infinite;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-15px); }
            60% { transform: translateY(-8px); }
        }
        
        @keyframes rainbow {
            0% { color: #ff6b35; }
            25% { color: #f7931e; }
            50% { color: #ffcd3c; }
            75% { color: #ff8c42; }
            100% { color: #ff6b35; }
        }
        
        .message {
            font-size: 1.6em;
            margin: 30px 0;
            line-height: 1.8;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
        }
        
        audio {
            width: 100%;
            margin: 30px 0;
            border-radius: 15px;
            border: 3px solid rgba(255, 255, 255, 0.4);
            background: rgba(255, 255, 255, 0.1);
        }
        
        .path-info {
            background: rgba(255, 255, 255, 0.2);
            padding: 20px;
            border-radius: 15px;
            margin: 25px 0;
            font-family: 'Comic Neue', cursive;
            font-size: 1em;
            border: 2px solid rgba(255, 255, 255, 0.3);
            font-weight: 700;
        }
        
        .theme-icon {
            font-size: 5em;
            margin: 30px 0;
            animation: wiggle 2s ease-in-out infinite;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
        }
        
        @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
        }
        
        .back-link {
            position: fixed;
            top: 20px;
            left: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .back-link:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        
        /* Sticky footer */
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(90deg, #ff6b35 0%, #f7931e 50%, #ff8c42 100%);
            padding: 15px 20px;
            text-align: center;
            box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.3);
            border-top: 2px solid rgba(255, 255, 255, 0.4);
            z-index: 1000;
            font-weight: 700;
        }
        
        .footer a {
            color: white;
            text-decoration: none;
            font-size: 1.1em;
            transition: all 0.3s ease;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .footer a:hover {
            color: #ffcd3c;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            transform: scale(1.05);
        }
        
        /* Confetti animation */
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #ffcd3c;
            animation: confetti-fall 3s linear infinite;
            pointer-events: none;
        }
        
        @keyframes confetti-fall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        /* Make content area have bottom padding for footer */
        .content-wrapper {
            padding-bottom: 80px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 80px);
        }

        .topic-highlight {
            background: rgba(255, 255, 255, 0.25);
            padding: 15px 25px;
            border-radius: 20px;
            margin: 20px 0;
            font-size: 1.3em;
            font-weight: 700;
            border: 2px solid rgba(255, 255, 255, 0.4);
            text-transform: capitalize;
        }
    </style>
</head>
<body>
    <a href="/${topicSlug}" class="back-link">← Back to Podcast</a>
    
    <!-- Animated background bubbles -->
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    
    <div class="content-wrapper">
        <div class="portal">
            <h1>🎙️ BONUS CONTENT!</h1>
            
            <div class="theme-icon">${icon}</div>
            
            <div class="topic-highlight">
                🎉 "${decodedTopic}" Bonus Experience
            </div>
            
            <div class="path-info">
                <strong>Surprise Topic:</strong> ${decodedTopic}<br>
                <strong>Content Type:</strong> Classic Audio Experience<br>
                <strong>Theme:</strong> ${theme}<br>
                <strong>Status:</strong> <span id="status">Loading bonus content...</span>
            </div>
            
            <div class="loading" id="loading">
                <div class="spinner"></div>
                You clicked "But wait, there's more!" and here's your bonus content...
            </div>
            
            <div id="surprise" style="display: none;">
                <div class="surprise">🎵 GOTCHA! 🎵</div>
                <div class="message">
                    You thought there was more podcast content... 💕<br>
                    But instead you get this classic experience! 😄<br>
                    <small>Hope you enjoyed the real podcast first!</small>
                </div>
                <audio id="rickrollAudio" controls loop>
                    <source src="https://demo.twilio.com/docs/classic.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <p style="font-size: 1.3em; font-weight: 700;">🎶 Never gonna give you up, never gonna let you down! 🎶</p>
                <div class="path-info">
                    You wanted more "${decodedTopic}" content...<br>
                    And got rickrolled instead! 😉<br>
                    Original podcast: <a href="/${topicSlug}" style="color: #ffcd3c;">/${topicSlug}</a><br>
                    Bonus URL: <code>${url.pathname}</code>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Sticky Footer -->
    <div class="footer">
        <a href="https://github.com/elizabethsiegle/remote-mcp-server-authless-rickroll" target="_blank">
            🚀 Podcast Portal with Bonus Content Surprise! 🚀
        </a>
    </div>

    <script>
        // Create confetti
        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = ['#ff6b35', '#f7931e', '#ffcd3c', '#ff8c42'][Math.floor(Math.random() * 4)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
        
        // Update status
        document.getElementById('status').textContent = 'Loading bonus "${decodedTopic}" content...';
        
        // Show the surprise after a delay
        setTimeout(() => {
            document.getElementById('status').textContent = 'Bonus Content Ready!';
            document.getElementById('loading').style.display = 'none';
            document.getElementById('surprise').style.display = 'block';
            
            // Auto-play audio with multiple attempts
            const audio = document.getElementById('rickrollAudio');
            
            // Try multiple autoplay strategies
            const tryAutoplay = async () => {
                try {
                    // First attempt: direct play
                    await audio.play();
                    console.log('Autoplay successful!');
                } catch (e) {
                    console.log('Direct autoplay failed, trying user interaction method');
                    
                    // Second attempt: wait for any user interaction
                    const enableAutoplay = () => {
                        audio.play().catch(console.log);
                        document.removeEventListener('click', enableAutoplay);
                        document.removeEventListener('touchstart', enableAutoplay);
                        document.removeEventListener('keydown', enableAutoplay);
                    };
                    
                    document.addEventListener('click', enableAutoplay);
                    document.addEventListener('touchstart', enableAutoplay);
                    document.addEventListener('keydown', enableAutoplay);
                    
                    // Third attempt: make audio controls more prominent
                    audio.style.border = '4px solid #ffcd3c';
                    audio.style.boxShadow = '0 0 20px #ffcd3c';
                    audio.style.animation = 'glow 1s ease-in-out infinite alternate';
                }
            };
            
            tryAutoplay();
            
            // Start confetti
            setInterval(createConfetti, 300);
            
        }, 3000);
        
        // Easter egg: konami code for extra effects
        let konamiCode = [];
        const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > 10) konamiCode.shift();
            
            if (konamiCode.join('') === konami.join('')) {
                document.body.style.animation = 'rainbow 0.5s linear infinite';
                for (let i = 0; i < 50; i++) {
                    setTimeout(createConfetti, i * 50);
                }
            }
        });
    </script>
</body>
</html>`;

				return new Response(rickrollHtml, {
					headers: {
						'Content-Type': 'text/html',
						...corsHeaders,
					},
				});
			}
			
			// DEFAULT: Any other non-root path goes to AUDIO PODCAST (this is now the main experience)
			console.log(`Processing audio podcast request for slug: ${slug}`);
			
			// Extract topic from slug
			const decodedTopic = decodeURIComponent(slug).replace(/-/g, ' ');
				
				let script = "";
				let audioDataUrl = "";
				let generationError = null;
				let fromCache = false;
				
				// Step 1: Check if this podcast already exists in database
				try {
					if (env.DB) {
						console.log(`Checking database for existing podcast: ${slug}`);
						const stmt = env.DB.prepare("SELECT script, audio_data, created_at FROM podcasts WHERE slug = ?");
						const existingPodcast = await stmt.bind(slug).first();
						
						if (existingPodcast && existingPodcast.script && existingPodcast.audio_data) {
							console.log(`Found existing podcast in database for slug: ${slug}`);
							script = existingPodcast.script as string;
							audioDataUrl = existingPodcast.audio_data as string;
							fromCache = true;
						}
					}
				} catch (dbError) {
					console.warn("Database lookup failed, will generate new:", dbError);
				}
				
				// Step 2: If not found in database, generate new podcast
				if (!script || !audioDataUrl) {
					console.log(`Generating new audio for topic: ${decodedTopic}`);
					
					try {
						// Generate script
						const scriptMessages = [
							{
								role: "system",
								content: "You are a professional podcast script writer. Create engaging, conversational podcast scripts that sound natural when spoken aloud. Keep scripts concise but informative, typically 2-3 minutes when read aloud (about 300-450 words). Use a friendly, enthusiastic tone with natural speech patterns."
							},
							{
								role: "user",
								content: `Write a brief podcast script about "${decodedTopic}". The script should start with an engaging hook, cover 2-3 key points, use natural conversational language, and end with a memorable conclusion. Return only the script text.`
							}
						];

						console.log("Generating podcast script...");
						const scriptResponse: any = await env.AI.run("@cf/meta/llama-4-scout-17b-16e-instruct", {
							messages: scriptMessages,
						});

						if (scriptResponse.response) {
							script = scriptResponse.response;
							console.log(`Generated script: ${script.substring(0, 100)}...`);

							// Generate audio from script
							console.log("Converting script to audio...");
							const audioResponse: any = await env.AI.run("@cf/myshell-ai/melotts", {
								prompt: script,
								lang: "en",
							});

							if (audioResponse?.audio) {
								audioDataUrl = `data:audio/mp3;base64,${audioResponse.audio}`;
								console.log("Audio generated successfully");
								
								// Step 3: Save to database for future fast loading
								await savePodcastToDatabase(env.DB, slug, decodedTopic, script, audioDataUrl);
							} else {
								throw new Error("No audio data returned");
							}
						} else {
							throw new Error("Failed to generate script");
						}
					} catch (error) {
						console.error("Audio generation failed:", error);
						generationError = error as string;
					}
				}
				
				// Generate dynamic content based on the topic
				const { theme, title, description, icon, backgroundColor } = generateTopicTheme(decodedTopic);

				const audioPodcastHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎧 ${title} - Audio Podcast</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: ${backgroundColor};
            color: white;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 40px;
        }
        
        .podcast-container {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            padding: 40px;
            max-width: 800px;
            width: 100%;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            margin-bottom: 40px;
        }
        
        h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            font-weight: 700;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .podcast-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .icon {
            font-size: 4em;
            margin: 20px 0;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
        }
        
        .audio-section {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            margin: 25px 0;
            border: 1px solid rgba(255, 255, 255, 0.2);
            text-align: center;
        }
        
        .audio-section h2 {
            margin-top: 0;
            color: rgba(255, 255, 255, 0.95);
            font-size: 1.5em;
            margin-bottom: 20px;
        }
        
        .audio-player {
            width: 100%;
            max-width: 500px;
            margin: 20px auto;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.1);
            border: 3px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .play-button {
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            border: none;
            color: white;
            padding: 15px 30px;
            font-size: 1.2em;
            font-weight: 700;
            border-radius: 50px;
            cursor: pointer;
            margin: 20px 10px;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
        }
        
        .play-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.6);
        }
        
        .play-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .download-button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            border: none;
            color: white;
            padding: 12px 25px;
            font-size: 1em;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            margin: 20px 10px;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .download-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }
        
        .script-section {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            margin: 25px 0;
            text-align: left;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .script-section h2 {
            margin-top: 0;
            color: rgba(255, 255, 255, 0.95);
            font-size: 1.5em;
            margin-bottom: 20px;
        }
        
        .script-text {
            font-family: 'Georgia', serif;
            line-height: 1.8;
            font-size: 1.1em;
            color: rgba(255, 255, 255, 0.9);
            white-space: pre-wrap;
        }
        
        .loading-spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #ff6b35;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .success-badge {
            display: inline-block;
            background: rgba(76, 175, 80, 0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 10px 5px;
        }
        
        .error-badge {
            display: inline-block;
            background: rgba(244, 67, 54, 0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 10px 5px;
        }
        
        .back-link {
            position: fixed;
            top: 20px;
            left: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .back-link:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        
        .metadata {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 25px 0;
            font-size: 0.9em;
        }
        
        .metadata-item {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .metadata-item strong {
            color: rgba(255, 255, 255, 0.95);
            display: block;
            margin-bottom: 5px;
        }
        
        @media (max-width: 768px) {
            .podcast-container {
                padding: 25px;
                margin: 10px;
            }
            
            h1 {
                font-size: 2em;
            }
            
            .metadata {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <a href="/" class="back-link">← Home</a>
    
    <div class="podcast-container">
        <div class="podcast-header">
            <div class="icon">${icon}</div>
            <h1>🎧 ${decodedTopic}</h1>
            <div class="success-badge">🎵 Audio Podcast</div>
        </div>
        
        <div class="metadata">
            <div class="metadata-item">
                <strong>📻 Topic:</strong>
                ${decodedTopic}
            </div>
            <div class="metadata-item">
                <strong>🎯 Category:</strong>
                ${theme}
            </div>
            <div class="metadata-item">
                <strong>⏱️ Duration:</strong>
                ~2-3 minutes
            </div>
            <div class="metadata-item">
                <strong>🔗 Generated:</strong>
                Just now
            </div>
        </div>
        
        <div class="audio-section">
            <h2>🎧 Listen to Your Podcast</h2>
            ${audioDataUrl ? `
                <audio id="podcastAudio" class="audio-player" controls preload="metadata">
                    <source src="${audioDataUrl}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <div class="audio-controls">
                    <button class="play-button" onclick="togglePlayPause()">
                        <span id="playButtonText">▶️ Play Podcast</span>
                    </button>
                    <a href="${audioDataUrl}" download="podcast-${decodedTopic.replace(/\s+/g, '-')}.mp3" class="download-button">
                        💾 Download MP3
                    </a>
                </div>
                <div class="success-badge">✅ Audio Generated Successfully</div>
                ${fromCache ? '<div class="success-badge">⚡ Loaded from Cache</div>' : '<div class="success-badge">🎯 Freshly Generated</div>'}
            ` : `
                <div class="loading-spinner"></div>
                <p><strong>⚠️ Audio Generation ${generationError ? 'Failed' : 'In Progress'}</strong></p>
                ${generationError ? `
                    <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9em;">
                        <strong>Error Details:</strong> ${generationError}
                    </p>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9em;">
                        This might be due to:
                        <br>• Temporary AI service overload
                        <br>• Topic complexity issues  
                        <br>• Network connectivity problems
                        <br><br><strong>Try refreshing in a few moments</strong>
                    </p>
                ` : `
                    <p>Generating your podcast audio, please wait...</p>
                    <div class="error-badge">Audio generation may take a moment</div>
                `}
            `}
        </div>
        
        ${script ? `
            <div class="script-section">
                <h2>📝 Podcast Script</h2>
                <div class="script-text">${script.replace(/\n/g, '<br>')}</div>
                <div class="success-badge">✅ Script Generated</div>
            </div>
        ` : ''}
        
        <div style="margin-top: 40px; padding: 25px; background: rgba(255, 255, 255, 0.1); border-radius: 15px; text-align: center;">
            <p><strong>🎙️ AI-Generated Audio Podcast</strong></p>
            <p>This podcast was automatically generated using Cloudflare Workers AI from your query: "${decodedTopic}"</p>
            <p style="font-size: 0.9em; color: rgba(255, 255, 255, 0.7);">
                ${fromCache ? `Loaded from cache • Originally generated: ${new Date().toLocaleString()}` : `Freshly generated: ${new Date().toLocaleString()}`}
            </p>
            
            <!-- THE MAGIC BUTTON! -->
            <div style="margin-top: 30px;">
                <button onclick="window.location.href='/rickroll-${slug}'" style="
                    background: linear-gradient(45deg, #ff6b35, #f7931e, #ffcd3c);
                    border: none;
                    color: white;
                    padding: 15px 30px;
                    font-size: 1.3em;
                    font-weight: 700;
                    border-radius: 50px;
                    cursor: pointer;
                    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.6);
                    transition: all 0.3s ease;
                    animation: pulse 2s infinite;
                " onmouseover="this.style.transform='translateY(-3px) scale(1.05)'" onmouseout="this.style.transform='translateY(0) scale(1)'">
                    🎉 But wait, there's MORE! 🎉
                </button>
            </div>
            
            <style>
                @keyframes pulse {
                    0% { box-shadow: 0 8px 25px rgba(255, 107, 53, 0.6); }
                    50% { box-shadow: 0 8px 35px rgba(255, 107, 53, 0.9), 0 0 0 10px rgba(255, 107, 53, 0.1); }
                    100% { box-shadow: 0 8px 25px rgba(255, 107, 53, 0.6); }
                }
            </style>
        </div>
    </div>

    <script>
        const audio = document.getElementById('podcastAudio');
        const playButton = document.querySelector('.play-button');
        const playButtonText = document.getElementById('playButtonText');
        
        function togglePlayPause() {
            if (audio) {
                if (audio.paused) {
                    audio.play();
                    playButtonText.textContent = '⏸️ Pause Podcast';
                } else {
                    audio.pause();
                    playButtonText.textContent = '▶️ Play Podcast';
                }
            }
        }
        
        if (audio) {
            audio.addEventListener('play', () => {
                playButtonText.textContent = '⏸️ Pause Podcast';
            });
            
            audio.addEventListener('pause', () => {
                playButtonText.textContent = '▶️ Play Podcast';
            });
            
            audio.addEventListener('ended', () => {
                playButtonText.textContent = '🔄 Play Again';
            });
            
            audio.addEventListener('loadstart', () => console.log('Audio loading started'));
            audio.addEventListener('canplay', () => console.log('Audio can start playing'));
            audio.addEventListener('error', (e) => console.error('Audio error:', e));
        }
        
        // Auto-reload if generation failed and no error shown (for retry)
        ${!audioDataUrl && !generationError ? `
        setTimeout(() => {
            console.log('Reloading to retry audio generation...');
            window.location.reload();
        }, 5000);
        ` : ''}
    </script>
</body>
</html>`;

				return new Response(audioPodcastHtml, {
					headers: {
						'Content-Type': 'text/html',
						...corsHeaders,
					},
				});
			}
			
			// If we reach here, it's not a rickroll request, so treat as regular audio podcast
			// (This is the new default behavior for all URLs)

		// Root path shows available "podcast services"
		return new Response(`🎙️ AI Podcast Portal

Welcome to the AI-powered podcast platform!

🎧 How it works:
1. Visit any topic URL = Get a real AI podcast with MP3!
2. Click "But wait, there's more!" = Get a fun bonus surprise!

Examples:
• /machine-learning = AI podcast about machine learning + bonus
• /cooking-tips = AI podcast about cooking + bonus  
• /space-exploration = AI podcast about space + bonus

Features:
✅ Real AI-generated scripts
✅ MP3 audio synthesis  
✅ Smart caching for fast reloads
✅ Bonus content surprises
✅ Professional podcast experience

All topics lead to real podcasts with bonus content! 🎵✨`, {
			headers: {
				'Content-Type': 'text/plain',
				...corsHeaders,
			},
		});
	},
};

// Helper function to save podcast to database
async function savePodcastToDatabase(db: any, slug: string, topic: string, script: string, audioData: string) {
	if (!db) {
		console.warn("No database binding available, cannot save podcast");
		return false;
	}
	
	try {
		console.log(`Attempting to save podcast to database with slug: ${slug}`);
		
		// Ensure required columns exist (migration)
		try {
			await db.prepare("ALTER TABLE podcasts ADD COLUMN script TEXT").run();
			console.log("Added script column");
		} catch (e) {
			// Column might already exist, this is fine
		}
		
		try {
			await db.prepare("ALTER TABLE podcasts ADD COLUMN audio_data TEXT").run();
			console.log("Added audio_data column");
		} catch (e) {
			// Column might already exist, this is fine
		}

		// Use INSERT OR REPLACE to handle duplicates
		const stmt = db.prepare(`
			INSERT OR REPLACE INTO podcasts (slug, topic, url, script, audio_data, created_at) 
			VALUES (?, ?, ?, ?, ?, datetime('now'))
		`);
		
		const url = `https://podcaster.lizziepika.workers.dev/${slug}`;
		const result = await stmt.bind(slug, `Audio: ${topic}`, url, script, audioData).run();
		
		console.log(`Successfully saved podcast to database: ${slug}`, result);
		return true;
	} catch (error) {
		console.error("Failed to save podcast to database:", error);
		console.error("Error details:", JSON.stringify(error, null, 2));
		
		// Try a fallback with just basic columns
		try {
			console.log("Attempting fallback save with basic columns...");
			const fallbackStmt = db.prepare(`
				INSERT OR REPLACE INTO podcasts (slug, topic, url, created_at) 
				VALUES (?, ?, ?, datetime('now'))
			`);
			const url = `https://podcaster.lizziepika.workers.dev/${slug}`;
			await fallbackStmt.bind(slug, `Audio: ${topic}`, url).run();
			console.log("Fallback save successful (without script/audio data)");
			return false; // Indicate that full save failed
		} catch (fallbackError) {
			console.error("Even fallback save failed:", fallbackError);
			return false;
		}
	}
}

// Function to generate theme based on topic
function generateTopicTheme(topic: string) {
	const topicLower = topic.toLowerCase();
	
	// Technology/AI themes
	if (topicLower.includes('artificial intelligence') || topicLower.includes('ai') || topicLower.includes('machine learning') || topicLower.includes('tech')) {
		return {
			theme: 'technology',
			title: 'AI & Technology Podcast Hub',
			description: 'Loading cutting-edge technology content...',
			icon: '🤖',
			backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)'
		};
	}
	
	// Science themes
	if (topicLower.includes('science') || topicLower.includes('physics') || topicLower.includes('chemistry') || topicLower.includes('biology')) {
		return {
			theme: 'science',
			title: 'Science Discovery Podcast',
			description: 'Loading scientific exploration content...',
			icon: '🔬',
			backgroundColor: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 25%, #a8edea 50%, #fed6e3 75%, #d299c2 100%)'
		};
	}
	
	// Business themes
	if (topicLower.includes('business') || topicLower.includes('startup') || topicLower.includes('entrepreneur') || topicLower.includes('finance')) {
		return {
			theme: 'business',
			title: 'Business Excellence Podcast',
			description: 'Loading professional development content...',
			icon: '💼',
			backgroundColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff8a80 50%, #ff7043 75%, #bf360c 100%)'
		};
	}
	
	// Entertainment/Music themes
	if (topicLower.includes('music') || topicLower.includes('entertainment') || topicLower.includes('movie') || topicLower.includes('celebrity')) {
		return {
			theme: 'entertainment',
			title: 'Entertainment Tonight Podcast',
			description: 'Loading entertainment content...',
			icon: '🎵',
			backgroundColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #fecfef 50%, #ff9a9e 75%, #f093fb 100%)'
		};
	}
	
	// Health/Wellness themes
	if (topicLower.includes('health') || topicLower.includes('wellness') || topicLower.includes('fitness') || topicLower.includes('mental')) {
		return {
			theme: 'health',
			title: 'Wellness & Health Podcast',
			description: 'Loading health and wellness content...',
			icon: '🏥',
			backgroundColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #d299c2 50%, #fef9d7 75%, #ebc0fd 100%)'
		};
	}
	
	// Nature/Environment themes
	if (topicLower.includes('nature') || topicLower.includes('environment') || topicLower.includes('climate') || topicLower.includes('wildlife')) {
		return {
			theme: 'nature',
			title: 'Nature & Environment Podcast',
			description: 'Loading environmental content...',
			icon: '🌱',
			backgroundColor: 'linear-gradient(135deg, #667eea 0%, #84fab0 25%, #8fd3f4 50%, #a8edea 75%, #d299c2 100%)'
		};
	}
	
	// Education themes
	if (topicLower.includes('education') || topicLower.includes('learning') || topicLower.includes('tutorial') || topicLower.includes('academic')) {
		return {
			theme: 'education',
			title: 'Educational Excellence Podcast',
			description: 'Loading educational content...',
			icon: '📚',
			backgroundColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ffecd2 50%, #fcb69f 75%, #ff8a80 100%)'
		};
	}
	
	// Gaming themes
	if (topicLower.includes('gaming') || topicLower.includes('video game') || topicLower.includes('esports') || topicLower.includes('game')) {
		return {
			theme: 'gaming',
			title: 'Gaming Universe Podcast',
			description: 'Loading gaming content...',
			icon: '🎮',
			backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)'
		};
	}
	
	// Default theme for any other topic
	return {
		theme: 'general',
		title: `${topic.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Podcast Hub`,
		description: `Loading ${topic} podcast content...`,
		icon: '🎙️',
		backgroundColor: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 25%, #f7931e 50%, #ff8c42 75%, #ff7518 100%)'
	};
}