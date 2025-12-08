<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CampaignController;

require 'settings.php';

Route::get('/', static function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', static function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Campaigns
    Route::prefix('/campaigns')->as('campaigns.')->group(function () {
        Route::get('/', [CampaignController::class, 'index'])->name('index');
        Route::get('/create', [CampaignController::class, 'create'])->name('create');
        Route::post('/', [CampaignController::class, 'store'])->name('store');
        Route::get('/{campaign}', [CampaignController::class, 'show'])->name('show');
    });
});
