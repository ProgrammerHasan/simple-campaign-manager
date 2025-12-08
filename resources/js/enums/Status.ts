export enum Status {
    sent = 'sent',
    failed = 'failed',
    pending = 'pending',
}

export function getStatusLabel(type: Status): string {
    switch (type) {
        case Status.sent:
            return 'Sent';
        case Status.failed:
            return 'Failed';
        case Status.pending:
            return 'Pending';
        default:
            return '';
    }
}

export const Statuses = Object.values(Status).map(type => ({
    label: getStatusLabel(type as Status),
    value: type,
}));
