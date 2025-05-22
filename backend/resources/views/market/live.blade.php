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
<!-- Include Pusher -->
<script src="https://js.pusher.com/7.2/pusher.min.js"></script>

<!-- Echo Configuration -->
<script>
    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: '{{ env("PUSHER_APP_KEY") }}',
        cluster: '{{ env("PUSHER_APP_CLUSTER") }}',
        encrypted: true,
        forceTLS: true
    });

    window.Echo.channel('market-ticks')
        .listen('.tick.updated', function (e) {
            const symbol = e.symbol;
            const price = e.data.last_price;
            const time = new Date(e.data.timestamp).toLocaleTimeString();

            const ltpEl = document.getElementById(`ltp-${symbol}`);
            const timeEl = document.getElementById(`time-${symbol}`);
            const cardEl = document.getElementById(`card-${symbol}`);

            if (ltpEl) ltpEl.innerText = price;
            if (timeEl) timeEl.innerText = "Updated at " + time;

            // optional flash animation
            if (cardEl) {
                cardEl.classList.add('border', 'border-success');
                setTimeout(() => cardEl.classList.remove('border', 'border-success'), 500);
            }
        });
</script>
@endpush
