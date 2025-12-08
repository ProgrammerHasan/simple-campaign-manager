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
    Route::resource('campaigns', CampaignController::class);
});
