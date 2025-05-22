<?php

use Illuminate\Http\Request;
use App\Models\WatchlistSymbol;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ZerodhaAuthController;
use App\Http\Controllers\ZerodhaAccountController;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');

Route::post('zerodha_accounts/{zerodha_account}/update-token', [ZerodhaAccountController::class, 'updateToken'])->name('zerodha_accounts.update_token');

Route::middleware('admin.auth')->group(function () {
    Route::get('/dashboard', fn() => view('dashboard'))->name('dashboard');
    Route::resource('zerodha_accounts', ZerodhaAccountController::class);
    
    Route::post('zerodha_accounts/check-now', [ZerodhaAccountController::class, 'checkNow'])->name('zerodha_accounts.check_now');
    
    Route::prefix('zerodha')->group(function () {
        Route::get('/login/{id}', [ZerodhaAuthController::class, 'redirect'])->name('zerodha.login');
        Route::get('/callback', [ZerodhaAuthController::class, 'callback'])->name('zerodha.callback');
    });
});

Route::get('/watchlist', function () {
    $symbols = WatchlistSymbol::all()->map(function ($row) {
        return "{$row->exchange}:{$row->symbol}";
    });

    return view('watchlist.index', compact('symbols'));
});

Route::post('/watchlist/add', function (Request $request) {
    $symbol = strtoupper($request->input('symbol'));
    $exchange = strtoupper($request->input('exchange', 'NSE'));

    WatchlistSymbol::firstOrCreate([
        'symbol' => $symbol,
        'exchange' => $exchange,
    ]);

    return redirect('/watchlist')->with('success', "$exchange:$symbol added.");
});

Route::post('/watchlist/remove', function (Request $request) {
    [$exchange, $symbol] = explode(':', $request->input('symbol'));

    WatchlistSymbol::where('symbol', $symbol)
        ->where('exchange', $exchange)
        ->delete();

    return redirect('/watchlist')->with('success', "$exchange:$symbol removed.");
});

Route::post('/watchlist/clear', function () {
    WatchlistSymbol::truncate();
    return redirect('/watchlist')->with('success', 'Watchlist cleared.');
});


Route::get('/live-market', function () {
    $symbols = Redis::smembers("watchlist:symbols");
    return view('market.live', compact('symbols'));
});


