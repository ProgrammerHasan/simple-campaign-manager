<?php

namespace App\Actions;

use App\Data\CreateCampaignData;
use App\Enums\Status;
use App\Models\Campaign;
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

            $pivotRows = collect($data->recipientIds)
                ->mapWithKeys(fn ($id) => [$id => ['status' => Status::PENDING]])
                ->toArray();

            $campaign->recipients()->attach($pivotRows);

            return $campaign;
        });
    }
}
