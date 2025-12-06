<?php

namespace App\Jobs;

use App\Enums\Status;
use App\Mail\CampaignMail;
use App\Models\CampaignRecipient;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Mail;

class SendCampaignEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public CampaignRecipient $recipient;

    /**
     * Create a new job instance.
     */
    public function __construct(CampaignRecipient $recipient)
    {
        $this->recipient = $recipient;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $recipient = $this->recipient;
        $campaign = $this->recipient->campaign;
        $contact = $this->recipient->contact;

        try {
            Mail::to($contact->email)->send(
                new CampaignMail(campaign: $campaign, recipient: $recipient),
            );

            $recipient->update([
                'status' => Status::SENT,
                'sent_at' => now(),
            ]);

            Log::info("Campaign Recipient {$recipient->id} sent to {$contact->email}");

        } catch (Exception $e) {
            $recipient->update([
                'status' => Status::FAILED,
                'failed_reason' => $e->getMessage(),
            ]);

            Log::error("SendCampaignEmailJob error for {$contact->email}: {$e->getMessage()}");
        }
    }
}
