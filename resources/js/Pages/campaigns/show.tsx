import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Campaign, CampaignRecipient } from '@/types/campaign';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Status } from '@/enums/Status';
import campaigns from '@/routes/campaigns';

interface Props {
    campaign: Campaign & {
        recipients?: CampaignRecipient[];
    };
}

export default function ShowCampaign({ campaign }: Props) {
    const breadcrumbs = [
        { title: 'Campaigns', href: campaigns.index().url },
        { title: campaign.subject, href: '#' },
    ];

    const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');

    const filteredRecipients =
        statusFilter === 'all'
            ? (campaign.recipients ?? [])
            : (campaign.recipients ?? []).filter(
                  (r) => r.status === statusFilter,
              );

    const statusBadgeColor = (status: Status) => {
        switch (status) {
            case Status.sent:
                return 'bg-green-100 text-green-800';
            case Status.failed:
                return 'bg-red-100 text-red-800';
            case Status.pending:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={campaign.subject} />

            <div className="space-y-6 rounded-xl bg-white p-4 shadow-md">
                <div>
                    <h1 className="text-2xl font-bold">{campaign.subject}</h1>
                    <p className="mt-2 text-muted-foreground">
                        {campaign.body}
                    </p>
                </div>

                <div className="mt-4 flex gap-4">
                    <Badge className={statusBadgeColor(Status.pending)}>
                        Pending:{' '}
                        {
                            campaign.recipients?.filter(
                                (r) => r.status === Status.pending,
                            ).length
                        }
                    </Badge>
                    <Badge className={statusBadgeColor(Status.sent)}>
                        Sent:{' '}
                        {
                            campaign.recipients?.filter(
                                (r) => r.status === Status.sent,
                            ).length
                        }
                    </Badge>
                    <Badge className={statusBadgeColor(Status.failed)}>
                        Failed:{' '}
                        {
                            campaign.recipients?.filter(
                                (r) => r.status === Status.failed,
                            ).length
                        }
                    </Badge>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <span>Status Filter:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value as Status | 'all')
                        }
                        className="rounded-xl border px-3 py-1"
                    >
                        <option value="all">All</option>
                        <option value={Status.pending}>Pending</option>
                        <option value={Status.sent}>Sent</option>
                        <option value={Status.failed}>Failed</option>
                    </select>
                </div>

                <div className="mt-4 overflow-auto rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Sent At</TableHead>
                                <TableHead>Failed Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRecipients.length > 0 ? (
                                filteredRecipients.map((recipient) => (
                                    <TableRow key={recipient.id}>
                                        <TableCell>
                                            {recipient.contact?.name}
                                        </TableCell>
                                        <TableCell>
                                            {recipient.contact?.email}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={statusBadgeColor(
                                                    recipient.status,
                                                )}
                                            >
                                                {recipient.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {recipient.sent_at
                                                ? new Date(
                                                      recipient.sent_at,
                                                  ).toLocaleString()
                                                : '-'}
                                        </TableCell>
                                        <TableCell>
                                            {recipient.failed_reason ?? '-'}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="py-4 text-center text-muted-foreground"
                                    >
                                        No recipients found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
