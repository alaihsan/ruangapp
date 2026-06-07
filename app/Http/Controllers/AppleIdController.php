<?php

namespace App\Http\Controllers;

use App\Http\Requests\LinkAppleIdRequest;
use App\Models\AppleId;
use Illuminate\Http\RedirectResponse;

class AppleIdController extends Controller
{
    /**
     * Link a simulated Apple ID to the user account.
     */
    public function store(LinkAppleIdRequest $request): RedirectResponse
    {
        $request->user()->appleIds()->create($request->validated());

        return back()->with('status', 'Apple ID berhasil ditautkan.');
    }

    /**
     * Unlink/remove a simulated Apple ID.
     */
    public function destroy(AppleId $appleId): RedirectResponse
    {
        if ($appleId->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $appleId->delete();

        return back()->with('status', 'Apple ID berhasil dilepas.');
    }
}

