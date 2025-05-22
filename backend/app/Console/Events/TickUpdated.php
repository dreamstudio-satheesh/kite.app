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

    /**
     * Create a new event instance.
     *
     * @param string $symbol       e.g. "NSE:TCS"
     * @param array $data          e.g. ["last_price" => 3755.65, "timestamp" => 1716523956]
     */
    public function __construct(string $symbol, array $data)
    {
        $this->symbol = $symbol;
        $this->data = $data;
    }

    /**
     * The channel the event should broadcast on.
     */
    public function broadcastOn(): Channel
    {
        return new Channel('market-ticks'); // frontend listens to this
    }

    /**
     * The name of the event to broadcast as.
     */
    public function broadcastAs(): string
    {
        return 'tick.updated'; // frontend JS listens to ".tick.updated"
    }

    /**
     * The data sent to the frontend.
     */
    public function broadcastWith(): array
    {
        return [
            'symbol' => $this->symbol,
            'ltp'    => $this->data['last_price'],
            'time'   => $this->data['timestamp'],
        ];
    }
}
