<?php

namespace App\Actions;

use App\Data\CreateCampaignData;
use App\Enums\Status;
use App\Models\Campaign;
use App\Models\CampaignRecipient;
use DB;

class CreateCampaignAction
{
    public function execute(CreateCampaignData $data): Campaign
    {
        return DB::transaction(static function () use ($data) {
            $campaign = Campaign::create([
                'subject' => $data->subject,
                'body' => $data->body,
                'created_by_user_id' => authUserId(),
            ]);

            foreach ($data->recipientIds as $contactId) {
                CampaignRecipient::create([
                    'campaign_id' => $campaign->id,
                    'contact_id' => $contactId,
                    'status' => Status::PENDING,
                ]);
            }

            return $campaign;
        });
    }
}
