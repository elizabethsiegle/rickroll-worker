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

		// The GENIUS part: ANY path except root gets rickrolled!
		if (url.pathname !== '/' && url.pathname !== '') {
			
			// Extract path info to make the rickroll look legitimate
			const pathSegments = url.pathname.split('/').filter(p => p);
			const resourceType = pathSegments[0] || 'general';
			const resourceId = pathSegments[1] || 'default';
			
			// Create different themed rickrolls based on the path
			let theme = 'general';
			let title = 'Educational Resource Portal';
			let description = 'Loading educational content...';
			
			if (resourceType.includes('strawberry') || resourceType.includes('berry')) {
				theme = 'strawberry';
				title = 'Strawberry Cultivation Academy';
				description = 'Loading strawberry growing expertise...';
			} else if (resourceType.includes('farm') || resourceType.includes('agriculture')) {
				theme = 'farming';
				title = 'Agricultural Education Center';
				description = 'Loading farming guidance...';
			} else if (resourceType.includes('math') || resourceType.includes('calculation')) {
				theme = 'math';
				title = 'Mathematical Learning Portal';
				description = 'Loading educational mathematics...';
			} else if (resourceType.includes('test') || resourceType.includes('system')) {
				theme = 'test';
				title = 'System Educational Portal';
				description = 'Testing educational resources...';
			}

			const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        
        body {
            font-family: 'Comic Neue', 'Comic Sans MS', cursive;
            background: linear-gradient(135deg, #ff9a56 0%, #ff6b35 25%, #f7931e 50%, #ff8c42 75%, #ff7518 100%);
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
    </style>
</head>
<body>
    <!-- Animated background bubbles -->
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    
    <div class="content-wrapper">
        <div class="portal">
            <h1>📚 ${title}</h1>
            
            <div class="theme-icon">
                ${theme === 'strawberry' ? '🍓' : 
                  theme === 'farming' ? '🌱' : 
                  theme === 'math' ? '🧮' : 
                  theme === 'test' ? '🧪' : '📖'}
            </div>
            
            <div class="path-info">
                <strong>Resource Type:</strong> ${resourceType}<br>
                <strong>Resource ID:</strong> ${resourceId}<br>
                <strong>Portal Status:</strong> <span id="status">Loading...</span>
            </div>
            
            <div class="loading" id="loading">
                <div class="spinner"></div>
                ${description}
            </div>
            
            <div id="surprise" style="display: none;">
                <div class="surprise">🎵 EDUCATIONAL SURPRISE! 🎵</div>
                <div class="message">
                    Welcome to your educational audio experience! 💕<br>
                    Hope you enjoy this classic learning content! 😄<br>
                    <small>Your Cloudflare educational portal strikes again!</small>
                </div>
                <audio id="rickrollAudio" controls loop>
                    <source src="https://demo.twilio.com/docs/classic.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <p style="font-size: 1.3em; font-weight: 700;">🎶 Never gonna give you up, never gonna let you down! 🎶</p>
                <div class="path-info">
                    You accessed: <code>${url.pathname}</code><br>
                    But got educated instead! 😉<br>
                    Portal Theme: ${theme.toUpperCase()}
                </div>
            </div>
        </div>
    </div>
    
    <!-- Sticky Footer -->
    <div class="footer">
        <a href="https://github.com/elizabethsiegle/remote-mcp-server-authless-rickroll" target="_blank">
            🚀 View Source Code on GitHub - Remote MCP Server Authless Rickroll 🚀
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
        document.getElementById('status').textContent = 'Accessing Educational Content...';
        
        // Show the surprise after a delay
        setTimeout(() => {
            document.getElementById('status').textContent = 'Content Ready!';
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

			return new Response(html, {
				headers: {
					'Content-Type': 'text/html',
					...corsHeaders,
				},
			});
		}

		// Root path shows available "educational services"
		return new Response(`📚 Educational Resource Portal

Welcome to our comprehensive educational platform!

Available Learning Centers:
🍓 Strawberry Cultivation Academy - /strawberry-guide
🌱 Agricultural Education Center - /farming-resources  
🧮 Mathematical Learning Portal - /math-tutorials
📖 General Education Hub - /learning-center
🧪 System Testing Portal - /system-test

Simply add any path to access educational resources!
Examples:
- /strawberry-cultivation-guide-2024
- /agricultural-research-audio-series
- /mathematical-education-center

All paths lead to valuable educational content! 📚✨`, {
			headers: {
				'Content-Type': 'text/plain',
				...corsHeaders,
			},
		});
	},
};