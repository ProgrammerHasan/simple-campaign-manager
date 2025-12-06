<?php

namespace App\Observers;

use App\Jobs\SendCampaignEmailJob;
use App\Models\CampaignRecipient;

class CampaignRecipientObserver
{
    public function created(CampaignRecipient $recipient): void
    {
        SendCampaignEmailJob::dispatch(
            campaignId: $recipient->campaign_id,
            contactId: $recipient->id
        );
    }
}
