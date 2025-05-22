import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

window.Echo.channel('market-ticks')
    .listen('.tick.updated', (data) => {
        const id = data.symbol;
        const ltp = data.ltp;
        const time = new Date(data.time * 1000).toLocaleTimeString();

        const ltpSpan = document.getElementById('ltp-' + id);
        const timeSpan = document.getElementById('time-' + id);
        const card = document.getElementById('card-' + id);

        if (ltpSpan) ltpSpan.textContent = ltp;
        if (timeSpan) timeSpan.textContent = time;
        if (card) {
            card.classList.add('bg-light');
            setTimeout(() => card.classList.remove('bg-light'), 500);
        }
    });