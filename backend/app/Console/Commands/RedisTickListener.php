<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use App\Events\TickUpdated;

class RedisTickListener extends Command
{
    protected $signature = 'ticks:listen';
    protected $description = 'Listen to Redis "ticks" channel and broadcast to frontend';

    public function handle()
    {
        Redis::subscribe(['ticks'], function ($message) {
            $tick = json_decode($message, true);

            // Use symbol directly from tick data
            $symbol = $tick['symbol'] ?? 'UNKNOWN';

            broadcast(new TickUpdated($symbol, $tick));
        });
    }
}