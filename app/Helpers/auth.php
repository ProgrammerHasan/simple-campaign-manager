<?php

use App\Models\User;

if (!function_exists('authUser')) {
    function authUser(): User
    {
        return auth()->user();
    }
}

if (!function_exists('authUserId')) {
    function authUserId(): ?int
    {
        return authUser()?->id;
    }
}
