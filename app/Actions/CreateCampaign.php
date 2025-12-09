<?php

namespace App\Actions;

use App\Data\CreateCampaignData;
use App\Enums\Status;
use App\Models\Campaign;
use App\Models\CampaignRecipient;
use DB;

class CreateCampaign
{
    public function execute(CreateCampaignData $data): Campaign
    {
        return DB::transaction(static function () use ($data) {
            $campaign = Campaign::create([
                'subject' => $data->subject,
                'body' => $data->body,
                'created_by_user_id' => authUserId(),
            ]);

            $timestamp = now();
            $rows = [];
            foreach ($data->recipientIds as $contactId) {
                $rows[] = [
                    'campaign_id' => $campaign->id,
                    'contact_id' => $contactId,
                    'status' => Status::PENDING,
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp,
                ];
            }

            foreach (array_chunk($rows, 1000) as $chunk) {
                CampaignRecipient::insert($chunk);
            }

            return $campaign;
        });
    }
}
