<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class TickUpdated implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $symbol;
    public $data;

    public function __construct($symbol, $data)
    {
        $this->symbol = $symbol;
        $this->data = $data;
    }

    public function broadcastOn()
    {
        return new Channel('market-ticks');
    }

    public function broadcastWith()
    {
        return [
            'symbol' => $this->symbol,
            'ltp' => $this->data['last_price'],
            'time' => $this->data['timestamp'],
        ];
    }

    public function broadcastAs()
    {
        return 'tick.updated';
    }
}
