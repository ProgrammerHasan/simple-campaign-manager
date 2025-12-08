export interface Contact {
    id: number;
    name: string;
    email: string;
}

export interface CampaignCreateProps {
    contacts: Contact[];
}
