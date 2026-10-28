<?php

namespace Modules\Support\Http\Controllers;

use Modules\Support\Services\ManifestService;

class ManifestController
{
    public function json(ManifestService $manifestService)
    {
        $manifest = \Illuminate\Support\Facades\Cache::rememberForever('pwa_manifest_' . locale(), function () use ($manifestService) {
            return $manifestService->generate();
        });

        return response()->json(
            $manifest,
            options: JSON_UNESCAPED_SLASHES
        );
    }


    public function offline()
    {
        return view('support::pwa.offline');
    }
}

