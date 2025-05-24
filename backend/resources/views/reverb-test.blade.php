<!DOCTYPE html>
<html>
<head>
    <title>Reverb Test</title>
    @vite(['resources/js/echo.js']) <!-- Use Vite directive instead of asset() -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <div id="app">
        <h1>Reverb Test</h1>
        
        <div>
            <input type="text" id="messageInput" placeholder="Enter message">
            <button onclick="sendMessage()">Send Test Event</button>
        </div>

        <div id="messages" style="margin-top: 20px;"></div>
    </div>

    <script>
        // Initialize Echo with Reverb configuration
        window.Echo = new Echo({
            broadcaster: 'reverb',
            key: "{{ config('broadcasting.connections.reverb.key') }}",
            wsHost: window.location.hostname,
            wsPort: {{ config('broadcasting.connections.reverb.port') }},
            wssPort: {{ config('broadcasting.connections.reverb.port') }},
            forceTLS: false,
            enabledTransports: ['ws', 'wss'],
        });

        // Listen for events
        Echo.channel('test-channel')
            .listen('TestEvent', (data) => {
                const messages = document.getElementById('messages');
                messages.innerHTML += `
                    <div style="padding: 10px; margin: 5px; background: #f0f0f0;">
                        ${data.time}: ${data.message}
                    </div>
                `;
                console.log('Received event:', data);
            });

        // Send message function
        async function sendMessage() {
            const message = document.getElementById('messageInput').value;
            await fetch('/trigger-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({ message })
            });
            document.getElementById('messageInput').value = '';
        }
    </script>
</body>
</html>