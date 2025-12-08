import AppLayout from '@/layouts/app-layout';
import { Campaign } from '@/types/campaign';
import { Head } from '@inertiajs/react';

interface Props {
    campaign: Campaign;
}

export default function ShowCampaign({ campaign }: Props) {
    const breadcrumbs = [
        { title: 'Campaigns', href: '/campaigns' },
        { title: campaign.subject, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={campaign.subject} />

            <div className="space-y-4">
                <h1 className="text-xl font-bold">{campaign.subject}</h1>
                <p className="text-muted-foreground">{campaign.body}</p>

                <h2 className="mt-6 font-semibold">Recipients</h2>

                <ul className="ml-6 list-disc">
                    {campaign.recipients?.map((r) => (
                        <li key={r.id}>{r.contact?.email}</li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
