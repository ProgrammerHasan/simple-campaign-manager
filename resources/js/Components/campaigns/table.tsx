import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Campaign } from '@/types/campaign';
import { Link } from '@inertiajs/react';
import { CalendarDays, Eye, Users } from 'lucide-react';

interface Props {
    campaigns: Campaign[];
}

export default function CampaignsTable({ campaigns }: Props) {
    if (!campaigns.length) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/30 py-16 text-center">
                <div className="text-xl font-semibold text-muted-foreground">
                    No data found
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    You haven't created any campaigns yet.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40%]">Subject</TableHead>
                        <TableHead className="w-[20%]">Recipients</TableHead>
                        <TableHead className="w-[25%]">Created</TableHead>
                        <TableHead className="w-[15%] text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {campaigns.map((campaign) => (
                        <TableRow
                            key={campaign.id}
                            className="transition-colors hover:bg-muted/40"
                        >
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">
                                        #{campaign.id}
                                    </Badge>
                                    {campaign.subject}
                                </div>
                            </TableCell>

                            <TableCell>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    {campaign.recipients_count}
                                </div>
                            </TableCell>

                            <TableCell>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <CalendarDays className="h-4 w-4" />
                                    {new Date(
                                        campaign.created_at,
                                    ).toLocaleString()}
                                </div>
                            </TableCell>

                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                    <Link
                                        href={`/campaigns/${campaign.id}`}
                                        className="flex items-center gap-1"
                                    >
                                        <Eye className="h-4 w-4" />
                                        View
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
