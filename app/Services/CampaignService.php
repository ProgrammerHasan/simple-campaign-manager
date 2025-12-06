<?php

namespace App\Services;

use App\Jobs\SendCampaignEmailJob;
use App\Models\Campaign;

class CampaignService
{
    /**
     * Why Service Class সেরা পদ্ধতি:
     *
     * 1. Explicit Control:
     *    কোড দেখলেই বোঝা যায় কখন এবং কোথায় job dispatch হচ্ছে।
     *    Hidden behavior নেই।
     *
     * 2. Business Logic এখানে রাখা clean architecture।
     *    Controller → Service → Job → Mail
     *    (Laravel এর সেরা practice)
     *
     * 3. Test, Seeder, Import — control করা যায়।
     *    তুমি চাইলে আলাদা rules apply করতে পারো।
     *
     * 4. Future scalable:
     *    - batch dispatch
     *    - retry logic
     *    - status update
     *    - throttling
     *    এসব সহজে add করা যায়।
     *
     * 5. Developer-friendly:
     *    নতুন কেউ কোড পড়লে সহজে workflow বুঝতে পারে।
     */
    public function send(Campaign $campaign): void
    {
        foreach ($campaign->recipients as $recipient) {
            SendCampaignEmailJob::dispatch(
                recipient: $recipient,
            );
        }
    }
}
