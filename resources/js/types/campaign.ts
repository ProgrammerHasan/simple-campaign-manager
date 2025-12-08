import { Status } from '@/enums/Status';

export interface Campaign {
    id: number;
    subject: string;
    body: string;
    created_at: string;
    recipients_count: number;
    recipients_pending_count: number;
    recipients_sent_count: number;
    recipients_failed_count: number;
    recipients?: CampaignRecipient[] | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface CampaignRecipient {
    id: number;
    contact?: {
        id: number;
        name: string;
        email: string;
    } | null;
    status: Status;
    failed_reason?: string | null;
    sent_at?: string | null;
}
