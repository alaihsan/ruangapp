<?php

namespace App\Http\Controllers;

use App\Http\Requests\LinkAppleIdRequest;
use App\Models\AdminActivityLog;
use App\Models\AppleId;
use Illuminate\Http\RedirectResponse;

class AppleIdController extends Controller
{
    /**
     * Link a simulated Apple ID to the user account.
     */
    public function store(LinkAppleIdRequest $request): RedirectResponse
    {
        $appleId = $request->user()->appleIds()->create($request->validated());

        AdminActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'LINK_APPLE_ID',
            'target_name' => $appleId->email,
            'details' => "Admin menautkan Apple Developer Account baru: {$appleId->email} ({$appleId->account_type}).",
            'ip_address' => $request->ip(),
        ]);

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

        $email = $appleId->email;
        $appleId->delete();

        AdminActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'UNLINK_APPLE_ID',
            'target_name' => $email,
            'details' => "Admin melepas tautan Apple Developer Account: {$email}.",
            'ip_address' => request()->ip(),
        ]);

        return back()->with('status', 'Apple ID berhasil dilepas.');
    }
}
