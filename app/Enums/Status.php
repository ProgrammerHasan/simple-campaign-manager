<?php

namespace App\Enums;

enum Status: string
{
    case SENT = 'sent';
    case FAILED = 'failed';
    case PENDING = 'pending';

    public function getLabel(): string
    {
        return match ($this) {
            self::SENT => 'Sent',
            self::FAILED => 'Failed',
            self::PENDING => 'Pending',
        };
    }
}
