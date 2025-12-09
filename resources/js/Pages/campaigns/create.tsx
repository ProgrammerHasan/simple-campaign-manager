import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import {toast} from "react-toastify";
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { Contact } from '@/types/contact';
import campaigns from '@/routes/campaigns';

interface Props {
    contacts: Contact[];
}

export default function CreateCampaign({ contacts }: Props) {
    const breadcrumbs = [
        { title: 'Campaigns', href: campaigns.index().url },
        { title: 'Create', href: '#' },
    ];

    const [page, setPage] = useState(1);
    const perPage = 20;
    const totalPages = Math.ceil(contacts.length / perPage);

    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        body: '',
        recipient_ids: [] as number[],
    });

    // contacts for current page
    const currentContacts = contacts.slice(
        (page - 1) * perPage,
        page * perPage,
    );

    // select all toggle
    const allSelected = data.recipient_ids.length === contacts.length;

    const toggleSelectAll = () => {
        if (allSelected) {
            setData('recipient_ids', []);
        } else {
            setData(
                'recipient_ids',
                contacts.map((c) => c.id),
            );
        }
    };

    const toggleSingle = (id: number) => {
        if (data.recipient_ids.includes(id)) {
            setData(
                'recipient_ids',
                data.recipient_ids.filter((x) => x !== id),
            );
        } else {
            setData('recipient_ids', [...data.recipient_ids, id]);
        }
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await toast.promise(
                new Promise<void>((resolve, reject) => {
                    post(campaigns.store().url, {
                        onSuccess: () => {
                            resolve();
                        },
                        onError: () => {
                            reject();
                        },
                    });
                }),
                {
                    success: 'Campaign created and sending started.',
                    error: 'Sending error!',
                    pending: 'Sending...',
                },
            );
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Campaign" />

            <form
                onSubmit={submitForm}
                className="w-full space-y-4 p-6 pt-2"
            >
                <h1 className="text-2xl font-bold">Create Campaign</h1>

                <div className="space-y-2">
                    <label className="font-medium">Subject</label>
                    <input
                        type="text"
                        className="mt-2 w-full rounded-xl border p-2"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        placeholder="Write subject..."
                    />
                    {errors.subject && (
                        <p className="text-sm text-red-600">{errors.subject}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="font-medium">Message Body</label>
                    <Textarea
                        rows={4}
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        placeholder="Write your campaign message..."
                        className="mt-2"
                    />
                    {errors.body && (
                        <p className="text-sm text-red-600">{errors.body}</p>
                    )}
                </div>

                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">
                        Contacts ({contacts.length}) / Selected:{' '}
                        {data.recipient_ids?.length}
                    </h2>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleSelectAll}
                        />
                        <span className="text-sm">Select All</span>
                    </div>
                </div>

                <div className="max-h-[420px] overflow-auto rounded-xl border">
                    {currentContacts.map((c) => (
                        <div
                            key={c.id}
                            className="flex justify-between border-b p-3 last:border-none"
                        >
                            <div>
                                <p className="font-medium">{c.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {c.email}
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={data.recipient_ids.includes(c.id)}
                                onChange={() => toggleSingle(c.id)}
                                className="scale-125"
                            />
                        </div>
                    ))}
                </div>

                {errors.recipient_ids && (
                    <p className="text-sm text-red-600">
                        {errors.recipient_ids}
                    </p>
                )}

                <Pagination className="pt-0">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => page > 1 && setPage(page - 1)}
                                className="cursor-pointer"
                            />
                        </PaginationItem>

                        <span className="rounded-lg border px-4 py-2">
                            Page {page} / {totalPages}
                        </span>

                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    page < totalPages && setPage(page + 1)
                                }
                                className="cursor-pointer"
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 text-lg"
                >
                    {processing ? 'Sending...' : 'Create Campaign'}
                </Button>
            </form>
        </AppLayout>
    );
}
