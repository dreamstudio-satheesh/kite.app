<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use App\Models\Watchlist;

class SyncWatchlistToRedis extends Command
{
    protected $signature = 'watchlist:sync';
    protected $description = 'Sync all watchlist symbols to Redis for WebSocket streaming';

    public function handle()
    {
        // Clear old set
        Redis::del('watchlist:symbols');

        // Fetch all watchlist symbols
        $symbols = Watchlist::pluck('symbol')->all();

        if (empty($symbols)) {
            $this->warn('No symbols found in watchlist.');
            return;
        }

        foreach ($symbols as $symbol) {
            Redis::sadd('watchlist:symbols', strtoupper($symbol));
        }

        $this->info("✅ Synced " . count($symbols) . " symbols to Redis set: watchlist:symbols");
    }
}
