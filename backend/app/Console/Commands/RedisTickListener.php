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
        $this->info('Listening to Redis "ticks" channel...');
        Redis::subscribe(['ticks'], function ($message) {
            $tick = json_decode($message, true);

            // Load map only once and cache in memory
            static $map = null;
            if ($map === null) {
                $map = $this->loadInstrumentMap();
            }

            $token = $tick['instrument_token'] ?? null;
            $symbol = $map[$token] ?? 'UNKNOWN';

            broadcast(new TickUpdated($symbol, $tick));
        });
    }

    private function loadInstrumentMap(): array
    {
        $csv = storage_path('app/all_equities.csv'); // Place CSV here
        $map = [];

        if (!file_exists($csv)) {
            $this->error("Missing CSV: {$csv}");
            return [];
        }

        if (($handle = fopen($csv, "r")) !== false) {
            $header = fgetcsv($handle);
            while (($row = fgetcsv($handle)) !== false) {
                $data = array_combine($header, $row);
                $key = "{$data['exchange']}:{$data['tradingsymbol']}";
                $map[(int) $data['instrument_token']] = strtoupper($key);
            }
            fclose($handle);
        }

        return $map;
    }
}
