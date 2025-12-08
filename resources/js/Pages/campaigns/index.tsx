import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Campaign, PaginatedResponse } from '@/types/campaign';
import { Head, Link } from '@inertiajs/react';
import CampaignsTable from '@/components/campaigns/table';
import campaigns from '@/routes/campaigns';
import { Pagination } from '@/components/pagination';

interface Props {
    campaigns: PaginatedResponse<Campaign>;
}

export default function CampaignsIndex({ campaigns: campaignsData }: Props) {
    const breadcrumbs = [{ title: 'Campaigns', href: campaigns.index().url }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Campaigns" />

            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Campaigns</h1>

                    <Button asChild>
                        <Link href={campaigns.create()}>Create Campaign</Link>
                    </Button>
                </div>

                <CampaignsTable campaigns={campaignsData.data} />

                {!!campaignsData.data.length && (
                    <Pagination links={campaignsData.links} />
                )}
            </div>
        </AppLayout>
    );
}
