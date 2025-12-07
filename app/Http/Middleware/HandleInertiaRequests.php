<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $authUser = $request->user();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $authUser?->only([
                    'id',
                    'name',
                    'phone',
                    'email',
                    'photo_uri',
                ]),
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'error' => fn() => $request->session()->get('error'),
                'failed' => fn() => $request->session()->get('failed'),
                'success' => fn() => $request->session()->get('success'),
                'failures' => fn() => $request->session()->get('failures'),
            ],
        ];
    }
}
