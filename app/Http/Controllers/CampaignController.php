<?php

namespace App\Http\Controllers;

use App\Actions\CreateCampaign;
use App\Data\CreateCampaignData;
use App\Enums\Status;
use App\Http\Requests\CampaignRequest;
use App\Models\Campaign;
use App\Models\CampaignRecipient;
use App\Models\Contact;
use App\Services\CampaignService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CampaignController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = $request->integer('per_page', 10);

        $campaigns = Campaign::query()
            ->withCount([
                'recipients',
                'recipients as recipients_pending_count' => fn($query) => $query->where('status', Status::PENDING),
                'recipients as recipients_sent_count' => fn($query) => $query->where('status', Status::SENT),
                'recipients as recipients_failed_count' => fn($query) => $query->where('status', Status::FAILED),
            ])
            ->latest()
            ->paginate($perPage)->appends($request->except('page'));

        return Inertia::render('campaigns/index', [
            'campaigns' => $campaigns,
        ]);
    }

    public function create(): Response
    {
        $contacts = Contact::query()
            ->orderBy('name')
            ->get(['id', 'name', 'email']);

        return Inertia::render('campaigns/create', [
            'contacts' => $contacts
        ]);
    }

    public function store(
        CampaignRequest $request,
        CreateCampaign  $creator,
        CampaignService $sender
    ): RedirectResponse
    {
        $data = CreateCampaignData::fromRequest($request);
        $campaign = $creator->execute($data);
        $sender->send($campaign);

        return redirect()
            ->route('campaigns.show', $campaign->id)
            ->with('success', 'Campaign created and sending started.');
    }

    public function show(Campaign $campaign): Response
    {
        $campaign->load('recipients.contact');

        return Inertia::render('campaigns/show', [
            'campaign' => [
                'id' => $campaign->id,
                'subject' => $campaign->subject,
                'body' => $campaign->body,
                'created_at' => $campaign->created_at,
                'recipients' => $campaign->recipients->map(function (CampaignRecipient $recipient) {
                    return [
                        'id' => $recipient->id,
                        'contact' => $recipient->contact?->only('id', 'name', 'email'),
                        'status' => $recipient->status,
                        'failed_reason' => $recipient->failed_reason,
                        'sent_at' => $recipient->sent_at,
                    ];
                }),
            ],
        ]);
    }
}
