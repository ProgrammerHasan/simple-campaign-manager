<?php

namespace App\Data;

class CreateCampaignData
{
    public function __construct(
        public string $subject,
        public string $body,
        public array $recipientIds,
    ) {}

    public static function fromRequest($request): self
    {
        return new self(
            subject: $request->validated('subject'),
            body: $request->validated('body'),
            recipientIds: $request->validated('recipient_ids'),
        );
    }
}
