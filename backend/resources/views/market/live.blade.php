@extends('layouts.app')
@section('title', 'Live Market')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
            <h4 class="mb-sm-0">Live Market Dashboard</h4>
        </div>
    </div>
</div>

<div class="row" id="market-live-board">
    @foreach($symbols as $symbol)
    <div class="col-md-4 mb-3">
        <div class="card shadow-sm p-3" id="card-{{ $symbol }}">
            <h5 class="text-primary">{{ $symbol }}</h5>
            <p>LTP: <span id="ltp-{{ $symbol }}">--</span></p>
            <small class="text-muted" id="time-{{ $symbol }}">Waiting for updates...</small>
        </div>
    </div>
    @endforeach
</div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/laravel-echo@1/dist/echo.iife.js"></script>
<script src="https://js.pusher.com/beams/7.0/pusher.min.js"></script>

<script>
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: '{{ config("reverb.key") }}',
        wsHost: window.location.hostname,
        wsPort: 8080,
        forceTLS: false,
        disableStats: true,
    });

    Echo.channel('market-ticks')
        .listen('.tick.updated', (data) => {
            const id = data.symbol;
            const ltp = data.ltp;
            const time = new Date(data.time * 1000).toLocaleTimeString();

            document.getElementById('ltp-' + id).textContent = ltp;
            document.getElementById('time-' + id).textContent = time;

            // Optional: color flash effect
            const card = document.getElementById('card-' + id);
            card.classList.add('bg-light');
            setTimeout(() => card.classList.remove('bg-light'), 500);
        });
</script>
@endpush
