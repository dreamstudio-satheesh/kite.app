<?php

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
    $symbols = Redis::smembers("watchlist:symbols");
    return view('watchlist.index', compact('symbols'));
});

Route::post('/watchlist/add', function (Request $request) {
    $symbol = strtoupper($request->input('symbol'));
    $exchange = strtoupper($request->input('exchange', 'NSE'));
    $key = "{$exchange}:{$symbol}";

    Redis::sadd("watchlist:symbols", $key);
    return redirect('/watchlist')->with('success', "$key added.");
});

Route::post('/watchlist/remove', function (Request $request) {
    Redis::srem("watchlist:symbols", $request->input('symbol'));
    return redirect('/watchlist')->with('success', 'Symbol removed.');
});

Route::post('/watchlist/clear', function () {
    Redis::del("watchlist:symbols");
    return redirect('/watchlist')->with('success', 'Watchlist cleared.');
});
