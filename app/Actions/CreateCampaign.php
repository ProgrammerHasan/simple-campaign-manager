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

            $campaignId = $campaign->id;
            $timestamp = now();
            collect($data->recipientIds)
                ->map(fn($recipientId) => [
                    'campaign_id' => $campaignId,
                    'contact_id' => $recipientId,
                    'status' => Status::PENDING,
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp,
                ])
                ->chunk(1000)
                ->each(fn($chunk) => CampaignRecipient::insert($chunk->toArray()));

            return $campaign;
        });
    }
}
