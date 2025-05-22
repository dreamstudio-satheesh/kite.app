<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WatchlistSymbol extends Model
{
    protected $fillable = [
        'symbol',
        'exchange',
    ];
}
