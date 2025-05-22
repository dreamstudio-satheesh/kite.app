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
<script>
window.Echo = new Echo({
    broadcaster: 'reverb',
    host: "157.180.84.147:8010",
    scheme: 'http'
});

Echo.channel('market-ticks')
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
</script>
@endpush
